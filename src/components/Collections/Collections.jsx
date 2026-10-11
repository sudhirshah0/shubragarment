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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [modalColorIndex, setModalColorIndex] = useState(0);
  const [modalSize, setModalSize] = useState('M');
  const [modalQty, setModalQty] = useState(1);
  const [addedToast, setAddedToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [flyingItem, setFlyingItem] = useState(null);
  const modalImgRef = useRef(null);

  // Swipe / Drag tracking
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);

  const total = collectionsData.length; // 5

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch and Mouse drag gesture listeners
  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
    dragDeltaX.current = 0;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    dragDeltaX.current = currentX - dragStartX.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 45;
    if (dragDeltaX.current < -threshold) {
      nextSlide();
    } else if (dragDeltaX.current > threshold) {
      prevSlide();
    }
    dragDeltaX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedGarment) {
        if (e.key === 'Escape') setSelectedGarment(null);
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, selectedGarment]);

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

  // Open modal with item default
  const handleCardClick = (index) => {
    if (index === currentIndex) {
      const item = collectionsData[currentIndex];
      setSelectedGarment(item);
      setModalColorIndex(0);
      setModalSize('M');
      setModalQty(1);
    } else {
      setCurrentIndex(index);
    }
  };

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

  const currentItem = collectionsData[currentIndex];

  return (
    <section
      className="collections section"
      id="collections"
      aria-label="Curated Garment Collections"
    >
      <div className="collections__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="collections__header">
          <div className="collections__title-wrap">
            <h2 className="collections__title">Our curated collections</h2>
            <p className="collections__subtitle">
              Swipe smoothly through our signature bespoke apparel.
            </p>
          </div>
        </div>

        {/* ── Infinite 3D Swiper Stage ────────────────────────── */}
        <div
          className="collections__swiper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          data-cursor-text="SWIPE"
        >
          {/* Controls: Prev & Next Arrow Buttons */}
          <button
            type="button"
            className="collections__arrow collections__arrow--prev"
            onClick={prevSlide}
            aria-label="Previous Category"
            data-cursor-text="PREV"
          >
            ←
          </button>

          <button
            type="button"
            className="collections__arrow collections__arrow--next"
            onClick={nextSlide}
            aria-label="Next Category"
            data-cursor-text="NEXT"
          >
            →
          </button>

          {/* Cards Track: Render 5 Cards in relative order (-2, -1, 0, 1, 2) */}
          <div className="collections__track">
            {collectionsData.map((item, index) => {
              // Calculate relative offset from center (-2 to +2)
              let offset = (index - currentIndex) % total;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isCenter = offset === 0;

              return (
                <div
                  key={item.id}
                  className={`collections__card ${
                    isCenter ? 'collections__card--center' : ''
                  } collections__card--offset-${offset}`}
                  onClick={() => handleCardClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCardClick(index);
                  }}
                  aria-label={`${item.title} — ${isCenter ? 'Click for colors and details' : 'Click to bring to center'}`}
                  style={{
                    '--offset': offset,
                  }}
                >
                  {/* Backdrop lighting pedestal for the center item */}
                  {isCenter && <div className="collections__card-glow" aria-hidden="true" />}

                  {/* Cutout Cloth Graphic Frame */}
                  <div className="collections__card-media">
                    <img
                      src={item.colors[0].image}
                      alt={item.title}
                      className="collections__card-img"
                      loading="eager"
                      decoding="async"
                    />
                    {/* Shadow underneath garment */}
                    <div className="collections__card-shadow" aria-hidden="true" />
                  </div>

                  {/* Card Meta Content */}
                  <div className="collections__card-info">
                    <span className="collections__card-tag label">{item.shortTitle}</span>
                    <h3 className="collections__card-name">{item.title}</h3>
                    <p className="collections__card-price">{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action: Add To Cart Button for active center garment */}
          <div className="collections__bottom-actions">
            <button
              type="button"
              className="collections__stage-cart-btn"
              onClick={() => handleCardClick(currentIndex)}
              aria-label={`Configure and add ${collectionsData[currentIndex].title} to cart`}
            >
              <span className="collections__stage-cart-icon">🛒</span>
              <span>Add To Cart</span>
              <span className="collections__stage-cart-sep">•</span>
              <span className="collections__stage-cart-price">{collectionsData[currentIndex].price}</span>
            </button>
          </div>
        </div>
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

                {/* 1. Color Swatch Selector */}
                <div className="collections-modal__swatch-group">
                  <div className="collections-modal__group-label">
                    <span className="label">1. CHOOSE COLOR ({selectedGarment.colors.length} SHADES)</span>
                  </div>
                  <div className="collections-modal__swatches">
                    {selectedGarment.colors.map((color, cIdx) => (
                      <button
                        key={color.name}
                        type="button"
                        className={`collections-modal__swatch ${
                          modalColorIndex === cIdx ? 'collections-modal__swatch--active' : ''
                        }`}
                        onClick={() => setModalColorIndex(cIdx)}
                        title={color.name}
                      >
                        <span
                          className="collections-modal__swatch-dot"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="collections-modal__swatch-name">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Size Selector */}
                <div className="collections-modal__size-group">
                  <div className="collections-modal__group-label">
                    <span className="label">2. CHOOSE SIZE</span>
                  </div>
                  <div className="collections-modal__sizes">
                    {['S', 'M', 'L', 'XL', 'XXL', 'Bespoke'].map((sz) => (
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

                {/* 3. Specs List */}
                <div className="collections-modal__specs">
                  <div className="collections-modal__spec-item">
                    <span className="label">FABRIC:</span>
                    <span>{selectedGarment.fabric}</span>
                  </div>
                  <div className="collections-modal__spec-item">
                    <span className="label">FIT:</span>
                    <span>{selectedGarment.fit}</span>
                  </div>
                  <div className="collections-modal__spec-item">
                    <span className="label">CARE:</span>
                    <span>{selectedGarment.care}</span>
                  </div>
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
                    {addedToast ? (
                      <span>✓ Added to Cart!</span>
                    ) : (
                      <>
                        <span>Add To Cart</span>
                        <span className="collections-modal__cart-sub">
                          AED {(selectedGarment.basePriceNum * modalQty).toLocaleString()}
                        </span>
                      </>
                    )}
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
