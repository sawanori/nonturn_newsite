-- Step 2: Enhanced Core Tables
-- Note: We need to modify existing tables carefully to avoid data loss

-- First, drop existing tables if they exist (be careful in production!)
-- For production, you would want to migrate data instead
drop table if exists public.conversation_links cascade;
drop table if exists public.messages cascade;
drop table if exists public.conversations cascade;
drop table if exists public.profiles cascade;

-- Create enhanced profiles table
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  display_name text,
  created_at timestamptz default now()
);

-- Create enhanced conversations table with tracking fields
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  channel public.channel not null default 'web',
  status public.conversation_status not null default 'new',
  contact_name text,
  contact_email text,
  line_user_id text,
  session_token text,
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer_domain text,
  user_agent text,
  tags text[] default '{}'::text[],
  assigned_to uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  last_message_at timestamptz
);

-- Create comprehensive indexes for conversations
create index conv_status_last_idx on public.conversations (status, last_message_at desc);
create index conv_session_idx on public.conversations (session_token);
create index conv_line_idx on public.conversations (line_user_id);
create index conv_source_url_idx on public.conversations (source_url);
create index conv_tags_idx on public.conversations using gin (tags);

-- Create enhanced messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role public.message_role not null,
  source public.message_source not null,
  content text not null,
  content_type text default 'text/plain',
  attachment_url text,
  created_by uuid references auth.users(id) on delete set null,
  is_internal boolean default false,
  created_at timestamptz default now(),
  delivered_to_line boolean default false
);

-- Create indexes for messages
create index msg_conv_created_idx on public.messages (conversation_id, created_at);
create index msg_created_by_idx on public.messages (created_by);
create index msg_trgm_content_idx on public.messages using gin (content gin_trgm_ops);
create index msg_user_recent_idx on public.messages (conversation_id, created_at) where role = 'user';

-- Create conversation reads tracking
create table public.conversation_reads (
  conversation_id uuid references public.conversations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  last_read_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

-- Create conversation events for audit trail
create table public.conversation_events (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  type public.event_type not null,
  actor uuid references auth.users(id) on delete set null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create index conv_events_idx on public.conversation_events (conversation_id, created_at);

-- Create reply templates for quick responses
create table public.reply_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  tags text[] default '{}'::text[],
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index reply_templates_tags_idx on public.reply_templates using gin (tags);

-- Create conversation links for email continuity
create table public.conversation_links (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  unique (token_hash)
);

create index conv_links_conv_idx on public.conversation_links (conversation_id);
create index conv_links_exp_idx on public.conversation_links (expires_at);

-- Create attachments table
create table public.attachments (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  file_url text not null,
  mime_type text,
  bytes integer,
  created_at timestamptz default now()
);

-- Create audit logs for compliance
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor uuid references auth.users(id) on delete set null,
  action text not null,
  target_type text not null,
  target_id uuid not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create index audit_target_idx on public.audit_logs (target_type, target_id, created_at);