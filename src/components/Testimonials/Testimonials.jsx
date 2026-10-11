/* ═══════════════════════════════════════════════════════════════
   Testimonials — Luxury VIP Reviews Slider
   Features:
   - Interactive touch-swipe & arrow carousel
   - Staggered card transition with gold star ratings
   - VIP client quotes, avatar portraits & garment credentials
   - Keyboard navigation & autoplay pause
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react';
import { testimonialsData } from '../../data/testimonials';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Testimonials.css';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const total = testimonialsData.length;

  const currentTestimonial = testimonialsData[activeIndex];

  // Auto-advance slider every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) handlePrev();
    if (diff < -50) handleNext();
  };

  return (
    <section
      className="testimonials section"
      id="testimonials"
      aria-label="Client Testimonials and VIP Reviews"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonials__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="testimonials__header">
          <div className="testimonials__header-row">
            <div className="testimonials__title-wrap">
              <h2 className="testimonials__title">Voices Of Distinction</h2>
              <p className="testimonials__subtitle tagline">
                Diplomatic leaders, luxury hoteliers, and private patrons share their bespoke tailoring experience in Dubai.
              </p>
            </div>

            {/* Carousel Arrow Controls */}
            <div className="testimonials__nav-arrows">
              <button
                type="button"
                className="testimonials__arrow-btn"
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                data-cursor-text="PREV"
              >
                ←
              </button>
              <span className="testimonials__counter label">
                0{activeIndex + 1} / 0{total}
              </span>
              <button
                type="button"
                className="testimonials__arrow-btn"
                onClick={handleNext}
                aria-label="Next Testimonial"
                data-cursor-text="NEXT"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Testimonial Stage Card ────────────────────── */}
        <div
          className="testimonials__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonials__card" key={currentTestimonial.id}>
            {/* Left Column: Client Avatar & Credentials */}
            <div className="testimonials__profile-col">
              <div className="testimonials__avatar-wrap">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  loading="lazy"
                  decoding="async"
                  className="testimonials__avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="testimonials__avatar-crest">❖</span>
              </div>

              <div className="testimonials__client-meta">
                <h3 className="testimonials__client-name">{currentTestimonial.name}</h3>
                <span className="testimonials__client-role">{currentTestimonial.role}</span>
                <span className="testimonials__client-loc label">{currentTestimonial.location}</span>
              </div>

              <div className="testimonials__garment-badge">
                <span className="label">COMMISSIONED:</span>
                <p>{currentTestimonial.garment}</p>
              </div>
            </div>

            {/* Right Column: 5-Star Rating & Quote */}
            <div className="testimonials__quote-col">
              <div className="testimonials__stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="testimonials__star">★</span>
                ))}
                <span className="testimonials__verified-tag label">VERIFIED BESPOKE CLIENT</span>
              </div>

              <blockquote className="testimonials__quote-text">
                “{currentTestimonial.quote}”
              </blockquote>

              <div className="testimonials__quote-signature">
                <span className="tagline">Handcrafted by Shubra Atelier • Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dot Pagination Indicators ───────────────────────── */}
        <div className="testimonials__dots" role="tablist">
          {testimonialsData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`testimonials__dot ${
                activeIndex === index ? 'testimonials__dot--active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
