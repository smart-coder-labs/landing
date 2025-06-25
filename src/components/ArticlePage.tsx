import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from 'react-router-dom';
// Animaciones podrían agregarse más adelante si son necesarias

interface BlogPostMetadata {
  title: string;
  description: string;
  tags: string[];
  image: string;
  readTime: string;
  publicationDate: string;
  slug: string;
}

const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [metadata, setMetadata] = useState<BlogPostMetadata | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (!articleSlug) {
        setError("No se especificó el artículo.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch metadata
        const metaRes = await fetch(`/articles/${articleSlug}/metadata.json`);
        if (!metaRes.ok) {
          throw new Error(`Error al cargar metadatos del artículo (${metaRes.status})`);
        }
        const metaData = await metaRes.json();
        setMetadata(metaData);

        // Fetch markdown content
        // The title in metadata.json is used to get the .md, this is not ideal.
        // It should use the slug or a direct path.
        // For now, we assume the .md file has the same name as the slug.
        const mdRes = await fetch(`/articles/${articleSlug}.md`);
        if (!mdRes.ok) {
          throw new Error(`Error al cargar contenido del artículo (${mdRes.status})`);
        }
        const mdContent = await mdRes.text();

        // Remove frontmatter from markdown content if present
        const frontmatterPattern = /^---[\s\S]*?---/;
        const cleanedContent = mdContent.replace(frontmatterPattern, '').trim();
        setContent(cleanedContent);

      } catch (err) {
        console.error("Error fetching article data:", err);
        setError(err instanceof Error ? err.message : "Ocurrió un error desconocido.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [articleSlug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Cargando artículo...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!metadata) {
    return <div className="container mx-auto px-4 py-8 text-center">Artículo no encontrado.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl dark:text-slate-200 mt-8">
      <header className="mb-8 border-b dark:border-slate-700 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{metadata.title}</h1>
        <div className="text-slate-500 dark:text-slate-400 text-sm mb-2">
          <span>Publicado el {new Date(metadata.publicationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="mx-2">|</span>
          <span>{metadata.readTime} de lectura</span>
        </div>
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="mt-2">
            {metadata.tags.map(tag => (
              <span key={tag} className="inline-block bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
         {metadata.image && (
          <img
            src={metadata.image}
            alt={metadata.title}
            className="w-full h-auto object-cover rounded-lg shadow-lg my-8 max-h-[500px]"
          />
        )}
      </header>

      <div className="max-w-4xl mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Encabezados
            h1: ({node, ...props}) => (
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-700" {...props} />
            ),
            h2: ({node, ...props}) => (
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 pt-4" {...props} />
            ),
            h3: ({node, ...props}) => (
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mt-8 mb-3" {...props} />
            ),
            h4: ({node, ...props}) => (
              <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-2" {...props} />
            ),
            // Párrafos
            p: ({node, ...props}) => (
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed my-6" {...props} />
            ),
            // Enlaces
            a: ({node, ...props}) => (
              <a 
                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors underline underline-offset-4" 
                target="_blank" 
                rel="noopener noreferrer"
                {...props}
              />
            ),
            // Listas
            ul: ({node, ...props}) => (
              <ul className="list-disc pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
            ),
            ol: ({node, ...props}) => (
              <ol className="list-decimal pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300" {...props} />
            ),
            li: ({node, ...props}) => (
              <li className="pl-2" {...props} />
            ),
            // Citas
            blockquote: ({node, ...props}) => (
              <blockquote 
                className="border-l-4 border-teal-500 dark:border-teal-400 pl-4 py-2 my-6 bg-slate-50 dark:bg-slate-800 rounded-r-lg italic"
                {...props} 
              />
            ),
            // Código en línea
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '');
              
              if (inline) {
                return (
                  <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200" {...props}>
                    {children}
                  </code>
                );
              }
              
              if (match) {
                return (
                  <div className="my-6 rounded-lg overflow-hidden shadow-lg">
                    <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm font-mono flex justify-between items-center">
                      <span>{match[1]}</span>
                      <button 
                        className="text-slate-400 hover:text-white"
                        onClick={() => {
                          navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                        }}
                      >
                        Copiar
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={materialDark as any}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ 
                        margin: 0, 
                        borderRadius: 0,
                        borderBottomLeftRadius: '0.5rem',
                        borderBottomRightRadius: '0.5rem'
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                );
              }
              
              return (
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg my-6 overflow-x-auto">
                  <code className="text-sm" {...props}>
                    {children}
                  </code>
                </pre>
              );
            },
            // Imágenes
            img: ({node, ...props}) => (
              <div className="my-8 flex justify-center">
                <img 
                  className="rounded-lg shadow-xl max-w-full h-auto max-h-[500px] object-contain" 
                  alt={props.alt || ''} 
                  {...props} 
                />
              </div>
            ),
            // Tablas
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-slate-50 dark:bg-slate-800" {...props} />
            ),
            tbody: ({node, ...props}) => (
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700" {...props} />
            ),
            tr: ({node, ...props}) => (
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
            to="/#blog" 
            className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
