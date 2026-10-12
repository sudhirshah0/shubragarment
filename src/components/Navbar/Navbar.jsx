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
  { label: 'About', href: '#about' },
  { label: 'Collection', href: '#collections' },
  { label: 'Custom Design', href: '#custom-designer' },
  { label: 'Corporate / B2B', href: '#corporate' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Contact', href: '#contact' },
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

  // Authentication state (Login / Sign Up)
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [authToast, setAuthToast] = useState('');

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

  // Lock background scroll and pause Lenis while cart, checkout, or auth modal is open
  useEffect(() => {
    const isAnyModalOpen = isCartOpen || isCheckoutOpen || isAuthOpen;
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
  }, [isCartOpen, isCheckoutOpen, isAuthOpen]);

  // Press ESC to close any modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isAuthOpen) closeAuthModal();
        else if (isCheckoutOpen) closeCheckout();
        else if (isCartOpen) closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, isCheckoutOpen, isAuthOpen]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setAuthToast('');
  };

  const closeAuthModal = () => {
    setIsAuthOpen(false);
    setAuthToast('');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      setCurrentUser({
        name: authForm.email.split('@')[0] || 'Valued Client',
        email: authForm.email,
      });
      setAuthToast('Signed in successfully!');
    } else {
      setCurrentUser({
        name: authForm.name || 'Valued Client',
        email: authForm.email,
      });
      setAuthToast('Account created successfully!');
    }
    setTimeout(() => {
      setIsAuthOpen(false);
      setAuthToast('');
    }, 900);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

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

  // Lock body scroll and close on outside click when mobile menu is open
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

    const handlePointerDown = (e) => {
      if (!isMobileOpen) return;
      // If click is inside the mobile drawer content or the hamburger toggle button, ignore
      const isInsideMenu = e.target.closest && e.target.closest('.navbar__mobile-content');
      const isHamburger = e.target.closest && e.target.closest('.navbar__hamburger');
      if (!isInsideMenu && !isHamburger) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobileOpen]);

  const handleNavClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        // Use Lenis smooth scroll if available, else smooth native window scrollTo
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, {
            offset: -80,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - 80,
            behavior: 'smooth',
          });
        }

        // Trigger dynamic highlight animation on target section
        targetEl.classList.remove('section--highlight-active');
        void targetEl.offsetWidth; // force reflow
        targetEl.classList.add('section--highlight-active');

        setTimeout(() => {
          targetEl.classList.remove('section--highlight-active');
        }, 1300);
      }
    }

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
                  onClick={(e) => handleNavClick(e, item.href)}
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
          {/* Login / Sign Up Button Before Cart */}
          {currentUser ? (
            <div className="navbar__user-pill" title={`Signed in as ${currentUser.name} (Click ✕ to sign out)`}>
              <div className="navbar__auth-circle">
                <span className="navbar__user-initials">
                  {currentUser.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                className="navbar__logout-badge"
                onClick={handleLogout}
                title="Sign out"
                aria-label="Sign out"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="navbar__auth-btn"
              onClick={() => openAuthModal('login')}
              aria-label="Sign In or Register"
              title="Sign In / Register"
            >
              <div className="navbar__auth-circle">
                <svg
                  className="navbar__auth-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </button>
          )}

          <button
            type="button"
            className="navbar__cart-btn"
            onClick={openCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <div className="navbar__cart-circle">
              <svg
                className="navbar__cart-bag-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="navbar__cart-badge">{cartCount}</span>
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
          <button
            type="button"
            className="navbar__mobile-close-corner-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <ul className="navbar__mobile-list">
            {NAV_LINKS.map((item, index) => (
              <li
                key={item.label}
                className="navbar__mobile-item"
                style={{ '--stagger': `${index * 0.06}s` }}
              >
                <a
                  href={item.href}
                  className="navbar__mobile-link"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="navbar__mobile-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
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

      {/* ── Luxury Client Portal Authentication Modal ──────────── */}
      {isAuthOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="auth-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Client Sign In or Register"
            data-lenis-prevent
            onClick={(e) => {
              if (e.target.classList.contains('auth-modal')) closeAuthModal();
            }}
          >
            <div className="auth-modal__overlay" onClick={closeAuthModal} />
            <div className="auth-modal__dialog" role="document">
              <button
                type="button"
                className="auth-modal__close-btn"
                onClick={closeAuthModal}
                aria-label="Close Authentication Dialog"
              >
                ✕
              </button>

              <div className="auth-modal__header">
                <h3 className="auth-modal__title">
                  {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h3>
                <p className="auth-modal__subtitle">
                  {authMode === 'login'
                    ? 'Sign in to access your bespoke tailoring orders & saved measurements.'
                    : 'Register for priority atelier fittings, private lookbooks & concierge.'}
                </p>
              </div>

              {/* Toggle Switch between Sign In & Sign Up */}
              <div className="auth-modal__tabs" role="tablist">
                <button
                  type="button"
                  className={`auth-modal__tab ${authMode === 'login' ? 'auth-modal__tab--active' : ''}`}
                  onClick={() => setAuthMode('login')}
                  role="tab"
                  aria-selected={authMode === 'login'}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className={`auth-modal__tab ${authMode === 'signup' ? 'auth-modal__tab--active' : ''}`}
                  onClick={() => setAuthMode('signup')}
                  role="tab"
                  aria-selected={authMode === 'signup'}
                >
                  Create Account
                </button>
              </div>

              {authToast && (
                <div className="auth-modal__toast" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{authToast}</span>
                </div>
              )}

              <form className="auth-modal__form" onSubmit={handleAuthSubmit}>
                {authMode === 'signup' && (
                  <div className="auth-modal__field">
                    <label htmlFor="auth-name" className="auth-modal__label">Full Name</label>
                    <input
                      id="auth-name"
                      type="text"
                      className="auth-modal__input"
                      placeholder="e.g. Tariq Al Mansoori"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      required={authMode === 'signup'}
                    />
                  </div>
                )}

                <div className="auth-modal__field">
                  <label htmlFor="auth-email" className="auth-modal__label">Email Address</label>
                  <input
                    id="auth-email"
                    type="email"
                    className="auth-modal__input"
                    placeholder="tariq@luxury-atelier.ae"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="auth-modal__field">
                  <div className="auth-modal__label-row">
                    <label htmlFor="auth-password" className="auth-modal__label">Password</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        className="auth-modal__forgot-btn"
                        onClick={() => alert('Password reset link will be sent to your email.')}
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <input
                    id="auth-password"
                    type="password"
                    className="auth-modal__input"
                    placeholder="••••••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="auth-modal__submit-btn">
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                </button>
              </form>

              <div className="auth-modal__footer">
                <p className="auth-modal__disclaimer">
                  By continuing, you agree to Shubra Garments&apos; Bespoke Terms of Concierge & Privacy Policy.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Navbar;
