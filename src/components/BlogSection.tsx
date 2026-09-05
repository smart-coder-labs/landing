import { ArrowRight, Clock, RotateCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { localeHref, useLanguage } from '../i18n';
import { getPublishedArticles, type ArticleSummary } from '../lib';
import Reveal from './Reveal';

/** The articles API has no timeout of its own, so an unhealthy backend held the
 *  loading state open indefinitely. Bound it and show a real failure instead. */
const requestTimeoutMs = 10_000;

function BlogSection() {
  const { locale, t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<ArticleSummary[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

    getPublishedArticles(controller.signal).then((articles) => {
      if (!isCurrent) return;
      setBlogPosts(articles);
      setStatus('ready');
    }).catch(() => {
      if (isCurrent) setStatus('failed');
    }).finally(() => {
      window.clearTimeout(timeoutId);
    });

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [attempt]);

  return (
    <section id="blog" className="section" aria-labelledby="insights-title">
      <div className="container">
        <Reveal className="section-heading"><h2 id="insights-title">{t.blog.title}</h2><p>{t.blog.intro}</p></Reveal>
        {status === 'loading' && <div className="glass-panel status-card" role="status"><p>{t.blog.loading}</p></div>}
        {status === 'failed' && <div className="glass-panel status-card" role="alert">
          <p>{t.blog.error}</p>
          <button className="button button-secondary" type="button" onClick={retry}><RotateCw size={15} aria-hidden="true" /> {t.blog.retry}</button>
        </div>}
        {status === 'ready' && !blogPosts.length && <div className="glass-panel status-card"><p>{t.blog.empty}</p></div>}
        {!!blogPosts.length && <div className="article-grid">{blogPosts.map((post, index) => <Reveal as="article" className="glass-panel article-card" key={post.slug} index={index}>
          <img src={post.cover_asset?.signed_url || '/articles/placeholder.svg'} alt={post.cover_asset?.alt_text || ''} loading="lazy" width={620} height={400} />
          <div className="article-card-body"><div className="article-meta"><Clock size={13} aria-hidden="true" /> {post.read_time_minutes} min</div><h3>{post.title}</h3><p>{post.description}</p><Link className="text-link" to={localeHref(locale, `/blog/${post.slug}`)}>{t.blog.read} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </Reveal>)}</div>}
      </div>
    </section>
  );
}

export default BlogSection;
