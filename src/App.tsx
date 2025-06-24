import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

// Helper component to handle scroll to top and hash-based navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  React.useEffect(() => {
    // If there's a hash, scroll to the element with that ID
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};


// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ArticlePage = lazy(() => import('./components/ArticlePage'));


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="text-center py-20 dark:text-white">Cargando página...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog/:articleSlug" element={<ArticlePage />} />
              {/* Example for a 404 page if you create one
              <Route path="*" element={<NotFoundPage />} />
              */}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;