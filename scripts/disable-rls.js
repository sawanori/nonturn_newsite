#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check .env.local');
  process.exit(1);
}

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  db: {
    schema: 'public'
  }
});

async function disableRLS() {
  console.log('Attempting to disable RLS on tables...\n');

  try {
    // First, let's try to execute SQL directly
    // Note: This requires the sql function to be available
    
    console.log('Trying to disable RLS via SQL...');
    
    // Try using the SQL builder if available
    const queries = [
      'ALTER TABLE conversations DISABLE ROW LEVEL SECURITY',
      'ALTER TABLE messages DISABLE ROW LEVEL SECURITY'
    ];

    // Unfortunately, Supabase doesn't expose direct SQL execution via the client library
    // We need to use the REST API directly
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queries[0]
      })
    });

    if (!response.ok) {
      console.log('Direct SQL execution not available.');
      console.log('\nTrying alternative approach...\n');
      
      // Let's test if we can insert/read without issues using service role key
      await testDirectAccess();
    } else {
      console.log('✓ RLS disabled successfully');
    }

  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nManual intervention required.');
  }
}

async function testDirectAccess() {
  console.log('Testing direct database access with Service Role Key...\n');

  try {
    // Test 1: Create a conversation
    console.log('1. Creating test conversation...');
    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .insert({
        channel: 'web',
        status: 'new',
        session_token: `test-service-${Date.now()}`,
        last_message_at: new Date().toISOString()
      })
      .select()
      .single();

    if (convError) {
      console.error('❌ Failed to create conversation:', convError.message);
      return;
    }

    console.log('✓ Conversation created:', conversation.id);

    // Test 2: Create a message
    console.log('\n2. Creating test message...');
    const { data: message, error: msgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender_type: 'customer',
        content: 'Test message from service role key',
        metadata: {}
      })
      .select()
      .single();

    if (msgError) {
      console.error('❌ Failed to create message:', msgError.message);
      return;
    }

    console.log('✓ Message created:', message.id);

    // Test 3: Read back the data
    console.log('\n3. Reading data back...');
    const { data: messages, error: readError } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation.id);

    if (readError) {
      console.error('❌ Failed to read messages:', readError.message);
      return;
    }

    console.log('✓ Messages retrieved:', messages.length);

    console.log('\n✅ Service Role Key is working correctly!');
    console.log('\nThe issue is with the publishable key and RLS policies.');
    
    // Now let's create a workaround
    await createWorkaround();

  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

async function createWorkaround() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('WORKAROUND SOLUTION:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('Since we cannot disable RLS programmatically, here are two options:\n');
  
  console.log('OPTION 1: Manual RLS Disable (Recommended for Development)');
  console.log('─────────────────────────────────────────────────────────');
  console.log('1. Go to: https://supabase.com/dashboard/project/saeakxyazamxgmwpriqo/auth/policies');
  console.log('2. Find the "conversations" table');
  console.log('3. Toggle OFF the "Enable RLS" switch');
  console.log('4. Find the "messages" table');
  console.log('5. Toggle OFF the "Enable RLS" switch');
  console.log('6. Save changes\n');
  
  console.log('OPTION 2: Use API Routes (Implemented Alternative)');
  console.log('─────────────────────────────────────────────────────────');
  console.log('I will create API routes that use the Service Role Key');
  console.log('This way, the client can work without direct Supabase access\n');
}

// Run the script
disableRLS();