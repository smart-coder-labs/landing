/* global Buffer, console, process */
/*
 * Import local article sources into Supabase after migrations have been applied.
 * Run from landing:
 * SUPABASE_URL=https://<project>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<secret> node scripts/import-static-articles.mjs
 *
 * metadata.json is authoritative. Published articles are imported by default;
 * set IMPORT_DRAFT_ASSETS=true to explicitly include drafts and their private assets.
 * VITE_SUPABASE_URL is accepted only as a URL fallback. Never put a service key
 * in a VITE_* variable or any client-side code.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { basename, resolve, sep } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const importDraftAssets = process.env.IMPORT_DRAFT_ASSETS === 'true';
const projectRoot = resolve(import.meta.dirname, '..');
const articlesDirectory = resolve(projectRoot, 'public/articles');

function validateEnvironment() {
  if (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('VITE_SUPABASE_SERVICE_ROLE_KEY must not be set. Service-role keys are server-only.');
  }
  if (!url) throw new Error('SUPABASE_URL (or VITE_SUPABASE_URL) is required.');
  if (!serviceRoleKey?.trim()) throw new Error('SUPABASE_SERVICE_ROLE_KEY is required and must not be empty.');

  let parsedUrl;
  try {
    parsedUrl = new globalThis.URL(url);
  } catch {
    throw new Error('SUPABASE_URL (or VITE_SUPABASE_URL) must be a valid HTTP(S) URL.');
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('SUPABASE_URL (or VITE_SUPABASE_URL) must use HTTP or HTTPS.');
  }
}

function localPath(sourcePath) {
  const filePath = resolve(projectRoot, sourcePath);
  if (!filePath.startsWith(`${projectRoot}${sep}`)) throw new Error(`Asset path escapes the project: ${sourcePath}`);
  return filePath;
}

function tagSlug(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*\r?\n?/, '');
}

function extractSnippets(markdown) {
  return [...markdown.matchAll(/^```([^\r\n]*)\r?\n([\s\S]*?)^```\s*$/gm)].map((match, ordinal) => ({
    ordinal,
    language: match[1].trim().toLowerCase() || 'text',
    code: match[2],
  }));
}

function extractAssets(slug, metadata, markdown) {
  const paths = new Map();
  const addAsset = (assetPath, altText, isCover) => {
    if (typeof assetPath !== 'string' || !assetPath.startsWith(`/articles/${slug}/images/`)) {
      throw new Error(`Invalid image path for ${slug}: ${assetPath}`);
    }
    const sourcePath = `public${assetPath}`;
    const asset = paths.get(sourcePath) ?? { source_path: sourcePath, object_path: assetPath.slice(1), alt_text: '', is_cover: false };
    asset.alt_text ||= altText;
    asset.is_cover ||= isCover;
    paths.set(sourcePath, asset);
  };

  addAsset(metadata.image, '', true);
  for (const match of markdown.matchAll(/!\[([^\]]*)\]\((\/articles\/[^)\s]+)\)/g)) addAsset(match[2], match[1], false);
  return [...paths.values()];
}

function readTimeMinutes(value, slug) {
  const match = typeof value === 'string' && value.match(/^(\d+)\s*min$/i);
  if (!match || Number(match[1]) < 1) throw new Error(`Invalid readTime in ${slug}/metadata.json; expected, for example, "10 min".`);
  return Number(match[1]);
}

async function loadArticles() {
  const entries = await readdir(articlesDirectory, { withFileTypes: true });
  const articleDirectories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const articles = await Promise.all(articleDirectories.map(async (directory) => {
    const metadataPath = resolve(articlesDirectory, directory, 'metadata.json');
    const markdownPath = resolve(articlesDirectory, `${directory}.md`);
    let metadata;
    try {
      metadata = JSON.parse(await readFile(metadataPath, 'utf8'));
    } catch (error) {
      throw new Error(`Unable to parse ${metadataPath}: ${error.message}`);
    }
    const markdown = await readFile(markdownPath, 'utf8');
    const slug = metadata.slug;
    if (slug !== directory || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`metadata.json slug must match its directory and be kebab-case: ${directory}.`);
    }
    if (!metadata.title?.trim() || !metadata.description?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(metadata.publicationDate)) {
      throw new Error(`metadata.json for ${slug} requires title, description, and publicationDate (YYYY-MM-DD).`);
    }
    if (!Array.isArray(metadata.tags) || metadata.tags.some((tag) => typeof tag !== 'string' || !tag.trim() || !tagSlug(tag))) {
      throw new Error(`metadata.json tags for ${slug} must be non-empty strings.`);
    }

    const sourceMarkdown = stripFrontmatter(markdown);
    const contentMarkdown = sourceMarkdown.replaceAll('](/articles/', '](storage://blog-assets/articles/');
    return {
      slug,
      title: metadata.title.trim(),
      description: metadata.description.trim(),
      read_time_minutes: readTimeMinutes(metadata.readTime, slug),
      published_at: metadata.publicationDate,
      is_published: metadata.isPublished !== false,
      content_markdown: contentMarkdown,
      tags: metadata.tags.map((name) => ({ name: name.trim(), slug: tagSlug(name) })),
      snippets: extractSnippets(contentMarkdown),
      assets: extractAssets(slug, metadata, sourceMarkdown),
    };
  }));

  if (articles.length !== 4) throw new Error(`Expected exactly 4 article directories, found ${articles.length}.`);
  return importDraftAssets ? articles : articles.filter((article) => article.is_published);
}

function detectImage(buffer, filePath) {
  const extension = basename(filePath).split('.').pop()?.toLowerCase();
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return { mimeType: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 255) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 192 && marker <= 195) return { mimeType: 'image/jpeg', width: buffer.readUInt16BE(offset + 5), height: buffer.readUInt16BE(offset + 7) };
      if (length < 2) break;
      offset += length + 2;
    }
  }
  if (buffer.subarray(0, 6).toString() === 'GIF87a' || buffer.subarray(0, 6).toString() === 'GIF89a') {
    return { mimeType: 'image/gif', width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }
  if (buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP' && buffer.subarray(12, 16).toString() === 'VP8X') {
    return { mimeType: 'image/webp', width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
  throw new Error(`Unsupported or invalid image asset: ${filePath} (${extension || 'unknown'}).`);
}

async function removeMissingRows(query, rows, predicate) {
  for (const row of rows.filter(predicate)) {
    const { error } = await query(row).delete();
    if (error) throw new Error(`Unable to remove stale record: ${error.message}`);
  }
}

validateEnvironment();
const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
const articles = await loadArticles();

if (!articles.length) {
  console.log('No published articles to import. Set IMPORT_DRAFT_ASSETS=true to include drafts.');
  process.exit(0);
}

const { data: importedArticles, error: articlesError } = await supabase
  .from('articles')
  .upsert(articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    read_time_minutes: article.read_time_minutes,
    published_at: article.published_at,
    content_markdown: article.content_markdown,
    is_published: article.is_published,
  })), { onConflict: 'slug' })
  .select('id,slug');
if (articlesError) throw new Error(`Unable to upsert articles: ${articlesError.message}`);

const articlesBySlug = new Map(importedArticles.map((article) => [article.slug, article]));
const tags = [...new Map(articles.flatMap((article) => article.tags).map((tag) => [tag.slug, tag])).values()];
const { data: importedTags, error: tagsError } = await supabase.from('tags').upsert(tags, { onConflict: 'slug' }).select('id,slug');
if (tagsError) throw new Error(`Unable to upsert tags: ${tagsError.message}`);
const tagsBySlug = new Map(importedTags.map((tag) => [tag.slug, tag]));

for (const article of articles) {
  const importedArticle = articlesBySlug.get(article.slug);
  const tagIds = new Set(article.tags.map((tag) => tagsBySlug.get(tag.slug).id));
  const { data: existingRelations, error: relationsError } = await supabase.from('article_tags').select('tag_id').eq('article_id', importedArticle.id);
  if (relationsError) throw new Error(`Unable to read tags for ${article.slug}: ${relationsError.message}`);
  await removeMissingRows((row) => supabase.from('article_tags').eq('article_id', importedArticle.id).eq('tag_id', row.tag_id), existingRelations, (row) => !tagIds.has(row.tag_id));
  const { error: upsertRelationsError } = await supabase.from('article_tags').upsert([...tagIds].map((tag_id) => ({ article_id: importedArticle.id, tag_id })));
  if (upsertRelationsError) throw new Error(`Unable to upsert tags for ${article.slug}: ${upsertRelationsError.message}`);

  const { data: existingSnippets, error: snippetsError } = await supabase.from('article_code_snippets').select('id,ordinal').eq('article_id', importedArticle.id);
  if (snippetsError) throw new Error(`Unable to read snippets for ${article.slug}: ${snippetsError.message}`);
  const ordinals = new Set(article.snippets.map((snippet) => snippet.ordinal));
  await removeMissingRows((row) => supabase.from('article_code_snippets').eq('id', row.id), existingSnippets, (row) => !ordinals.has(row.ordinal));
  if (article.snippets.length) {
    const { error: upsertSnippetsError } = await supabase.from('article_code_snippets').upsert(article.snippets.map((snippet) => ({ ...snippet, article_id: importedArticle.id })), { onConflict: 'article_id,ordinal' });
    if (upsertSnippetsError) throw new Error(`Unable to upsert snippets for ${article.slug}: ${upsertSnippetsError.message}`);
  }

  const { data: importedAssets, error: assetsError } = await supabase
    .from('article_assets')
    .upsert(article.assets.map((asset) => ({ ...asset, article_id: importedArticle.id })), { onConflict: 'source_path' })
    .select('id,source_path,object_path,sha256,is_cover');
  if (assetsError) throw new Error(`Unable to upsert assets for ${article.slug}: ${assetsError.message}`);

  for (const asset of importedAssets) {
    const filePath = localPath(asset.source_path);
    let file;
    try {
      file = await readFile(filePath);
    } catch {
      throw new Error(`Missing asset declared by local sources: ${asset.source_path}`);
    }
    const hash = createHash('sha256').update(file).digest('hex');
    const image = detectImage(file, filePath);
    if (asset.sha256 !== hash) {
      const { error: uploadError } = await supabase.storage.from('blog-assets').upload(asset.object_path, file, {
        contentType: image.mimeType,
        upsert: true,
        cacheControl: '31536000',
        metadata: { sha256: hash },
      });
      if (uploadError) throw new Error(`Failed to upload ${asset.source_path}: ${uploadError.message}`);
    }
    const { error: updateAssetError } = await supabase.from('article_assets').update({
      sha256: hash,
      mime_type: image.mimeType,
      byte_size: file.byteLength,
      width: image.width,
      height: image.height,
    }).eq('id', asset.id);
    if (updateAssetError) throw new Error(`Failed to update metadata for ${asset.source_path}: ${updateAssetError.message}`);
  }

  const cover = importedAssets.find((asset) => asset.is_cover);
  const { error: coverError } = await supabase.from('articles').update({ cover_asset_id: cover.id }).eq('id', importedArticle.id);
  if (coverError) throw new Error(`Unable to update cover for ${article.slug}: ${coverError.message}`);
}

console.log(`Imported ${articles.length} ${importDraftAssets ? '' : 'published '}articles and their private assets into blog-assets.`);
