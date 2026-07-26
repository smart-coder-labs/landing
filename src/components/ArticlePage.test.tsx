import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import ArticlePage from './ArticlePage';

function NavigateToSecondArticle() {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate('/blog/second')}>Load second article</button>;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((promiseResolve) => {
    resolve = promiseResolve;
  });
  return { promise, resolve };
}

describe('ArticlePage', () => {
  it('does not render a stale article after navigating to a newer slug', async () => {
    const user = userEvent.setup();
    const firstMetadata = deferred<Response>();
    const firstContent = deferred<Response>();
    vi.stubGlobal('fetch', vi.fn()
      .mockReturnValueOnce(firstMetadata.promise)
      .mockReturnValueOnce(firstContent.promise)
      .mockResolvedValueOnce(new Response(JSON.stringify({ title: 'Second article', description: '', tags: [], image: '', readTime: '1 min', publicationDate: '2026-01-01', slug: 'second' })))
      .mockResolvedValueOnce(new Response('Second article content')));

    render(
      <MemoryRouter initialEntries={['/blog/first']}>
        <NavigateToSecondArticle />
        <Routes><Route path="/blog/:articleSlug" element={<ArticlePage />} /></Routes>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Load second article' }));
    expect(await screen.findByRole('heading', { name: 'Second article' })).toBeInTheDocument();

    firstMetadata.resolve(new Response(JSON.stringify({ title: 'First article', description: '', tags: [], image: '', readTime: '1 min', publicationDate: '2026-01-01', slug: 'first' })));
    firstContent.resolve(new Response('First article content'));

    await Promise.resolve();
    expect(screen.getByRole('heading', { name: 'Second article' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'First article' })).not.toBeInTheDocument();
  });
});
