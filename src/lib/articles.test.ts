import { describe, expect, it, vi } from 'vitest';

const { maybeSingle, select } = vi.hoisted(() => {
  const maybeSingle = vi.fn();
  const eq = vi.fn();
  const query = { eq, maybeSingle };
  eq.mockReturnValue(query);
  const select = vi.fn(() => query);
  return { maybeSingle, select };
});

vi.mock('./supabase', () => ({
  supabaseClient: { from: vi.fn(() => ({ select })) },
}));

import { getPublishedArticle } from './articles';

describe('getPublishedArticle', () => {
  it('selects article assets through their article foreign key', async () => {
    maybeSingle.mockResolvedValue({ data: null, error: null });

    await expect(getPublishedArticle('microservices-vs-monoliths')).resolves.toBeNull();

    expect(select).toHaveBeenCalledWith(expect.stringContaining('article_assets!article_assets_article_id_fkey'));
  });
});
