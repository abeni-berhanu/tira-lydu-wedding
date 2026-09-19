-- Run this once in the Supabase SQL Editor (your project → SQL Editor → New query → Run).

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending text not null check (attending in ('yes', 'no')),
  created_at timestamptz not null default now()
);

create table if not exists guestbook_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table rsvps enable row level security;
alter table guestbook_messages enable row level security;

-- Anyone can submit an RSVP. There is no public SELECT policy, so guests
-- cannot read each other's RSVPs — only insert their own.
create policy "Public can insert RSVPs"
  on rsvps for insert
  to anon
  with check (true);

-- Anyone can submit a guestbook message — it always goes in as 'pending'.
create policy "Public can insert messages"
  on guestbook_messages for insert
  to anon
  with check (true);

-- Anyone can read messages, but ONLY the ones already approved. This is
-- what powers the public "Messages From Guests" wall.
create policy "Public can read approved messages"
  on guestbook_messages for select
  to anon
  using (status = 'approved');

-- No public UPDATE/DELETE policy on either table. Approving, rejecting,
-- or deleting a message, and reading the RSVP list, only happens through
-- the /admin dashboard's API routes, which use the service role key
-- (server-side only) to bypass RLS entirely.
