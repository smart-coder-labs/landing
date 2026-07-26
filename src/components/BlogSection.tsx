import { ArrowRight, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n';

interface BlogPostMetadata { title: string; description: string; tags: string[]; image: string; readTime: string; publicationDate: string; slug: string; }
const articleSlugs = ['hexagonal-architecture', 'transformers-nlp', 'clean-code', 'microservices-vs-monoliths'];

function BlogSection() {
  const { t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(articleSlugs.map(async (slug) => {
      const response = await fetch(`/articles/${slug}/metadata.json`);
      if (!response.ok) throw new Error(`Unable to load ${slug}`);
      return response.json() as Promise<BlogPostMetadata>;
    })).then(setBlogPosts).catch(() => setBlogPosts([])).finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="section" aria-labelledby="insights-title">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">{t.blog.eyebrow}</p><h2 id="insights-title">{t.blog.title}</h2><p>{t.blog.intro}</p></div>
        {loading && <div className="glass-panel status-card" role="status">{t.blog.loading}</div>}
        {!loading && !blogPosts.length && <div className="glass-panel status-card">{t.blog.empty}</div>}
        {!!blogPosts.length && <div className="article-grid">{blogPosts.map((post) => <article className="glass-panel article-card" key={post.slug}>
          <img src={post.image || '/articles/placeholder.png'} alt="" loading="lazy" />
          <div className="article-card-body"><div className="article-meta"><Clock size={13} aria-hidden="true" /> {post.readTime}</div><h3>{post.title}</h3><p>{post.description}</p><Link className="text-link" to={`/blog/${post.slug}`}>{t.blog.read} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        </article>)}</div>}
      </div>
    </section>
  );
}

export default BlogSection;
