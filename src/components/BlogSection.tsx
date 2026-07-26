import { ArrowRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';
import { getPublishedArticles, type ArticleSummary } from '../lib';

function BlogSection() {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    getPublishedArticles().then((articles) => {
      if (isCurrent) setBlogPosts(articles);
    }).catch(() => {
      if (isCurrent) setFailed(true);
    }).finally(() => {
      if (isCurrent) setLoading(false);
    });
    return () => { isCurrent = false; };
  }, []);

  return (
    <section id="blog" className="section" aria-labelledby="insights-title">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">{t.blog.eyebrow}</p><h2 id="insights-title">{t.blog.title}</h2><p>{t.blog.intro}</p></div>
        {loading && <div className="glass-panel status-card" role="status">{t.blog.loading}</div>}
        {!loading && !blogPosts.length && <div className="glass-panel status-card" role={failed ? 'alert' : undefined}>{t.blog.empty}</div>}
        {!!blogPosts.length && <div className="article-grid">{blogPosts.map((post) => <article className="glass-panel article-card" key={post.slug}>
          <img src={post.cover_asset?.signed_url || '/articles/placeholder.png'} alt={post.cover_asset?.alt_text || ''} loading="lazy" />
          <div className="article-card-body"><div className="article-meta"><Clock size={13} aria-hidden="true" /> {post.read_time_minutes} min</div><h3>{post.title}</h3><p>{post.description}</p><Link className="text-link" to={`/blog/${post.slug}`}>{t.blog.read} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </article>)}</div>}
      </div>
    </section>
  );
}

export default BlogSection;
