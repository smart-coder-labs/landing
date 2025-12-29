import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Modo oscuro por defecto
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Aplicar modo oscuro por defecto
    document.documentElement.classList.add('dark');
    setIsDarkMode(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? ''
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-gradient hover:text-glow transition-all duration-300">
            SmartCoderLabs
          </Link>
          <p className="hidden md:block ml-4 text-sm text-slate-300 italic">
            "Codificando el futuro con inteligencia"
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/#about"
            className="hover:text-gradient transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Acerca de
          </Link>
          <Link
            to="/#blog"
            className="hover:text-gradient transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Blog
          </Link>
          <Link
            to="/#services"
            className="hover:text-gradient transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Servicios
          </Link>
          <Link
            to="/#contact"
            className="hover:text-gradient transition-all duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Contacto
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full glass-card hover:animate-glow-pulse transition-all duration-300 mr-2 focus-futuristic"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-400" />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full glass-card hover:animate-glow-pulse transition-all duration-300 focus-futuristic"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-red-400" /> : <Menu size={24} className="text-blue-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden glass-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="/#about"
              className="py-2 hover:text-gradient transition-all duration-300 block focus-futuristic"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Acerca de
            </Link>
            <Link
              to="/#blog"
              className="py-2 hover:text-gradient transition-all duration-300 block focus-futuristic"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Blog
            </Link>
            <Link
              to="/#services"
              className="py-2 hover:text-gradient transition-all duration-300 block focus-futuristic"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Servicios
            </Link>
            <Link
              to="/#contact"
              className="py-2 hover:text-gradient transition-all duration-300 block focus-futuristic"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Contacto
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;