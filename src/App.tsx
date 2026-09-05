import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider, ThemeProvider, localeFromPath, localePrefix, useLanguage } from './i18n';
import HomePage from './pages/HomePage';
import NotFoundPage from './components/NotFoundPage';
import BlogIndexPage from './pages/BlogIndexPage';

const ArticlePage = lazy(() => import('./components/ArticlePage'));

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
      const target = hash ? document.getElementById(hash.slice(1)) : null;
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

function AppContent() {
  const { t } = useLanguage();
  return (
    <>
      <ScrollToRoute />
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <div className="site-shell">
        <Header />
        <div className="site-content">
          <main id="main-content" className="site-main">
            <Suspense fallback={<div className="article-page"><div className="glass-panel status-card">{t.loadingPage}</div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/es" element={<HomePage />} />
                {/* Articles have a single language version, so both locale shells
                    render the same post and the canonical always points at /blog. */}
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/es/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:articleSlug" element={<ArticlePage />} />
                <Route path="/es/blog/:articleSlug" element={<ArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export function LocalizedApp() {
  const { pathname } = useLocation();
  return <LanguageProvider locale={localeFromPath(pathname)}><AppContent /></LanguageProvider>;
}

function App() {
  return (
    <ThemeProvider><BrowserRouter><LocalizedApp /></BrowserRouter></ThemeProvider>
  );
}

export default App;
