import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider, ThemeProvider, useLanguage } from './i18n';
import HomePage from './pages/HomePage';

const ArticlePage = lazy(() => import('./components/ArticlePage'));

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
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <div className="site-shell">
        <Header />
        <div className="site-content">
          <main id="main-content" className="site-main">
            <Suspense fallback={<div className="article-page"><div className="glass-panel status-card">{t.loadingPage}</div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:articleSlug" element={<ArticlePage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
      <ThemeProvider><LanguageProvider><BrowserRouter><AppContent /></BrowserRouter></LanguageProvider></ThemeProvider>
  );
}

export default App;
