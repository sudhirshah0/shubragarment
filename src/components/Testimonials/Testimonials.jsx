/* ═══════════════════════════════════════════════════════════════
   Appreciation / Testimonials Section
   - Heading: "Trusted by teams across the UAE."
   - Row of client logos from /public/images/clients/
   - 3 columns of continuously scrolling review cards (CSS infinite loop)
   - Columns move at different speeds, middle starts offset
   - Pause / slow on hover
   - Soft fade masks at top and bottom
   - 1 col mobile, 2 col tablet, 3 col desktop
   - Normal grid when prefers-reduced-motion is enabled
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { sampleReviews, uaeCompaniesList } from '../../data/testimonials';
import './Testimonials.css';

// Helper to extract initials when there's no photo
const getInitials = (name) => {
  if (!name) return 'SG';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const ReviewCard = ({ review }) => {
  return (
    <article className="appreciation__card">
      <p className="appreciation__quote">“{review.quote}”</p>
      
      <div className="appreciation__author">
        <div className="appreciation__avatar">
          {review.photo ? (
            <img
              src={review.photo}
              alt={review.name}
              loading="lazy"
              decoding="async"
              className="appreciation__avatar-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className="appreciation__avatar-initials"
            style={{ display: review.photo ? 'none' : 'flex' }}
            aria-hidden="true"
          >
            {getInitials(review.name)}
          </div>
        </div>

        <div className="appreciation__meta">
          <h4 className="appreciation__name">{review.name}</h4>
          <p className="appreciation__role">
            <span>{review.role}</span>
            <span className="appreciation__dot">•</span>
            <span className="appreciation__company">{review.company}</span>
          </p>
        </div>
      </div>
    </article>
  );
};

const Testimonials = () => {
  // Pool of reviews
  const [shuffledList] = useState(() => {
    return [...sampleReviews].sort(() => Math.random() - 0.5);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 2) % shuffledList.length);
        setFade(true);
      }, 350); // smooth crossfade duration
    }, 4500);

    return () => clearInterval(timer);
  }, [shuffledList.length]);

  const activeReview1 = shuffledList[currentIndex];
  const activeReview2 = shuffledList[(currentIndex + 1) % shuffledList.length];

  const totalPairs = Math.ceil(shuffledList.length / 2);
  const currentPairIdx = Math.floor(currentIndex / 2);

  const goToPair = (pairIdx) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((pairIdx * 2) % shuffledList.length);
      setFade(true);
    }, 350);
  };

  return (
    <section
      className="appreciation section"
      id="appreciation"
      aria-label="Trusted by companies across the UAE"
    >
      <div className="appreciation__container container">
        {/* ── Section Heading & Continuously Swiping Company Marquee ── */}
        <div className="appreciation__header">
          <h2 className="appreciation__title">Trusted by companies across the UAE.</h2>
          <p className="appreciation__subtitle tagline">
            Tailored apparel, bespoke uniforms, and corporate suiting crafted with uncompromising precision.
          </p>

          {/* Automatic Swiping Company Marquee (Left to Right) */}
          <div className="appreciation__marquee-container" aria-label="Partner Companies">
            <div className="appreciation__marquee-track">
              {/* Primary list */}
              {uaeCompaniesList.map((company, idx) => (
                <div key={`comp-a-${idx}`} className="appreciation__company-pill">
                  <span className="appreciation__company-icon" aria-hidden="true">⚜</span>
                  <span className="appreciation__company-name">{company.name}</span>
                  <span className="appreciation__company-sector">{company.sector}</span>
                </div>
              ))}
              {/* Duplicated list for seamless infinite loop */}
              {uaeCompaniesList.map((company, idx) => (
                <div key={`comp-b-${idx}`} className="appreciation__company-pill">
                  <span className="appreciation__company-icon" aria-hidden="true">⚜</span>
                  <span className="appreciation__company-name">{company.name}</span>
                  <span className="appreciation__company-sector">{company.sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Automatic Rotater: 1-2 Featured Appreciation Comments ── */}
        <div className="appreciation__rotater-wrapper">
          <div
            className={`appreciation__rotater-grid ${
              fade ? 'appreciation__rotater--visible' : 'appreciation__rotater--fading'
            }`}
          >
            {activeReview1 && <ReviewCard review={activeReview1} />}
            {activeReview2 && <ReviewCard review={activeReview2} />}
          </div>

          {/* Pagination Dots indicator */}
          <div className="appreciation__rotater-dots" aria-label="Testimonial Navigation">
            {Array.from({ length: totalPairs }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`appreciation__dot-btn ${
                  currentPairIdx === idx ? 'appreciation__dot-btn--active' : ''
                }`}
                onClick={() => goToPair(idx)}
                aria-label={`Show testimonial group ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

