/**
 * Articles are build-time content, not runtime data.
 *
 * They used to be fetched from Supabase, which meant the served HTML carried no
 * article text, social cards could not reference the private signed cover URLs,
 * and a backend outage took the section down. Sourcing the markdown from the
 * repository makes the content part of the build: always available, prerenderable
 * and addressable.
 */

export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  readTimeMinutes: number;
  publishedAt: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
};

export type Article = ArticleSummary & { contentMarkdown: string };

type ArticleMetadata = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  readTime: string;
  publicationDate: string;
  slug: string;
  isPublished?: boolean;
};

const metadataModules = import.meta.glob<ArticleMetadata>('../content/articles/*/metadata.json', { eager: true, import: 'default' });
const bodyModules = import.meta.glob<string>('../content/articles/*.md', { eager: true, query: '?raw', import: 'default' });

function slugFromPath(path: string) {
  return path.replace(/^.*\/articles\//, '').replace(/(\/metadata\.json|\.md)$/, '');
}

function readTimeMinutes(readTime: string, slug: string) {
  const minutes = Number(/^(\d+)\s*min$/i.exec(readTime)?.[1]);
  if (!minutes) throw new Error(`Invalid readTime for ${slug}; expected, for example, "10 min".`);
  return minutes;
}

const articles: Article[] = Object.entries(metadataModules)
  // Drafts stay in the repository but never reach the site, the sitemap or the
  // prerender, so publishing can be paced without moving files around.
  .filter(([, metadata]) => metadata.isPublished !== false)
  .map(([path, metadata]) => {
    const slug = slugFromPath(path);
    const bodyEntry = Object.entries(bodyModules).find(([bodyPath]) => slugFromPath(bodyPath) === slug);
    if (!bodyEntry) throw new Error(`Missing markdown body for article "${slug}".`);

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      readTimeMinutes: readTimeMinutes(metadata.readTime, slug),
      publishedAt: metadata.publicationDate,
      coverImage: metadata.image,
      // No per-article alt text is authored, and the card already shows the
      // title next to the image, so the title is the honest fallback.
      coverAlt: metadata.title,
      tags: metadata.tags,
      contentMarkdown: bodyEntry[1],
    };
  })
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export function getPublishedArticles(): ArticleSummary[] {
  return articles;
}

export function getPublishedArticle(slug: string): Article | null {
  return articles.find((article) => article.slug === slug) ?? null;
}
