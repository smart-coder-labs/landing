import { render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useSeo } from './seo';

function Page(props: Parameters<typeof useSeo>[0]) {
  useSeo(props);
  return null;
}

const head = () => ({
  title: document.title,
  description: document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content,
  canonical: document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,
  ogUrl: document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content,
  ogType: document.head.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.content,
  robots: document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content,
  lang: document.documentElement.lang,
  ld: document.getElementById('route-structured-data')?.textContent,
});

afterEach(() => {
  document.head.querySelectorAll('meta,link,script').forEach((n) => n.remove());
  document.documentElement.lang = 'en';
});

describe('useSeo', () => {
  it('points the canonical at the current route, not the homepage', async () => {
    render(<Page path="/blog/clean-code" title="Clean Code" description="Principios fundamentales." type="article" lang="es" />);

    await waitFor(() => expect(head().canonical).toBe('https://www.smartcoderlabs.com/blog/clean-code'));
    const meta = head();
    expect(meta.title).toBe('Clean Code | SmartCoderLabs');
    expect(meta.description).toBe('Principios fundamentales.');
    expect(meta.ogUrl).toBe('https://www.smartcoderlabs.com/blog/clean-code');
    expect(meta.ogType).toBe('article');
    expect(meta.lang).toBe('es');
  });

  it('falls back to the site defaults on the homepage', async () => {
    render(<Page path="/" />);

    await waitFor(() => expect(head().canonical).toBe('https://www.smartcoderlabs.com/'));
    expect(head().title).toBe('SmartCoderLabs | Software products, applied AI, and team capability');
    expect(head().ogType).toBe('website');
    expect(head().robots).toBe('index, follow');
  });

  it('publishes route structured data and removes it on unmount', async () => {
    const { unmount } = render(<Page path="/blog/x" structuredData={{ '@type': 'BlogPosting', headline: 'X' }} />);

    await waitFor(() => expect(head().ld).toContain('BlogPosting'));

    unmount();
    expect(document.getElementById('route-structured-data')).toBeNull();
  });

  it('keeps error routes out of the index', async () => {
    render(<Page path="/404" title="Not found" noIndex />);

    await waitFor(() => expect(head().robots).toBe('noindex, follow'));
  });
});
