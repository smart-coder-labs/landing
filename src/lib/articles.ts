import { supabaseClient } from './supabase';

export type ArticleAsset = { id: string; object_path: string; alt_text: string; is_cover: boolean; signed_url?: string };
export type ArticleTag = { name: string; slug: string };
export type ArticleSnippet = { ordinal: number; language: string; code: string };
export type ArticleSummary = { slug: string; title: string; description: string; read_time_minutes: number; published_at: string; cover_asset: ArticleAsset | null };
export type Article = ArticleSummary & { content_markdown: string; tags: ArticleTag[]; assets: ArticleAsset[]; snippets: ArticleSnippet[] };

type ArticleRow = Omit<Article, 'tags' | 'assets' | 'snippets'> & {
  article_tags: { tags: ArticleTag | null }[];
  article_assets: ArticleAsset[];
  article_code_snippets: ArticleSnippet[];
};

const articleSelect = 'slug,title,description,read_time_minutes,published_at,content_markdown,cover_asset:article_assets!articles_cover_asset_id_fkey(id,object_path,alt_text,is_cover),article_tags(tags(name,slug)),article_assets!article_assets_article_id_fkey(id,object_path,alt_text,is_cover),article_code_snippets(ordinal,language,code)';
const signedUrlTtlSeconds = 900;

function toArticle(row: ArticleRow): Article {
  return {
    ...row,
    cover_asset: row.cover_asset,
    tags: row.article_tags.flatMap(({ tags }) => (tags ? [tags] : [])),
    assets: row.article_assets,
    snippets: row.article_code_snippets.sort((left, right) => left.ordinal - right.ordinal),
  };
}

async function getSignedAssetUrls(objectPaths: string[]): Promise<Record<string, string>> {
  const uniquePaths = [...new Set(objectPaths)];
  if (!uniquePaths.length) return {};

  const { data, error } = await supabaseClient.storage.from('blog-assets').createSignedUrls(uniquePaths, signedUrlTtlSeconds);
  if (error) throw new Error('Unable to load article assets.');

  return Object.fromEntries(data.flatMap(({ path, signedUrl }) => signedUrl ? [[path, signedUrl]] : []));
}

async function addSignedUrls<T extends { cover_asset: ArticleAsset | null }>(article: T, assets: ArticleAsset[] = []): Promise<T> {
  const urls = await getSignedAssetUrls([
    ...assets.map(({ object_path }) => object_path),
    ...(article.cover_asset ? [article.cover_asset.object_path] : []),
  ]);

  return {
    ...article,
    cover_asset: article.cover_asset && { ...article.cover_asset, signed_url: urls[article.cover_asset.object_path] },
    ...(assets.length ? { assets: assets.map((asset) => ({ ...asset, signed_url: urls[asset.object_path] })) } : {}),
  };
}

export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  const { data, error } = await supabaseClient.from('articles').select('slug,title,description,read_time_minutes,published_at,cover_asset:article_assets!articles_cover_asset_id_fkey(id,object_path,alt_text,is_cover)').eq('is_published', true).order('published_at', { ascending: false });
  if (error) throw new Error('Unable to load articles.');
  return Promise.all((data as ArticleSummary[]).map((article) => addSignedUrls(article)));
}

export async function getPublishedArticle(slug: string): Promise<Article | null> {
  const { data, error } = await supabaseClient.from('articles').select(articleSelect).eq('slug', slug).eq('is_published', true).maybeSingle();
  if (error) throw new Error('Unable to load article.');
  if (!data) return null;

  const article = toArticle(data as ArticleRow);
  return addSignedUrls(article, article.assets);
}
