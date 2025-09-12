-- Enable UUID extension
create extension if not exists pgcrypto;

-- Conversations table
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('web','line')), -- v1 は 'web' 固定想定
  status text not null default 'open' check (status in ('open','closed')),
  contact_name text,
  contact_email text,
  line_user_id text, -- 将来LINE連携用（NULL許容）
  session_token text, -- Webゲスト用（HttpOnly Cookie）
  assigned_to uuid, -- auth.users.id（担当者）
  created_at timestamptz default now(),
  last_message_at timestamptz
);

-- Indexes for conversations
create index if not exists conversations_status_last_idx on public.conversations (status, last_message_at desc);
create index if not exists conversations_session_idx on public.conversations (session_token);
create index if not exists conversations_line_idx on public.conversations (line_user_id);

-- Messages table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user','agent','system')),
  source text not null check (source in ('web','admin','line')),
  content text not null,
  content_type text default 'text/plain',
  attachment_url text,
  created_by uuid, -- staff（auth.users.id）
  created_at timestamptz default now(),
  delivered_to_line boolean default false
);

-- Index for messages
create index if not exists messages_conv_created_idx on public.messages (conversation_id, created_at);

-- Profiles table for admin users
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'staff' check (role in ('admin','staff')),
  created_at timestamptz default now()
);

-- Conversation links for email resumption (optional)
create table if not exists public.conversation_links (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Indexes for conversation links
create index if not exists conversation_links_conv_idx on public.conversation_links (conversation_id);
create index if not exists conversation_links_exp_idx on public.conversation_links (expires_at);