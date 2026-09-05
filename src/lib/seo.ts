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
export function useSeo({ title, description, path, image, type = 'website', lang, structuredData, noIndex = false, alternates }: SeoInput) {
  useEffect(() => {
    const resolvedTitle = title ? `${title} | ${siteName}` : homeTitle;
    const resolvedDescription = description || homeDescription;
    const resolvedUrl = `${siteUrl}${path}`;
    const resolvedImage = image || homeImage;

    document.title = resolvedTitle;
    setMeta('meta[name="description"]', 'name', 'description', resolvedDescription);
    setLink('canonical', resolvedUrl);

    setMeta('meta[property="og:title"]', 'property', 'og:title', resolvedTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', resolvedDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', resolvedUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', resolvedImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', resolvedTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', resolvedDescription);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', resolvedImage);

    if (lang) document.documentElement.lang = lang;
    setMeta('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, follow' : 'index, follow');

    document.head.querySelectorAll(`link[${alternateAttr}]`).forEach((node) => node.remove());
    for (const [hreflang, href] of Object.entries(alternates ?? {})) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = `${siteUrl}${href}`;
      link.setAttribute(alternateAttr, '');
      document.head.appendChild(link);
    }

    document.getElementById(structuredDataId)?.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = structuredDataId;
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(structuredDataId)?.remove();
      document.head.querySelectorAll(`link[${alternateAttr}]`).forEach((node) => node.remove());
    };
  }, [title, description, path, image, type, lang, structuredData, noIndex, alternates]);
}
