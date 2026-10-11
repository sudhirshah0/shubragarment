/* ═══════════════════════════════════════════════════════════════
   FloatingWhatsApp — Floating Quick Concierge Button
   - Fixed to bottom right corner
   - Elegant pulsing badge & subtle hover elevation
   - Direct link to WhatsApp Concierge
   ═══════════════════════════════════════════════════════════════ */

import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <aside aria-label="WhatsApp Concierge Assistance">
      <a
        href="https://wa.me/971500000000?text=Hello%20Shubra%20Garments,%20I%20would%20like%20to%20inquire%20about%20your%20bespoke%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa"
        aria-label="Chat with Shubra Concierge on WhatsApp"
        data-cursor-text="CHAT"
      >
        <span className="floating-wa__pulse" aria-hidden="true" />
        <svg
          className="floating-wa__icon"
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="none"
          aria-hidden="true"
        >
          {/* White speech bubble background with tail */}
          <path
            fill="#FFFFFF"
            d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.624.75 5.074 2.046 7.15L3 29l6.05-1.517A13.435 13.435 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5z"
          />
          {/* Authentic WhatsApp green phone handset */}
          <path
            fill="#25D366"
            d="M22.09 19.34c-.34-.17-2.02-.99-2.33-1.11-.31-.11-.54-.17-.77.17-.23.34-.89 1.11-1.09 1.34-.2.23-.4.26-.74.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.53.15-.7.15-.15.34-.4.51-.59.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.86-1.06-2.55-.28-.67-.56-.58-.77-.59h-.66c-.23 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.7 5.87 5.18.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.14.66-.1 2.02-.82 2.3-1.62.29-.79.29-1.47.2-1.61-.08-.14-.31-.23-.65-.4z"
          />
        </svg>
        <span className="floating-wa__tooltip">Chat with Concierge</span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
