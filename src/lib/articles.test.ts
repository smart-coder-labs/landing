import { describe, expect, it } from 'vitest';
import { getPublishedArticle, getPublishedArticles } from './articles';

describe('local article content', () => {
  it('loads every article shipped in the repository, newest first', () => {
    const articles = getPublishedArticles();

    expect(articles.length).toBeGreaterThanOrEqual(4);
    const dates = articles.map((article) => article.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it('exposes complete metadata and a resolvable cover for each article', () => {
    for (const article of getPublishedArticles()) {
      expect(article.title).toBeTruthy();
      expect(article.description).toBeTruthy();
      expect(article.readTimeMinutes).toBeGreaterThan(0);
      expect(article.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.tags.length).toBeGreaterThan(0);
      // Public path, not a signed URL that expires.
      expect(article.coverImage).toMatch(/^\/articles\/.+\.(png|jpe?g|webp)$/);
      expect(article.coverAlt).toBeTruthy();
    }
  });

  it('serves the article body without leftover frontmatter', () => {
    const article = getPublishedArticle('clean-code');

    expect(article).not.toBeNull();
    expect(article?.contentMarkdown.startsWith('---')).toBe(false);
    expect(article?.contentMarkdown.length).toBeGreaterThan(1000);
  });

  it('returns null for an unknown slug', () => {
    expect(getPublishedArticle('does-not-exist')).toBeNull();
  });
});
