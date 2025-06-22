import React, { useState } from 'react';
import { Code, Database, Blocks, Braces, Server, Cpu } from 'lucide-react';

interface TechItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  category: string;
}

const techStack: TechItem[] = [
  {
    icon: <Code size={24} />,
    name: 'React',
    description: 'Biblioteca JavaScript para construir interfaces de usuario modernas y reactivas',
    category: 'Frontend'
  },
  {
    icon: <Database size={24} />,
    name: 'Supabase',
    description: 'Backend as a Service con PostgreSQL, autenticación y tiempo real',
    category: 'Backend'
  },
  {
    icon: <Blocks size={24} />,
    name: 'Next.js',
    description: 'Framework React para aplicaciones web productivas y escalables',
    category: 'Framework'
  },
  {
    icon: <Braces size={24} />,
    name: 'TypeScript',
    description: 'JavaScript con tipos estáticos para código más seguro y mantenible',
    category: 'Language'
  },
  {
    icon: <Server size={24} />,
    name: 'Python',
    description: 'Lenguaje versátil para backend, ciencia de datos e IA',
    category: 'Language'
  },
  {
    icon: <Cpu size={24} />,
    name: 'TensorFlow',
    description: 'Biblioteca de código abierto para machine learning e IA',
    category: 'AI/ML'
  }
];

const TechStackSection: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-radial from-teal-500/10 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Stack Tecnológico <span className="text-teal-600 dark:text-teal-500">Confiable y Moderno</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            Utilizamos las mejores herramientas y tecnologías para crear soluciones robustas y escalables
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="relative group"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="h-full bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-teal-600 dark:text-teal-500 mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {tech.name}
                </h3>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {tech.category}
                </span>
              </div>
              
              {/* Tooltip */}
              {hoveredTech === tech.name && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-10">
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {tech.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lead Generation Offer */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  ¿Necesitas una auditoría técnica?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Obtén un diagnóstico gratuito de tu arquitectura actual y descubre oportunidades de mejora para tu proyecto.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Análisis de arquitectura y patrones de diseño
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Revisión de seguridad y rendimiento
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    Recomendaciones de mejores prácticas
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/3">
                <a 
                  href="#contact"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white text-center rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Solicitar Diagnóstico Gratuito
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;