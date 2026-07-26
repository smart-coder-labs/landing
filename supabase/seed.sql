-- Manual SQL alternative for environments that intentionally use psql.
-- scripts/import-static-articles.mjs is the normal one-command importer and does not require this file.
-- metadata json is authoritative; frontmatter is removed before storing markdown.

\set hexagonal_markdown `cat public/articles/hexagonal-architecture.md`
\set transformers_markdown `cat public/articles/transformers-nlp.md`
\set clean_code_markdown `cat public/articles/clean-code.md`
\set microservices_markdown `cat public/articles/microservices-vs-monoliths.md`

begin;

create temporary table article_seed (
  slug text primary key,
  metadata jsonb not null,
  markdown text not null
) on commit drop;

insert into article_seed (slug, metadata, markdown) values
('hexagonal-architecture', '{"title":"Arquitectura Hexagonal: Diseñando sistemas mantenibles","description":"Aprende cómo la arquitectura hexagonal puede mejorar la mantenibilidad y testabilidad de tus aplicaciones. Exploramos sus componentes, ventajas y un caso práctico.","read_time_minutes":10,"published_at":"2024-07-26","tags":["arquitectura","software design","hexagonal architecture","ports and adapters","desarrollo de software"]}', regexp_replace(:'hexagonal_markdown', '^---[\\s\\S]*?---\\s*', '')),
('transformers-nlp', '{"title":"Introducción práctica a los Transformers en NLP","description":"Una guía paso a paso para comprender y aplicar modelos de transformers en procesamiento de lenguaje natural, incluyendo el mecanismo de atención y ejemplos.","read_time_minutes":15,"published_at":"2024-07-28","tags":["nlp","transformers","ia","inteligencia artificial","machine learning","atencion"]}', regexp_replace(:'transformers_markdown', '^---[\\s\\S]*?---\\s*', '')),
('clean-code', '{"title":"Clean Code: Principios Fundamentales para un Desarrollo Sostenible","description":"Explora los principios esenciales para escribir código limpio, mantenible y eficiente, con ejemplos antes/después y mejores prácticas.","read_time_minutes":12,"published_at":"2024-07-27","tags":["clean code","buenas practicas","desarrollo de software","refactoring","calidad de codigo"]}', regexp_replace(:'clean_code_markdown', '^---[\\s\\S]*?---\\s*', '')),
('microservices-vs-monoliths', '{"title":"Microservicios vs Monolitos: Guía para Elegir Sabiamente","description":"Un análisis detallado sobre cuándo y por qué elegir arquitecturas de microservicios o monolíticas, comparando sus características y casos de uso.","read_time_minutes":14,"published_at":"2024-07-29","tags":["microservicios","monolitos","arquitectura de software","distribuited systems","devops"]}', regexp_replace(:'microservices_markdown', '^---[\\s\\S]*?---\\s*', ''));

insert into public.articles (slug, title, description, read_time_minutes, published_at, content_markdown, is_published)
select slug, metadata->>'title', metadata->>'description', (metadata->>'read_time_minutes')::smallint, (metadata->>'published_at')::date, markdown, true
from article_seed
on conflict (slug) do update set title = excluded.title, description = excluded.description, read_time_minutes = excluded.read_time_minutes, published_at = excluded.published_at, content_markdown = excluded.content_markdown, is_published = excluded.is_published, updated_at = now();

-- storage paths are portable across project domains and resolved to public URLs by the client.
update public.articles set content_markdown = replace(content_markdown, '](/articles/', '](storage://blog-assets/articles/') where slug in (select slug from article_seed);

insert into public.tags (slug, name)
select distinct lower(regexp_replace(tag, '[^a-z0-9]+', '-', 'g')), tag
from article_seed, jsonb_array_elements_text(metadata->'tags') as tag
on conflict (slug) do update set name = excluded.name;

insert into public.article_tags (article_id, tag_id)
select a.id, t.id
from article_seed s
join public.articles a on a.slug = s.slug
cross join jsonb_array_elements_text(s.metadata->'tags') as tag
join public.tags t on t.name = tag
on conflict do nothing;

insert into public.article_assets (article_id, source_path, object_path, alt_text, is_cover)
select a.id, asset.source_path, asset.object_path, asset.alt_text, asset.is_cover
from public.articles a
join (values
  ('hexagonal-architecture', 'public/articles/hexagonal-architecture/images/portada.png', 'articles/hexagonal-architecture/images/portada.png', '', true),
  ('hexagonal-architecture', 'public/articles/hexagonal-architecture/images/hexagonal.png', 'articles/hexagonal-architecture/images/hexagonal.png', 'Diagrama de arquitectura hexagonal por capas que muestra clientes HTTP y base de datos externos conectados mediante API REST y repositorios con la aplicación y el dominio a través de puertos.', false),
  ('hexagonal-architecture', 'public/articles/hexagonal-architecture/images/hexagonal_components.png', 'articles/hexagonal-architecture/images/hexagonal_components.png', 'Diagrama de los componentes de la arquitectura hexagonal con el dominio en el núcleo, puertos primarios y secundarios, adaptadores, usuario, base de datos y servicios externos.', false),
  ('transformers-nlp', 'public/articles/transformers-nlp/images/portada.png', 'articles/transformers-nlp/images/portada.png', '', true),
  ('transformers-nlp', 'public/articles/transformers-nlp/images/nlp.png', 'articles/transformers-nlp/images/nlp.png', 'Diagrama del flujo simplificado del mecanismo de Self-Attention para un token', false),
  ('clean-code', 'public/articles/clean-code/images/portada.png', 'articles/clean-code/images/portada.png', '', true),
  ('microservices-vs-monoliths', 'public/articles/microservices-vs-monoliths/images/portada.png', 'articles/microservices-vs-monoliths/images/portada.png', '', true),
  ('microservices-vs-monoliths', 'public/articles/microservices-vs-monoliths/images/monolito.png', 'articles/microservices-vs-monoliths/images/monolito.png', 'Diagrama de una arquitectura monolítica con una única aplicación que agrupa interfaz, autenticación, usuarios, pedidos, pagos, reportes, lógica de negocio y acceso a datos sobre una base de datos relacional compartida.', false),
  ('microservices-vs-monoliths', 'public/articles/microservices-vs-monoliths/images/microservicios.png', 'articles/microservices-vs-monoliths/images/microservicios.png', 'Diagrama de una arquitectura de microservicios con un API Gateway que conecta servicios independientes de autenticación, usuarios, pedidos, pagos, reportes, inventario, notificaciones y catálogo, cada uno con su propia base de datos.', false)
) as asset(slug, source_path, object_path, alt_text, is_cover) on asset.slug = a.slug
on conflict (source_path) do update set article_id = excluded.article_id, object_path = excluded.object_path, alt_text = excluded.alt_text, is_cover = excluded.is_cover;

update public.articles a set cover_asset_id = asset.id
from public.article_assets asset
where asset.article_id = a.id and asset.is_cover;

delete from public.article_code_snippets where article_id in (select id from public.articles where slug in (select slug from article_seed));
insert into public.article_code_snippets (article_id, ordinal, language, code)
select a.id, snippet.ordinal - 1, coalesce(nullif(snippet_content.language, ''), 'text'), snippet_content.code
from article_seed s
join public.articles a on a.slug = s.slug
cross join lateral regexp_matches(s.markdown, '```([^\\n]*)\\n([\\s\\S]*?)```', 'g') with ordinality as snippet(match, ordinal)
cross join lateral (select trim(snippet.match[1]) as language, snippet.match[2] as code) as snippet_content;

commit;
