create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  province text not null,
  preferred_contact text not null default 'phone',
  privacy_accepted boolean not null default false,
  marketing_accepted boolean not null default false,
  consent_version text not null,
  consent_at timestamptz not null,
  calculation jsonb not null default '{}'::jsonb,
  attribution jsonb not null default '{}'::jsonb,
  source_submitted_at text,
  status text not null default 'new' check (status in ('new', 'validated', 'contacted', 'qualified', 'appointment', 'converted', 'discarded')),
  owner text,
  partner text,
  partner_transfer_at timestamptz,
  notes text
);

alter table public.leads enable row level security;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (lower(email));
create index if not exists leads_phone_idx on public.leads (phone);

comment on table public.leads is 'Mortgage study requests. Service-role access only; no anonymous RLS policies.';
