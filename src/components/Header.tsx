import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-slate-900 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-500">
            SmartCoderLabs
          </h1>
          <p className="hidden md:block ml-4 text-sm text-slate-600 dark:text-slate-400 italic">
            "Codificando el futuro con inteligencia"
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/#about" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>
            Acerca de
          </Link>
          <Link to="/#blog" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>
            Blog
          </Link>
          <Link to="/#services" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>
            Servicios
          </Link>
          <Link to="/#contact" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>
            Contacto
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors mr-2"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/#about" 
              className="py-2 hover:text-teal-600 dark:hover:text-teal-500 transition-colors block"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Acerca de
            </Link>
            <Link 
              to="/#blog" 
              className="py-2 hover:text-teal-600 dark:hover:text-teal-500 transition-colors block"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Blog
            </Link>
            <Link 
              to="/#services" 
              className="py-2 hover:text-teal-600 dark:hover:text-teal-500 transition-colors block"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Servicios
            </Link>
            <Link 
              to="/#contact" 
              className="py-2 hover:text-teal-600 dark:hover:text-teal-500 transition-colors block"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Contacto
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic pt-2 border-t border-slate-200 dark:border-slate-800">
              "Codificando el futuro con inteligencia"
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;