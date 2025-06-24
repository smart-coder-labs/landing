import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ServicesSection from '../components/ServicesSection';
import TechStackSection from '../components/TechStackSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <ServicesSection />
      <TechStackSection />
      <BlogSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
