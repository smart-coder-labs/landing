import React from 'react';
import { Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-8 mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Code className="text-teal-500 mr-2" />
            <span className="text-xl font-bold text-teal-500">SmartCoderLabs</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#about" className="text-slate-400 hover:text-white transition-colors">
              Acerca de
            </a>
            <a href="#blog" className="text-slate-400 hover:text-white transition-colors">
              Blog
            </a>
            <a href="#services" className="text-slate-400 hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#contact" className="text-slate-400 hover:text-white transition-colors">
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
              Hecho con <Heart size={14} className="text-red-500 mx-1" /> en Colombia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;