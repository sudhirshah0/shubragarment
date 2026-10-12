/* ═══════════════════════════════════════════════════════════════
   BehindTheGarment.jsx — Cinematic Manufacturing Journey Modal
   Features:
   - Fullscreen luxurious modal dialog with smooth backdrop blur
   - Rendered via React createPortal to document.body
   - Header with stage counter and close button (✕ or ESC)
   - Scrollable 6-Stage Timeline Journey with rich imagery & metrics
   - Accessible dialog role and lenis-prevent scroll handling
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './BehindTheGarment.css';

const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'Fabric Curation',
    headline: 'Noble Natural Fibers & Micro-Climatic Weaves',
    desc: 'Each production begins with certified natural textiles—from Vitale Barberis Canonico Super 150s wool to Mongolian cashmere and Japanese Bemberg cupro silks, rigorously tested for Gulf heat resilience and drape memory.',
    image: '/images/manufacturing/fabric.jpg',
    metric: 'Super 150s & Pure Cashmere',
  },
  {
    step: '02',
    title: 'Precision Cutting',
    headline: 'Anatomical Drafting & Pattern Alignment',
    desc: 'Bespoke individual pattern templates are hand-chalked and cut using heavy tailor shears. Pattern grain symmetry is strictly matched across lapels, pockets, and shoulder seams for mathematical perfection.',
    image: '/images/manufacturing/cutting.jpg',
    metric: 'Sub-millimeter Tolerance',
  },
  {
    step: '03',
    title: 'Artisan Assembly',
    headline: 'Full Floating Horsehair Canvas Construction',
    desc: 'Rather than stiff fused glues, our jackets are constructed with natural floating horsehair chest canvas. Multi-point hand-basting ensures the cloth molds uniquely to the client’s chest contours over time.',
    image: '/images/manufacturing/sewing.jpg',
    metric: '100% Floating Canvas',
  },
  {
    step: '04',
    title: 'Sculpted Finishing',
    headline: 'Multi-Stage Steam Press & Roll Shaping',
    desc: 'Over sixty separate pressing operations shape the three-dimensional architecture of the shoulders, chest drape, and soft lapel roll using heavy gravity-fed brass irons and tailored pressing bucks.',
    image: '/images/manufacturing/finishing.jpg',
    metric: '60+ Pressing Operations',
  },
  {
    step: '05',
    title: 'Quality Inspection',
    headline: '42-Point Hand Verification Protocol',
    desc: 'Master quality auditors inspect stitch consistency, buttonhole hand-gimp tension, lining ease, seam tensile strength, and pocket alignment against rigorous atelier specifications before sign-off.',
    image: '/images/manufacturing/quality.jpg',
    metric: '42-Point Certification',
  },
  {
    step: '06',
    title: 'White-Glove Delivery',
    headline: 'Gold-Embossed Presentation & Valet Dispatch',
    desc: 'Garments are dressed on sculpted cedar hangers inside breathable matte espresso garment bags with gold brass hardware and sealed in bespoke gift packaging for executive office or residence delivery.',
    image: '/images/manufacturing/packaging.jpg',
    metric: 'VIP White-Glove Handover',
  },
];

const BehindTheGarment = ({ isOpen, onClose }) => {
  // Lock scroll while modal is open & handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    if (window.lenis) {
      window.lenis.stop();
    }
    document.body.classList.add('scroll-locked');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('scroll-locked');
      if (window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="behind-garment-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="behind-garment-modal-title"
      data-lenis-prevent
      onClick={onClose}
    >
      {/* Frosted Glass Backdrop */}
      <div className="behind-garment-modal__backdrop" aria-hidden="true" />

      {/* Main Modal Dialog */}
      <div
        className="behind-garment-modal__dialog"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="behind-garment-modal__close"
          onClick={onClose}
          aria-label="Close Behind the Garment"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="behind-garment__header">
          <div className="behind-garment__title-wrap">
            <span className="behind-garment__badge label">ATELIER MANUFACTURING PROCESS</span>
            <h2 id="behind-garment-modal-title" className="behind-garment__title">
              Behind the Garment
            </h2>
            <p className="behind-garment__subtitle tagline">
              Step inside our UAE manufacturing atelier to experience the uncompromising six-stage journey of haute couture suiting and fleet craftsmanship.
            </p>
          </div>

          {/* Process Flow Tracker Line */}
          <div className="behind-garment__timeline-tracker" aria-hidden="true">
            <span className="behind-garment__timeline-step">01. Fabric</span>
            <span className="behind-garment__timeline-arrow">→</span>
            <span className="behind-garment__timeline-step">02. Cutting</span>
            <span className="behind-garment__timeline-arrow">→</span>
            <span className="behind-garment__timeline-step">03. Sewing</span>
            <span className="behind-garment__timeline-arrow">→</span>
            <span className="behind-garment__timeline-step">04. Finishing</span>
            <span className="behind-garment__timeline-arrow">→</span>
            <span className="behind-garment__timeline-step">05. Quality</span>
            <span className="behind-garment__timeline-arrow">→</span>
            <span className="behind-garment__timeline-step">06. Packaging</span>
          </div>
        </div>

        {/* ── Cinematic 6-Stage Timeline Journey ─────────────── */}
        <div className="behind-garment__steps-grid">
          {MANUFACTURING_STEPS.map((item, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={item.step}
                className={`behind-garment__step-card ${
                  isReversed ? 'behind-garment__step-card--reversed' : ''
                }`}
              >
                {/* Visual Media Frame with Large Imagery */}
                <div className="behind-garment__media-wrap">
                  <div className="behind-garment__media">
                    <img
                      src={item.image}
                      alt={`${item.step}. ${item.title}`}
                      className="behind-garment__img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="behind-garment__media-overlay" aria-hidden="true" />
                    <span className="behind-garment__step-indicator label">
                      STAGE {item.step}
                    </span>
                  </div>
                </div>

                {/* Content Narrative Block */}
                <div className="behind-garment__body">
                  <div className="behind-garment__step-num-large" aria-hidden="true">
                    {item.step}
                  </div>
                  <div className="behind-garment__meta">
                    <span className="behind-garment__category label">{item.metric}</span>
                    <h3 className="behind-garment__step-title">{item.title}</h3>
                    <h4 className="behind-garment__step-headline">{item.headline}</h4>
                  </div>
                  <p className="behind-garment__step-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BehindTheGarment;
