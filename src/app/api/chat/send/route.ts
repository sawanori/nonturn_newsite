import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { notifyAdminViaLine } from '@/lib/line/adminNotify';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  });
}

export async function POST(req: Request) {
  try {
    const { content, conversationId } = await req.json();
    
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }
    
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('chat_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 401 }
      );
    }
    
    const supabase = getSupabaseAdmin();
    
    // Verify conversation belongs to this session
    let conversation;
    if (conversationId) {
      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', conversationId)
        .eq('session_token', sessionToken)
        .single();
      
      conversation = data;
    }
    
    // Create conversation if not exists
    if (!conversation) {
      const { data: created } = await supabase
        .from('conversations')
        .insert({
          channel: 'web',
          status: 'new',
          session_token: sessionToken,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      conversation = created;
    }
    
    if (!conversation) {
      return NextResponse.json(
        { error: 'Failed to find or create conversation' },
        { status: 500 }
      );
    }
    
    // Insert message
    const { error: msgError } = await supabase.from('messages').insert({
      conversation_id: conversation.id,
      role: 'user',
      source: 'web',
      content: content.trim(),
    });
    
    if (msgError) {
      console.error('Failed to insert message:', msgError);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }
    
    // Update conversation last_message_at
    await supabase
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversation.id);
    
    // ===== Check if we should notify admin (with cooldown) =====
    // First, check if this is a new conversation or if the last message was from admin
    const { data: lastMessage } = await supabase
      .from('messages')
      .select('role')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: false })
      .limit(2) // Get last 2 messages (including the one we just inserted)
      .maybeSingle();
    
    // Debug logging
    console.log('[DEBUG] Last message:', lastMessage);
    console.log('[DEBUG] Conversation ID:', conversation.id);
    
    // Only notify if this is the first message or if the previous message was from admin
    const shouldCheckNotification = !lastMessage || lastMessage.role !== 'user';
    console.log('[DEBUG] Should check notification:', shouldCheckNotification);
    
    if (shouldCheckNotification) {
      // Cooldown enabled for production
      const skipCooldown = false; // 5-minute cooldown is active
      console.log('[DEBUG] Skip cooldown:', skipCooldown);
      
      let canNotify = skipCooldown;
      
      if (!skipCooldown) {
        // Use the cooldown function to check if we can notify
        const cooldownMinutes = Number(process.env.ADMIN_NOTIFY_COOLDOWN_MINUTES || '5');
        const { data: canNotifyData, error: rpcError } = await supabase.rpc('try_admin_notify', {
          p_conversation_id: conversation.id,
          p_window_minutes: cooldownMinutes
        });
        
        if (rpcError) {
          console.error('try_admin_notify RPC error:', rpcError.message);
        }
        
        canNotify = !rpcError && canNotifyData === true;
      } else {
        // Update admin_notified_at without cooldown check for testing
        await supabase
          .from('conversations')
          .update({ admin_notified_at: new Date().toISOString() })
          .eq('id', conversation.id);
      }
      
      // Send notification if allowed
      if (canNotify) {
        console.log('[DEBUG] Can notify: true');
        console.log('[DEBUG] Environment variables check:');
        console.log('[DEBUG] LINE_CHANNEL_ACCESS_TOKEN exists:', !!process.env.LINE_CHANNEL_ACCESS_TOKEN);
        console.log('[DEBUG] LINE_ADMIN_GROUP_ID:', process.env.LINE_ADMIN_GROUP_ID || 'NOT SET');
        console.log('[DEBUG] ADMIN_NOTIFY_ENABLED:', process.env.ADMIN_NOTIFY_ENABLED);
        
        const trimmedContent = content.trim();
        const preview = trimmedContent.length > 60 ? trimmedContent.slice(0, 57) + '…' : trimmedContent;
        const adminUrl = process.env.ADMIN_INBOX_URL || 'https://foodphoto-pro.com/admin/inbox';
        const url = `${adminUrl}?c=${encodeURIComponent(conversation.id)}`;
        
        console.log('[DEBUG] Sending notification with:', { title: 'ユーザーから新着メッセージ', preview, url });
        
        // Send notification asynchronously (don't wait for it)
        notifyAdminViaLine({ 
          title: 'ユーザーから新着メッセージ', 
          preview, 
          url 
        }).catch(e => console.error('LINE admin notify error:', e));
      } else {
        console.log('[DEBUG] Can notify: false');
      }
    }
    // ===========================================================
    
    return NextResponse.json({ 
      ok: true, 
      conversationId: conversation.id 
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}