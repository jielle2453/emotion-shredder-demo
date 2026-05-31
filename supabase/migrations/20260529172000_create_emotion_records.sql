create extension if not exists pgcrypto;

create table if not exists public.emotion_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  text text not null,
  date timestamptz not null default now(),
  keyword text not null default '',
  keywords text[] not null default '{}',
  emotion_label text not null default '',
  summary text not null default '',
  flower_index integer not null check (flower_index >= -1 and flower_index <= 11),
  note text not null default '',
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists emotion_records_user_date_idx
  on public.emotion_records (user_id, date desc);

create index if not exists emotion_records_user_flower_idx
  on public.emotion_records (user_id, flower_index);

alter table public.emotion_records enable row level security;

grant select, insert, update, delete on public.emotion_records to authenticated;

drop policy if exists emotion_records_select_own on public.emotion_records;
create policy emotion_records_select_own
  on public.emotion_records
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists emotion_records_insert_own on public.emotion_records;
create policy emotion_records_insert_own
  on public.emotion_records
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists emotion_records_update_own on public.emotion_records;
create policy emotion_records_update_own
  on public.emotion_records
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists emotion_records_delete_own on public.emotion_records;
create policy emotion_records_delete_own
  on public.emotion_records
  for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_emotion_records_updated_at on public.emotion_records;
create trigger set_emotion_records_updated_at
  before update on public.emotion_records
  for each row
  execute function public.set_updated_at();
