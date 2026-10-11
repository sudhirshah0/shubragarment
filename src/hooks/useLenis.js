/* ═══════════════════════════════════════════════════════════════════
   useLenis — Custom hook to initialize Lenis smooth scrolling
   and synchronize it with GSAP ScrollTrigger.
   ═══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and wires it to GSAP's
 * ScrollTrigger so both systems stay in sync.
 *
 * - Respects `prefers-reduced-motion` — disables smooth scroll if set.
 * - Cleans up the Lenis instance and animation frame on unmount.
 *
 * @returns {React.MutableRefObject<Lenis|null>} ref to the Lenis instance
 */
const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    /* Skip smooth scroll when user prefers reduced motion */
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) return;

    /* Create Lenis instance */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    /* Sync Lenis scroll position with ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update);

    /* Use GSAP ticker as the render loop for Lenis */
    const onTick = (time) => {
      lenis.raf(time * 1000); // GSAP ticker gives time in seconds
    };
    gsap.ticker.add(onTick);

    /* Disable GSAP's default lag smoothing so Lenis stays snappy */
    gsap.ticker.lagSmoothing(0);

    /* Cleanup */
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);

  return lenisRef;
};

export default useLenis;
