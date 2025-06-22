import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import BlogSection from './components/BlogSection';
import ServicesSection from './components/ServicesSection';
import TechStackSection from './components/TechStackSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main>
        <Hero />
        <About />
        <BlogSection />
        <ServicesSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;