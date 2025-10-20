import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { notifyAdminViaLine } from '@/lib/line/adminNotify';

export const runtime = 'nodejs';

// Supabase接続を関数内で初期化
function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function POST(req: Request) {
  try {
    // Webhookの認証（オプション）
    const WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET;
    const authHeader = req.headers.get('x-webhook-secret');
    if (WEBHOOK_SECRET && authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Supabaseクライアントを初期化
    const supabase = getSupabaseAdmin();

    const payload = await req.json();
    console.log('[Webhook] Received:', payload);

    // メッセージ作成イベントの処理
    if (payload.type === 'INSERT' && payload.table === 'messages') {
      const message = payload.record;
      
      // ユーザーからのメッセージのみ処理
      if (message.role !== 'user') {
        return NextResponse.json({ ok: true, skipped: 'Not user message' });
      }

      // 会話情報を取得
      const { data: conversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', message.conversation_id)
        .single();

      if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
      }

      // 5分クールダウンチェック
      const cooldownMinutes = 5;
      const { data: canNotify } = await supabase.rpc('try_admin_notify', {
        p_conversation_id: conversation.id,
        p_window_minutes: cooldownMinutes
      });

      if (canNotify) {
        // LINE通知を送信
        const preview = message.content.length > 60 
          ? message.content.slice(0, 57) + '…' 
          : message.content;
        
        const adminUrl = process.env.ADMIN_INBOX_URL || 'https://non-turn.com/services/photo/foodphoto/admin/inbox';
        const url = `${adminUrl}?c=${encodeURIComponent(conversation.id)}`;

        await notifyAdminViaLine({
          title: '飲食店撮影お問い合わせ',
          preview,
          url
        });

        console.log('[Webhook] LINE notification sent');
      } else {
        console.log('[Webhook] Cooldown active, skipping notification');
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}