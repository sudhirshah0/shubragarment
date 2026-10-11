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
import { clientStatsData } from '../../data/clients';
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
      // ── Animate Count-Up Stats on Scroll (Direct DOM update for 60fps performance) ──
      ScrollTrigger.create({
        trigger: '.clients-work__stats-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          clientStatsData.forEach((stat, index) => {
            const countObj = { val: 0 };
            const statCard = statsRef.current[index];
            const numEl = statCard ? statCard.querySelector('.clients-work__stat-num') : null;

            gsap.to(countObj, {
              val: stat.value,
              duration: 2.0,
              ease: 'power2.out',
              onUpdate: () => {
                const text = stat.decimals
                  ? countObj.val.toFixed(stat.decimals)
                  : Math.round(countObj.val).toLocaleString();
                if (numEl) {
                  numEl.textContent = text;
                }
              },
            });
          });
        },
      });
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
        {/* ── Section Header (Centered) ─────────────────────── */}
        <div className="clients-work__header">
          <div className="clients-work__title-wrap">
            <h2 className="clients-work__title">Lookbook & Client Atelier</h2>
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
    </section>
  );
};

export default ClientsWork;
