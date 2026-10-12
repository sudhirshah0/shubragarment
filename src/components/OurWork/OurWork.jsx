/* ═══════════════════════════════════════════════════════════════
   OurWork.jsx — Real Projects & Client Commissions Showcase
   Features:
   - Category filtering (All, Hospitality, Executive Suiting, Aviation, Ceremonial)
   - Premium editorial grid with large imagery, client badge, tags & details
   - Subtle image hover/scale animation with smooth cubic-bezier easing
   - Modal detail preview or interactive expanded drawer for full project specs
   - Seamless match with Shubra Garments luxury palette (cream, espresso, champagne, bronze)
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ourWorkProjects } from '../../data/projects';
import './OurWork.css';

gsap.registerPlugin(ScrollTrigger);

const OurWork = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // GSAP scroll reveal on section enter
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.our-work__header > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.our-work__card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
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
      className="our-work section"
      id="our-work"
      aria-label="Our Real Work and Client Projects"
    >
      <div className="our-work__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="our-work__header">
          <div className="our-work__title-wrap">
            <h2 className="our-work__title">Our Work</h2>
            <p className="our-work__subtitle tagline">
              Explore real bespoke wardrobes, institutional uniforms, and private client attires engineered by Shubra Garments across the UAE and GCC.
            </p>
          </div>
        </div>

        {/* ── Editorial Project Cards Grid ────────────────────── */}
        <div ref={gridRef} className="our-work__grid">
          {ourWorkProjects.map((project, index) => (
            <article
              key={project.id}
              className={`our-work__card ${index === 0 ? 'our-work__card--featured' : ''}`}
            >
              {/* Media Container with Image Hover Animation */}
              <div className="our-work__media">
                <img
                  src={project.image}
                  alt={`${project.client} - ${project.projectType}`}
                  className="our-work__img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="our-work__media-overlay" aria-hidden="true" />
                
                {/* Floating Meta Pills */}
                <div className="our-work__media-tags">
                  <span className="our-work__tag-category">{project.category}</span>
                  <span className="our-work__tag-year">{project.year}</span>
                </div>
              </div>

              {/* Editorial Card Content */}
              <div className="our-work__content">
                <div className="our-work__client-meta">
                  <span className="our-work__location label">{project.location}</span>
                  <h3 className="our-work__client-name">{project.client}</h3>
                  <h4 className="our-work__project-type">{project.projectType}</h4>
                </div>

                <p className="our-work__desc">{project.description}</p>

                {/* Key Spec Badges */}
                <div className="our-work__tags-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="our-work__spec-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
