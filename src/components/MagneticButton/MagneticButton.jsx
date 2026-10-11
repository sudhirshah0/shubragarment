/* ═══════════════════════════════════════════════════════════════
   MagneticButton — Reusable luxury magnetic button
   Features:
   - Physics-based magnetic pull on cursor approach
   - Dual-layer parallax depth on text and badge
   - Smooth 360-degree gold sweep hover fill
   - Accessible keyboard focus and mobile touch fallback
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './MagneticButton.css';

const MagneticButton = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'dark'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon = null,
  cursorText = '',
  disabled = false,
  ...rest
}) => {
  const btnRef = useRef(null);
  const textRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    const text = textRef.current;
    const fill = fillRef.current;

    if (!btn || !text || disabled) return;

    // Check if fine hover pointer is supported
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointerFine) return;

    let boundingRect = btn.getBoundingClientRect();

    const handleMouseEnter = () => {
      boundingRect = btn.getBoundingClientRect();
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = boundingRect;

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Update fill origin to follow cursor entrance without shifting the button
      if (fill) {
        const fillX = clientX - left;
        const fillY = clientY - top;
        gsap.to(fill, {
          '--fill-x': `${fillX}px`,
          '--fill-y': `${fillY}px`,
          duration: 0.1,
          ease: 'none',
        });
      }
    };

    const handleMouseLeave = () => {
      // Button remains fixed in position (no displacement needed)
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  const Tag = href ? 'a' : 'button';
  const tagProps = href
    ? { href, ...rest }
    : { type: 'button', onClick, disabled, ...rest };

  return (
    <Tag
      ref={btnRef}
      className={`magnetic-btn magnetic-btn--${variant} magnetic-btn--${size} ${className}`}
      data-cursor-text={cursorText}
      data-magnetic="true"
      {...tagProps}
    >
      {/* Background radial gold sweep container */}
      <span ref={fillRef} className="magnetic-btn__fill" aria-hidden="true" />

      {/* Button content with micro-parallax text */}
      <span ref={textRef} className="magnetic-btn__inner">
        <span className="magnetic-btn__text">{children}</span>
        {icon && <span className="magnetic-btn__icon" aria-hidden="true">{icon}</span>}
      </span>
    </Tag>
  );
};

export default MagneticButton;
