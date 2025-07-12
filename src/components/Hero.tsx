import React from 'react';
import { ChevronDown, Code, Cpu, GitBranch, Blocks, Brain, Sparkles } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-futuristic-dark overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[1000px] h-[1000px] gradient-primary rounded-full animate-spin-slow opacity-20"></div>
          <div className="absolute w-[800px] h-[800px] gradient-secondary rounded-full animate-pulse-slow opacity-15"></div>
          <div className="absolute w-[600px] h-[600px] gradient-accent rounded-full animate-float-slow opacity-10"></div>
        </div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float-slow">
          <div className="glass-card p-3 rounded-full">
            <Code size={40} className="text-blue-400" />
          </div>
        </div>
        <div className="absolute top-40 right-[15%] animate-float-slow" style={{ animationDelay: '1s' }}>
          <div className="glass-card p-3 rounded-full">
            <Brain size={48} className="text-purple-400" />
          </div>
        </div>
        <div className="absolute bottom-32 left-[20%] animate-float-slow" style={{ animationDelay: '2s' }}>
          <div className="glass-card p-3 rounded-full">
            <Blocks size={36} className="text-cyan-400" />
          </div>
        </div>
        <div className="absolute bottom-48 right-[25%] animate-float-slow" style={{ animationDelay: '3s' }}>
          <div className="glass-card p-3 rounded-full">
            <Sparkles size={32} className="text-pink-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="zoom-in" delay={0.2}>
            <div className="mb-6 relative">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gradient-no-shadow animate-glow-pulse">
                SmartCoderLabs
              </h1>
              <div className="absolute -top-8 -right-8 w-16 h-16 gradient-primary rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 gradient-secondary rounded-full blur-xl animate-pulse delay-300"></div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" delay={0.4}>
            <p className="text-2xl md:text-3xl mb-8 text-white font-medium animate-float-slow">
              Codificando el futuro con inteligencia
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" delay={0.6}>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-slate-300 leading-relaxed font-medium">
              Explorando la intersección entre la ingeniería de software,
              la inteligencia artificial y las mejores prácticas de desarrollo.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#blog"
                className="btn-futuristic text-white animate-shimmer"
              >
                <span className="relative z-10 font-medium">Explorar Contenido</span>
              </a>

              <a
                href="#contact"
                className="glass-card px-8 py-4 text-white rounded-xl hover:animate-glow-pulse transition-all duration-300"
              >
                <span className="font-medium">Iniciar Proyecto</span>
              </a>
            </div>
          </ScrollAnimation>

          {/* Tech Stack */}
          <div className="mt-16 grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Code size={24} />, label: 'Clean Code', color: 'text-blue-400' },
              { icon: <Cpu size={24} />, label: 'AI/ML', color: 'text-purple-400' },
              { icon: <GitBranch size={24} />, label: 'DevOps', color: 'text-cyan-400' },
              { icon: <Brain size={24} />, label: 'Innovation', color: 'text-pink-400' },
              { icon: <Blocks size={24} />, label: 'Architecture', color: 'text-green-400' },
              { icon: <Sparkles size={24} />, label: 'Quality', color: 'text-yellow-400' }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="zoom-in" delay={1.0 + index * 0.1} threshold={0.05} triggerOnce={false}>
                <div
                  className="glass-card p-4 rounded-xl animate-float-slow hover:animate-glow-pulse transition-all duration-300 stack-item-animation"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={item.color}>{item.icon}</div>
                    <span className="text-xs font-semibold text-slate-300">{item.label}</span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce glass-card p-3 rounded-full hover:scale-110 transition-transform focus-futuristic"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} className="text-blue-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;