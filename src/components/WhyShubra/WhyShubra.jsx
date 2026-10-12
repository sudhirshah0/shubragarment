/* ═══════════════════════════════════════════════════════════════
   WhyShubra.jsx — Detailed Atelier Distinction Modal Dialog
   Features:
   - Fullscreen luxurious modal overlay with smooth backdrop blur
   - Rendered via React createPortal to document.body
   - Zero numbering for pure architectural elegance
   - Multi-column editorial grid for pillars
   - Specifications, key metrics, and atelier credentials
   ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './WhyShubra.css';

const DETAILED_PILLARS = [
  {
    id: 'custom-design',
    badge: 'BESPOKE PATTERN ARCHITECTURE',
    title: 'Custom Design',
    tagline: 'Pure anatomical drafting with zero off-the-rack templates.',
    desc: 'Every garment commences with a dedicated individual pattern developed to your precise skeletal geometry. From digitized 3D conceptual drafts to physical master tailor canvas modeling, we realize individual commissions and bespoke private fleets with unmatched creative freedom.',
    highlights: [
      'Individual 3D body pattern drafting',
      'Over 1,200 luxury fabric swatch selections',
      'Customized horn, mother-of-pearl, and gold metal hardware',
      'Bespoke monogramming and personalized lining Jacquards',
    ],
    metric: '100% Anatomical Fit',
  },
  {
    id: 'uae-based',
    badge: 'LOCAL SOVEREIGNTY & VELOCITY',
    title: 'UAE Based Atelier',
    tagline: 'Crafted locally in Dubai with lightning regional execution.',
    desc: 'Operating fully equipped cutting and finishing ateliers within Dubai ensures transparent oversight, zero import delays, and immediate responsiveness. Our traveling master tailors conduct private on-site fittings directly at your corporate headquarters, residence, or luxury hotel across all seven Emirates.',
    highlights: [
      'Atelier located in Dubai Industrial City & Al Quoz',
      'Rapid turnaround with zero international customs delays',
      'Traveling master tailors across Abu Dhabi, Dubai & Sharjah',
      'Same-day VIP alteration and fitting emergency support',
    ],
    metric: 'All 7 Emirates Covered',
  },
  {
    id: 'quality-craft',
    badge: 'SAVILE ROW MASTER CRAFTSMANSHIP',
    title: 'Quality Craft & Materials',
    tagline: 'Full floating horsehair canvas and certified European textiles.',
    desc: 'We reject stiff fused glues and synthetic interlinings. Shubra suiting is crafted with genuine floating Mongolian horsehair chest canvases that naturally conform to the wearer’s contours over time, paired with certified European mills like Vitale Barberis Canonico, Loro Piana, and Reda.',
    highlights: [
      '100% full floating horsehair canvas construction',
      'Hand-sewn Milanese lapel buttonholes with silk gimp',
      'Certified Super 130s to Super 180s worsted wools & cupro linings',
      '42-point quality inspection before client delivery',
    ],
    metric: '42-Point QC Certified',
  },
  {
    id: 'end-to-end',
    badge: 'COMPLETE CONCIERGE LIFECYCLE',
    title: 'End-to-End Service',
    tagline: 'From first sketch to lifetime wardrobe stewardship.',
    desc: 'Our relationship does not terminate at delivery. Shubra maintains a secure digital archive of your measurements, patterns, and fabric batches for effortless reorders. We provide complimentary alteration warranties, wardrobe replenishment schedules, and doorstep valet deliveries.',
    highlights: [
      'Dedicated bespoke relationship concierge',
      'Lifetime digital pattern & measurement archiving',
      'Complimentary seasonal alteration warranties',
      'White-glove valet packaging and hanging wardrobe delivery',
    ],
    metric: 'Lifetime Fit Archive',
  },
  {
    id: 'corporate-experience',
    badge: 'INSTITUTIONAL TRUST & SCALE',
    title: 'Corporate Experience',
    tagline: 'Three decades powering UAE’s most prestigious brand fleets.',
    desc: 'Over 30 years outfitting elite institutions across the Middle East—from 5-star luxury hotel chains and Michelin-starred restaurants to private aviation airlines, government protocol officers, and sovereign investment authorities. We engineer uniforms that marry haute couture dignity with industrial durability.',
    highlights: [
      'Proven volume scalability from 10 to 5,000+ staff uniforms',
      'Performance textiles engineered for Gulf climate resilience',
      'Rigorous brand Pantone color matching across production batches',
      'Trusted by UAE luxury hotels, aviation, and diplomatic protocols',
    ],
    metric: '30+ Years Heritage',
  },
];

const WhyShubra = ({ isOpen, onClose }) => {
  // Lock scroll while modal is active & handle ESC key
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
      className="why-shubra-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="why-shubra-modal-title"
      data-lenis-prevent
      onClick={onClose}
    >
      {/* Frosted Glass Backdrop */}
      <div className="why-shubra-modal__backdrop" aria-hidden="true" />

      {/* Main Modal Dialog */}
      <div
        className="why-shubra-modal__dialog"
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="why-shubra-modal__close"
          onClick={onClose}
          aria-label="Close Why Shubra"
        >
          ✕
        </button>

        {/* Modal Header */}
        <header className="why-shubra-modal__header">
          <div className="why-shubra-modal__badge label">THE SHUBRA DISTINCTION</div>
          <h2 id="why-shubra-modal-title" className="why-shubra-modal__title">
            Why Shubra Garments
          </h2>
          <p className="why-shubra-modal__subtitle">
            Uniting classical Savile Row sartorial tradition with UAE executive precision, sovereign reliability, and white-glove concierge execution.
          </p>

          {/* Quick Metrics Bar */}
          <div className="why-shubra-modal__metrics-bar" aria-label="Atelier Highlights">
            <div className="why-shubra-modal__metric-item">
              <span className="why-shubra-modal__metric-val">30+</span>
              <span className="why-shubra-modal__metric-lbl">Years UAE Heritage</span>
            </div>
            <div className="why-shubra-modal__metric-item">
              <span className="why-shubra-modal__metric-val">100%</span>
              <span className="why-shubra-modal__metric-lbl">Floating Canvas</span>
            </div>
            <div className="why-shubra-modal__metric-item">
              <span className="why-shubra-modal__metric-val">7</span>
              <span className="why-shubra-modal__metric-lbl">Emirates Concierge</span>
            </div>
            <div className="why-shubra-modal__metric-item">
              <span className="why-shubra-modal__metric-val">42-Point</span>
              <span className="why-shubra-modal__metric-lbl">Quality Protocol</span>
            </div>
          </div>
        </header>

        {/* Detailed Pillars Architectural Grid (Easy, Modern cards with Bold headings & Icons) */}
        <div className="why-shubra-modal__pillars-grid">
          {DETAILED_PILLARS.map((pillar) => (
            <article key={pillar.id} className="why-shubra-modal__card">
              <div className="why-shubra-modal__card-header">
                <div className="why-shubra-modal__card-title-wrap">
                  <div className="why-shubra-modal__card-topline">
                    <span className="why-shubra-modal__card-badge label">{pillar.badge}</span>
                    <span className="why-shubra-modal__card-tag">{pillar.metric}</span>
                  </div>
                  <h3 className="why-shubra-modal__card-title">{pillar.title}</h3>
                  <p className="why-shubra-modal__card-tagline">{pillar.tagline}</p>
                </div>
              </div>

              <p className="why-shubra-modal__card-desc">{pillar.desc}</p>

              {/* Specification Checkpoints */}
              <div className="why-shubra-modal__specs">
                <span className="why-shubra-modal__specs-label">Key Highlights & Protocols</span>
                <ul className="why-shubra-modal__specs-list">
                  {pillar.highlights.map((item) => (
                    <li key={item} className="why-shubra-modal__specs-item">
                      <span className="why-shubra-modal__specs-check" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Footer Callout */}
        <footer className="why-shubra-modal__footer">
          <div className="why-shubra-modal__footer-text">
            <h4>Experience the Atelier Distinction</h4>
            <p>Schedule a private fitting consultation or request a custom uniform proposal for your organization.</p>
          </div>
          <a
            href="#contact"
            className="why-shubra-modal__footer-btn"
            onClick={() => onClose()}
          >
            <span>Book Private Consultation →</span>
          </a>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default WhyShubra;
