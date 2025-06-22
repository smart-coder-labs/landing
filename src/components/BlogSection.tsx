import React from 'react';
import { Clock, Eye, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Arquitectura Hexagonal: Diseñando sistemas mantenibles',
    excerpt: 'Aprende cómo la arquitectura hexagonal puede mejorar la mantenibilidad y testabilidad de tus aplicaciones.',
    category: 'Arquitectura',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readTime: '8 min',
    date: '12 Jun 2025'
  },
  {
    id: 2,
    title: 'Introducción práctica a los Transformers en NLP',
    excerpt: 'Una guía paso a paso para comprender y aplicar modelos de transformers en procesamiento de lenguaje natural.',
    category: 'IA',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readTime: '12 min',
    date: '5 Jun 2025'
  },
  {
    id: 3,
    title: 'Clean Code: Principios fundamentales',
    excerpt: 'Explora los principios esenciales para escribir código limpio, mantenible y eficiente.',
    category: 'Buenas Prácticas',
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readTime: '6 min',
    date: '28 May 2025'
  },
  {
    id: 4,
    title: 'Microservicios vs Monolitos: Guía para elegir sabiamente',
    excerpt: 'Un análisis detallado sobre cuándo y por qué elegir arquitecturas de microservicios o monolíticas.',
    category: 'Arquitectura',
    image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readTime: '10 min',
    date: '20 May 2025'
  }
];

const BlogSection: React.FC = () => {
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
              key={post.id} 
              className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-teal-600 dark:bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center mr-4">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  {post.excerpt}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-teal-600 dark:text-teal-500 hover:text-teal-700 dark:hover:text-teal-400 font-medium text-sm"
                >
                  Leer más
                  <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow hover:shadow-md text-slate-700 dark:text-slate-300 font-medium transition-all duration-300"
          >
            Ver todos los artículos
            <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;