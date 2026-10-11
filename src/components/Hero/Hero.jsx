/* ═══════════════════════════════════════════════════════════════
   Hero — Full-viewport luxury editorial introduction with model carousel
   Features:
   - Kinematic GSAP entrance timeline with masked line reveals
   - Pure Model Swipe Carousel: transparent model figures with swipe animation
   - Interactive 3D tilt / mouse parallax hero composition card
   - High-contrast editorial typography (Cinzel & Cormorant)
   - Dual MagneticButton actions (Designer & Collections)
   - Verified luxury metric badges & animated scroll indicator
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Hero.css';

// Curated transparent model figures from /models/ directory
const MODEL_SLIDES = [
  { src: '/models/model-airline-f1.png', alt: 'Shubra Garments Tailored Airline Uniform' },
  { src: '/models/model-airline-m1.png', alt: 'Shubra Garments Captain Pilot Uniform' },
  { src: '/models/model-suit-burgundy.png', alt: 'Shubra Garments Burgundy Executive Suit' },
  { src: '/models/model-exec-f.png', alt: 'Shubra Garments Executive Silk Shirt & Trousers' },
  { src: '/models/model-airline-m2.png', alt: 'Shubra Garments Airline Aviation Blazer' },
  { src: '/models/model1.png', alt: 'Shubra Garments Casual Knit & Linen' },
  { src: '/models/model2.png', alt: 'Shubra Garments Tailored Formal Suit' },
  { src: '/models/model3.png', alt: 'Shubra Garments Linen Safari Overshirt' },
  { src: '/models/model4.png', alt: 'Shubra Garments Double-Breasted Trench' },
  { src: '/models/model7.png', alt: 'Shubra Garments Cashmere Overcoat' },
];



const Hero = () => {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const cardRef = useRef(null);
  const sliderTrackRef = useRef(null);

  // Infinite loop slides: [last slide clone, ...MODEL_SLIDES, first slide clone]
  // Real indices in infiniteSlides: 1 to totalSlides
  const [currentIndex, setCurrentIndex] = useState(1); // Start at real slide 0 (index 1)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDeltaX = useRef(0);
  const autoplayTimerRef = useRef(null);

  const totalSlides = MODEL_SLIDES.length;
  const infiniteSlides = [
    MODEL_SLIDES[totalSlides - 1], // clone of last
    ...MODEL_SLIDES,
    MODEL_SLIDES[0],              // clone of first
  ];

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToSlide = useCallback((realIdx) => {
    setIsTransitioning(true);
    setCurrentIndex(realIdx + 1);
  }, []);

  // When transition completes at clone boundaries, seamlessly jump without animation
  const handleTransitionEnd = () => {
    if (currentIndex >= totalSlides + 1) {
      // Reached clone of first slide -> snap instantly to real first slide (index 1)
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex <= 0) {
      // Reached clone of last slide -> snap instantly to real last slide (index totalSlides)
      setIsTransitioning(false);
      setCurrentIndex(totalSlides);
    }
  };

  // Autoplay effect
  useEffect(() => {
    if (isDragging) return;

    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [nextSlide, isDragging]);

  // Touch and Mouse Drag / Swipe Handlers
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
    const threshold = 40; // minimum swipe distance in px
    if (dragDeltaX.current < -threshold) {
      nextSlide();
    } else if (dragDeltaX.current > threshold) {
      prevSlide();
    }
    dragDeltaX.current = 0;
  };

  // Entrance animations and 3D Parallax Tilt
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // Function to trigger the post-refresh hero entrance
      const playHeroEntrance = () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
        });

        // 1. Headline masked lines slide & tilt up smoothly
        tl.fromTo(
          '.hero__title-line span',
          { yPercent: 120, rotateZ: 3, opacity: 0 },
          { yPercent: 0, rotateZ: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: 'power4.out' },
          0.05
        );

        // 2. Subtitle soft fade up
        tl.fromTo(
          '.hero__description',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          0.35
        );

        // 3. CTA Action buttons pop and fade
        tl.fromTo(
          '.hero__actions',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          0.55
        );

        // 4. Hero Model Visual with Incline Animation (rotateZ: 4deg -> 0deg, rotateX: 6deg -> 0deg, scale: 0.92 -> 1)
        tl.fromTo(
          visualRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
            rotateZ: 4.5,
            rotateX: 8,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateZ: 0,
            rotateX: 0,
            duration: 1.45,
            ease: 'power3.out',
          },
          0.2
        );
      };

      // Listen for loader completion from page refresh
      const handleLoaderComplete = () => {
        playHeroEntrance();
      };

      window.addEventListener('shubra:loader-complete', handleLoaderComplete);

      // Fallback: If loader is already done or not present, run after 300ms
      const fallbackTimer = setTimeout(() => {
        if (!document.querySelector('.loader')) {
          playHeroEntrance();
        }
      }, 300);

      return () => {
        window.removeEventListener('shubra:loader-complete', handleLoaderComplete);
        clearTimeout(fallbackTimer);
      };

      // ── Subtle 3D Mouse Parallax on Visual Area ───────────────
      const heroEl = heroRef.current;
      const cardEl = cardRef.current;

      const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (heroEl && cardEl && isPointerFine) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;

          const mouseX = (clientX / innerWidth - 0.5) * 2;
          const mouseY = (clientY / innerHeight - 0.5) * 2;

          gsap.to(cardEl, {
            rotateY: mouseX * 5,
            rotateX: -mouseY * 5,
            x: mouseX * 8,
            y: mouseY * 8,
            duration: 0.6,
            ease: 'power2.out',
            transformPerspective: 1000,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardEl, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          });
        };

        heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
        heroEl.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
          heroEl.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);



  return (
    <section ref={heroRef} className="hero section" aria-label="Welcome to Shubra Garments">
      {/* Background ambient lighting glows */}
      <div className="hero__bg-glow hero__bg-glow--top" aria-hidden="true" />
      <div className="hero__bg-glow hero__bg-glow--bottom" aria-hidden="true" />

      <div className="hero__container container">
        <div className="hero__grid">
          {/* ── Left Column: Editorial Typography & Actions ───── */}
          <div className="hero__content">
            {/* Masked Master Headline */}
            <h1 className="hero__title">
              <div className="hero__title-line">
                <span>Wear Your Own</span>
              </div>
              <div className="hero__title-line">
                <span className="hero__title-accent">Premium Design</span>
              </div>
            </h1>

            {/* Narrative Subtitle */}
            <p className="hero__description">
              Crafting bespoke luxury suits, custom garments, and refined corporate attire in the United Arab Emirates. Every thread precision-tailored to embody timeless authority and effortless grace.
            </p>

            {/* Dual Actions with Magnetic Pull */}
            <div className="hero__actions">
              <MagneticButton
                href="#collections"
                variant="primary"
                size="lg"
                cursorText="EXPLORE"
                className="hero__cta-primary"
              >
                Explore Collections
              </MagneticButton>

              <MagneticButton
                href="#custom-designer"
                variant="outline"
                size="lg"
                cursorText="CREATE"
                className="hero__cta-secondary"
                icon={
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Custom Design
              </MagneticButton>
            </div>

          </div>

          {/* ── Right Column: Interactive Pure Models Swipe Stage ─── */}
          <div ref={visualRef} className="hero__visual" data-cursor-text="SWIPE">
            <div
              ref={cardRef}
              className="hero__stage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              {/* Radial pedestal lighting glow behind the model */}
              <div className="hero__pedestal-glow" aria-hidden="true" />
              <div className="hero__pedestal-ellipse" aria-hidden="true" />

              {/* Slider Track with Infinite Swipe Animation */}
              <div
                ref={sliderTrackRef}
                className="hero__slider-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: isTransitioning && !isDragging
                    ? 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                    : 'none',
                }}
              >
                {infiniteSlides.map((slide, idx) => (
                  <div key={idx} className="hero__slide" aria-hidden={idx !== currentIndex}>
                    <div className="hero__model-wrapper">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="hero__model-img"
                        loading={idx === 1 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Minimalist Navigation Swipe Arrows */}
              <button
                type="button"
                className="hero__slider-arrow hero__slider-arrow--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Previous Model"
                data-cursor-text="PREV"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                className="hero__slider-arrow hero__slider-arrow--next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Next Model"
                data-cursor-text="NEXT"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Slide Pagination Indicator Dots */}
              <div className="hero__slider-pagination">
                {MODEL_SLIDES.map((_, realIdx) => {
                  // Active when current index corresponds to real slide index
                  const isActive =
                    (currentIndex === realIdx + 1) ||
                    (currentIndex === 0 && realIdx === totalSlides - 1) ||
                    (currentIndex === totalSlides + 1 && realIdx === 0);

                  return (
                    <button
                      key={realIdx}
                      type="button"
                      className={`hero__slider-dot ${isActive ? 'hero__slider-dot--active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(realIdx);
                      }}
                      aria-label={`Go to model slide ${realIdx + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
