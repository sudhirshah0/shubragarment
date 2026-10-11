/* ═══════════════════════════════════════════════════════════════
   Collections — Infinite Swipe Carousel with Center Focus & Modal
   Features:
   - 5 Clean Categories: Coats, Suits, Pants, Shirts, T-Shirts
   - Infinite 3D cloth swipe from Left-to-Right & Right-to-Left
   - Middle garment is visually enlarged (3D scale, pedestal glow & shadow)
   - Clicking middle garment opens interactive detail modal:
       * Color swatch selector with instant cloth image swap
       * Size selector
       * Fabric specs, fit, lead time & pricing
       * "Add to Cart" button with quantity & floating cart drawer notification
   - Touch drag, mouse drag, keyboard arrows, and prev/next controls
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect, useCallback } from 'react';
import { collectionsData } from '../../data/collections';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Collections.css';

const Collections = () => {
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [modalColorIndex, setModalColorIndex] = useState(0);
  const [modalSize, setModalSize] = useState('M');
  const [modalQty, setModalQty] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [flyingItem, setFlyingItem] = useState(null);
  const modalImgRef = useRef(null);

  // Keyboard escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedGarment && e.key === 'Escape') {
        setSelectedGarment(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGarment]);

  // Lock background page scroll and pause Lenis virtual scroll while modal is open
  useEffect(() => {
    if (selectedGarment) {
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
  }, [selectedGarment]);


  const closeModal = () => {
    setSelectedGarment(null);
  };

  const handleAddToCart = () => {
    const item = selectedGarment;
    if (!item) return;
    const selectedColor = item.colors[modalColorIndex];

    // Trigger visual feedback
    setAddedToast(true);

    // Get current source image position
    let startX = window.innerWidth / 2;
    let startY = window.innerHeight / 2;
    let startW = 140;
    let startH = 160;

    if (modalImgRef.current) {
      const rect = modalImgRef.current.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
      startW = rect.width;
      startH = rect.height;
    }

    // Locate target cart button (navbar cart button or stage button)
    const cartTarget = document.querySelector('.navbar__cart-btn') || document.querySelector('.navbar__actions');
    let targetX = window.innerWidth - 80;
    let targetY = 32;

    if (cartTarget) {
      const targetRect = cartTarget.getBoundingClientRect();
      targetX = targetRect.left + targetRect.width / 2;
      targetY = targetRect.top + targetRect.height / 2;
    }

    // Set flying item with source and destination coordinates
    setFlyingItem({
      image: selectedColor.image,
      startX,
      startY,
      startW,
      startH,
      targetX,
      targetY,
    });

    // After flight arrives (750ms), increment cart counter & trigger celebration shake on cart icon
    setTimeout(() => {
      setCartCount((prev) => prev + modalQty);

      const cartBtnEl = document.querySelector('.navbar__cart-btn');
      if (cartBtnEl) {
        cartBtnEl.classList.add('navbar__cart-btn--bounce');
        setTimeout(() => cartBtnEl.classList.remove('navbar__cart-btn--bounce'), 600);
      }

      // Dispatch event for global cart
      window.dispatchEvent(
        new CustomEvent('shubra:add-to-cart', {
          detail: {
            id: item.id,
            title: item.title,
            color: selectedColor.name,
            size: modalSize,
            price: item.price,
            quantity: modalQty,
            image: selectedColor.image,
          },
        })
      );
    }, 700);

    // Clean up flying item and close modal smoothly
    setTimeout(() => {
      setFlyingItem(null);
    }, 850);

    setTimeout(() => {
      setAddedToast(false);
      closeModal();
    }, 1100);
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'blazers', label: 'Blazers' },
    { key: 'outerwear', label: 'Outerwear' },
    { key: 'uniforms', label: 'Uniforms' },
    { key: 'workwear', label: 'Workwear' },
  ];

  const filteredItems = activeCategory === 'all'
    ? collectionsData
    : collectionsData.filter((item) => {
        if (activeCategory === 'blazers') return item.category === 'blazers';
        if (activeCategory === 'outerwear') return item.category === 'leather' || item.category === 'headwear' || item.category === 'casual';
        if (activeCategory === 'uniforms') return item.category === 'aviation' || item.category === 'trousers';
        if (activeCategory === 'workwear') return item.category === 'workwear';
        return item.category === activeCategory;
      });

  const [showAll, setShowAll] = useState(false);
  const collectionsSectionRef = useRef(null);

  // Show only 2 rows (8 items in 4-column layout) by default
  const INITIAL_LIMIT = 8;
  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, INITIAL_LIMIT);
  const hasMore = filteredItems.length > INITIAL_LIMIT;

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
    // Refresh ScrollTrigger so layout height change updates all lower section triggers immediately
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 100);
  };

  const openItemModal = (item, colorIndex = 0) => {
    setSelectedGarment(item);
    setModalColorIndex(colorIndex);
    setModalSize('M');
    setModalQty(1);
  };

  return (
    <section
      ref={collectionsSectionRef}
      className="collections section"
      id="collections"
      aria-label="Curated Garment Collections"
    >
      <div className="collections__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="collections__header">
          <div className="collections__title-wrap">
            <h2 className="collections__title">Our Curated Collections</h2>
            <p className="collections__subtitle">
              Explore our master-tailored garments by category, crafted with fine Italian wools, Egyptian Giza cottons, and pure Mongolian cashmere.
            </p>
          </div>

          {/* ── Category Filter Pills ──────────────────────────── */}
          <div className="collections__category-bar" role="tablist" aria-label="Collections Categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.key}
                className={`collections__category-tab ${
                  activeCategory === cat.key ? 'collections__category-tab--active' : ''
                }`}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setShowAll(false);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Clean Box Product Grid (2 rows initial) ──────────── */}
        <div className="collections__grid">
          {displayedItems.map((item) => (
            <div key={item.id} className="collection-box">
              {/* Product Media Box */}
              <div
                className="collection-box__media"
                onClick={() => openItemModal(item, 0)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openItemModal(item, 0);
                }}
                aria-label={`View ${item.title}`}
              >
                <div className="collection-box__glow" aria-hidden="true" />
                <img
                  src={item.colors[0].image}
                  alt={item.title}
                  className="collection-box__img"
                  loading="lazy"
                />
              </div>

              {/* Product Card Details */}
              <div className="collection-box__info">
                <div className="collection-box__title-row">
                  <h3 className="collection-box__title" onClick={() => openItemModal(item, 0)}>
                    {item.title}
                  </h3>
                </div>
                <p className="collection-box__tagline">{item.tagline}</p>

                {/* Color Swatch Dots & Price Row */}
                <div className="collection-box__swatches-row">
                  <div className="collection-box__swatches">
                    {item.colors.map((c, cIdx) => (
                      <button
                        key={c.name}
                        type="button"
                        className="collection-box__swatch-dot"
                        style={{ backgroundColor: c.hex }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openItemModal(item, cIdx);
                        }}
                        title={`${c.name} — Click to view`}
                        aria-label={`View ${item.title} in ${c.name}`}
                      />
                    ))}
                  </div>

                  {/* Price placed right on all screens */}
                  <span className="collection-box__price">{item.price}</span>
                </div>

                {/* Quick Add to Cart Button */}
                <div className="collection-box__actions">
                  <button
                    type="button"
                    className="collection-box__btn"
                    onClick={() => openItemModal(item, 0)}
                  >
                    <span>Add to Cart</span>
                    <span className="collection-box__btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── View More Button (when more than 2 rows exist) ──── */}
        {hasMore && (
          <div className="collections__view-more-wrap">
            <button
              type="button"
              className="collections__view-more-btn"
              onClick={handleToggleShowAll}
            >
              <span>{showAll ? 'Show Less' : `View More (${filteredItems.length - INITIAL_LIMIT} more)`}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════
          GARMENT DETAILS & COLOR SELECTION MODAL POPUP
          ═════════════════════════════════════════════════════════════ */}
      {selectedGarment && (
        <div
          className="collections-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-garment-title"
          data-lenis-prevent
          onClick={closeModal}
        >
          {/* Backdrop Click Closes Modal */}
          <div className="collections-modal__backdrop" aria-hidden="true" />

          <div
            className="collections-modal__dialog"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="collections-modal__close"
              onClick={closeModal}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="collections-modal__grid">
              {/* Left Column: Interactive Swatch Image Stage */}
              <div className="collections-modal__media-col">
                <div className="collections-modal__img-stage">
                  <div className="collections-modal__img-glow" aria-hidden="true" />
                  <img
                    ref={modalImgRef}
                    key={selectedGarment.colors[modalColorIndex].image}
                    src={selectedGarment.colors[modalColorIndex].image}
                    alt={`${selectedGarment.title} in ${selectedGarment.colors[modalColorIndex].name}`}
                    className="collections-modal__img"
                  />
                  <div className="collections-modal__ground-shadow" aria-hidden="true" />
                </div>

                <div className="collections-modal__color-label">
                  <span className="label">SELECTED COLOR:</span>
                  <strong>{selectedGarment.colors[modalColorIndex].name}</strong>
                </div>
              </div>

              {/* Right Column: Garment Specs, Swatches & Add-To-Cart */}
              <div className="collections-modal__details-col">
                <h3 id="modal-garment-title" className="collections-modal__title">
                  {selectedGarment.title}
                </h3>

                <p className="collections-modal__desc">{selectedGarment.description}</p>

                {/* 1. Color Swatch Selector with Price next to it */}
                <div className="collections-modal__swatch-group">
                  <div className="collections-modal__group-label">
                    <div className="collections-modal__color-info">
                      <span className="label">COLOR:</span>
                      <span className="collections-modal__active-color-name">
                        {selectedGarment.colors[modalColorIndex].name}
                      </span>
                    </div>
                    <span className="collections-modal__price-tag">
                      AED {(selectedGarment.basePriceNum * modalQty).toLocaleString()}
                    </span>
                  </div>
                  <div className="collections-modal__swatches">
                    {selectedGarment.colors.map((color, cIdx) => (
                      <button
                        key={color.name}
                        type="button"
                        className={`collections-modal__swatch-circle ${
                          modalColorIndex === cIdx ? 'collections-modal__swatch-circle--active' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setModalColorIndex(cIdx)}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Size Selector (Clean single row) */}
                <div className="collections-modal__size-group">
                  <div className="collections-modal__group-label">
                    <span className="label">SIZE</span>
                  </div>
                  <div className="collections-modal__sizes">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`collections-modal__size-btn ${
                          modalSize === sz ? 'collections-modal__size-btn--active' : ''
                        }`}
                        onClick={() => setModalSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Minimal Single-Line Spec */}
                <div className="collections-modal__quick-spec">
                  <span className="collections-modal__spec-pill">
                    {selectedGarment.fabric ? selectedGarment.fabric.split('(')[0].trim() : 'Premium Fabric'}
                  </span>
                </div>

                {/* 4. Quantity and Add-To-Cart Action */}
                <div className="collections-modal__actions">
                  <div className="collections-modal__qty-selector">
                    <button
                      type="button"
                      className="collections-modal__qty-btn"
                      onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    >
                      –
                    </button>
                    <span className="collections-modal__qty-val">{modalQty}</span>
                    <button
                      type="button"
                      className="collections-modal__qty-btn"
                      onClick={() => setModalQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`collections-modal__cart-btn ${
                      addedToast ? 'collections-modal__cart-btn--added' : ''
                    }`}
                    onClick={handleAddToCart}
                  >
                    {addedToast ? '✓ Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Flying Cloth to Cart Animation Portal ───────────── */}
      {flyingItem && (
        <div
          className="collections-flyer"
          style={{
            '--start-x': `${flyingItem.startX}px`,
            '--start-y': `${flyingItem.startY}px`,
            '--start-w': `${flyingItem.startW}px`,
            '--start-h': `${flyingItem.startH}px`,
            '--target-x': `${flyingItem.targetX}px`,
            '--target-y': `${flyingItem.targetY}px`,
          }}
          aria-hidden="true"
        >
          <img
            src={flyingItem.image}
            alt=""
            className="collections-flyer__img"
          />
        </div>
      )}
    </section>
  );
};

export default Collections;
