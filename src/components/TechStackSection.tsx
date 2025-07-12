import React, { useState, useRef, useEffect } from 'react';
import { Code, Database, Blocks, Braces, Server, Cpu, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

interface TechItem {
  icon: React.ReactNode;
  name: string;
  description: string;
  category: string;
}

const techStack: TechItem[] = [
  // Frontend
  {
    icon: <Code size={24} />,
    name: 'React',
    description: 'Biblioteca JavaScript para construir interfaces de usuario modernas y reactivas',
    category: 'Frontend'
  },
  {
    icon: <Blocks size={24} />,
    name: 'Next.js',
    description: 'Framework React para aplicaciones web productivas y escalables',
    category: 'Frontend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Tailwind CSS',
    description: 'Framework de utilidades CSS para diseños personalizados rápidos',
    category: 'Frontend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Remix',
    description: 'Framework web full stack con enrutamiento y carga de datos integrados',
    category: 'Frontend'
  },

  // Backend
  {
    icon: <Server size={24} />,
    name: 'Node.js',
    description: 'Entorno de ejecución de JavaScript del lado del servidor',
    category: 'Backend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'NestJS',
    description: 'Framework progresivo de Node.js para aplicaciones del lado del servidor',
    category: 'Backend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Express.js',
    description: 'Framework web rápido y minimalista para Node.js',
    category: 'Backend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'GraphQL',
    description: 'Lenguaje de consulta y manipulación de datos para APIs',
    category: 'Backend'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Apollo',
    description: 'Plataforma para construir una capa de datos unificada',
    category: 'Backend'
  },

  // Databases
  {
    icon: <Database size={24} />,
    name: 'MongoDB',
    description: 'Base de datos NoSQL orientada a documentos',
    category: 'Base de Datos'
  },
  {
    icon: <Cpu size={24} />,
    name: 'MySQL',
    description: 'Sistema de gestión de bases de datos relacional',
    category: 'Base de Datos'
  },
  {
    icon: <Cpu size={24} />,
    name: 'DynamoDB',
    description: 'Base de datos NoSQL de AWS de alto rendimiento',
    category: 'Base de Datos'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Redis',
    description: 'Almacén de estructura de datos en memoria',
    category: 'Base de Datos'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Cassandra',
    description: 'Base de datos NoSQL distribuida',
    category: 'Base de Datos'
  },

  // DevOps
  {
    icon: <Cpu size={24} />,
    name: 'Docker',
    description: 'Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores',
    category: 'DevOps'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Terraform',
    description: 'Herramienta de infraestructura como código',
    category: 'DevOps'
  },
  {
    icon: <Cpu size={24} />,
    name: 'AWS',
    description: 'Servicios en la nube de Amazon',
    category: 'DevOps'
  },
  {
    icon: <Cpu size={24} />,
    name: 'GitHub CI/CD',
    description: 'Integración y despliegue continuo con GitHub',
    category: 'DevOps'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Serverless',
    description: 'Arquitectura de aplicaciones sin servidor',
    category: 'DevOps'
  },

  // Testing
  {
    icon: <Cpu size={24} />,
    name: 'Jest',
    description: 'Marco de pruebas de JavaScript',
    category: 'Testing'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Cypress',
    description: 'Herramienta de pruebas frontend',
    category: 'Testing'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Mocha',
    description: 'Marco de pruebas de JavaScript',
    category: 'Testing'
  },

  // Herramientas
  {
    icon: <GitBranch size={24} />,
    name: 'Git',
    description: 'Sistema de control de versiones distribuido',
    category: 'Herramientas'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Swagger',
    description: 'Herramienta para documentación de APIs',
    category: 'Herramientas'
  },
  {
    icon: <Braces size={24} />,
    name: 'TypeScript',
    description: 'JavaScript con tipos estáticos para código más seguro y mantenible',
    category: 'Lenguaje'
  },
  {
    icon: <Cpu size={24} />,
    name: 'Python',
    description: 'Lenguaje versátil para backend, ciencia de datos e IA',
    category: 'Lenguaje'
  }
];

const TechStackSection: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total pages based on number of items and items per page
  const totalPages = Math.ceil(techStack.length / itemsPerPage);

  // Calculate if arrows should be visible
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < totalPages - 1;

  // Handle window resize to adjust items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(6);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(5);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(2);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (isAnimating) return;

    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);

    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const animateSlide = (direction: 'next' | 'prev') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (direction === 'next' && currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => animateSlide('next');

  const handleWheel = (e: React.WheelEvent) => {
    if (e.currentTarget === e.target) {
      e.preventDefault();
    }
  };

  // Calculate the current items to display
  const currentItems = techStack.slice(
    currentIndex * itemsPerPage,
    (currentIndex * itemsPerPage) + itemsPerPage
  );

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]);

  return (
    <section className="py-20 bg-futuristic-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] gradient-primary rounded-full opacity-20"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] gradient-secondary rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Stack Tecnológico <span className="text-gradient">Confiable y Moderno</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-300">
            Utilizamos las mejores herramientas y tecnologías para crear soluciones robustas y escalables
          </p>
        </div>

        <div
          className="relative mb-16"
          onWheel={handleWheel}
        >
          {/* Left Arrow - Only show if not on first page */}
          {showLeftArrow && (
            <button
              onClick={() => handleArrowClick('prev')}
              onMouseEnter={() => setIsLeftHovered(true)}
              onMouseLeave={() => setIsLeftHovered(false)}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 glass-card p-3 rounded-full transition-all duration-300 
                ${isLeftHovered ? 'scale-110 animate-glow-pulse' : 'scale-100'}
                ${isClicking ? 'scale-95' : ''}
                text-blue-400
                transform hover:scale-110 active:scale-95 focus-futuristic`}
              aria-label="Anterior"
            >
              <ChevronLeft
                className={`w-6 h-6 transition-transform duration-300 ${isLeftHovered ? 'translate-x-[-2px]' : ''
                  }`}
              />
            </button>
          )}

          <div
            ref={containerRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 touch-none"
            style={{
              // Prevent iOS momentum scrolling
              WebkitOverflowScrolling: 'touch',
              // Prevent text selection during drag
              userSelect: 'none',
              // Prevent blue highlight on tap (mobile)
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {currentItems.map((tech) => (
              <div
                key={tech.name}
                className="relative group"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="h-full glass-card rounded-xl p-6 flex flex-col items-center justify-center hover:animate-glow-pulse transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-blue-400 mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 text-center">
                    {tech.name}
                  </h3>
                  <span className="text-xs text-slate-300 text-center">
                    {tech.category}
                  </span>
                </div>

                {/* Tooltip */}
                {hoveredTech === tech.name && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-3 glass-card rounded-lg z-10 transition-opacity duration-300">
                    <p className="text-xs text-slate-300">
                      {tech.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Arrow - Only show if not on last page */}
          {showRightArrow && (
            <button
              onClick={() => handleArrowClick('next')}
              onMouseEnter={() => setIsRightHovered(true)}
              onMouseLeave={() => setIsRightHovered(false)}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 glass-card p-3 rounded-full transition-all duration-300 
                ${isRightHovered ? 'scale-110 animate-glow-pulse' : 'scale-100'}
                ${isClicking ? 'scale-95' : ''}
                text-blue-400
                transform hover:scale-110 active:scale-95 focus-futuristic`}
              aria-label="Siguiente"
            >
              <ChevronRight
                className={`w-6 h-6 transition-transform duration-300 ${isRightHovered ? 'translate-x-[2px]' : ''
                  }`}
              />
            </button>
          )}
        </div>

        {/* Dots indicator with animation */}
        <div className="flex justify-center mt-8 space-x-2 mb-16">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => !isAnimating && setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'bg-blue-400 w-8 scale-110 animate-glow-pulse'
                : 'bg-slate-600 hover:bg-slate-500 scale-90 hover:scale-100'
                }`}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>

        {/* Lead Generation Offer */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 transform transition-all duration-300 hover:scale-[1.01] hover:animate-glow-pulse">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  ¿Necesitas una auditoría técnica?
                </h3>
                <p className="text-slate-300 mb-6">
                  Obtén un diagnóstico gratuito de tu arquitectura actual y descubre oportunidades de mejora para tu proyecto.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                    Análisis de arquitectura y patrones de diseño
                  </li>
                  <li className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse delay-100"></div>
                    Revisión de seguridad y rendimiento
                  </li>
                  <li className="flex items-center text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse delay-200"></div>
                    Recomendaciones de mejores prácticas
                  </li>
                </ul>
              </div>

              <div className="md:w-1/3 w-full">
                <a
                  href="#contact"
                  className="btn-futuristic text-white text-center block w-full"
                >
                  Solicitar Diagnóstico Gratuito
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;