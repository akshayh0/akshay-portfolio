import { useEffect, useState } from 'react';
import NetflixPreloader from './components/NetflixPreloader';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring scroll position or jumping to hash on reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    if (loading) {
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <main className="bg-[#050505] min-h-screen text-white relative cursor-none selection:bg-red-600 selection:text-white">
      {/* Cinematic Preloader */}
      {loading && (
        <NetflixPreloader
          onEntering={() => setEntering(true)}
          onComplete={() => setLoading(false)}
        />
      )}

      {/* Global Mouse Hover Effects & Spotlight across ALL sections */}
      <CustomCursor />

      {/* Portfolio Sections - completely invisible until entering to prevent any FOUC or flash */}
      <div
        className={`transition-opacity duration-700 ease-out ${
          entering || !loading
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <Hero animate={entering || !loading} />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

export default App;