import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../i18n';
import { getPublishedArticle, type Article } from '../lib';


const prismTheme = {
  'code[class*="language-"], pre[class*="language-"]': { color: 'var(--code-text)', background: 'transparent', fontFamily: 'inherit', textShadow: 'none' },
  comment: { color: 'var(--code-comment)' },
  prolog: { color: 'var(--code-comment)' },
  doctype: { color: 'var(--code-comment)' },
  cdata: { color: 'var(--code-comment)' },
  punctuation: { color: 'var(--code-punctuation)' },
  property: { color: 'var(--code-property)' },
  tag: { color: 'var(--code-property)' },
  boolean: { color: 'var(--code-value)' },
  number: { color: 'var(--code-value)' },
  constant: { color: 'var(--code-value)' },
  symbol: { color: 'var(--code-value)' },
  deleted: { color: 'var(--code-value)' },
  selector: { color: 'var(--code-string)' },
  'attr-name': { color: 'var(--code-string)' },
  string: { color: 'var(--code-string)' },
  char: { color: 'var(--code-string)' },
  builtin: { color: 'var(--code-string)' },
  inserted: { color: 'var(--code-string)' },
  operator: { color: 'var(--code-operator)' },
  entity: { color: 'var(--code-operator)' },
  url: { color: 'var(--code-operator)' },
  variable: { color: 'var(--code-operator)' },
  atrule: { color: 'var(--code-keyword)' },
  'attr-value': { color: 'var(--code-keyword)' },
  keyword: { color: 'var(--code-keyword)' },
  function: { color: 'var(--code-function)' },
  'class-name': { color: 'var(--code-function)' },
  regex: { color: 'var(--code-string)' },
  important: { color: 'var(--code-keyword)', fontWeight: '700' },
};

const languageAliases: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  sh: 'bash',
  shell: 'bash',
  yml: 'yaml',
};

function Code({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) {
  const declaredLanguage = /language-([\w-]+)/.exec(className || '')?.[1];

  if (!declaredLanguage) return <code className={className} {...props}>{children}</code>;

  const language = languageAliases[declaredLanguage] || declaredLanguage;
  return (
    <SyntaxHighlighter
      language={language}
      style={prismTheme}
      PreTag="div"
      wrapLongLines
      customStyle={{ margin: 0, padding: 0, background: 'transparent', overflow: 'visible', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
      codeTagProps={{ className, 'data-language': language }}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
}

function StorageImage({ src, alt, assetUrls, ...props }: React.ComponentPropsWithoutRef<'img'> & { assetUrls: Record<string, string> }) {
  const objectPath = src?.startsWith('storage://blog-assets/') ? src.slice('storage://blog-assets/'.length) : null;
  const resolvedSrc = objectPath ? assetUrls[objectPath] : src;
  if (!resolvedSrc) return null;
  return <img alt={alt || ''} loading="lazy" src={resolvedSrc} {...props} />;
}

function ArticlePage() {
  const { locale, t } = useLanguage();
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleSlug) return;
    let isCurrent = true;

    async function loadArticle() {
      try {
        const nextArticle = await getPublishedArticle(articleSlug);
        if (!isCurrent) return;
        if (!nextArticle) throw new Error(t.article.notFound);
        setArticle(nextArticle);
      } catch (reason: unknown) {
        if (isCurrent) setError(reason instanceof Error ? reason.message : t.article.unavailable);
      }
    }

    setArticle(null);
    setError(null);
    void loadArticle();

    return () => {
      isCurrent = false;
    };
  }, [articleSlug, t.article.notFound, t.article.unavailable]);

  if (!articleSlug || error) return <div className="article-page"><div className="glass-panel status-card" role="alert">{error || t.article.missing}</div></div>;
  if (!article) return <div className="article-page"><div className="glass-panel status-card" role="status">{t.article.loading}</div></div>;

  return (
    <article className="article-page">
      <header>
        <p className="eyebrow">{t.article.eyebrow}</p><h1>{article.title}</h1>
        <p className="article-meta">{new Date(article.published_at).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {article.read_time_minutes} min {t.article.read}</p>
        {article.tags.map((tag) => <span className="tag" key={tag.slug}>{tag.name}</span>)}
        {article.cover_asset && <StorageImage src={`storage://blog-assets/${article.cover_asset.object_path}`} alt={article.cover_asset.alt_text} assetUrls={Object.fromEntries(article.assets.map((asset) => [asset.object_path, asset.signed_url]))} />}
      </header>
      <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]} urlTransform={(url) => url.startsWith('storage://blog-assets/') ? url : defaultUrlTransform(url)} components={{ img: (props) => <StorageImage {...props} assetUrls={Object.fromEntries(article.assets.map((asset) => [asset.object_path, asset.signed_url]))} />, a: ({ href, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props} />, code: Code }}>{article.content_markdown}</ReactMarkdown></div>
      <p className="article-back"><Link className="text-link" to="/#blog">{t.article.back}</Link></p>
    </article>
  );
}

export default ArticlePage;
