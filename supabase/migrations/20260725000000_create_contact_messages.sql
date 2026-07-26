create table public.contact_messages (
  id bigint generated always as identity primary key,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 3 and 320),
  subject text check (char_length(subject) <= 200),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

grant insert on public.contact_messages to anon;
grant usage on sequence public.contact_messages_id_seq to anon;

create policy "Anonymous visitors can submit contact messages"
on public.contact_messages
for insert
to anon
with check (
  char_length(trim(full_name)) between 2 and 120
  and char_length(trim(email)) between 3 and 320
  and char_length(trim(message)) between 10 and 5000
);
