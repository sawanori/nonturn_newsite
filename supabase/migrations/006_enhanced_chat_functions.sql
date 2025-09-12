-- Step 4: Helper Functions and Triggers

-- Unread count function
create or replace function public.unread_count(p_conversation_id uuid)
returns integer
language sql
stable
security definer
as $$
  with r as (
    select last_read_at 
    from public.conversation_reads 
    where conversation_id = p_conversation_id 
    and user_id = auth.uid()
  )
  select count(1) 
  from public.messages m
  left join r on true
  where m.conversation_id = p_conversation_id
  and m.role = 'user'
  and (r.last_read_at is null or m.created_at > r.last_read_at);
$$;

-- Trigger function for messages after insert
create or replace function public.tg_messages_after_insert()
returns trigger
language plpgsql
security definer
as $$
declare
  prev_agent_count int;
  prev_status public.conversation_status;
begin
  -- Get current conversation status
  select status into prev_status 
  from public.conversations 
  where id = NEW.conversation_id;
  
  -- Update conversation last_message_at and status
  update public.conversations
  set 
    last_message_at = NEW.created_at,
    status = case
      when NEW.role = 'user' and prev_status = 'closed' then 'new'
      when NEW.role = 'agent' and prev_status in ('new', 'snoozed') then 'active'
      else prev_status
    end
  where id = NEW.conversation_id;
  
  -- Track first response event
  if NEW.role = 'agent' then
    select count(1) into prev_agent_count
    from public.messages
    where conversation_id = NEW.conversation_id
    and role = 'agent'
    and id <> NEW.id;
    
    if coalesce(prev_agent_count, 0) = 0 then
      insert into public.conversation_events (conversation_id, type, actor, created_at)
      values (NEW.conversation_id, 'first_response', NEW.created_by, NEW.created_at);
    end if;
  
  -- Track reopened event
  elsif NEW.role = 'user' and prev_status = 'closed' then
    insert into public.conversation_events (conversation_id, type, actor, created_at)
    values (NEW.conversation_id, 'reopened', null, NEW.created_at);
  end if;
  
  return NEW;
end$$;

-- Create trigger for messages
drop trigger if exists trg_messages_after_insert on public.messages;
create trigger trg_messages_after_insert
  after insert on public.messages
  for each row
  execute function public.tg_messages_after_insert();

-- Trigger function for conversations after update
create or replace function public.tg_conversations_after_update()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Track assignment changes
  if NEW.assigned_to is distinct from OLD.assigned_to then
    insert into public.conversation_events (conversation_id, type, actor, meta)
    values (
      NEW.id, 
      'assigned', 
      auth.uid(), 
      jsonb_build_object('from', OLD.assigned_to, 'to', NEW.assigned_to)
    );
  end if;
  
  -- Track status changes
  if NEW.status <> OLD.status then
    if NEW.status = 'closed' then
      insert into public.conversation_events (conversation_id, type, actor)
      values (NEW.id, 'closed', auth.uid());
    elsif OLD.status = 'closed' and NEW.status in ('new', 'active', 'snoozed') then
      insert into public.conversation_events (conversation_id, type, actor)
      values (NEW.id, 'reopened', auth.uid());
    end if;
  end if;
  
  return NEW;
end$$;

-- Create trigger for conversations
drop trigger if exists trg_conversations_after_update on public.conversations;
create trigger trg_conversations_after_update
  after update on public.conversations
  for each row
  execute function public.tg_conversations_after_update();