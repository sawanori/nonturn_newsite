-- Step 3: Comprehensive RLS Policies

-- Enable RLS on all tables
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.profiles enable row level security;
alter table public.conversation_reads enable row level security;
alter table public.conversation_events enable row level security;
alter table public.reply_templates enable row level security;
alter table public.conversation_links enable row level security;
alter table public.attachments enable row level security;
alter table public.audit_logs enable row level security;

-- Create admin check function
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 
    from public.profiles p 
    where p.user_id = auth.uid() 
    and p.role = 'admin'
  )
$$;

-- Conversations policies
create policy conversations_select 
  on public.conversations 
  for select 
  to authenticated 
  using (true);

create policy conversations_update 
  on public.conversations 
  for update 
  to authenticated 
  using (public.is_admin() or assigned_to = auth.uid());

-- Messages policies
create policy messages_select 
  on public.messages 
  for select 
  to authenticated 
  using (true);

create policy messages_insert 
  on public.messages 
  for insert 
  to authenticated 
  with check (created_by = auth.uid());

-- Conversation reads policies
create policy reads_select 
  on public.conversation_reads 
  for select 
  to authenticated 
  using (true);

create policy reads_upsert 
  on public.conversation_reads 
  for insert 
  to authenticated 
  with check (user_id = auth.uid());

create policy reads_update 
  on public.conversation_reads 
  for update 
  to authenticated 
  using (user_id = auth.uid());

-- Conversation events policies
create policy events_select 
  on public.conversation_events 
  for select 
  to authenticated 
  using (true);

create policy events_insert 
  on public.conversation_events 
  for insert 
  to authenticated 
  with check (true);

-- Reply templates policies
create policy templates_select 
  on public.reply_templates 
  for select 
  to authenticated 
  using (true);

create policy templates_cud 
  on public.reply_templates 
  for all 
  to authenticated 
  using (created_by = auth.uid() or public.is_admin()) 
  with check (created_by = auth.uid() or public.is_admin());

-- Attachments policies
create policy attachments_select 
  on public.attachments 
  for select 
  to authenticated 
  using (true);

create policy attachments_insert 
  on public.attachments 
  for insert 
  to authenticated 
  with check (true);

-- Audit logs policies (admin only)
create policy audits_select 
  on public.audit_logs 
  for select 
  to authenticated 
  using (public.is_admin());

create policy audits_insert 
  on public.audit_logs 
  for insert 
  to authenticated 
  with check (true);

-- Profiles policies
create policy profiles_select 
  on public.profiles 
  for select 
  to authenticated 
  using (true);

create policy profiles_update 
  on public.profiles 
  for update 
  to authenticated 
  using (user_id = auth.uid() or public.is_admin());