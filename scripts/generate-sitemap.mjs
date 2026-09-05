/* global console, process */
/*
 * Write public/sitemap.xml from the articles in the repository.
 * Run from landing:  npm run sitemap
 *
 * Reads the same files the site renders, so it cannot drift from what is
 * actually published, and it needs no network access or credentials.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const siteUrl = process.env.SITE_URL || 'https://www.smartcoderlabs.com';
const projectRoot = resolve(import.meta.dirname, '..');
const contentDir = resolve(projectRoot, 'src/content/articles');

const entries = await readdir(contentDir, { withFileTypes: true });
const articles = [];
for (const entry of entries.filter((item) => item.isDirectory())) {
  const metadata = JSON.parse(await readFile(resolve(contentDir, entry.name, 'metadata.json'), 'utf8'));
  if (metadata.isPublished === false) continue;
  articles.push({ slug: metadata.slug, publishedAt: metadata.publicationDate });
}
articles.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
if (!articles.length) throw new Error('No published articles found; refusing to write an article-less sitemap.');

const homeLastmod = articles[0].publishedAt;
const urls = [
  // Both language homepages are distinct pages and both get indexed.
  { loc: `${siteUrl}/`, lastmod: homeLastmod, changefreq: 'weekly', priority: '1.0' },
  { loc: `${siteUrl}/es`, lastmod: homeLastmod, changefreq: 'weekly', priority: '1.0' },
  // Articles have a single language version; /es/blog/* is a locale shell whose
  // canonical points here, so only the canonical URL is listed.
  ...articles.map((article) => ({ loc: `${siteUrl}/blog/${article.slug}`, lastmod: article.publishedAt, changefreq: 'monthly', priority: '0.8' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

await writeFile(resolve(projectRoot, 'public/sitemap.xml'), xml, 'utf8');
console.log(`Wrote sitemap.xml with ${urls.length} URLs (2 homepages + ${articles.length} articles).`);
