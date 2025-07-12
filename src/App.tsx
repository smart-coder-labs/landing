import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';

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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <HomePage />
          </motion.div>
        } />
        <Route path="/blog/:articleSlug" element={
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ArticlePage />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-futuristic-dark text-slate-200">
        <Header />
        <main className="flex-grow overflow-x-hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="glass-card p-8 rounded-2xl">
                  <div className="animate-glow-pulse mb-4">
                    <div className="w-16 h-16 mx-auto border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gradient text-xl font-semibold">Cargando página...</p>
                </div>
              </motion.div>
            </div>
          }>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;