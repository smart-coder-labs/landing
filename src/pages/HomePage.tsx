import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ServicesSection from '../components/ServicesSection';
import TechStackSection from '../components/TechStackSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import { useLanguage } from '../i18n';
import { useSeo } from '../lib';

// Reciprocal on both language homepages, and x-default sends unmatched
// languages to the English one.
const homeAlternates = { en: '/', es: '/es', 'x-default': '/' };

const HomePage: React.FC = () => {
  const { locale, t } = useLanguage();
  useSeo({
    path: locale === 'es' ? '/es' : '/',
    description: locale === 'es' ? t.hero.summary : undefined,
    type: 'website',
    lang: locale,
    alternates: homeAlternates,
  });

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
