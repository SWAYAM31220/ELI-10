-- Enable pgcrypto if not enabled
create extension if not exists pgcrypto;

create table if not exists public.explanations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid,
  level text not null check (level in ('l10','l18','expert')),
  prompt text not null,
  response text not null,
  mindmap jsonb,
  error text
);

alter table public.explanations enable row level security;
create policy "select_all" on public.explanations for select using (true);
