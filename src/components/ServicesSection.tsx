import React from 'react';
import { Code, FileCode, Server, Database, BrainCircuit, GitMerge, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const services: Service[] = [
  {
    id: 1,
    icon: <FileCode size={40} className="text-blue-400" />,
    title: 'Desarrollo Web Avanzado',
    description: 'Creación de aplicaciones web escalables y de alto rendimiento con las últimas tecnologías.',
    features: ['React/Next.js', 'TypeScript', 'Arquitectura moderna', 'SEO optimizado'],
    color: 'text-blue-400'
  },
  {
    id: 2,
    icon: <Server size={40} className="text-purple-400" />,
    title: 'Backend & API',
    description: 'Diseño y desarrollo de APIs REST/GraphQL y servicios backend robustos y seguros.',
    features: ['APIs RESTful', 'GraphQL', 'Microservicios', 'Serverless'],
    color: 'text-purple-400'
  },
  {
    id: 3,
    icon: <Database size={40} className="text-cyan-400" />,
    title: 'Arquitectura de Datos',
    description: 'Estrategias de modelado de datos para sistemas complejos con alta concurrencia.',
    features: ['Diseño NoSQL', 'SQL avanzado', 'Optimización', 'Data Modeling'],
    color: 'text-cyan-400'
  },
  {
    id: 4,
    icon: <BrainCircuit size={40} className="text-pink-400" />,
    title: 'Soluciones con IA',
    description: 'Integración de tecnologías de machine learning e inteligencia artificial en aplicaciones.',
    features: ['Machine Learning', 'NLP', 'Computer Vision', 'MLOps'],
    color: 'text-pink-400'
  },
  {
    id: 5,
    icon: <GitMerge size={40} className="text-green-400" />,
    title: 'DevOps & CI/CD',
    description: 'Optimización de flujos de trabajo con integración y entrega continua.',
    features: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoreo'],
    color: 'text-green-400'
  },
  {
    id: 6,
    icon: <Code size={40} className="text-yellow-400" />,
    title: 'Consultoría Técnica',
    description: 'Asesoramiento en mejores prácticas, arquitectura y resolución de problemas técnicos.',
    features: ['Code Review', 'Arquitectura', 'Performance', 'Seguridad'],
    color: 'text-yellow-400'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-futuristic-dark relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] gradient-primary rounded-full opacity-20"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] gradient-secondary rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation animation="fade-in" delay={0.2}>
          <div className="text-center mb-16">
            <ScrollAnimation animation="zoom-in" delay={0.4}>
              <h2 className="text-4xl font-bold mb-4 text-white">
                Nuestros <span className="text-gradient">Servicios</span>
              </h2>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-in" delay={0.6}>
              <p className="text-lg max-w-2xl mx-auto text-slate-300">
                Ofrecemos soluciones de alto valor para problemas complejos en el desarrollo
                de software y la implementación de tecnologías avanzadas.
              </p>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-in" delay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollAnimation key={service.id} animation="slide-up" delay={1.0 + index * 0.1}>
                <div className="group glass-card rounded-xl p-8 hover:animate-glow-pulse transition-all duration-300 transform hover:-translate-y-2">
                  <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-slate-300">
                        <CheckCircle2 size={16} className={`${service.color} mr-2 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="zoom-in" delay={1.6}>
          <div className="mt-20">
            <div className="glass-card rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-shimmer">
              <div className="relative px-8 py-16 md:p-16 text-white">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 gradient-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 gradient-secondary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 opacity-30"></div>

                <div className="relative flex flex-col md:flex-row md:items-center justify-around gap-8">
                  <ScrollAnimation animation="slide-left" delay={1.8}>
                    <div className="md:w-2/3">
                      <ScrollAnimation animation="fade-in" delay={2.0}>
                        <h3 className="text-3xl font-bold mb-4 text-gradient">
                          ¿Listo para llevar tu proyecto al siguiente nivel?
                        </h3>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fade-in" delay={2.2}>
                        <p className="text-slate-300 text-lg mb-6 max-w-lg">
                          Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.
                        </p>
                      </ScrollAnimation>
                      <ScrollAnimation animation="fade-in" delay={2.4}>
                        <ul className="space-y-3 mb-8">
                          <li className="flex items-center">
                            <CheckCircle2 size={20} className="mr-2 text-green-400" />
                            <span>Soluciones personalizadas para tu negocio</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 size={20} className="mr-2 text-green-400" />
                            <span>Código de alta calidad y mantenible</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle2 size={20} className="mr-2 text-green-400" />
                            <span>Enfoque en resultados y valor</span>
                          </li>
                        </ul>
                      </ScrollAnimation>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-right" delay={2.0}>
                    <div className="flex flex-col gap-4">
                      <a
                        href="#contact"
                        className="btn-futuristic btn-futuristic-lg text-white text-center"
                      >
                        Agendar Consulta Gratuita
                      </a>
                      <a
                        href="mailto:contacto@smartcoderlabs.com"
                        className="glass-card px-8 py-4 text-white font-medium rounded-xl hover:animate-glow-pulse transition-all duration-300 text-center group text-lg"
                      >
                        Enviar Email
                        <ArrowRight size={20} className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;