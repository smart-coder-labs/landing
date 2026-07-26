import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Article } from '../lib';
import ArticlePage from './ArticlePage';

const { getPublishedArticle } = vi.hoisted(() => ({
  getPublishedArticle: vi.fn(),
}));

vi.mock('../lib', () => ({ getPublishedArticle }));

function NavigateToSecondArticle() {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate('/blog/second')}>Load second article</button>;
}

function article(slug: string, title = 'Code article'): Article {
  return {
    slug, title, description: '', read_time_minutes: 1, published_at: '2026-01-01',
    content_markdown: 'Inline `literal` stays separate.\n\n```ts\nconst veryLongIdentifier = "copy this literal without truncation";\n```\n\n![Diagram](storage://blog-assets/articles/code/image.png)',
    tags: [{ name: 'TypeScript', slug: 'typescript' }],
    assets: [{ id: 'diagram', object_path: 'articles/code/image.png', alt_text: 'Diagram', is_cover: false, signed_url: 'https://assets.test/articles/code/image.png?token=signed' }], snippets: [{ ordinal: 0, language: 'ts', code: 'const veryLongIdentifier = "copy this literal without truncation";' }],
    cover_asset: null,
  };
}

describe('ArticlePage', () => {
  beforeEach(() => { getPublishedArticle.mockReset(); });

  it('renders published Markdown with Prism highlighting and resolves storage images', async () => {
    getPublishedArticle.mockResolvedValue(article('code'));
    const { container } = render(<MemoryRouter initialEntries={['/blog/code']}><Routes><Route path="/blog/:articleSlug" element={<ArticlePage />} /></Routes></MemoryRouter>);

    await screen.findByRole('heading', { name: 'Code article' });
    const code = container.querySelector('.prose pre code');
    expect(code).toHaveTextContent('const veryLongIdentifier = "copy this literal without truncation";');
    expect(code).toHaveClass('language-ts');
    expect(code).toHaveAttribute('data-language', 'typescript');
    expect(code?.querySelector('span')).toHaveTextContent('const');
    expect(screen.getByText('literal').closest('code')).not.toHaveClass('language-ts');
    expect(screen.getByRole('img', { name: 'Diagram' })).toHaveAttribute('src', 'https://assets.test/articles/code/image.png?token=signed');
  });

  it('does not render a stale article after navigating to a newer slug', async () => {
    const user = userEvent.setup();
    let resolveFirst!: (value: Article) => void;
    const first = new Promise<Article>((resolve) => { resolveFirst = resolve; });
    getPublishedArticle.mockImplementation((slug: string) => slug === 'first' ? first : Promise.resolve(article('second', 'Second article')));

    render(<MemoryRouter initialEntries={['/blog/first']}><NavigateToSecondArticle /><Routes><Route path="/blog/:articleSlug" element={<ArticlePage />} /></Routes></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Load second article' }));
    expect(await screen.findByRole('heading', { name: 'Second article' })).toBeInTheDocument();

    resolveFirst(article('first', 'First article'));
    await Promise.resolve();
    expect(screen.queryByRole('heading', { name: 'First article' })).not.toBeInTheDocument();
  });

  it('explains how to make an unpublished or unseeded article available', async () => {
    getPublishedArticle.mockResolvedValue(null);
    render(<MemoryRouter initialEntries={['/blog/missing']}><Routes><Route path="/blog/:articleSlug" element={<ArticlePage />} /></Routes></MemoryRouter>);

    expect(await screen.findByRole('alert')).toHaveTextContent('This article is not published yet. Publish or seed it in Supabase, then try again.');
  });
});
