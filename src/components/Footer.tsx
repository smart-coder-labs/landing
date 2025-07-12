import React from 'react';
import { Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-futuristic-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-700 pb-8 mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="glass-card p-2 rounded-lg mr-3">
              <Code className="text-blue-400" />
            </div>
            <span className="text-xl font-bold text-gradient">SmartCoderLabs</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#about" className="text-slate-300 hover:text-gradient transition-all duration-300">
              Acerca de
            </a>
            <a href="#blog" className="text-slate-300 hover:text-gradient transition-all duration-300">
              Blog
            </a>
            <a href="#services" className="text-slate-300 hover:text-gradient transition-all duration-300">
              Servicios
            </a>
            <a href="#contact" className="text-slate-300 hover:text-gradient transition-all duration-300">
              Contacto
            </a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {year} SmartCoderLabs. Todos los derechos reservados.
          </div>

          <div className="flex items-center">
            <span className="flex items-center">
              Hecho con <Heart size={14} className="text-red-400 mx-1 animate-pulse" /> en Colombia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;