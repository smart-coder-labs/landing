import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../i18n';
import type { ArticleSummary } from '../lib';
import BlogSection from './BlogSection';

const { getPublishedArticles } = vi.hoisted(() => ({ getPublishedArticles: vi.fn() }));

vi.mock('../lib', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../lib')>()),
  getPublishedArticles,
}));

function summary(slug: string, title: string): ArticleSummary {
  return {
    slug, title, description: 'Visible content', readTimeMinutes: 4, publishedAt: '2026-01-01',
    coverImage: `/articles/${slug}/images/portada.png`, coverAlt: title, tags: ['TypeScript'],
  };
}

function renderSection(path = '/', locale: 'en' | 'es' = 'en') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider locale={locale}><BlogSection /></LanguageProvider>
    </MemoryRouter>,
  );
}

describe('BlogSection', () => {
  it('renders every published article with a repository-hosted cover', () => {
    getPublishedArticles.mockReturnValue([summary('published', 'Published article')]);
    const { container } = renderSection();

    screen.getByRole('heading', { name: 'Published article' });
    // A public path, so it cannot expire the way a signed storage URL does.
    expect(container.querySelector('.article-card img')).toHaveAttribute('src', '/articles/published/images/portada.png');
    expect(screen.getByRole('link', { name: /read article/i })).toHaveAttribute('href', '/blog/published');
  });

  it('keeps the reader in their language when linking to an article', () => {
    getPublishedArticles.mockReturnValue([summary('published', 'Published article')]);
    renderSection('/es', 'es');

    expect(screen.getByRole('link', { name: /leer artículo/i })).toHaveAttribute('href', '/es/blog/published');
  });

  it('shows an empty state when nothing is published, with no error', () => {
    getPublishedArticles.mockReturnValue([]);
    renderSection();

    expect(screen.getByText('No insights are published yet.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders without a loading state because the content ships with the build', () => {
    getPublishedArticles.mockReturnValue([summary('a', 'First'), summary('b', 'Second')]);
    const { container } = renderSection();

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(within(container.querySelector('.article-grid') as HTMLElement).getAllByRole('heading')).toHaveLength(2);
  });
});
