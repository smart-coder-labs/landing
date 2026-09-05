import { useEffect } from 'react';

export const siteUrl = 'https://www.smartcoderlabs.com';
export const siteName = 'SmartCoderLabs';

const homeTitle = `${siteName} | Software products, applied AI, and team capability`;
const homeDescription = 'SmartCoderLabs designs, builds, and operates software products and applied AI capabilities while enabling teams across the business.';
const homeImage = `${siteUrl}/og-image.png`;
const structuredDataId = 'route-structured-data';

export type SeoInput = {
  title?: string;
  description?: string;
  /** Path only, e.g. "/blog/clean-code". Resolved against siteUrl. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** BCP-47 code for the content of this route, not the interface. */
  lang?: string;
  structuredData?: Record<string, unknown>;
  /** Keep this route out of search results (error pages, thin routes). */
  noIndex?: boolean;
  /**
   * Equivalent URLs of this page in other languages, keyed by hreflang code.
   * Must be reciprocal: every listed page has to list the others back.
   * Omit for pages that exist in a single language.
   */
  alternates?: Record<string, string>;
};

const alternateAttr = 'data-seo-alternate';

export type ResolvedSeo = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: string;
  robots: string;
  lang?: string;
  alternates: { hreflang: string; href: string }[];
  structuredData?: Record<string, unknown>;
};

/**
 * Pure resolution of a route's metadata, shared by the browser hook and the
 * build-time prerender so both emit exactly the same head.
 */
export function resolveSeo({ title, description, path, image, type = 'website', lang, structuredData, noIndex = false, alternates }: SeoInput): ResolvedSeo {
  return {
    title: title ? `${title} | ${siteName}` : homeTitle,
    description: description || homeDescription,
    canonical: `${siteUrl}${path}`,
    image: image || homeImage,
    type,
    robots: noIndex ? 'noindex, follow' : 'index, follow',
    lang,
    alternates: Object.entries(alternates ?? {}).map(([hreflang, href]) => ({ hreflang, href: `${siteUrl}${href}` })),
    structuredData,
  };
}

/**
 * During a build-time render there is no DOM to mutate, so the resolved head is
 * recorded here and the prerender writes it into the static HTML. Without this
 * every prerendered route would ship the homepage title and canonical.
 */
let serverHead: ResolvedSeo | null = null;
export function takeServerHead(): ResolvedSeo | null {
  const head = serverHead;
  serverHead = null;
  return head;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

/**
 * Keeps title, description, canonical, Open Graph and per-route structured data in
 * sync with the active route. Without this every route inherited the homepage
 * canonical, which tells search engines the page is a duplicate and keeps it out
 * of the index.
 */
export function useSeo(input: SeoInput) {
  const resolved = resolveSeo(input);
  // Recorded during render because effects never run in a build-time render.
  if (typeof document === 'undefined') serverHead = resolved;

  const serialized = JSON.stringify(resolved);
  useEffect(() => {
    const head: ResolvedSeo = JSON.parse(serialized);

    document.title = head.title;
    setMeta('meta[name="description"]', 'name', 'description', head.description);
    setLink('canonical', head.canonical);

    setMeta('meta[property="og:title"]', 'property', 'og:title', head.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', head.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', head.canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', head.type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', head.image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', head.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', head.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', head.image);
    setMeta('meta[name="robots"]', 'name', 'robots', head.robots);

    if (head.lang) document.documentElement.lang = head.lang;

    document.head.querySelectorAll(`link[${alternateAttr}]`).forEach((node) => node.remove());
    for (const { hreflang, href } of head.alternates) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      link.setAttribute(alternateAttr, '');
      document.head.appendChild(link);
    }

    document.getElementById(structuredDataId)?.remove();
    if (head.structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = structuredDataId;
      script.textContent = JSON.stringify(head.structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(structuredDataId)?.remove();
      document.head.querySelectorAll(`link[${alternateAttr}]`).forEach((node) => node.remove());
    };
  }, [serialized]);
}
