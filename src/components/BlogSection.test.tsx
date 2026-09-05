import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BlogSection from './BlogSection';

const { getPublishedArticles } = vi.hoisted(() => ({
  getPublishedArticles: vi.fn(),
}));
vi.mock('../lib', () => ({ getPublishedArticles }));

describe('BlogSection', () => {
  beforeEach(() => { getPublishedArticles.mockReset(); });

  it('shows only published query results and resolves the cover image', async () => {
    getPublishedArticles.mockResolvedValue([{ slug: 'published', title: 'Published article', description: 'Visible content', read_time_minutes: 4, published_at: '2026-01-01', cover_asset: { id: 'cover', object_path: 'articles/published/cover.png', alt_text: 'Cover', is_cover: true, signed_url: 'https://assets.test/articles/published/cover.png?token=signed' } }]);
    render(<MemoryRouter><BlogSection /></MemoryRouter>);
    expect(await screen.findByRole('heading', { name: 'Published article' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Cover' })).toHaveAttribute('src', 'https://assets.test/articles/published/cover.png?token=signed');
    expect(getPublishedArticles).toHaveBeenCalledOnce();
  });

  it('bounds the request so an unresponsive backend cannot hold the loading state open', () => {
    getPublishedArticles.mockReturnValue(new Promise(() => undefined));
    render(<MemoryRouter><BlogSection /></MemoryRouter>);

    expect(screen.getByRole('status')).toHaveTextContent('Loading insights...');
    expect(getPublishedArticles.mock.calls[0][0]).toBeInstanceOf(AbortSignal);
  });

  it('reports a failed query as an error the visitor can retry, not as an empty section', async () => {
    const user = userEvent.setup();
    getPublishedArticles
      .mockRejectedValueOnce(new Error('database unavailable'))
      .mockResolvedValueOnce([{ slug: 'recovered', title: 'Recovered article', description: 'Loaded on retry', read_time_minutes: 3, published_at: '2026-01-02', cover_asset: null }]);
    render(<MemoryRouter><BlogSection /></MemoryRouter>);

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not load insights right now.');

    await user.click(screen.getByRole('button', { name: /try again/i }));

    expect(await screen.findByRole('heading', { name: 'Recovered article' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(getPublishedArticles).toHaveBeenCalledTimes(2);
  });

  it('distinguishes a genuinely empty backlog from a failure', async () => {
    getPublishedArticles.mockResolvedValue([]);
    render(<MemoryRouter><BlogSection /></MemoryRouter>);

    expect(await screen.findByText('No insights are published yet.')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('falls back to a resolvable placeholder when an article has no cover asset', async () => {
    getPublishedArticles.mockResolvedValue([{ slug: 'no-cover', title: 'Article without a cover', description: 'Still renders', read_time_minutes: 2, published_at: '2026-01-03', cover_asset: null }]);
    render(<MemoryRouter><BlogSection /></MemoryRouter>);

    expect(await screen.findByRole('heading', { name: 'Article without a cover' })).toBeInTheDocument();
    expect(document.querySelector('.article-card img')).toHaveAttribute('src', '/articles/placeholder.svg');
  });
});
