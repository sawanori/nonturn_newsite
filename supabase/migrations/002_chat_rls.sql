-- Enable RLS
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.profiles enable row level security;

-- Helper function to check if user is admin
create or replace function public.is_admin() 
returns boolean 
language sql 
stable 
as $$
  select exists(
    select 1 
    from public.profiles p 
    where p.user_id = auth.uid() 
    and p.role = 'admin'
  )
$$;

-- Conversations policies
-- Authenticated users can read all conversations (for admin UI)
create policy conversations_select 
  on public.conversations
  for select 
  to authenticated 
  using (true);

-- Only admin or assigned staff can update conversations
create policy conversations_update 
  on public.conversations
  for update 
  to authenticated 
  using (
    public.is_admin() or assigned_to = auth.uid()
  );

-- Messages policies
-- Authenticated users can read all messages
create policy messages_select 
  on public.messages
  for select 
  to authenticated 
  using (true);

-- Authenticated users can insert messages (with created_by = self)
create policy messages_insert 
  on public.messages
  for insert 
  to authenticated 
  with check (created_by = auth.uid());

-- Profiles policies
-- Users can read their own profile
create policy profiles_select 
  on public.profiles
  for select 
  to authenticated 
  using (user_id = auth.uid());

-- Only admins can insert/update profiles
create policy profiles_insert 
  on public.profiles
  for insert 
  to authenticated 
  with check (public.is_admin());

create policy profiles_update 
  on public.profiles
  for update 
  to authenticated 
  using (public.is_admin());