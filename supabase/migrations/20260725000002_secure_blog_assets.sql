-- Remediate installations created before blog-assets was made private.
update storage.buckets
set public = false
where id = 'blog-assets';

drop policy if exists "public read blog assets" on storage.objects;
drop policy if exists "read published blog assets" on storage.objects;

-- Object reads and signed-URL creation are allowed only for published article assets.
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
