import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/globant/GlobantHeader';
import Footer from './components/globant/GlobantFooter';
import { LanguageProvider, useLanguage } from './i18n';
import HomePage from './pages/HomePage';

const ArticlePage = lazy(() => import('./components/ArticlePage'));
const ContactPage = lazy(() => import('./components/ContactSection'));

function ScrollToRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const aliases: Record<string, string> = { about: 'enfoque', services: 'capacidades', blog: 'ideas', contact: 'contacto', stack: 'proyectos' };
      const id = hash.slice(1);
      const target = hash ? document.getElementById(aliases[id] || id) : null;
      if (!target) return false;

      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      return true;
    };

    if (scrollToHash()) return;
    if (pathname !== '/' || !hash) {
      window.scrollTo(0, 0);
      return;
    }

    const observer = new MutationObserver(() => {
      if (scrollToHash()) stopObserving();
    });
    let isObserving = true;
    const stopObserving = () => {
      if (!isObserving) return;

      isObserving = false;
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };

    observer.observe(document.body, { childList: true, subtree: true });
    const timeoutId = window.setTimeout(stopObserving, 1_000);

    return stopObserving;
  }, [hash, pathname]);

  return null;
}

function AppContent() {
  const { t } = useLanguage();
  return (
    <>
      <ScrollToRoute />
      <Header />
      <Suspense fallback={<div className="g-route-status" role="status">{t.loadingPage}</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:articleSlug" element={<main id="contenido"><ArticlePage /></main>} />
          <Route path="/contacto" element={<main id="contenido"><ContactPage /></main>} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

function App() {
  return (
      <LanguageProvider defaultLocale="es"><BrowserRouter><AppContent /></BrowserRouter></LanguageProvider>
  );
}

export default App;
