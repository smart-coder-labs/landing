import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { localeHref, useLanguage } from '../i18n';
import { getPublishedArticles } from '../lib';
import Reveal from './Reveal';

function BlogSection() {
  const { locale, t } = useLanguage();
  // Build-time content: there is nothing to wait for and nothing to fail.
  const blogPosts = getPublishedArticles();

  return (
    <section id="blog" className="section" aria-labelledby="insights-title">
      <div className="container">
        <Reveal className="section-heading"><h2 id="insights-title">{t.blog.title}</h2><p>{t.blog.intro}</p></Reveal>
        {!blogPosts.length && <div className="glass-panel status-card"><p>{t.blog.empty}</p></div>}
        {!!blogPosts.length && <div className="article-grid">{blogPosts.map((post, index) => <Reveal as="article" className="glass-panel article-card" key={post.slug} index={index}>
          <img src={post.coverImage} alt="" width={620} height={400} loading="lazy" decoding="async" />
          <div className="article-card-body"><div className="article-meta"><Clock size={13} aria-hidden="true" /> {post.readTimeMinutes} min</div><h3>{post.title}</h3><p>{post.description}</p><Link className="text-link" to={localeHref(locale, `/blog/${post.slug}`)}>{t.blog.read} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </Reveal>)}</div>}
      </div>
    </section>
  );
}

export default BlogSection;
