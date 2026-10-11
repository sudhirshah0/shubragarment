/* ═══════════════════════════════════════════════════════════════
   useScrollReveal.js — Global ScrollReveal-style animations
   Matches https://crispybitepizza.vercel.app aesthetic:
   - Smooth 60px distance entrance
   - Staggered reveals for headers, subtitles, cards, and images
   - Origin variants: 'top', 'bottom', 'left', 'right'
   - GSAP ScrollTrigger powered with 0 extra dependencies
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal() {
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // Small delay to allow initial DOM rendering & layout calculation
    const timer = setTimeout(() => {
      // 1. Headers & Titles — Smooth entrance from top / bottom
      const headers = document.querySelectorAll(
        '.about__label, .about__heading, .about__paragraphs, ' +
        '.collections__header, ' +
        '.custom-designer__header, ' +
        '.bulk-corporate__header, ' +
        '.clients-work__header, .clients-work__stats-grid, ' +
        '.appreciation__header, ' +
        '.contact__header'
      );

      headers.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        );
      });

      // 2. Media / Image blocks — Slide smoothly from left/right
      const mediaLeft = document.querySelectorAll('.about__media-col, .contact__info');
      mediaLeft.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      const mediaRight = document.querySelectorAll('.about__content, .contact__form-col');
      mediaRight.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      // 3. Card Grids & Panels — Staggered entrance from bottom
      const grids = [
        { selector: '.collections__grid .collection-box', parent: '.collections__grid' },
        { selector: '.bulk-corporate__benefits-grid .bulk-corporate__benefit-card', parent: '.bulk-corporate__benefits-grid' },
        { selector: '.bulk-corporate__tiers-grid .bulk-corporate__tier-card', parent: '.bulk-corporate__tiers-grid' },
        { selector: '.custom-designer__workspace', parent: '.custom-designer__workspace' },
        { selector: '.contact__card-wrapper', parent: '.contact__card-wrapper' },
      ];

      grids.forEach(({ selector, parent }) => {
        const items = document.querySelectorAll(selector);
        const parentEl = document.querySelector(parent);
        if (items.length && parentEl) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 55, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: parentEl,
                start: 'top 85%',
                once: true,
              },
            }
          );
        }
      });

      // Refresh ScrollTrigger to ensure accurate trigger points
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, []);
}
