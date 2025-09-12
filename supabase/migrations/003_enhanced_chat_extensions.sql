-- Step 1: Extensions and Enums
-- Create necessary extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm; -- For text search

-- Create enums for type safety
-- Channel enum
do $$
begin
  create type public.channel as enum ('web', 'line');
exception 
  when duplicate_object then null;
end$$;

-- Conversation status enum
do $$
begin
  create type public.conversation_status as enum ('new', 'active', 'snoozed', 'closed');
exception 
  when duplicate_object then null;
end$$;

-- Message role enum
do $$
begin
  create type public.message_role as enum ('user', 'agent', 'system');
exception 
  when duplicate_object then null;
end$$;

-- Message source enum
do $$
begin
  create type public.message_source as enum ('web', 'admin', 'line');
exception 
  when duplicate_object then null;
end$$;

-- Event type enum
do $$
begin
  create type public.event_type as enum (
    'opened', 
    'first_response', 
    'assigned', 
    'closed', 
    'reopened', 
    'tag_added', 
    'tag_removed'
  );
exception 
  when duplicate_object then null;
end$$;