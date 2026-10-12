/* ═══════════════════════════════════════════════════════════════════
   App.jsx — Root layout component
   Assembles all sections in order, initialises Lenis smooth scroll.
   Each section is an empty placeholder awaiting implementation.
   ═══════════════════════════════════════════════════════════════════ */

import { useState, useCallback } from 'react';

/* ── Styles ──────────────────────────────────────────────────────── */
import './styles/global.css';
import './App.css';

/* ── Hooks ───────────────────────────────────────────────────────── */
import useLenis from './hooks/useLenis';
import useScrollReveal from './hooks/useScrollReveal';

/* ── Components ──────────────────────────────────────────────────── */
import Loader          from './components/Loader/Loader';
import Cursor          from './components/Cursor/Cursor';
import Navbar          from './components/Navbar/Navbar';
import Hero            from './components/Hero/Hero';
import Collections     from './components/Collections/Collections';
import CustomDesigner   from './components/CustomDesigner/CustomDesigner';
import ClientsWork     from './components/ClientsWork/ClientsWork';
import Craftsmanship   from './components/Craftsmanship/Craftsmanship';
import Testimonials    from './components/Testimonials/Testimonials';
import BulkCorporate   from './components/BulkCorporate/BulkCorporate';
import OurWork         from './components/OurWork/OurWork';
import Contact         from './components/Contact/Contact';
import Footer          from './components/Footer/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';

const App = () => {
  /* ── Loader state ────────────────────────────────────────────── */
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    document.body.classList.remove('scroll-locked');
    window.dispatchEvent(new CustomEvent('shubra:loader-complete'));
  }, []);

  /* ── Lenis smooth scroll (paused while loader is active) ───── */
  const lenisRef = useLenis();

  /* ── CrispyBite-style scroll reveal animation for all sections ── */
  useScrollReveal();

  return (
    <>
      {/* Keyboard accessible skip-to-content link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Custom cursor — desktop only, aria-hidden */}
      <Cursor />

      {/* Full-screen intro loader */}
      {isLoading && <Loader onComplete={handleLoaderComplete} />}

      {/* Sticky navigation */}
      <Navbar />

      {/* Page content in section order (matching Navbar links: ABOUT, COLLECTION, CUSTOM DESIGN, CORPORATE, LOOKBOOK, CONTACT) */}
      <main id="main-content">
        <Hero />
        <Craftsmanship />
        <Collections />
        <CustomDesigner />
        <BulkCorporate />
        <ClientsWork />
        <OurWork />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Floating round WhatsApp concierge action in bottom corner */}
      <FloatingWhatsApp />
    </>
  );
};

export default App;
