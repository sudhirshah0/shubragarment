/* ═══════════════════════════════════════════════════════════════
   Footer — Luxury Atelier Directory, Newsletter & Brand Heritage
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Footer.css';

const FOOTER_COLLECTIONS = [
  { label: 'Bespoke Overcoats', href: '#collections' },
  { label: 'Tailored Power Suits', href: '#collections' },
  { label: 'Pleated Gurkha Trousers', href: '#collections' },
  { label: 'Artisan Dress Shirts', href: '#collections' },
  { label: 'Luxury Supima T-Shirts', href: '#collections' },
];

const FOOTER_SERVICES = [
  { label: 'Live 3D Custom Designer', href: '#custom-designer' },
  { label: 'The 4-Step Atelier Process', href: '#how-it-works' },
  { label: 'Floating Horsehair Canvas', href: '#craftsmanship' },
  { label: 'Enterprise Fleet & Uniforms', href: '#corporate' },
  { label: 'Traveling VIP Master Tailor', href: '#contact' },
];

const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Commission', href: '#' },
  { label: 'Fit Guarantee Policy', href: '#' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      {/* ── Top Newsletter Registry Strip ─────────────────────── */}
      <div className="footer__newsletter-strip">
        <div className="footer__newsletter-inner container">
          <div className="footer__newsletter-content">
            <span className="label">THE ATELIER REGISTRY</span>
            <h3 className="footer__newsletter-title">Privileged Seasonal Releases</h3>
            <p className="tagline">
              Receive private invitations to European cloth trunk shows, seasonal cashmere arrivals, and executive fitting appointments.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="footer__newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer__newsletter-input"
            />
            <button
              type="submit"
              className="footer__newsletter-btn"
              data-cursor-text="JOIN"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="footer__newsletter-msg">
              <span>✓ Welcome to the Shubra Registry. Our seasonal dossier has been dispatched.</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Footer Directory Grid ────────────────────────── */}
      <div className="footer__main container">
        <div className="footer__grid">
          {/* Brand Identity Column */}
          <div className="footer__col footer__col--brand">
            <a href="#" className="footer__logo" aria-label="Shubra Garments">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                className="footer__logo-svg"
                aria-hidden="true"
              >
                <g transform="translate(20,20)">
                  <ellipse cx="-4" cy="-4" rx="7.5" ry="5" transform="rotate(-45)" fill="#A67C2E" />
                  <ellipse cx="4" cy="-4" rx="7.5" ry="5" transform="rotate(45)" fill="#D9BC7A" />
                  <ellipse cx="4" cy="4" rx="7.5" ry="5" transform="rotate(-45)" fill="#A67C2E" />
                  <ellipse cx="-4" cy="4" rx="7.5" ry="5" transform="rotate(45)" fill="#7E5F22" />
                  <circle cx="0" cy="0" r="1.5" fill="#F7F2EC" />
                </g>
              </svg>
              <div className="footer__logo-text">
                <span className="footer__brand-title">SHUBRA</span>
                <span className="footer__brand-sub">GARMENTS • DUBAI</span>
              </div>
            </a>

            <p className="footer__brand-desc">
              Haute couture bespoke suiting and luxury institutional uniforms crafted with architectural precision in the United Arab Emirates.
            </p>

            <div className="footer__socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                IG
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                LN
              </a>
              <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">
                WA
              </a>
            </div>
          </div>

          {/* Directory Column 1: Collections */}
          <div className="footer__col">
            <span className="label footer__col-heading">COLLECTIONS</span>
            <ul className="footer__links">
              {FOOTER_COLLECTIONS.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="footer__link">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Column 2: Atelier Services */}
          <div className="footer__col">
            <span className="label footer__col-heading">ATELIER SERVICES</span>
            <ul className="footer__links">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="footer__link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Column 3: Flagship Address */}
          <div className="footer__col footer__col--address">
            <span className="label footer__col-heading">DUBAI FLAGSHIP</span>
            <p className="footer__address-text">
              Villa 14, Al Wasl Road<br />
              Jumeirah 1, Dubai, UAE
            </p>
            <div className="footer__address-contact">
              <a href="tel:+97140000000" className="footer__link">
                +971 4 000 0000
              </a>
              <a href="mailto:concierge@shubragarments.com" className="footer__link">
                concierge@shubragarments.com
              </a>
            </div>
            <span className="footer__valet-tag label">PRIVATE VALET AVAILABLE</span>
          </div>
        </div>

        {/* ── Bottom Sub-Bar: Copyright, Legal & Back to Top ────── */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>© 2026 Shubra Garments LLC. Handcrafted with distinction in Dubai, UAE.</p>
          </div>

          <div className="footer__legal-links">
            {FOOTER_LEGAL.map((l) => (
              <a key={l.label} href={l.href} className="footer__legal-link">
                {l.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer__back-to-top"
            aria-label="Back to Top"
            data-cursor-text="TOP"
          >
            <span>Back To Top</span>
            <span className="footer__top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
