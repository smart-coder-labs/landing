import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { LocalizedApp } from './App';
import { ThemeProvider, localePrefix } from './i18n';
import { getPublishedArticles, takeServerHead, type ResolvedSeo } from './lib';

/**
 * Canonical URLs for the sitemap, with the date each one last changed.
 * /es/blog/* is a locale shell whose canonical points at /blog/*, so only the
 * canonical URL is listed.
 */
export function sitemap(): { path: string; lastmod: string }[] {
  const articles = getPublishedArticles();
  const newest = articles[0]?.publishedAt ?? new Date().toISOString().slice(0, 10);
  return [
    { path: '/', lastmod: newest },
    { path: '/es', lastmod: newest },
    ...articles.map((article) => ({ path: `/blog/${article.slug}`, lastmod: article.publishedAt })),
  ];
}

/** Every route that should exist as a static HTML file. */
export function routes(): string[] {
  const slugs = getPublishedArticles().map((article) => article.slug);
  return [
    ...Object.values(localePrefix).map((prefix) => prefix || '/'),
    ...Object.values(localePrefix).flatMap((prefix) => slugs.map((slug) => `${prefix}/blog/${slug}`)),
  ];
}

export function render(url: string): { html: string; head: ResolvedSeo | null } {
  const html = renderToString(
    <ThemeProvider>
      <StaticRouter location={url}><LocalizedApp /></StaticRouter>
    </ThemeProvider>,
  );
  return { html, head: takeServerHead() };
}
