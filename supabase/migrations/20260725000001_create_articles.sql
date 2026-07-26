-- blog content remains relational while binary assets live exclusively in storage.

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(trim(title)) > 0),
  description text not null check (char_length(trim(description)) > 0),
  read_time_minutes smallint not null check (read_time_minutes > 0),
  published_at date not null,
  content_markdown text not null,
  is_published boolean not null default false,
  cover_asset_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null unique check (char_length(trim(name)) > 0)
);

create table public.article_tags (
  article_id uuid not null references public.articles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (article_id, tag_id)
);

create table public.article_assets (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  source_path text not null unique check (source_path !~ '(^|/)\.\.(/|$)'),
  object_path text not null unique check (object_path !~ '(^|/)\.\.(/|$)'),
  alt_text text not null default '',
  mime_type text,
  byte_size bigint check (byte_size is null or byte_size > 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  sha256 text check (sha256 is null or sha256 ~ '^[a-f0-9]{64}$'),
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.articles
  add constraint articles_cover_asset_id_fkey
  foreign key (cover_asset_id) references public.article_assets(id) on delete set null;

create table public.article_code_snippets (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references public.articles(id) on delete cascade,
  ordinal smallint not null check (ordinal >= 0),
  language text not null default 'text' check (language ~ '^[a-z0-9_+-]+$'),
  code text not null,
  unique (article_id, ordinal)
);

create index articles_published_at_idx on public.articles (published_at desc) where is_published;
create index article_tags_tag_id_idx on public.article_tags (tag_id, article_id);
create index article_assets_article_id_idx on public.article_assets (article_id);
create unique index article_assets_one_cover_idx on public.article_assets (article_id) where is_cover;
create index article_code_snippets_article_id_idx on public.article_code_snippets (article_id, ordinal);

-- The bucket remains private. Reads are granted only through the Storage policy below.
insert into storage.buckets (id, name, public)
values ('blog-assets', 'blog-assets', false)
on conflict (id) do update set public = excluded.public;

alter table public.articles enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.article_assets enable row level security;
alter table public.article_code_snippets enable row level security;

grant select on public.articles, public.tags, public.article_tags, public.article_assets, public.article_code_snippets to anon, authenticated;

-- only published articles are visible to public readers.
create policy "anon read published articles" on public.articles for select to anon using (is_published);
create policy "authenticated read published articles" on public.articles for select to authenticated using (is_published);

-- related records are visible only when their parent article is public.
create policy "anon read published tags" on public.tags for select to anon using (exists (select 1 from public.article_tags at join public.articles a on a.id = at.article_id where at.tag_id = tags.id and a.is_published));
create policy "authenticated read published tags" on public.tags for select to authenticated using (exists (select 1 from public.article_tags at join public.articles a on a.id = at.article_id where at.tag_id = tags.id and a.is_published));
create policy "anon read published article tags" on public.article_tags for select to anon using (exists (select 1 from public.articles a where a.id = article_tags.article_id and a.is_published));
create policy "authenticated read published article tags" on public.article_tags for select to authenticated using (exists (select 1 from public.articles a where a.id = article_tags.article_id and a.is_published));
create policy "anon read published article assets" on public.article_assets for select to anon using (exists (select 1 from public.articles a where a.id = article_assets.article_id and a.is_published));
create policy "authenticated read published article assets" on public.article_assets for select to authenticated using (exists (select 1 from public.articles a where a.id = article_assets.article_id and a.is_published));
create policy "anon read published article snippets" on public.article_code_snippets for select to anon using (exists (select 1 from public.articles a where a.id = article_code_snippets.article_id and a.is_published));
create policy "authenticated read published article snippets" on public.article_code_snippets for select to authenticated using (exists (select 1 from public.articles a where a.id = article_code_snippets.article_id and a.is_published));

-- Only assets currently linked to published articles can be read or signed.
-- Service-role imports bypass this policy and the bucket remains private.
create policy "read published blog assets" on storage.objects for select to anon, authenticated using (
  bucket_id = 'blog-assets'
  and exists (
    select 1
    from public.article_assets asset
    join public.articles article on article.id = asset.article_id
    where asset.object_path = name
      and article.is_published
  )
);
