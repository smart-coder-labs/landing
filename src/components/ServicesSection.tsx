import React from 'react';
import { Code, FileCode, Server, Database, BrainCircuit, GitMerge, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    icon: <FileCode size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'Desarrollo Web Avanzado',
    description: 'Creación de aplicaciones web escalables y de alto rendimiento con las últimas tecnologías.',
    features: ['React/Next.js', 'TypeScript', 'Arquitectura moderna', 'SEO optimizado']
  },
  {
    id: 2,
    icon: <Server size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'Backend & API',
    description: 'Diseño y desarrollo de APIs REST/GraphQL y servicios backend robustos y seguros.',
    features: ['APIs RESTful', 'GraphQL', 'Microservicios', 'Serverless']
  },
  {
    id: 3,
    icon: <Database size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'Arquitectura de Datos',
    description: 'Estrategias de modelado de datos para sistemas complejos con alta concurrencia.',
    features: ['Diseño NoSQL', 'SQL avanzado', 'Optimización', 'Data Modeling']
  },
  {
    id: 4,
    icon: <BrainCircuit size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'Soluciones con IA',
    description: 'Integración de tecnologías de machine learning e inteligencia artificial en aplicaciones.',
    features: ['Machine Learning', 'NLP', 'Computer Vision', 'MLOps']
  },
  {
    id: 5,
    icon: <GitMerge size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'DevOps & CI/CD',
    description: 'Optimización de flujos de trabajo con integración y entrega continua.',
    features: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoreo']
  },
  {
    id: 6,
    icon: <Code size={40} className="text-teal-600 dark:text-teal-500" />,
    title: 'Consultoría Técnica',
    description: 'Asesoramiento en mejores prácticas, arquitectura y resolución de problemas técnicos.',
    features: ['Code Review', 'Arquitectura', 'Performance', 'Seguridad']
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-teal-500/10 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Mis <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500">Servicios</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            Ofrezco soluciones de alto valor para problemas complejos en el desarrollo 
            de software y la implementación de tecnologías avanzadas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700"
            >
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-teal-600 dark:text-teal-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="relative px-8 py-16 md:p-16 text-white">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="md:w-2/3">
                  <h3 className="text-3xl font-bold mb-4">
                    ¿Listo para llevar tu proyecto al siguiente nivel?
                  </h3>
                  <p className="text-white/90 text-lg mb-6 max-w-lg">
                    Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle2 size={20} className="mr-2 text-white" />
                      <span>Soluciones personalizadas para tu negocio</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={20} className="mr-2 text-white" />
                      <span>Código de alta calidad y mantenible</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 size={20} className="mr-2 text-white" />
                      <span>Enfoque en resultados y valor</span>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/3 flex flex-col gap-4">
                  <a 
                    href="#contact" 
                    className="px-8 py-4 bg-white text-teal-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    Agendar Consulta Gratuita
                  </a>
                  <a 
                    href="mailto:contacto@smartcoderlabs.com" 
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-center group"
                  >
                    Enviar Email
                    <ArrowRight size={16} className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;