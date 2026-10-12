import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

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
  const footerRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Newsletter Strip Reveal
      gsap.fromTo(
        '.footer__newsletter-strip',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__newsletter-strip',
            start: 'top 90%',
            once: true,
          },
        }
      );

      // 2. Directory Columns Staggered Reveal
      gsap.fromTo(
        '.footer__grid .footer__col',
        { opacity: 0, y: 45, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__grid',
            start: 'top 88%',
            once: true,
          },
        }
      );

      // 3. Footer Bottom Bar
      gsap.fromTo(
        '.footer__bottom',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer__bottom',
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

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
    <footer ref={footerRef} className="footer" role="contentinfo">
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
            <a href="#" className="footer__logo" aria-label="Shubra Garments Home">
              <div className="footer__logo-symbol">
                <img
                  src="/images/logo.png"
                  alt="Shubra Garments Emblem"
                  className="footer__logo-img"
                  width="42"
                  height="42"
                />
              </div>
              <div className="footer__logo-text">
                <img
                  src="/images/logo-text.png"
                  alt="Shubra Garments"
                  className="footer__logo-text-img"
                  height="22"
                />
              </div>
            </a>

            <p className="footer__tagline">
              Premium Garment Manufacturing in the UAE
            </p>

            <p className="footer__brand-desc">
              Haute couture bespoke suiting and luxury institutional uniforms crafted with architectural precision in the United Arab Emirates.
            </p>

            <div className="footer__socials" aria-label="Social Media Links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
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
