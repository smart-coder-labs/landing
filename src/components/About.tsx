import React from 'react';
import { Code, Cpu, Database, GitBranch } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-futuristic-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation animation="slide-left" delay={0.2}>
            <div className="order-2 md:order-1">
              <ScrollAnimation animation="fade-in" delay={0.4}>
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Sobre <span className="text-gradient">SmartCoderLabs</span>
                </h2>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in" delay={0.6}>
                <p className="text-lg mb-6 text-slate-300 leading-relaxed">
                  En SmartCoderLabs, somos una agencia de software automatizada con inteligencia artificial, especializada en el desarrollo de soluciones elegantes, eficientes y escalables.
                  <span className="text-gradient font-semibold">Proveemos a nuestros clientes herramientas modernas que reflejan el progreso real y medible de sus proyectos</span>, integrando automatización, inteligencia artificial y desarrollo de software de alto nivel.
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in" delay={0.8}>
                <p className="text-lg mb-8 text-slate-300 leading-relaxed">
                  Compartimos conocimiento técnico y experiencias del mundo real sobre ingeniería de software, inteligencia artificial, buenas prácticas de desarrollo y arquitectura de sistemas, promoviendo una cultura de calidad, innovación y aprendizaje continuo.
                  <br />
                  Nuestro enfoque se centra en la calidad, la escalabilidad y la aplicación de tecnologías de vanguardia para resolver problemas complejos del mundo real.
                </p>
              </ScrollAnimation>

              <ScrollAnimation animation="zoom-in" delay={1.0}>
                <div className="grid grid-cols-2 gap-4">
                  <ScrollAnimation animation="slide-up" delay={1.2}>
                    <div className="glass-card p-4 rounded-xl hover:animate-glow-pulse transition-all duration-300">
                      <div className="flex items-start">
                        <Code className="text-blue-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1 text-white">Desarrollo</h3>
                          <p className="text-sm text-slate-300">Código limpio y mantenible</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-up" delay={1.4}>
                    <div className="glass-card p-4 rounded-xl hover:animate-glow-pulse transition-all duration-300">
                      <div className="flex items-start">
                        <Cpu className="text-purple-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1 text-white">IA & ML</h3>
                          <p className="text-sm text-slate-300">Soluciones inteligentes</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-up" delay={1.6}>
                    <div className="glass-card p-4 rounded-xl hover:animate-glow-pulse transition-all duration-300">
                      <div className="flex items-start">
                        <GitBranch className="text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1 text-white">DevOps</h3>
                          <p className="text-sm text-slate-300">Integración y entrega continua</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>

                  <ScrollAnimation animation="slide-up" delay={1.8}>
                    <div className="glass-card p-4 rounded-xl hover:animate-glow-pulse transition-all duration-300">
                      <div className="flex items-start">
                        <Database className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold mb-1 text-white">Arquitectura</h3>
                          <p className="text-sm text-slate-300">Sistemas escalables</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-right" delay={0.3}>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full gradient-primary opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full gradient-secondary opacity-20 animate-pulse delay-300"></div>
                <img
                  src="/profile.jpeg"
                  alt="SmartCoderLabs Developer"
                  className="rounded-full object-cover w-full h-full glass-card border-4 border-white/20 shadow-xl z-10 relative"
                />
                <div className="absolute -bottom-4 -right-4 glass-card rounded-full p-4 animate-glow-pulse">
                  <Code size={32} className="text-blue-400" />
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;