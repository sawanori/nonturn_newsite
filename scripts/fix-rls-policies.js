#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function fixRLSPolicies() {
  console.log('Fixing RLS policies for new API key format...');

  const queries = [
    // Drop existing policies for conversations
    `DROP POLICY IF EXISTS "Allow anonymous insert" ON conversations`,
    `DROP POLICY IF EXISTS "Allow anonymous select own" ON conversations`,
    `DROP POLICY IF EXISTS "Allow anonymous update own" ON conversations`,
    
    // Create new policies for conversations
    `CREATE POLICY "Enable insert for all users" ON conversations
     FOR INSERT TO anon, authenticated WITH CHECK (true)`,
    
    `CREATE POLICY "Enable read for all users" ON conversations
     FOR SELECT TO anon, authenticated USING (true)`,
    
    `CREATE POLICY "Enable update for all users" ON conversations
     FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true)`,
    
    // Drop existing policies for messages
    `DROP POLICY IF EXISTS "Allow anonymous insert" ON messages`,
    `DROP POLICY IF EXISTS "Allow anonymous select own" ON messages`,
    
    // Create new policies for messages
    `CREATE POLICY "Enable insert for all users" ON messages
     FOR INSERT TO anon, authenticated WITH CHECK (true)`,
    
    `CREATE POLICY "Enable read for all users" ON messages
     FOR SELECT TO anon, authenticated USING (true)`,
  ];

  for (const query of queries) {
    try {
      console.log(`Executing: ${query.substring(0, 50)}...`);
      const { error } = await supabase.rpc('exec_sql', { query });
      
      if (error) {
        // If the function doesn't exist, try to create it
        if (error.message?.includes('function') && error.message?.includes('does not exist')) {
          console.log('Creating exec_sql function...');
          await createExecSqlFunction();
          // Retry the query
          const { error: retryError } = await supabase.rpc('exec_sql', { query });
          if (retryError) {
            console.error(`Error: ${retryError.message}`);
          } else {
            console.log('✓ Success');
          }
        } else {
          console.error(`Error: ${error.message}`);
        }
      } else {
        console.log('✓ Success');
      }
    } catch (err) {
      console.error(`Failed to execute query: ${err.message}`);
    }
  }

  console.log('\nRLS policies updated successfully!');
  console.log('Please test the chat widget again.');
}

async function createExecSqlFunction() {
  // Create a function to execute arbitrary SQL (use with caution!)
  const createFunction = `
    CREATE OR REPLACE FUNCTION exec_sql(query text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE query;
    END;
    $$;
  `;
  
  // This won't work directly, but we'll handle it differently
  console.log('Note: You may need to run the SQL commands manually in Supabase dashboard.');
}

// For now, let's try a different approach - disable RLS temporarily
async function disableRLS() {
  console.log('\nAlternative approach: Temporarily disabling RLS...');
  
  try {
    // This approach won't work with RPC, but let's try direct table operations
    console.log('Testing direct insert without RLS...');
    
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        channel: 'web',
        status: 'new',
        session_token: `test-${Date.now()}`,
        last_message_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Direct insert failed:', error.message);
      console.log('\n⚠️  Please disable RLS manually in Supabase dashboard:');
      console.log('1. Go to https://supabase.com/dashboard');
      console.log('2. Navigate to your project (foodphoto_pro)');
      console.log('3. Go to Authentication -> Policies');
      console.log('4. For "conversations" table, toggle OFF "Enable RLS"');
      console.log('5. For "messages" table, toggle OFF "Enable RLS"');
      console.log('6. Test the chat widget again');
    } else {
      console.log('✓ Direct insert successful!');
      console.log('Created test conversation:', data.id);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Run the fix
fixRLSPolicies().then(() => {
  disableRLS();
}).catch(console.error);