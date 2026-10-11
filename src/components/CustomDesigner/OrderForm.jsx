/* ═══════════════════════════════════════════════════════════════
   OrderForm — Sizing, Quantity, Customer Info & WhatsApp Submission
   ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { SIZES_LIST, FIT_PROFILES } from './garmentTemplates';
import MagneticButton from '../MagneticButton/MagneticButton';

const UAE_EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
];

const OrderForm = ({
  garment,
  color,
  onDownloadPreview,
  currentStep,
}) => {
  // Sizing & Specs State
  const [selectedSize, setSelectedSize] = useState('M');
  const [fitProfile, setFitProfile] = useState('tailored');
  const [fabricGrade, setFabricGrade] = useState(garment.fabrics[0]);
  const [quantity, setQuantity] = useState(1);

  // Custom Bespoke Measurements
  const [customChest, setCustomChest] = useState('');
  const [customWaist, setCustomWaist] = useState('');
  const [customShoulder, setCustomShoulder] = useState('');

  // Customer Contact State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [emirate, setEmirate] = useState('Dubai');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ── Calculate Bulk Pricing & Discounts ───────────────────────
  const baseUnitPrice = garment.basePrice;
  let discountPercent = 0;
  if (quantity >= 50) discountPercent = 30;
  else if (quantity >= 20) discountPercent = 20;
  else if (quantity >= 5) discountPercent = 10;

  const discountedUnitPrice = Math.round(baseUnitPrice * (1 - discountPercent / 100));
  const totalPrice = discountedUnitPrice * quantity;

  // ── WhatsApp Message Formatter & Direct Launcher ────────────
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const recipientPhone = '971500000000'; // Official UAE concierge number

    const lines = [
      '✨ *SHUBRA GARMENTS — BESPOKE ORDER INQUIRY*',
      '══════════════════════════════',
      `• *Garment:* ${garment.name} (${garment.category})`,
      `• *Fabric Shade:* ${color.name} (${color.hex})`,
      `• *Fabric Grade:* ${fabricGrade}`,
      `• *Size:* ${selectedSize}${
        selectedSize === 'Custom Bespoke'
          ? ` (Chest: ${customChest || '-'}cm, Waist: ${customWaist || '-'}cm, Shoulder: ${customShoulder || '-'}cm)`
          : ''
      }`,
      `• *Fit Profile:* ${FIT_PROFILES.find((f) => f.id === fitProfile)?.name || fitProfile}`,
      `• *Quantity:* ${quantity} unit(s)${discountPercent > 0 ? ` (${discountPercent}% bulk discount applied)` : ''}`,
      `• *Estimated Total:* AED ${totalPrice.toLocaleString()}`,
      '',
      '👤 *CLIENT INFORMATION*',
      `• *Name:* ${customerName || 'Anonymous Guest'}`,
      `• *Phone / WhatsApp:* ${customerPhone || 'Not provided'}`,
      `• *Email:* ${customerEmail || 'Not provided'}`,
      companyName ? `• *Company:* ${companyName}` : '',
      `• *Delivery Location:* ${emirate}, UAE`,
      specialNotes ? `• *Special Requests:* ${specialNotes}` : '',
      '══════════════════════════════',
      '⚜️ _Generated via Shubra Garments Live Designer_',
    ].filter(Boolean);

    const message = lines.join('\n');
    const waUrl = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(message)}`;

    setIsSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="order-form">
      {/* ── Section 1: Sizing Selection ───────────────────────── */}
      <div className="order-form__section">
        <div className="order-form__section-header">
          <h3 className="order-form__heading">Anatomical Fit & Sizing</h3>
        </div>

        <div className="order-form__sizes-grid">
          {SIZES_LIST.map((sz) => (
            <button
              key={sz}
              type="button"
              className={`order-form__size-btn ${
                selectedSize === sz ? 'order-form__size-btn--active' : ''
              }`}
              onClick={() => setSelectedSize(sz)}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Custom Measurements Input when Custom Bespoke chosen */}
        {selectedSize === 'Custom Bespoke' && (
          <div className="order-form__bespoke-inputs">
            <span className="label">EXACT MEASUREMENTS (CM):</span>
            <div className="order-form__measurements-row">
              <input
                type="number"
                placeholder="Chest (cm)"
                className="order-form__input"
                value={customChest}
                onChange={(e) => setCustomChest(e.target.value)}
              />
              <input
                type="number"
                placeholder="Waist (cm)"
                className="order-form__input"
                value={customWaist}
                onChange={(e) => setCustomWaist(e.target.value)}
              />
              <input
                type="number"
                placeholder="Shoulder (cm)"
                className="order-form__input"
                value={customShoulder}
                onChange={(e) => setCustomShoulder(e.target.value)}
              />
            </div>
            <span className="order-form__hint">
              *Our master tailor will also verify your measurements via VIP fitting.
            </span>
          </div>
        )}

        {/* Fit Profiles */}
        <div className="order-form__fit-row">
          <span className="label">FIT SILHOUETTE:</span>
          <div className="order-form__fit-options">
            {FIT_PROFILES.map((fit) => (
              <label
                key={fit.id}
                className={`order-form__fit-card ${
                  fitProfile === fit.id ? 'order-form__fit-card--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="fitProfile"
                  value={fit.id}
                  checked={fitProfile === fit.id}
                  onChange={() => setFitProfile(fit.id)}
                  className="order-form__radio-hidden"
                />
                <strong>{fit.name}</strong>
                <span>{fit.desc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fabric Grade Selection */}
        <div className="order-form__fabric-select-wrap">
          <span className="label">FABRIC WEAVE & SPECIFICATION:</span>
          <select
            className="order-form__select"
            value={fabricGrade}
            onChange={(e) => setFabricGrade(e.target.value)}
          >
            {garment.fabrics.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Section 2: Quantity & Live Pricing ────────────────── */}
      <div className="order-form__section order-form__section--pricing">
        <div className="order-form__qty-row">
          <div className="order-form__qty-controls">
            <span className="label">ORDER QUANTITY:</span>
            <div className="order-form__stepper">
              <button
                type="button"
                className="order-form__stepper-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="order-form__qty-input"
              />
              <button
                type="button"
                className="order-form__stepper-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="order-form__price-box">
            <span className="label">ESTIMATED TOTAL</span>
            <div className="order-form__total-price">
              AED {totalPrice.toLocaleString()}
            </div>
            {discountPercent > 0 && (
              <span className="order-form__discount-badge">
                🎉 {discountPercent}% Volume Discount Included
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 3: Customer Details & WhatsApp Submission ─── */}
      <div className="order-form__section">
        <div className="order-form__section-header">
          <h3 className="order-form__heading">Finalize Consultation & Order</h3>
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="order-form__contact-grid">
          <div className="order-form__field">
            <label className="label" htmlFor="order-name">FULL NAME *</label>
            <input
              id="order-name"
              type="text"
              required
              placeholder="e.g. Tariq Al Mansoori"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="order-form__input"
            />
          </div>

          <div className="order-form__field">
            <label className="label" htmlFor="order-phone">WHATSAPP / PHONE NUMBER *</label>
            <input
              id="order-phone"
              type="tel"
              required
              placeholder="+971 50 000 0000"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="order-form__input"
            />
          </div>

          <div className="order-form__field">
            <label className="label" htmlFor="order-email">EMAIL ADDRESS</label>
            <input
              id="order-email"
              type="email"
              placeholder="name@company.ae"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="order-form__input"
            />
          </div>

          <div className="order-form__field">
            <label className="label" htmlFor="order-emirate">DELIVERY EMIRATE / CITY</label>
            <select
              id="order-emirate"
              value={emirate}
              onChange={(e) => setEmirate(e.target.value)}
              className="order-form__select"
            >
              {UAE_EMIRATES.map((em) => (
                <option key={em} value={em}>
                  {em}, UAE
                </option>
              ))}
            </select>
          </div>

          <div className="order-form__field order-form__field--full">
            <label className="label" htmlFor="order-company">COMPANY / BRAND (FOR CORPORATE UNIFORMS)</label>
            <input
              id="order-company"
              type="text"
              placeholder="e.g. Emirates Luxury Holdings"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="order-form__input"
            />
          </div>

          <div className="order-form__field order-form__field--full">
            <label className="label" htmlFor="order-notes">BESPOKE EMBROIDERY NOTES OR INSTRUCTIONS</label>
            <textarea
              id="order-notes"
              rows={3}
              placeholder="Specify custom monogram placements, inside pocket embroidery, or delivery timelines..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="order-form__textarea"
            />
          </div>

          {/* Action Buttons */}
          <div className="order-form__actions">
            <button
              type="button"
              className="order-form__download-btn"
              onClick={onDownloadPreview}
              data-cursor-text="DOWNLOAD"
            >
              <span>📥 Download Design Preview (PNG)</span>
            </button>

            <MagneticButton
              type="submit"
              variant="primary"
              size="lg"
              cursorText="WHATSAPP"
              className="order-form__submit-btn"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.67-1.4 1.29-1.93 1.37-.51.08-1.18.11-3.41-.81-2.85-1.18-4.68-4.08-4.82-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.54-.15.15-.3.32-.13.62.17.3 1.05 1.73 2.25 2.8 1.55 1.38 2.85 1.81 3.26 2.01.41.2.65.17.89-.11.24-.28 1.03-1.2 1.3-1.61.27-.41.55-.35.92-.21.37.14 2.37 1.12 2.78 1.32.41.2.68.3.78.47.1.17.1.98-.14 1.65z" />
                </svg>
              }
            >
              Submit Order Via WhatsApp
            </MagneticButton>
          </div>
        </form>

        {isSubmitted && (
          <div className="order-form__success-box">
            <span>✓ WhatsApp opened with your complete design specifications. Our atelier concierge will respond within minutes!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
