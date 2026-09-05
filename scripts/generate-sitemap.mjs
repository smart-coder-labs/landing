/* global console, process */
/*
 * Write public/sitemap.xml from the published articles in Supabase.
 * Run from landing, after the articles are seeded:
 *   node --env-file=.env scripts/generate-sitemap.mjs
 *
 * A hand-maintained sitemap goes stale the moment an article is published, so
 * this reads the same source of truth the site renders from. The anon key is
 * enough: published articles are readable under the existing RLS policy.
 */
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const siteUrl = process.env.SITE_URL || 'https://www.smartcoderlabs.com';
const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required.');

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error } = await supabase
  .from('articles')
  .select('slug,published_at')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
if (error) throw new Error(`Unable to read articles: ${error.message}`);

const today = new Date().toISOString().slice(0, 10);
const homeLastmod = data[0]?.published_at?.slice(0, 10) || today;
const entries = [
  // Both language homepages are distinct pages and both get indexed.
  { loc: `${siteUrl}/`, lastmod: homeLastmod, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteUrl}/es`, lastmod: homeLastmod, changefreq: 'weekly', priority: '1.0' },
  // Articles have a single language version; /es/blog/* is a locale shell whose
  // canonical points here, so only the canonical URL is listed.
  ...data.map((article) => ({
    loc: `${siteUrl}/blog/${article.slug}`,
    lastmod: article.published_at.slice(0, 10),
    changefreq: 'monthly',
    priority: '0.8',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(import.meta.dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`Wrote sitemap.xml with ${entries.length} URLs (1 homepage + ${data.length} articles).`);
