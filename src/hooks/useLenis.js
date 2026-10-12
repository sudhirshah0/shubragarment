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

    /* Detect coarse pointer / mobile devices:
       On touch devices (smartphones/tablets), native scrolling runs on the
       compositor thread at 120Hz. Forcing virtual smooth scrolling on mobile
       causes input lag and sluggish drag response. */
    const isTouchOrSmallScreen =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 1024px)').matches;

    if (isTouchOrSmallScreen) {
      // Connect ScrollTrigger directly to native scroll updates
      const onNativeScroll = () => ScrollTrigger.update();
      window.addEventListener('scroll', onNativeScroll, { passive: true });
      return () => window.removeEventListener('scroll', onNativeScroll);
    }

    /* Desktop: Create Lenis instance with silky zero-lag responsiveness */
    const lenis = new Lenis({
      lerp: 0.16, // Snappier, immediate response to wheel with zero input lag
      wheelMultiplier: 1.1,
      touchMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: false,
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

    /* Lag smoothing to absorb frame spikes without stutter */
    gsap.ticker.lagSmoothing(500, 33);

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
