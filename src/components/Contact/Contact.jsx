/* ═══════════════════════════════════════════════════════════════
   Contact — Atelier Appointment & Concierge Desk
   Features:
   - Private atelier consultation & mobile VIP tailor booking form
   - Dubai flagship location card with coordinates & opening hours
   - Floating persistent WhatsApp Concierge Button with pulse glow
   - Direct WhatsApp / phone integration
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import MagneticButton from '../MagneticButton/MagneticButton';
import './Contact.css';

const CONSULT_TYPES = [
  'Private Atelier Fitting (Dubai)',
  'Mobile VIP Master Tailor (UAE Home / Office)',
  'Corporate Uniform Fleet Consultation',
  'Wedding & Formal Black-Tie Suiting',
  'General Inquiry & Cloth Sourcing',
];

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consultType, setConsultType] = useState(CONSULT_TYPES[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      '🏛️ *SHUBRA GARMENTS — CONSULTATION APPOINTMENT*',
      '══════════════════════════════',
      `• *Client Name:* ${name}`,
      `• *Phone / WhatsApp:* ${phone}`,
      `• *Email:* ${email || 'Not provided'}`,
      `• *Consultation Type:* ${consultType}`,
      preferredDate ? `• *Preferred Date/Time:* ${preferredDate}` : '',
      message ? `• *Notes / Requests:* ${message}` : '',
      '══════════════════════════════',
      '⚜️ _Atelier Appointment Requested via Website_',
    ].filter(Boolean);

    const waUrl = `https://wa.me/971500000000?text=${encodeURIComponent(lines.join('\n'))}`;
    setIsBooked(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact section" id="contact" aria-label="Contact and Atelier Booking">
      <div className="contact__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="contact__header">
          <div className="contact__title-row">
            <h2 className="contact__title">Schedule Your Private Fitting</h2>
            <p className="contact__subtitle tagline">
              Visit our Jumeirah atelier or reserve our mobile master tailor for an exclusive on-site fitting across Dubai and the Emirates.
            </p>
          </div>
        </div>

        {/* ── Main 2-Column Grid (Left: Atelier Info, Right: Form) ── */}
        <div className="contact__grid">
          {/* Left Column: Flagship Atelier Details & Map Card */}
          <div className="contact__info-col">
            <div className="contact__atelier-card">
              <span className="label">FLAGSHIP ATELIER • DUBAI</span>
              <h3 className="contact__atelier-name">Shubra Garments Haute Atelier</h3>
              <p className="contact__atelier-address">
                Villa 14, Al Wasl Road, Jumeirah 1<br />
                Dubai, United Arab Emirates
              </p>

              <div className="contact__coords">
                <span>Coordinates: 25.2048° N, 55.2708° E</span>
                <span>Private Valet Parking Available</span>
              </div>

              <div className="contact__divider" />

              {/* Atelier Schedule */}
              <div className="contact__hours">
                <span className="label">OPENING HOURS</span>
                <div className="contact__hours-row">
                  <span>Saturday – Thursday:</span>
                  <strong>10:00 AM – 9:00 PM</strong>
                </div>
                <div className="contact__hours-row">
                  <span>Friday:</span>
                  <strong>2:00 PM – 9:00 PM</strong>
                </div>
              </div>

              <div className="contact__divider" />

              {/* Direct Concierge Line */}
              <div className="contact__direct-lines">
                <div className="contact__line-item">
                  <span className="label">TELEPHONE</span>
                  <a href="tel:+97140000000" className="contact__line-link">
                    +971 4 000 0000
                  </a>
                </div>
                <div className="contact__line-item">
                  <span className="label">WHATSAPP CONCIERGE</span>
                  <a href="https://wa.me/971500000000" className="contact__line-link">
                    +971 50 000 0000
                  </a>
                </div>
                <div className="contact__line-item">
                  <span className="label">ELECTRONIC MAIL</span>
                  <a href="mailto:concierge@shubragarments.com" className="contact__line-link">
                    concierge@shubragarments.com
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Tailor Banner */}
            <div className="contact__mobile-banner">
              <span className="contact__mobile-badge label">VIP MOBILE SERVICE</span>
              <h4>Traveling Master Tailor</h4>
              <p>
                Unable to visit our Jumeirah salon? Our master cutters carry over 200 cloth books directly to your home, yacht, or boardroom across Dubai and Abu Dhabi.
              </p>
            </div>
          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className="contact__form-col">
            <div className="contact__form-card">
              <h3 className="contact__form-heading">Reserve An Atelier Consultation</h3>
              <p className="contact__form-sub tagline">
                Select your preferred consultation format and date. We will confirm your private suite within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="contact__form">
                <div className="contact__field">
                  <label className="label" htmlFor="client-name">FULL NAME *</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Mansoor Al Qasimi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field">
                  <label className="label" htmlFor="client-phone">WHATSAPP / PHONE NUMBER *</label>
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
                  <label className="label" htmlFor="client-email">EMAIL ADDRESS</label>
                  <input
                    id="client-email"
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field">
                  <label className="label" htmlFor="consult-date">PREFERRED DATE & TIME</label>
                  <input
                    id="consult-date"
                    type="text"
                    placeholder="e.g. Tomorrow at 3:00 PM"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="contact__input"
                  />
                </div>

                <div className="contact__field contact__field--full">
                  <label className="label" htmlFor="consult-type">CONSULTATION FORMAT</label>
                  <select
                    id="consult-type"
                    value={consultType}
                    onChange={(e) => setConsultType(e.target.value)}
                    className="contact__select"
                  >
                    {CONSULT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact__field contact__field--full">
                  <label className="label" htmlFor="client-message">SPECIFIC REQUESTS / OCCASION</label>
                  <textarea
                    id="client-message"
                    rows={4}
                    placeholder="Tell us about the desired garments, specific mills (Loro Piana, Zegna), event dates, or fitting preferences..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="contact__textarea"
                  />
                </div>

                <div className="contact__submit-wrap contact__field--full">
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    cursorText="BOOK"
                    className="contact__submit-btn"
                  >
                    Confirm Atelier Booking via WhatsApp
                  </MagneticButton>
                </div>

                {isBooked && (
                  <div className="contact__success-box contact__field--full">
                    <span>✓ Appointment requested. Your private suite concierge will reach out via WhatsApp shortly to finalize timing.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
