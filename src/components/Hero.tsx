import React from 'react';
import { ChevronDown, Code, Cpu, GitBranch, Blocks, Brain, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1000px] h-[1000px] bg-gradient-conic from-teal-500/30 via-blue-500/30 to-teal-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[800px] h-[800px] bg-gradient-radial from-teal-500/20 to-transparent rounded-full animate-pulse-slow"></div>
        </div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float delay-100">
          <Code size={40} className="text-teal-600/30 dark:text-teal-500/30" />
        </div>
        <div className="absolute top-40 right-[15%] animate-float delay-300">
          <Brain size={48} className="text-blue-600/30 dark:text-blue-500/30" />
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float delay-500">
          <Blocks size={36} className="text-indigo-600/30 dark:text-indigo-500/30" />
        </div>
        <div className="absolute bottom-48 right-[25%] animate-float delay-700">
          <Sparkles size={32} className="text-purple-600/30 dark:text-purple-500/30" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 relative">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-gradient bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 dark:from-teal-500 dark:via-blue-500 dark:to-teal-500 bg-clip-text text-transparent bg-[size:200%_200%]">
              SmartCoderLabs
            </h1>
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
          </div>
          
          <p className="text-2xl md:text-3xl mb-8 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent font-medium">
            Codificando el futuro con inteligencia
          </p>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-slate-700 dark:text-slate-300 leading-relaxed">
            Explorando la intersección entre la ingeniería de software, 
            la inteligencia artificial y las mejores prácticas de desarrollo.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#blog" 
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden shine"
            >
              <span className="relative z-10 font-medium">Explorar Contenido</span>
            </a>
            
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transform hover:-translate-y-1 transition-all duration-300 gradient-border"
            >
              <span className="font-medium">Iniciar Proyecto</span>
            </a>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Code size={24} />, label: 'Clean Code' },
              { icon: <Cpu size={24} />, label: 'AI/ML' },
              { icon: <GitBranch size={24} />, label: 'DevOps' },
              { icon: <Brain size={24} />, label: 'Innovation' },
              { icon: <Blocks size={24} />, label: 'Architecture' },
              { icon: <Sparkles size={24} />, label: 'Quality' }
            ].map((item, index) => (
              <div key={index} className="glass p-4 rounded-xl animate-float" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-teal-600 dark:text-teal-500">{item.icon}</div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce glass p-3 rounded-full hover:scale-110 transition-transform"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;