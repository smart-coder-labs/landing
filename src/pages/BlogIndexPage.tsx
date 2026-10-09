import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { localeHref, useLanguage } from '../i18n';
import { getPublishedArticles, useSeo } from '../lib';

/** Archive of every published article. The homepage only previews the latest. */
function BlogIndexPage() {
  const { locale, t } = useLanguage();
  const articles = getPublishedArticles();

  useSeo({
    title: t.blog.indexTitle,
    description: t.blog.indexIntro,
    // One canonical archive; /es/blog is a locale shell pointing here.
    path: '/blog',
    lang: locale,
  });

  return (
    <section className="section" aria-labelledby="blog-index-title">
      <div className="container">
        <Reveal className="section-heading">
          <h1 id="blog-index-title">{t.blog.title}</h1>
          <p>{t.blog.indexIntro}</p>
        </Reveal>
        <div className="article-grid">
          {articles.map((post, index) => (
            <Reveal as="article" className="glass-panel article-card" key={post.slug} index={index}>
              <img src={post.coverImage} alt="" width={620} height={400} loading="lazy" decoding="async" />
              <div className="article-card-body">
                <div className="article-meta"><Clock size={13} aria-hidden="true" /> {post.readTimeMinutes} min</div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <Link className="text-link" to={localeHref(locale, `/blog/${post.slug}`)}>{t.blog.read} <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogIndexPage;
