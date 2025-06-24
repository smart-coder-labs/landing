import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Choose a style

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
    <article className="container mx-auto px-4 py-12 max-w-4xl dark:text-slate-200">
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

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto
                      prose-headings:text-slate-800 dark:prose-headings:text-slate-100
                      prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-700 dark:hover:prose-a:text-teal-500
                      prose-strong:text-slate-800 dark:prose-strong:text-slate-100
                      prose-blockquote:border-l-teal-500 dark:prose-blockquote:border-l-teal-400
                      prose-code:bg-slate-200 dark:prose-code:bg-slate-700 prose-code:p-1 prose-code:rounded prose-code:text-sm
                      prose-img:rounded-lg prose-img:shadow-md">
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={materialDark} // Choose your style for dark mode
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>
    </article>
  );
};

export default ArticlePage;
