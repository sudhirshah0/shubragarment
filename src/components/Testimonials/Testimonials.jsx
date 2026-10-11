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

import { useMemo } from 'react';
import { sampleReviews, clientLogosList } from '../../data/testimonials';
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
  // Distribute 9 reviews across 3 columns:
  // Col 1: reviews 0, 3, 6
  // Col 2: reviews 1, 4, 7
  // Col 3: reviews 2, 5, 8
  const { col1, col2, col3 } = useMemo(() => {
    const c1 = [];
    const c2 = [];
    const c3 = [];
    sampleReviews.forEach((item, index) => {
      if (index % 3 === 0) c1.push(item);
      else if (index % 3 === 1) c2.push(item);
      else c3.push(item);
    });
    return { col1: c1, col2: c2, col3: c3 };
  }, []);

  return (
    <section
      className="appreciation section"
      id="appreciation"
      aria-label="Trusted by teams across the UAE"
    >
      <div className="appreciation__container container">
        {/* ── Section Heading & Client Logos Row ─────────────── */}
        <div className="appreciation__header">
          <h2 className="appreciation__title">Trusted by teams across the UAE.</h2>
          <p className="appreciation__subtitle tagline">
            Tailored apparel, bespoke uniforms, and corporate suiting crafted with uncompromising precision.
          </p>

          <div className="appreciation__logos-row" aria-label="Clients">
            {clientLogosList.map((client) => (
              <div key={client.name} className="appreciation__logo-item">
                <img
                  src={client.src}
                  alt={`${client.name} logo`}
                  className="appreciation__logo-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── 3 Scrolling Columns of Review Cards ───────────── */}
        <div className="appreciation__columns-stage">
          {/* Column 1 (Normal Speed) */}
          <div className="appreciation__column appreciation__column--1">
            <div className="appreciation__column-track">
              {/* Primary list */}
              {col1.map((rev) => (
                <ReviewCard key={`c1-a-${rev.id}`} review={rev} />
              ))}
              {/* Duplicated list for seamless infinite loop */}
              {col1.map((rev) => (
                <ReviewCard key={`c1-b-${rev.id}`} review={rev} />
              ))}
            </div>
          </div>

          {/* Column 2 (Different Speed, Offset start) */}
          <div className="appreciation__column appreciation__column--2">
            <div className="appreciation__column-track">
              {col2.map((rev) => (
                <ReviewCard key={`c2-a-${rev.id}`} review={rev} />
              ))}
              {col2.map((rev) => (
                <ReviewCard key={`c2-b-${rev.id}`} review={rev} />
              ))}
            </div>
          </div>

          {/* Column 3 (Different Speed) */}
          <div className="appreciation__column appreciation__column--3">
            <div className="appreciation__column-track">
              {col3.map((rev) => (
                <ReviewCard key={`c3-a-${rev.id}`} review={rev} />
              ))}
              {col3.map((rev) => (
                <ReviewCard key={`c3-b-${rev.id}`} review={rev} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
