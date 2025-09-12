-- Step 6: Smoke Tests for Verification
-- These are test queries to verify the system is working correctly

-- Test 1: Check if all tables are created
select 
  'tables_ready' as label, 
  count(*) filter (where tablename in (
    'conversations', 
    'messages', 
    'profiles', 
    'conversation_reads', 
    'conversation_events', 
    'reply_templates', 
    'attachments', 
    'audit_logs'
  )) as present 
from pg_tables 
where schemaname = 'public';

-- Test 2: Create a test conversation
insert into public.conversations (
  channel, 
  status, 
  session_token, 
  last_message_at,
  contact_name,
  contact_email,
  source_url,
  utm_source,
  utm_medium
) 
values (
  'web', 
  'new', 
  'test-session-' || gen_random_uuid()::text, 
  now(),
  'Test User',
  'test@example.com',
  'https://foodphoto-pro.com',
  'organic',
  'web'
) 
returning id;

-- Test 3: Insert a test message (replace {CID} with the ID from Test 2)
-- Note: In actual usage, you would capture the conversation ID from the previous query
-- insert into public.messages (
--   conversation_id,
--   role,
--   source,
--   content,
--   created_by
-- )
-- values (
--   '{CID}',
--   'user',
--   'web',
--   'テスト問い合わせです。料金について教えてください。',
--   null
-- );

-- Test 4: Check if triggers work correctly
-- select status, last_message_at 
-- from public.conversations 
-- where id = '{CID}';

-- Test 5: Test unread count function
-- select public.unread_count('{CID}');

-- Test 6: Verify enums are created
select 
  'enums_ready' as label,
  count(*) as enum_count
from pg_type t
join pg_namespace n on n.oid = t.typnamespace
where n.nspname = 'public'
and t.typname in ('channel', 'conversation_status', 'message_role', 'message_source', 'event_type');

-- Test 7: Check if extensions are enabled
select 
  'extensions_ready' as label,
  count(*) as extension_count
from pg_extension
where extname in ('pgcrypto', 'pg_trgm');

-- Test 8: Verify RLS is enabled
select 
  'rls_enabled' as label,
  count(*) as tables_with_rls
from pg_tables t
join pg_class c on c.relname = t.tablename
where t.schemaname = 'public'
and c.relrowsecurity = true
and t.tablename in (
  'conversations', 
  'messages', 
  'profiles',
  'conversation_reads',
  'conversation_events',
  'reply_templates',
  'attachments',
  'audit_logs'
);