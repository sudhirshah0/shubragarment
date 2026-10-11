/* ═══════════════════════════════════════════════════════════════════
   Loader — Full-screen luxury intro with SVG stroke drawing animation
   Features:
   - Dynamic SVG stroke path length calculation for all 4 petals
   - Precise gold hairline stroke-dashoffset drawing animation
   - Concentric geometric alignment rings
   - Synchronized 0% to 100% digital counter
   - Staggered typography reveal (Cinzel & Cormorant)
   - Architectural dual-curtain wipe exit
   ═══════════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);
  const ringRef = useRef(null);
  const counterRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (onComplete) onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      // Setup stroke dash properties for path drawing
      petalsRef.current.forEach((path) => {
        if (path) {
          const length = path.getTotalLength() || 180;
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fillOpacity: 0,
          });
        }
      });

      if (ringRef.current) {
        const ringLength = ringRef.current.getTotalLength() || 300;
        gsap.set(ringRef.current, {
          strokeDasharray: ringLength,
          strokeDashoffset: ringLength,
        });
      }

      const counterObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // ── Step 1: Counter progression ──────────────────────────
      tl.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          setPercent(Math.round(counterObj.value));
        },
      }, 0);

      // ── Step 2: Outer fine gold alignment ring draws ────────
      if (ringRef.current) {
        tl.to(ringRef.current, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
        }, 0.1);
      }

      // ── Step 3: Four interlocking petals stroke drawing ──────
      tl.to(petalsRef.current, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power3.inOut',
        stagger: 0.12,
      }, 0.2);

      // ── Step 4: Petal gold fills glow in ─────────────────────
      tl.to(petalsRef.current, {
        fillOpacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
      }, 1.2);

      // ── Step 5: Mark rotates subtly into perfect balance ────
      tl.to('.loader__svg-wrap', {
        rotation: 90,
        duration: 1.3,
        ease: 'power2.inOut',
      }, 0.9);

      // ── Step 6: Luxury brand text reveal ─────────────────────
      tl.fromTo('.loader__brand-title',
        { y: 25, opacity: 0, letterSpacing: '0.35em' },
        { y: 0, opacity: 1, letterSpacing: '0.22em', duration: 0.9, ease: 'power3.out' },
        1.1
      );

      tl.fromTo('.loader__brand-subtitle',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        1.3
      );

      tl.fromTo('.loader__origin',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        1.5
      );

      // ── Step 7: Seamless Flight into Navbar Logo ───────────
      tl.add(() => {
        const navLogoSymbol = document.querySelector('.navbar__logo-symbol');
        const loaderLogoEl = document.querySelector('.loader__svg-wrap');

        if (navLogoSymbol && loaderLogoEl) {
          const navRect = navLogoSymbol.getBoundingClientRect();
          const loaderRect = loaderLogoEl.getBoundingClientRect();

          // Calculate delta to position the loader logo exactly over the navbar logo
          const deltaX = (navRect.left + navRect.width / 2) - (loaderRect.left + loaderRect.width / 2);
          const deltaY = (navRect.top + navRect.height / 2) - (loaderRect.top + loaderRect.height / 2);
          const targetScale = navRect.width / loaderRect.width;

          // Fade out texts and progress bar while logo flies
          gsap.to('.loader__text-block, .loader__progress', {
            opacity: 0,
            y: 15,
            duration: 0.4,
            ease: 'power2.in',
          });

          // Fly and scale loader logo into the navbar logo's exact position
          gsap.to(loaderLogoEl, {
            x: deltaX,
            y: deltaY,
            scale: targetScale,
            duration: 0.85,
            ease: 'power4.inOut',
            onComplete: () => {
              // Smooth pop on the navbar logo
              gsap.fromTo(navLogoSymbol,
                { scale: 0.85, opacity: 0.8 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
              );
            },
          });
        } else {
          gsap.to('.loader__center', {
            y: -20,
            opacity: 0,
            duration: 0.5,
          });
        }
      }, 2.3);

      // ── Step 8: Elegant dual curtain wipe exit ─────────────
      tl.to('.loader__curtain--top', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.8,
        ease: 'power4.inOut',
      }, 2.7);

      tl.to('.loader__curtain--bottom', {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 0.8,
        ease: 'power4.inOut',
      }, 2.7);

      tl.to(containerRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Click anywhere to fast forward loader if user desires
  const handleQuickSkip = () => {
    if (onComplete) onComplete();
  };

  return (
    <div
      ref={containerRef}
      className="loader"
      onClick={handleQuickSkip}
      role="status"
      aria-live="polite"
      aria-label="Loading Shubra Garments"
    >
      {/* Background curtain panels for cinematic split-wipe */}
      <div className="loader__curtain loader__curtain--top" />
      <div className="loader__curtain loader__curtain--bottom" />

      <div className="loader__center">
        {/* Animated SVG logo mark with stroke paths */}
        <div className="loader__svg-wrap">
          <svg
            className="loader__svg"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="loaderGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A67C2E" />
                <stop offset="50%" stopColor="#D9BC7A" />
                <stop offset="100%" stopColor="#7E5F22" />
              </linearGradient>
            </defs>

            {/* Geometric delicate outer alignment ring */}
            <circle
              ref={ringRef}
              cx="50"
              cy="50"
              r="44"
              className="loader__outer-ring"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="0.75"
              strokeDasharray="2 4"
            />

            {/* Four Pinwheel Interlocking Petals */}
            {/* Top-Left Petal */}
            <path
              ref={(el) => (petalsRef.current[0] = el)}
              className="loader__stroke-petal"
              d="M50 50 C50 35, 40 22, 28 22 C15 22, 8 32, 8 42 C8 52, 18 57, 50 50Z"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#loaderGoldGrad)"
            />

            {/* Top-Right Petal */}
            <path
              ref={(el) => (petalsRef.current[1] = el)}
              className="loader__stroke-petal"
              d="M50 50 C65 50, 78 40, 78 28 C78 15, 68 8, 58 8 C48 8, 43 18, 50 50Z"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#loaderGoldGrad)"
            />

            {/* Bottom-Right Petal */}
            <path
              ref={(el) => (petalsRef.current[2] = el)}
              className="loader__stroke-petal"
              d="M50 50 C50 65, 60 78, 72 78 C85 78, 92 68, 92 58 C92 48, 82 43, 50 50Z"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#loaderGoldGrad)"
            />

            {/* Bottom-Left Petal */}
            <path
              ref={(el) => (petalsRef.current[3] = el)}
              className="loader__stroke-petal"
              d="M50 50 C35 50, 22 60, 22 72 C22 85, 32 92, 42 92 C52 92, 57 82, 50 50Z"
              stroke="url(#loaderGoldGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="url(#loaderGoldGrad)"
            />

            {/* Central Jewel Core */}
            <circle
              cx="50"
              cy="50"
              r="2.5"
              fill="#A67C2E"
            />
          </svg>
        </div>

        {/* Brand identity texts */}
        <div className="loader__text-block">
          <h1 className="loader__brand-title">SHUBRA</h1>
          <span className="loader__brand-subtitle label">GARMENTS</span>
          <p className="loader__origin tagline">Bespoke Tailoring & Haute Couture • Dubai</p>
        </div>

        {/* Elegant digital progress counter */}
        <div className="loader__progress">
          <span ref={counterRef} className="loader__count">
            {percent < 10 ? `0${percent}` : percent}
          </span>
          <span className="loader__percent-symbol">%</span>
          <div className="loader__progress-bar">
            <div
              className="loader__progress-indicator"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
