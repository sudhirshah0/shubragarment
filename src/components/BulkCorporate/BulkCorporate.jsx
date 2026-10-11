/* ═══════════════════════════════════════════════════════════════
   BulkCorporate — Enterprise Fleet & Corporate Orders
   Features:
   - 6 Institutional uniform benefits & UAE mobile fitting guarantees
   - 3 Scalable volume tiers with wholesale discount pricing
   - Interactive corporate inquiry form with WhatsApp concierge routing
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { corporateBenefits, corporateTiers } from '../../data/bulkCorporate';
import MagneticButton from '../MagneticButton/MagneticButton';
import './BulkCorporate.css';

const SECTOR_OPTIONS = [
  'Luxury Hospitality & Resorts',
  'Private Aviation & VIP Flight Crew',
  'Financial, Legal & Family Office',
  'Fine Dining & Executive Culinary',
  'Automotive & Yacht Concierge',
  'Diplomatic & Government Protocol',
];

const BulkCorporate = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sector, setSector] = useState(SECTOR_OPTIONS[0]);
  const [quantityRange, setQuantityRange] = useState('50 - 249 Units');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      '🏢 *SHUBRA GARMENTS — CORPORATE FLEET INQUIRY*',
      '══════════════════════════════',
      `• *Company:* ${companyName}`,
      `• *Contact Person:* ${contactPerson}`,
      `• *Phone / WhatsApp:* ${phone}`,
      `• *Email:* ${email}`,
      `• *Industry Sector:* ${sector}`,
      `• *Estimated Volume:* ${quantityRange}`,
      notes ? `• *Requirements:* ${notes}` : '',
      '══════════════════════════════',
      '⚜️ _Corporate Account Director requested via Website_',
    ].filter(Boolean);

    const waUrl = `https://wa.me/971500000000?text=${encodeURIComponent(lines.join('\n'))}`;
    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="bulk-corporate section"
      id="corporate"
      aria-label="Bulk and Corporate Uniform Orders"
    >
      <div className="bulk-corporate__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="bulk-corporate__header">
          <div className="bulk-corporate__title-row">
            <h2 className="bulk-corporate__title">Outfit Your Entire Enterprise</h2>
            <p className="bulk-corporate__subtitle tagline">
              Elevating the presence of Dubai’s finest institutions with bespoke-cut corporate wear, on-site master measuring, and rapid replenishment.
            </p>
          </div>
        </div>

        {/* ── 6 Corporate Benefits Grid ──────────────────────── */}
        <div className="bulk-corporate__benefits-grid">
          {corporateBenefits.map((b) => (
            <div key={b.title} className="bulk-corporate__benefit-card">
              <span className="bulk-corporate__benefit-icon" aria-hidden="true">{b.icon}</span>
              <h3 className="bulk-corporate__benefit-title">{b.title}</h3>
              <p className="bulk-corporate__benefit-desc">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* ── 3 Volume Tiers ─────────────────────────────────── */}
        <div className="bulk-corporate__tiers-section">
          <div className="bulk-corporate__tiers-header">
            <span className="label">TIERED VOLUME PRICING</span>
            <h3 className="bulk-corporate__tiers-heading">Scalable Packages For Every Scale</h3>
          </div>

          <div className="bulk-corporate__tiers-grid">
            {corporateTiers.map((tier) => (
              <div
                key={tier.id}
                className={`bulk-corporate__tier-card ${
                  tier.recommended ? 'bulk-corporate__tier-card--featured' : ''
                }`}
              >
                {tier.recommended && (
                  <span className="bulk-corporate__tier-badge label">MOST COMMISSIONED</span>
                )}
                <h4 className="bulk-corporate__tier-name">{tier.name}</h4>
                <div className="bulk-corporate__tier-range">{tier.range}</div>
                <div className="bulk-corporate__tier-discount">{tier.discount}</div>

                <ul className="bulk-corporate__tier-list">
                  {tier.deliverables.map((item) => (
                    <li key={item}>
                      <span className="bulk-corporate__tier-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Corporate RFP / Inquiry Form ───────────────────── */}
        <div className="bulk-corporate__form-wrap">
          <div className="bulk-corporate__form-intro">
            <span className="label">REQUEST CORPORATE DOSSIER</span>
            <h3 className="bulk-corporate__form-title">Speak With An Enterprise Account Tailor</h3>
            <p className="tagline">
              Receive fabric swatch samples, digital mockups with your corporate seal, and an official proposal within 24 hours.
            </p>

            <div className="bulk-corporate__contact-quick">
              <div className="bulk-corporate__quick-item">
                <span className="label">DIRECT CORPORATE DESK</span>
                <strong>+971 4 000 0000</strong>
              </div>
              <div className="bulk-corporate__quick-item">
                <span className="label">INSTITUTIONAL EMAIL</span>
                <strong>corporate@shubragarments.com</strong>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bulk-corporate__form">
            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-company">ORGANIZATION / BRAND NAME *</label>
              <input
                id="corp-company"
                type="text"
                required
                placeholder="e.g. Jumeirah Hospitality Group"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bulk-corporate__input"
              />
            </div>

            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-person">CONTACT PERSON & TITLE *</label>
              <input
                id="corp-person"
                type="text"
                required
                placeholder="e.g. Elena Rostova (Procurement Director)"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="bulk-corporate__input"
              />
            </div>

            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-phone">PHONE / WHATSAPP *</label>
              <input
                id="corp-phone"
                type="tel"
                required
                placeholder="+971 50 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bulk-corporate__input"
              />
            </div>

            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-email">CORPORATE EMAIL *</label>
              <input
                id="corp-email"
                type="email"
                required
                placeholder="procurement@company.ae"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bulk-corporate__input"
              />
            </div>

            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-sector">INDUSTRY SECTOR</label>
              <select
                id="corp-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="bulk-corporate__select"
              >
                {SECTOR_OPTIONS.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="bulk-corporate__field">
              <label className="label" htmlFor="corp-volume">ESTIMATED VOLUME</label>
              <select
                id="corp-volume"
                value={quantityRange}
                onChange={(e) => setQuantityRange(e.target.value)}
                className="bulk-corporate__select"
              >
                <option value="10 - 49 Units">10 – 49 Units (Executive Tier)</option>
                <option value="50 - 249 Units">50 – 249 Units (Fleet Tier)</option>
                <option value="250 - 999 Units">250 – 999 Units (Enterprise Tier)</option>
                <option value="1,000+ Units">1,000+ Units (Global Brand Master)</option>
              </select>
            </div>

            <div className="bulk-corporate__field bulk-corporate__field--full">
              <label className="label" htmlFor="corp-notes">PROJECT BRIEF & UNIFORM SPECIFICATIONS</label>
              <textarea
                id="corp-notes"
                rows={3}
                placeholder="Describe uniform categories (suits, blazers, skirts, aprons, aviation wings, colors)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bulk-corporate__textarea"
              />
            </div>

            <div className="bulk-corporate__form-submit bulk-corporate__field--full">
              <MagneticButton
                type="submit"
                variant="primary"
                size="lg"
                cursorText="PROPOSAL"
                className="bulk-corporate__submit-btn"
              >
                Dispatch Corporate Inquiry via WhatsApp
              </MagneticButton>
            </div>

            {submitted && (
              <div className="bulk-corporate__success bulk-corporate__field--full">
                <span>✓ Corporate request prepared. Our enterprise team will connect with your procurement office immediately.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BulkCorporate;
