-- Step 5: Seed Admin User and Templates

-- NOTE: Replace this UUID with your actual admin user ID from Supabase Auth
-- You can get this from the Supabase dashboard > Authentication > Users
-- For now, we'll use a placeholder that needs to be updated

-- Example: Insert admin user (you need to replace the UUID)
-- insert into public.profiles (user_id, role, display_name)
-- values ('YOUR-ADMIN-USER-ID-HERE', 'admin', 'Owner')
-- on conflict (user_id) do update set role = 'admin';

-- Seed reply templates (optional but useful)
insert into public.reply_templates (title, body, tags)
values 
  (
    '初回ご挨拶',
    'お問い合わせありがとうございます。撮影のご希望日時と、点数（品数）をお知らせください。こちらから最短の空き枠をご案内します。',
    array['見積', '初回']
  ),
  (
    '料金について',
    '撮影料金は、基本プラン：15点まで29,800円、標準プラン：30点まで49,800円、プレミアムプラン：点数無制限69,800円となっております。詳細はお見積りをご確認ください。',
    array['料金', '見積']
  ),
  (
    '撮影日程調整',
    'ご希望の日程で承ることができます。撮影時間は約2-3時間を予定しております。当日は撮影前の準備をお願いいたします。',
    array['日程', 'スケジュール']
  ),
  (
    '納品について',
    '撮影データは撮影後3営業日以内に納品いたします。データはダウンロードリンクにてお送りいたします。',
    array['納品', 'データ']
  )
on conflict do nothing;

-- Create storage bucket for attachments (optional)
-- Note: This needs to be done via Supabase dashboard or API
-- as storage operations are not available via SQL
-- insert into storage.buckets (id, name, public)
-- values ('chat-attachments', 'chat-attachments', false)
-- on conflict (id) do nothing;