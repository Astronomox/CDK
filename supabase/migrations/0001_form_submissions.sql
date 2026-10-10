-- Cheer the Kids: form submission tables.
--
-- Access model: Row Level Security is ON and there are NO policies for the
-- anon or authenticated roles, so nobody can read or write these tables with
-- the public key. The website writes with the service role key on the server
-- only. Staff read submissions in the Supabase dashboard; invite only the
-- people who need access (PRD section 27: restrict administrative access).
--
-- Columns match lib/forms/schemas.ts. Collect nothing beyond these fields.

create extension if not exists "pgcrypto";

create table if not exists public.volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  age_range text not null,
  academic_level text not null,
  motivation text not null,
  preferred_area text not null,
  skills text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'screening_sent', 'training', 'onboarded', 'declined'))
);

create table if not exists public.school_outreach_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  school_name text not null,
  school_location text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  school_type text not null,
  estimated_students integer not null check (estimated_students > 0),
  preferred_date text not null,
  additional_info text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'completed', 'closed'))
);

create table if not exists public.partner_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  organisation text not null,
  email text not null,
  phone text,
  partnership_type text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_discussion', 'confirmed', 'closed'))
);

create table if not exists public.item_donation_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  items text[] not null,
  item_details text not null,
  preferred_delivery_date text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'received', 'closed'))
);

alter table public.volunteer_applications enable row level security;
alter table public.school_outreach_enquiries enable row level security;
alter table public.partner_enquiries enable row level security;
alter table public.item_donation_enquiries enable row level security;

-- Belt and braces: remove default grants from the public API roles.
revoke all on public.volunteer_applications from anon, authenticated;
revoke all on public.school_outreach_enquiries from anon, authenticated;
revoke all on public.partner_enquiries from anon, authenticated;
revoke all on public.item_donation_enquiries from anon, authenticated;

create index if not exists volunteer_applications_created_at_idx on public.volunteer_applications (created_at desc);
create index if not exists school_outreach_enquiries_created_at_idx on public.school_outreach_enquiries (created_at desc);
create index if not exists partner_enquiries_created_at_idx on public.partner_enquiries (created_at desc);
create index if not exists item_donation_enquiries_created_at_idx on public.item_donation_enquiries (created_at desc);
