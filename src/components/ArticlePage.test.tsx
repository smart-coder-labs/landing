import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Article } from '../lib';
import ArticlePage from './ArticlePage';

const { getPublishedArticle } = vi.hoisted(() => ({ getPublishedArticle: vi.fn() }));

vi.mock('../lib', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../lib')>()),
  getPublishedArticle,
}));

function article(slug: string, title = 'Code article'): Article {
  return {
    slug, title, description: 'A description.', readTimeMinutes: 1, publishedAt: '2026-01-01',
    coverImage: `/articles/${slug}/images/portada.png`, coverAlt: title,
    tags: ['TypeScript'],
    contentMarkdown: 'Inline `literal` stays separate.\n\n```ts\nconst veryLongIdentifier = "copy this literal without truncation";\n```\n\n![Diagram](/articles/code/images/diagram.png)',
  };
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path="/blog/:articleSlug" element={<ArticlePage />} /></Routes>
    </MemoryRouter>,
  );
}

describe('ArticlePage', () => {
  it('renders Markdown with Prism highlighting and repository-hosted images', () => {
    getPublishedArticle.mockReturnValue(article('code'));
    const { container } = renderAt('/blog/code');

    screen.getByRole('heading', { name: 'Code article' });
    const code = container.querySelector('.prose pre code');
    expect(code).toHaveTextContent('const veryLongIdentifier = "copy this literal without truncation";');
    expect(code).toHaveClass('language-ts');
    expect(code?.querySelector('span')).toHaveTextContent('const');
    expect(screen.getByText('literal').closest('code')).not.toHaveClass('language-ts');
    expect(screen.getByRole('img', { name: 'Diagram' })).toHaveAttribute('src', '/articles/code/images/diagram.png');
  });

  it('uses the article cover for the social card and structured data', () => {
    getPublishedArticle.mockReturnValue(article('code'));
    renderAt('/blog/code');

    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://www.smartcoderlabs.com/articles/code/images/portada.png');
    const structured = JSON.parse(document.getElementById('route-structured-data')?.textContent ?? '{}');
    expect(structured['@type']).toBe('BlogPosting');
    expect(structured.image).toEqual(['https://www.smartcoderlabs.com/articles/code/images/portada.png']);
  });

  it('reports an unknown slug instead of rendering an empty page', () => {
    getPublishedArticle.mockReturnValue(null);
    renderAt('/blog/missing');

    expect(screen.getByRole('alert')).toHaveTextContent('This article does not exist or is no longer published.');
  });
});
