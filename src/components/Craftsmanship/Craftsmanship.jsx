/* ═══════════════════════════════════════════════════════════════
   Craftsmanship / About — Editorial 2-column showcase
   Featuring Shubra Garments flagship building, 3 decades heritage,
   and key verified company statistics
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Craftsmanship.css';

gsap.registerPlugin(ScrollTrigger);

const Craftsmanship = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Smooth subtle image parallax on scroll
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -6, scale: 1.03 },
          {
            yPercent: 6,
            scale: 1.03,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
              fastScrollEnd: true,
            },
          }
        );
      }

      // Fade-up stagger for text & facts
      gsap.fromTo(
        '.about__content > *',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section section"
      id="about"
      aria-label="About Shubra Garments"
    >
      <div id="craftsmanship" style={{ position: 'absolute', top: '-80px' }} />
      <div className="about__container container">
        <div className="about__grid">
          {/* ── Left Column: Shubra Garments Building Image ─────── */}
          <div className="about__media-col">
            <div className="about__image-stage" data-cursor-text="SHUBRA">
              {/* Deep realistic drop shadow behind the image */}
              <div className="about__image-backshadow" aria-hidden="true" />

              {/* Soft ambient backlight pedestal glow */}
              <div className="about__image-glow" aria-hidden="true" />

              <img
                ref={imageRef}
                src="/images/shubra-garment-building.png"
                alt="Shubra Garments Building — Production and Design Headquarters"
                className="about__building-img"
                loading="lazy"
                decoding="async"
              />

              <div className="about__image-badge">
                <span className="about__badge-dot" />
                <span>SHARJAH, UAE • HEADQUARTERS</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Narrative Content & Facts ────────── */}
          <div className="about__content">
            <span className="about__label label">About us</span>

            <h2 className="about__heading">
              Three decades of dressing the <em className="about__uae-italic">UAE.</em>
            </h2>

            <div className="about__paragraphs">
              <p className="about__p">
                With over <strong>30+ years in the UAE</strong>, Shubra Garments is a Sharjah-based maker of corporate uniforms and custom apparel. We manage complete <strong>in-house design and production</strong>, crafting everything from executive suits and coats to polo t-shirts and technical workwear.
              </p>
              <p className="about__p">
                Companies, prestigious events, and commercial teams across the UAE trust our atelier to dress their people—delivering precision <strong>custom garments tailored for every team</strong>, from a single bespoke piece to complete institutional fleet rollouts.
              </p>
            </div>

            {/* Quick Action */}
            <div className="about__action">
              <MagneticButton
                href="#corporate"
                variant="primary"
                size="md"
                cursorText="PARTNER"
              >
                Explore Corporate Uniforms
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
