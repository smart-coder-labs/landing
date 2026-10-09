import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/globant/GlobantHeader';
import Footer from './components/globant/GlobantFooter';
import { LanguageProvider, localeFromPath, localePrefix, useLanguage } from './i18n';

import HomePage from './pages/HomePage';
import { useSeo } from './lib/seo';
import NotFoundPage from './components/NotFoundPage';
import BlogIndexPage from './pages/BlogIndexPage';

const ArticlePage = lazy(() => import('./components/ArticlePage'));
const ContactPage = lazy(() => import('./components/ContactSection'));

const homePaths = new Set(Object.values(localePrefix).map((prefix) => prefix || '/'));
const isHomePath = (pathname: string) => homePaths.has(pathname.replace(/\/$/, '') || '/');

/**
 * The page scrolls an inner container, not the document, so resetting the
 * window leaves the previous page's scroll position in place. Navigating from
 * far down the article archive used to land the reader near the end of the
 * article they opened.
 */
function resetScroll() {
  const container = document.querySelector('.site-content');
  if (container) container.scrollTop = 0;
  window.scrollTo(0, 0);
}

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
    // Only a homepage renders the anchored sections, so only there is it worth
    // waiting for the target to mount. Every other route goes to the top.
    if (!hash || !isHomePath(pathname)) {
      resetScroll();
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

function ContactRoute() {
  useSeo({ path: '/contacto', title: 'Hablemos de tu proyecto', description: 'Cuéntanos sobre el producto, sistema o capacidad de IA que tu equipo necesita.', lang: 'es' });
  return <main id="contenido"><ContactPage /></main>;
}

function AppContent() {
  const { t } = useLanguage();
  return (
    <>
      <ScrollToRoute />
      <Header />
      <div className="site-content">
      <Suspense fallback={<div className="g-route-status" role="status" data-page-loading="true">{t.loadingPage}</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/es" element={<HomePage />} />
          <Route path="/blog" element={<main id="contenido" className="g-blog-archive"><BlogIndexPage /></main>} />
          <Route path="/es/blog" element={<main id="contenido" className="g-blog-archive"><BlogIndexPage /></main>} />
          <Route path="/es/blog/:articleSlug" element={<main id="contenido"><ArticlePage /></main>} />
          <Route path="*" element={<main id="contenido"><NotFoundPage /></main>} />
          <Route path="/blog/:articleSlug" element={<main id="contenido"><ArticlePage /></main>} />
          <Route path="/contacto" element={<ContactRoute />} />
        </Routes>
      </Suspense>
      <Footer />
      </div>

    </>
  );
}

export function LocalizedApp() {
  const { pathname } = useLocation();
  return <LanguageProvider locale={isHomePath(pathname) || pathname === "/contacto" ? "es" : localeFromPath(pathname)}><AppContent /></LanguageProvider>;
}

function App() {
  return (
      <BrowserRouter><LocalizedApp /></BrowserRouter>

  );
}

export default App;
