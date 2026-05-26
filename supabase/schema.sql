-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

alter table signups enable row level security;

create policy "Allow anonymous signups"
  on signups
  for insert
  to anon
  with check (true);
