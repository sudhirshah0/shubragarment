/* ═══════════════════════════════════════════════════════════════
   ClientsWork — Corporate Partners, Case Studies & Atelier Stats
   Features:
   - Infinite smooth logo marquee of prestigious UAE corporate clients
   - 3 Rich case-study cards with metrics, imagery, and client quotes
   - Animated count-up statistics with GSAP ScrollTrigger
   - Interactive hover states and custom cursor integration
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientLogos, caseStudiesData, clientStatsData } from '../../data/clients';
import MagneticButton from '../MagneticButton/MagneticButton';
import './ClientsWork.css';

gsap.registerPlugin(ScrollTrigger);

const ClientsWork = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [statsDisplay, setStatsDisplay] = useState(
    clientStatsData.map(() => '0')
  );

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setStatsDisplay(
        clientStatsData.map((s) =>
          s.decimals ? s.value.toFixed(s.decimals) : s.value.toLocaleString()
        )
      );
      return;
    }

    const ctx = gsap.context(() => {
      // ── Animate Count-Up Stats on Scroll ─────────────────────
      ScrollTrigger.create({
        trigger: '.clients-work__stats-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          clientStatsData.forEach((stat, index) => {
            const countObj = { val: 0 };
            gsap.to(countObj, {
              val: stat.value,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setStatsDisplay((prev) => {
                  const next = [...prev];
                  next[index] = stat.decimals
                    ? countObj.val.toFixed(stat.decimals)
                    : Math.round(countObj.val).toLocaleString();
                  return next;
                });
              },
            });
          });
        },
      });

      // ── Case Studies Staggered Scroll Reveal ─────────────────
      gsap.fromTo(
        '.clients-work__case-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.clients-work__cases-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="clients-work section"
      id="lookbook"
      aria-label="Lookbook and Client Creations"
    >
      <div id="clients" style={{ position: 'absolute', top: '-80px' }} />
      <div className="clients-work__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="clients-work__header">


          <div className="clients-work__title-wrap">
            <h2 className="clients-work__title">Trusted By Dubai’s Premier Enterprises</h2>
            <p className="clients-work__subtitle tagline">
              From flagship luxury resorts and diplomatic missions to private aviation fleets, our atelier manufactures garments of uncompromising distinction.
            </p>
          </div>
        </div>

        {/* ── Animated Count-Up Atelier Statistics ────────────── */}
        <div className="clients-work__stats-grid">
          {clientStatsData.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[i] = el)}
              className="clients-work__stat-box"
              data-cursor-text="STATS"
            >
              <div className="clients-work__stat-number-wrap">
                <span className="clients-work__stat-num">{statsDisplay[i]}</span>
                <span className="clients-work__stat-suffix">{stat.suffix}</span>
              </div>
              <h3 className="clients-work__stat-label">{stat.label}</h3>
              <p className="clients-work__stat-sub">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Infinite Logo Marquee Track (Full Width) ─────────── */}
      <div className="clients-work__marquee-section">
        <div className="clients-work__marquee-label-row container">
          <span className="label">INSTITUTIONAL CLIENTELE & STRATEGIC BRANDS</span>
        </div>

        <div
          className="clients-work__marquee"
          data-cursor-text="PARTNERS"
          aria-label="Client logos marquee"
        >
          {/* Dual tracks for seamless infinite looping */}
          <div className="clients-work__track">
            {clientLogos.map((client, idx) => (
              <div key={`${client.name}-1-${idx}`} className="clients-work__logo-item">
                <span className="clients-work__logo-crest">❖</span>
                <span className="clients-work__logo-name">{client.name}</span>
                <span className="clients-work__logo-sector label">{client.sector}</span>
              </div>
            ))}
          </div>

          <div className="clients-work__track" aria-hidden="true">
            {clientLogos.map((client, idx) => (
              <div key={`${client.name}-2-${idx}`} className="clients-work__logo-item">
                <span className="clients-work__logo-crest">❖</span>
                <span className="clients-work__logo-name">{client.name}</span>
                <span className="clients-work__logo-sector label">{client.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="clients-work__container container">
        {/* ── 3 Rich Case-Study Cards ─────────────────────────── */}
        <div className="clients-work__cases-header">
          <span className="label">PORTFOLIO CASE STUDIES</span>
          <h3 className="clients-work__cases-heading">Exemplary Enterprise Commissions</h3>
        </div>

        <div className="clients-work__cases-grid">
          {caseStudiesData.map((study) => (
            <article
              key={study.id}
              className="clients-work__case-card"
              data-cursor-text="CASE"
            >
              {/* Image Frame with Zoom */}
              <div className="clients-work__case-media">
                <img
                  src={study.image}
                  alt={study.title}
                  loading="lazy"
                  decoding="async"
                  className="clients-work__case-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="clients-work__case-overlay" aria-hidden="true" />
                <span className="clients-work__case-sector label">{study.sector}</span>
              </div>

              {/* Case Content */}
              <div className="clients-work__case-body">
                <h4 className="clients-work__case-title">{study.title}</h4>
                <p className="clients-work__case-headline tagline">{study.headline}</p>
                <p className="clients-work__case-desc">{study.description}</p>

                {/* Key Metrics Row */}
                <div className="clients-work__case-metrics">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="clients-work__case-metric">
                      <span className="clients-work__case-metric-val">{m.value}</span>
                      <span className="clients-work__case-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables Pills */}
                <div className="clients-work__case-tags">
                  {study.features.map((feat) => (
                    <span key={feat} className="clients-work__case-tag">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Client Quote Callout */}
                <blockquote className="clients-work__case-quote">
                  <p>{study.quote}</p>
                  <cite>— {study.author}</cite>
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom Section Inquire CTA ─────────────────────── */}
        <div className="clients-work__bottom-banner">
          <div className="clients-work__banner-content">
            <span className="label">COMMISSION CORPORATE UNIFORMS</span>
            <h3 className="clients-work__banner-title">Outfit Your Enterprise With Sartorial Precision</h3>
            <p className="tagline">Custom sampling, mobile fabric consultations, and dedicated UAE corporate account managers.</p>
          </div>
          <MagneticButton
            href="#corporate"
            variant="primary"
            size="lg"
            cursorText="INQUIRE"
          >
            Request Corporate Dossier
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default ClientsWork;
