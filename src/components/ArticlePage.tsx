import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../i18n';

interface BlogPostMetadata { title: string; description: string; tags: string[]; image: string; readTime: string; publicationDate: string; slug: string; }

function ArticlePage() {
  const { locale, t } = useLanguage();
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleSlug) return;
    let isCurrent = true;

    async function loadArticle() {
      try {
        const [metadataResponse, contentResponse] = await Promise.all([fetch(`/articles/${articleSlug}/metadata.json`), fetch(`/articles/${articleSlug}.md`)]);
        if (!metadataResponse.ok || !contentResponse.ok) throw new Error(t.article.unavailable);
        const [nextMetadata, nextContent] = await Promise.all([
          metadataResponse.json() as Promise<BlogPostMetadata>,
          contentResponse.text(),
        ]);
        if (!isCurrent) return;
        setMetadata(nextMetadata);
        setContent(nextContent.replace(/^---[\s\S]*?---/, '').trim());
      } catch (reason: unknown) {
        if (isCurrent) setError(reason instanceof Error ? reason.message : t.article.unavailable);
      }
    }

    setMetadata(null);
    setContent('');
    setError(null);
    void loadArticle();

    return () => {
      isCurrent = false;
    };
  }, [articleSlug, t.article.unavailable]);

  if (!articleSlug || error) return <div className="article-page"><div className="glass-panel status-card" role="alert">{error || t.article.missing}</div></div>;
  if (!metadata) return <div className="article-page"><div className="glass-panel status-card" role="status">{t.article.loading}</div></div>;

  return (
    <article className="article-page">
      <header>
        <p className="eyebrow">{t.article.eyebrow}</p><h1>{metadata.title}</h1>
        <p className="article-meta">{new Date(metadata.publicationDate).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · {metadata.readTime} {t.article.read}</p>
        {metadata.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
        {metadata.image && <img src={metadata.image} alt="" />}
      </header>
      <div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={{ img: ({ alt, ...props }) => <img alt={alt || ''} loading="lazy" {...props} />, a: ({ href, ...props }) => <a href={href} target="_blank" rel="noopener noreferrer" {...props} /> }}>{content}</ReactMarkdown></div>
      <p className="article-back"><Link className="text-link" to="/#blog">{t.article.back}</Link></p>
    </article>
  );
}

export default ArticlePage;
