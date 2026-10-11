/* ═══════════════════════════════════════════════════════════════
   Navbar — Luxury responsive navigation bar
   Features:
   - Official Atelier Logo Emblem + Brand Typography Mark
   - Smart scroll detection: auto-hides on down-scroll, reveals on up-scroll
   - Frosted glassmorphism background with bronze border upon scrolling
   - Perfectly balanced responsive navigation links and CTA
   - Smooth staggered mobile drawer menu with touch-friendly interactions
   - Integrated MagneticButton CTA
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'COLLECTION', href: '#collections' },
  { label: 'CUSTOM DESIGN', href: '#custom-designer' },
  { label: 'CORPORATE / B2B', href: '#corporate' },
  { label: 'LOOKBOOK', href: '#lookbook' },
  { label: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout modal & order placed states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    email: '',
    emirate: 'Dubai',
    deliveryAddress: '',
    fittingOption: 'Atelier Fitting in Showroom',
    notes: '',
  });

  useEffect(() => {
    const handleCartUpdate = (e) => {
      if (e.detail) {
        const item = e.detail;
        setCartCount((prev) => prev + (item.quantity || 1));
        setCartItems((prev) => {
          const existingIdx = prev.findIndex(
            (p) => p.id === item.id && p.color === item.color && p.size === item.size
          );
          if (existingIdx > -1) {
            const updated = [...prev];
            updated[existingIdx].quantity += item.quantity || 1;
            return updated;
          }
          return [...prev, { ...item }];
        });
      }
    };
    const handleOpenCartEvent = () => {
      setIsCartOpen(true);
    };

    window.addEventListener('shubra:add-to-cart', handleCartUpdate);
    window.addEventListener('shubra:open-cart', handleOpenCartEvent);
    return () => {
      window.removeEventListener('shubra:add-to-cart', handleCartUpdate);
      window.removeEventListener('shubra:open-cart', handleOpenCartEvent);
    };
  }, []);

  // Lock background scroll and pause Lenis while cart or checkout modal is open
  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isCheckoutOpen;
    if (isAnyModalOpen) {
      if (window.lenis) {
        window.lenis.stop();
      }
      document.body.classList.add('scroll-locked');
    } else {
      document.body.classList.remove('scroll-locked');
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.classList.remove('scroll-locked');
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isCartOpen, isCheckoutOpen]);

  // Press ESC to close any modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isCheckoutOpen) closeCheckout();
        else if (isCartOpen) closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, isCheckoutOpen]);

  // Dismiss cart popup when clicking anywhere in blank space outside the cart panel or navbar cart toggle
  useEffect(() => {
    if (!isCartOpen) return;

    const handleDocumentClick = (e) => {
      // If clicking inside the cart panel or inside the cart trigger button, let those handle themselves
      const isCartPanelClick = e.target.closest && e.target.closest('.navbar-cart__panel');
      const isCartBtnClick = e.target.closest && e.target.closest('.navbar__cart-btn');

      if (!isCartPanelClick && !isCartBtnClick) {
        closeCart();
      }
    };

    // Use capture phase so blank space clicks on document/background dismiss immediately
    document.addEventListener('pointerdown', handleDocumentClick, true);
    return () => {
      document.removeEventListener('pointerdown', handleDocumentClick, true);
    };
  }, [isCartOpen]);

  const openCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setOrderPlaced(false);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setOrderPlaced(false);
  };

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerPartyAnimation = () => {
    // Multi-stage luxury gold & metallic confetti cannon in the dead front of the screen
    const count = 220;
    const defaults = {
      origin: { y: 0.6 },
      zIndex: 9999999,
      disableForReducedMotion: false,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#A67C2E', '#D9BC7A', '#F7F2EC'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#2B211A', '#A67C2E', '#EFE7DC'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#D9BC7A', '#FFFFFF', '#A67C2E'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#A67C2E', '#7E5F22'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FFDF00', '#D4AF37', '#FAF0E6'],
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    // Trigger burst right away and another cascade 120ms later as dialog updates
    triggerPartyAnimation();
    setTimeout(() => {
      triggerPartyAnimation();
    }, 150);

    // Clear cart after placement
    setCartItems([]);
    setCartCount(0);
  };

  const removeItem = (index) => {
    setCartItems((prev) => {
      const target = prev[index];
      if (target) {
        setCartCount((cnt) => Math.max(0, cnt - target.quantity));
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const subtotal = cartItems.reduce((acc, curr) => {
    const priceNum = parseInt(String(curr.price || '').replace(/[^0-9]/g, ''), 10) || 0;
    return acc + priceNum * curr.quantity;
  }, 0);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nextScrolled = currentScrollY > 20;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add('mobile-nav-locked');
    } else {
      document.body.classList.remove('mobile-nav-locked');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const handleLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${
        isMobileOpen ? 'navbar--mobile-open' : ''
      }`}
      role="banner"
    >
      <div className="navbar__inner container">
        {/* ── Brand Logo with Official Gold Emblem ───────────────── */}
        <a
          href="#"
          className="navbar__logo"
          aria-label="Shubra Garments Home"
        >
          <div className="navbar__logo-symbol">
            <img
              src="/images/logo.png"
              alt="Shubra Garments Emblem"
              className="navbar__logo-img"
              width="38"
              height="38"
            />
          </div>
          <div className="navbar__logo-text">
            <img
              src="/images/logo-text.png"
              alt="Shubra Garments"
              className="navbar__logo-text-img"
              height="20"
            />
          </div>
        </a>

        {/* ── Desktop Navigation Links ────────────────────────── */}
        <nav className="navbar__nav" aria-label="Main Navigation">
          <ul className="navbar__menu">
            {NAV_LINKS.map((item) => (
              <li key={item.label} className="navbar__item">
                <a
                  href={item.href}
                  className="navbar__link"
                >
                  <span className="navbar__link-label">{item.label}</span>
                  <span className="navbar__link-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Desktop Right Actions & CTA ─────────────────────── */}
        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__cart-btn"
            onClick={openCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <span className="navbar__cart-icon">🛒</span>
            <span className="navbar__cart-label">CART</span>
            <span className="navbar__cart-count">{cartCount}</span>
          </button>

          {/* ── Mobile Hamburger Toggle ───────────────────────── */}
          <button
            type="button"
            className={`navbar__hamburger ${isMobileOpen ? 'navbar__hamburger--active' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            <span className="navbar__hamburger-line navbar__hamburger-line--1" />
            <span className="navbar__hamburger-line navbar__hamburger-line--2" />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer Menu ──────────────────────────────── */}
      <div
        id="mobile-navigation"
        className={`navbar__mobile-drawer ${isMobileOpen ? 'navbar__mobile-drawer--active' : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="navbar__mobile-backdrop" onClick={() => setIsMobileOpen(false)} />
        <div className="navbar__mobile-content">
          <div className="navbar__mobile-header">
            <div className="navbar__mobile-brand">
              <img
                src="/images/logo.png"
                alt="Shubra Garments"
                className="navbar__mobile-logo-img"
                width="34"
                height="34"
              />
              <img
                src="/images/logo-text.png"
                alt="Shubra Garments"
                className="navbar__mobile-text-img"
                height="18"
              />
            </div>
            <span className="tagline">Bespoke Atelier • Dubai</span>
          </div>

          <ul className="navbar__mobile-list">
            {NAV_LINKS.map((item, index) => (
              <li
                key={item.label}
                className="navbar__mobile-item"
                style={{ '--stagger': `${index * 0.08}s` }}
              >
                <a
                  href={item.href}
                  className="navbar__mobile-link"
                  onClick={handleLinkClick}
                >
                  <span className="navbar__mobile-num">0{index + 1}</span>
                  <span className="navbar__mobile-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__mobile-footer">
            <MagneticButton
              href="#custom-designer"
              variant="primary"
              size="md"
              onClick={handleLinkClick}
              className="navbar__mobile-cta"
            >
              Launch Custom Designer
            </MagneticButton>

            <div className="navbar__mobile-meta">
              <p>Showroom & Atelier • Business Bay, Dubai, UAE</p>
              <a href="tel:+97140000000" className="navbar__mobile-tel">
                +971 4 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Luxury Cart Slide-Out Drawer ─────────────────────── */}
      {isCartOpen && (
        <div
          className="navbar-cart"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart"
          data-lenis-prevent
          onClick={closeCart}
        >
          <div className="navbar-cart__backdrop" aria-hidden="true" />
          <div
            className="navbar-cart__panel"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <div className="navbar-cart__header">
              <div className="navbar-cart__header-title">
                <span className="navbar-cart__icon">🛒</span>
                <h3>Atelier Bag ({cartCount})</h3>
              </div>
              <button
                type="button"
                className="navbar-cart__close"
                onClick={closeCart}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="navbar-cart__body" data-lenis-prevent>
              {cartItems.length === 0 ? (
                <div className="navbar-cart__empty">
                  <span className="navbar-cart__empty-icon">🛍️</span>
                  <h4>Your Bag is Empty</h4>
                  <p>Discover our signature coats, suits, shirts, and tailored collections.</p>
                  <a href="#collections" className="navbar-cart__shop-btn" onClick={closeCart}>
                    Explore Collections →
                  </a>
                </div>
              ) : (
                <div className="navbar-cart__list">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.id}-${item.color}-${item.size}-${idx}`} className="navbar-cart__item">
                      <div className="navbar-cart__item-img-wrap">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="navbar-cart__item-img" />
                        )}
                      </div>
                      <div className="navbar-cart__item-info">
                        <div className="navbar-cart__item-top">
                          <h4 className="navbar-cart__item-title">{item.title}</h4>
                          <button
                            type="button"
                            className="navbar-cart__remove-btn"
                            onClick={() => removeItem(idx)}
                            aria-label={`Remove ${item.title}`}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="navbar-cart__item-specs">
                          <span className="label">Color: {item.color}</span>
                          <span className="label">•</span>
                          <span className="label">Size: {item.size}</span>
                        </div>
                        <div className="navbar-cart__item-bottom">
                          <span className="navbar-cart__item-qty">Qty: {item.quantity}</span>
                          <strong className="navbar-cart__item-price">{item.price}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="navbar-cart__footer">
                <div className="navbar-cart__subtotal-row">
                  <span>Subtotal</span>
                  <strong>AED {subtotal.toLocaleString()}</strong>
                </div>
                <button
                  type="button"
                  className="navbar-cart__checkout-btn"
                  onClick={openCheckout}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Luxury Checkout Popup Dialog ────────────────────────── */}
      {isCheckoutOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
            data-lenis-prevent
            onClick={closeCheckout}
          >
            <div className="checkout-modal__backdrop" aria-hidden="true" />
            <div
              className="checkout-modal__dialog"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="checkout-modal__close"
                onClick={closeCheckout}
                aria-label="Close checkout"
              >
                ✕
              </button>

              {!orderPlaced ? (
                <div className="checkout-modal__content">
                  <div className="checkout-modal__header">
                    <span className="checkout-modal__badge label">ATELIER ORDER FORM</span>
                    <h3 id="checkout-modal-title" className="checkout-modal__title">Complete Your Order</h3>
                    <p className="checkout-modal__subtitle">
                      Enter your delivery and tailoring details. Our master atelier team will coordinate your order fitting.
                    </p>
                  </div>

                  <form className="checkout-modal__form" onSubmit={handlePlaceOrder}>
                    <div className="checkout-modal__row">
                      <div className="checkout-modal__field">
                        <label className="checkout-modal__label">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. Tariq Al Mansoori"
                          value={checkoutData.fullName}
                          onChange={handleCheckoutChange}
                          className="checkout-modal__input"
                        />
                      </div>

                      <div className="checkout-modal__field">
                        <label className="checkout-modal__label">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+971 50 123 4567"
                          value={checkoutData.phone}
                          onChange={handleCheckoutChange}
                          className="checkout-modal__input"
                        />
                      </div>
                    </div>

                    <div className="checkout-modal__row">
                      <div className="checkout-modal__field">
                        <label className="checkout-modal__label">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="tariq@company.ae"
                          value={checkoutData.email}
                          onChange={handleCheckoutChange}
                          className="checkout-modal__input"
                        />
                      </div>

                      <div className="checkout-modal__field">
                        <label className="checkout-modal__label">Emirate *</label>
                        <select
                          name="emirate"
                          value={checkoutData.emirate}
                          onChange={handleCheckoutChange}
                          className="checkout-modal__input"
                        >
                          <option value="Dubai">Dubai</option>
                          <option value="Sharjah">Sharjah</option>
                          <option value="Abu Dhabi">Abu Dhabi</option>
                          <option value="Ajman">Ajman</option>
                          <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                          <option value="Fujairah">Fujairah</option>
                          <option value="Umm Al Quwain">Umm Al Quwain</option>
                        </select>
                      </div>
                    </div>

                    <div className="checkout-modal__field">
                      <label className="checkout-modal__label">Delivery / Office Address *</label>
                      <input
                        type="text"
                        name="deliveryAddress"
                        required
                        placeholder="Street, Building, Office / Villa Number"
                        value={checkoutData.deliveryAddress}
                        onChange={handleCheckoutChange}
                        className="checkout-modal__input"
                      />
                    </div>

                    <div className="checkout-modal__field">
                      <label className="checkout-modal__label">Bespoke Fitting Preference</label>
                      <select
                        name="fittingOption"
                        value={checkoutData.fittingOption}
                        onChange={handleCheckoutChange}
                        className="checkout-modal__input"
                      >
                        <option value="Atelier Fitting in Showroom">Atelier Fitting at Showroom (Sharjah / Dubai)</option>
                        <option value="On-site Master Tailor Visit">Send Master Tailor to My Office / Villa</option>
                        <option value="Standard Tailored Sizing">Standard Tailored Sizing (Deliver Directly)</option>
                      </select>
                    </div>

                    <div className="checkout-modal__field">
                      <label className="checkout-modal__label">Special Tailoring Notes (Optional)</label>
                      <textarea
                        name="notes"
                        rows="2"
                        placeholder="Any monogramming, lining preferences, or delivery instructions..."
                        value={checkoutData.notes}
                        onChange={handleCheckoutChange}
                        className="checkout-modal__input checkout-modal__textarea"
                      />
                    </div>

                    <div className="checkout-modal__summary-card">
                      <div className="checkout-modal__summary-line">
                        <span>Total Items:</span>
                        <strong>{cartCount} Garments</strong>
                      </div>
                      <div className="checkout-modal__summary-line checkout-modal__summary-line--total">
                        <span>Total Amount:</span>
                        <strong>AED {subtotal.toLocaleString()}</strong>
                      </div>
                    </div>

                    <button type="submit" className="checkout-modal__submit-btn">
                      <span>Place Order</span>
                      <span>→</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* ── Order Placed Success Screen with Party Celebration ── */
                <div className="checkout-modal__success">
                  <div className="checkout-modal__success-badge">
                    <span className="checkout-modal__party-icon">🎉</span>
                  </div>
                  <h3 className="checkout-modal__success-title">Order Placed Successfully!</h3>
                  <p className="checkout-modal__success-text">
                    Thank you, <strong>{checkoutData.fullName || 'Valued Customer'}</strong>. Your bespoke garment order has been received by our master atelier team.
                  </p>
                  <div className="checkout-modal__order-receipt">
                    <div className="checkout-modal__receipt-line">
                      <span>Order Ref:</span>
                      <strong>#SG-{Math.floor(100000 + Math.random() * 900000)}</strong>
                    </div>
                    <div className="checkout-modal__receipt-line">
                      <span>Emirate:</span>
                      <strong>{checkoutData.emirate}</strong>
                    </div>
                    <div className="checkout-modal__receipt-line">
                      <span>Service:</span>
                      <strong>{checkoutData.fittingOption}</strong>
                    </div>
                  </div>

                  <div className="checkout-modal__success-actions">
                    <button
                      type="button"
                      className="checkout-modal__celebrate-btn"
                      onClick={triggerPartyAnimation}
                    >
                      <span>More Confetti! 🎊</span>
                    </button>
                    <button
                      type="button"
                      className="checkout-modal__done-btn"
                      onClick={closeCheckout}
                    >
                      Done & Return to Atelier
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Navbar;
