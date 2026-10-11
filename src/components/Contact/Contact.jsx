/* ═══════════════════════════════════════════════════════════════
   Contact — Atelier Concierge & Enquiries
   - Centered luxury heading and clear enquiry purpose
   - Direct VIP WhatsApp concierge and quick connect channels
   - Streamlined enquiry form with message field and enquiry topics
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Contact.css';

const ENQUIRY_TYPES = [
  'General Enquiry',
  'Bespoke Tailoring & Private Fitting',
  'Bulk & Corporate Uniforms',
  'Fabric Sourcing & Premium Linens',
  'Atelier Visit (Jumeirah, Dubai)',
];

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState(ENQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      '🏛️ *SHUBRA GARMENTS — CLIENT ENQUIRY*',
      '══════════════════════════════',
      `• *Client Name:* ${name}`,
      `• *WhatsApp / Phone:* ${phone}`,
      email ? `• *Email:* ${email}` : '',
      `• *Topic:* ${enquiryType}`,
      message ? `• *Enquiry Details:* ${message}` : '',
      '══════════════════════════════',
      '⚜️ _Sent via Shubra Garments Website_',
    ].filter(Boolean);

    const waUrl = `https://wa.me/971500000000?text=${encodeURIComponent(lines.join('\n'))}`;
    setIsSent(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact section" id="contact" aria-label="Contact and Atelier Enquiries">
      <div className="contact__glow-orb" aria-hidden="true" />
      <div className="contact__container container">
        {/* ── Centered Header ─────────────────────────────────── */}
        <div className="contact__header contact__header--centered">
          <div className="contact__badge">
            <span className="contact__badge-dot" />
            <span className="label">CLIENT CONCIERGE</span>
          </div>
          <h2 className="contact__title">Make an Enquiry</h2>
          <p className="contact__subtitle">
            Have a question about our bespoke tailoring, corporate orders, or bespoke fabric selection? Reach our concierge team directly.
          </p>
        </div>

        {/* ── Premium Minimalist Grid ─────────────────────────── */}
        <div className="contact__card-wrapper">
          {/* Atelier Quick Connect Bar */}
          <div className="contact__channels">
            <a href="https://wa.me/971500000000" target="_blank" rel="noopener noreferrer" className="contact__channel-chip">
              <span className="contact__channel-icon wa">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.16 8.16 0 01-1.25-4.36c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.41 3.61 2.41 5.8 0 4.52-3.68 8.2-8.2 8.2zm4.49-6.14c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.65.81-.8 1-.15.19-.29.21-.54.08-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1 0.49-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.3z"/>
                </svg>
              </span>
              <div className="contact__channel-info">
                <span className="contact__channel-label">Direct WhatsApp</span>
                <span className="contact__channel-val">+971 50 000 0000</span>
              </div>
            </a>

            <a href="tel:+97140000000" className="contact__channel-chip">
              <span className="contact__channel-icon tel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <div className="contact__channel-info">
                <span className="contact__channel-label">Concierge Desk</span>
                <span className="contact__channel-val">+971 4 000 0000</span>
              </div>
            </a>

            <div className="contact__channel-chip">
              <span className="contact__channel-icon loc">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <div className="contact__channel-info">
                <span className="contact__channel-label">Flagship Atelier</span>
                <span className="contact__channel-val">Jumeirah 1, Dubai</span>
              </div>
            </div>
          </div>

          {/* Minimalist Enquiry Form */}
          <div className="contact__form-panel">
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__input-grid">
                <div className="contact__field">
                  <label className="label" htmlFor="client-name">YOUR NAME *</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Tariq Al Mansoori"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field">
                  <label className="label" htmlFor="client-phone">PHONE / WHATSAPP *</label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field">
                  <label className="label" htmlFor="client-email">EMAIL ADDRESS (OPTIONAL)</label>
                  <input
                    id="client-email"
                    type="email"
                    placeholder="name@example.ae"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field">
                  <label className="label" htmlFor="enquiry-type">TOPIC OF ENQUIRY</label>
                  <div className="contact__select-wrapper">
                    <select
                      id="enquiry-type"
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="contact__select"
                    >
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <span className="contact__select-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="contact__field contact__field--full">
                  <label className="label" htmlFor="client-message">YOUR ENQUIRY MESSAGE *</label>
                  <textarea
                    id="client-message"
                    required
                    rows={4}
                    placeholder="Tell us what you are looking for (e.g. bespoke suit requirements, corporate uniform order size, wedding date, fabric enquiry)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="contact__textarea"
                  />
                </div>
              </div>

              <div className="contact__submit-row">
                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  cursorText="SEND"
                  className="contact__submit-btn"
                >
                  Send Enquiry via WhatsApp
                </MagneticButton>
              </div>

              {isSent && (
                <div className="contact__success-box">
                  <span>✓ Your enquiry has been sent. Our client concierge will respond within minutes!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

