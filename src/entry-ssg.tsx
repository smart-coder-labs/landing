import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { LocalizedApp } from './App';
import { ThemeProvider, localePrefix } from './i18n';
import { getPublishedArticles, takeServerHead, type ResolvedSeo } from './lib';

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
