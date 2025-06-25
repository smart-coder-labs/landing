import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogPostMetadata {
  title: string;
  description: string; // Corresponds to excerpt
  tags: string[]; // First tag could be category
  image: string;
  readTime: string;
  publicationDate: string; // Corresponds to date
  slug: string;
}

const articleSlugs = [
  'hexagonal-architecture',
  'transformers-nlp',
  'clean-code',
  'microservices-vs-monoliths'
];

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const postsPromises = articleSlugs.map(slug =>
          fetch(`/articles/${slug}/metadata.json`).then(res => {
            console.log("🚀 ~ fetch ~ res:", res)
            if (!res.ok) {
              throw new Error(`Failed to fetch metadata for ${slug}: ${res.statusText}`);
            }
            return res.json();
          })
        );
        const posts = await Promise.all(postsPromises);
        console.log("🚀 ~ fetchBlogPosts ~ posts:", posts)
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts metadata:", error);
        // Handle error appropriately, e.g., set an error state
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-slate-100 dark:bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-700 dark:text-slate-300">Cargando artículos...</p>
        </div>
      </section>
    );
  }

  if (!blogPosts.length && !loading) {
    return (
      <section id="blog" className="py-20 bg-slate-100 dark:bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-700 dark:text-slate-300">No se encontraron artículos.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-slate-100 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Últimos <span className="text-teal-600 dark:text-teal-500">Artículos</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            Explorando conceptos avanzados en ingeniería de software, 
            inteligencia artificial y mejores prácticas de desarrollo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.slug}
              className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image || '/articles/placeholder.png'}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                {post.tags && post.tags.length > 0 && (
                  <span className="absolute top-4 left-4 bg-teal-600 dark:bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.tags[0]} {/* Use first tag as category */}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center mr-4">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </span>
                  <span>{new Date(post.publicationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-teal-600 dark:text-teal-500 hover:text-teal-700 dark:hover:text-teal-400 font-medium text-sm mt-auto"
                >
                  Leer más
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* El botón "Ver todos los artículos" podría llevar a una página de listado de blog si se implementa */}
        {/* <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow hover:shadow-md text-slate-700 dark:text-slate-300 font-medium transition-all duration-300"
          >
            Ver todos los artículos
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default BlogSection;