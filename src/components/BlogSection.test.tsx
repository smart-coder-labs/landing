import { render, screen } from '@testing-library/react';
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

  it('shows the empty state when the published query fails', async () => {
    getPublishedArticles.mockRejectedValue(new Error('database unavailable'));
    render(<MemoryRouter><BlogSection /></MemoryRouter>);
    expect(await screen.findByRole('alert')).toHaveTextContent('No insights are available right now.');
  });
});
