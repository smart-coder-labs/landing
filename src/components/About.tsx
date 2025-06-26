import React from 'react';
import { Code, Cpu, Database, GitBranch } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Sobre <span className="text-teal-600 dark:text-teal-500">SmartCoderLabs</span>
            </h2>
            <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
              En SmartCoderLabs, somos una agencia de software automatizada con inteligencia artificial, especializada en el desarrollo de soluciones elegantes, eficientes y escalables.
              <span className="text-teal-600 dark:text-teal-500">Proveemos a nuestros clientes herramientas modernas que reflejan el progreso real y medible de sus proyectos</span>, integrando automatización, inteligencia artificial y desarrollo de software de alto nivel.
            </p>
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
            Compartimos conocimiento técnico y experiencias del mundo real sobre ingeniería de software, inteligencia artificial, buenas prácticas de desarrollo y arquitectura de sistemas, promoviendo una cultura de calidad, innovación y aprendizaje continuo.
            </p>
            <p className="text-lg mb-8 text-slate-700 dark:text-slate-300">
              Nuestro enfoque se centra en la calidad, la escalabilidad y la aplicación de tecnologías
              de vanguardia para resolver problemas complejos del mundo real.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <Code className="text-teal-600 dark:text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Desarrollo</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Código limpio y mantenible</p>
                </div>
              </div>

              <div className="flex items-start">
                <Cpu className="text-teal-600 dark:text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">IA & ML</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Soluciones inteligentes</p>
                </div>
              </div>

              <div className="flex items-start">
                <GitBranch className="text-teal-600 dark:text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">DevOps</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Integración y entrega continua</p>
                </div>
              </div>

              <div className="flex items-start">
                <Database className="text-teal-600 dark:text-teal-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Arquitectura</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sistemas escalables</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 opacity-20 animate-pulse"></div>
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="SmartCoderLabs Developer"
                className="rounded-full object-cover w-full h-full border-8 border-white dark:border-slate-800 shadow-xl z-10 relative"
              />
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-full p-4 shadow-lg">
                <Code size={32} className="text-teal-600 dark:text-teal-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;