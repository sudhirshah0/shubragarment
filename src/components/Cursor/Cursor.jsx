/* ═══════════════════════════════════════════════════════════════
   Cursor — Custom luxury gradient glow cursor
   Features:
   - Silky smooth mouse tracking with luxury gold gradient glow aura
   - Clean precision metallic core dot
   - No distracting text badges or tooltips on buttons / links
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only enable on desktop with fine pointer
  const isFinePointer = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useEffect(() => {
    if (!isFinePointer) return;

    const cursorEl = cursorRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!cursorEl || !dot) return;

    // Fast GSAP quickTo setters for 120fps silky mouse tracking
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const setGlowX = glow ? gsap.quickTo(glow, 'x', { duration: 0.38, ease: 'power2.out' }) : null;
    const setGlowY = glow ? gsap.quickTo(glow, 'y', { duration: 0.38, ease: 'power2.out' }) : null;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setIsVisible(true);
      setDotX(x);
      setDotY(y);
      if (setGlowX && setGlowY) {
        setGlowX(x);
        setGlowY(y);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .magnetic-btn, [role="button"], input, select, textarea');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className={`cursor-wrapper ${isVisible ? 'cursor--visible' : ''} ${
        isHovered ? 'cursor--hovered' : ''
      }`}
      aria-hidden="true"
    >
      {/* Soft gradient follower aura glow */}
      <div ref={glowRef} className="cursor__gradient-glow" />

      {/* Precision inner gold gradient core */}
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
};

export default Cursor;
