/* ═══════════════════════════════════════════════════════════════
   OrderForm — Sizing, Quantity, Customer Info & WhatsApp Submission
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
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
  onPrevStep,
}) => {
  // Sizing & Specs State
  const [selectedSize, setSelectedSize] = useState('M');
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [fitProfile, setFitProfile] = useState('tailored');
  const [fabricGrade, setFabricGrade] = useState(garment.fabrics[0]);
  const [quantity, setQuantity] = useState(1);

  // Sync fabricGrade when selected garment changes
  useEffect(() => {
    if (garment && garment.fabrics && garment.fabrics.length > 0) {
      setFabricGrade(garment.fabrics[0]);
    }
  }, [garment]);

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
        <div className="order-form__group">
          <div className="order-form__group-header">
            <label className="order-form__label">Select Size</label>
            <button
              type="button"
              className="order-form__size-chart-btn"
              onClick={() => setShowSizeChart((prev) => !prev)}
              aria-label="View size chart guide"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>{showSizeChart ? 'Hide Size Chart' : 'Size Chart (Inches)'}</span>
            </button>
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

          {/* ── Interactive Size Chart Table matching specifications ── */}
          {showSizeChart && (
            <div className="order-form__size-chart-wrap" role="region" aria-label="Garment Size Chart">
              <div className="order-form__size-chart-scroll">
                <table className="order-form__size-chart-table">
                  <thead>
                    <tr>
                      <th className="order-form__th-metric">In Inches</th>
                      <th>S</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                      <th>2XL</th>
                      <th>3XL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={selectedSize === 'S' || selectedSize === 'M' || selectedSize === 'L' || selectedSize === 'XL' || selectedSize === '2XL' || selectedSize === '3XL' ? '' : ''}>
                      <td className="order-form__td-label">Length</td>
                      <td className={selectedSize === 'S' ? 'order-form__td--selected' : ''}>26</td>
                      <td className={selectedSize === 'M' ? 'order-form__td--selected' : ''}>27</td>
                      <td className={selectedSize === 'L' ? 'order-form__td--selected' : ''}>28</td>
                      <td className={selectedSize === 'XL' ? 'order-form__td--selected' : ''}>29</td>
                      <td className={selectedSize === '2XL' ? 'order-form__td--selected' : ''}>30</td>
                      <td className={selectedSize === '3XL' ? 'order-form__td--selected' : ''}>31</td>
                    </tr>
                    <tr>
                      <td className="order-form__td-label">Chest</td>
                      <td className={selectedSize === 'S' ? 'order-form__td--selected' : ''}>38</td>
                      <td className={selectedSize === 'M' ? 'order-form__td--selected' : ''}>40</td>
                      <td className={selectedSize === 'L' ? 'order-form__td--selected' : ''}>42</td>
                      <td className={selectedSize === 'XL' ? 'order-form__td--selected' : ''}>44</td>
                      <td className={selectedSize === '2XL' ? 'order-form__td--selected' : ''}>46</td>
                      <td className={selectedSize === '3XL' ? 'order-form__td--selected' : ''}>48</td>
                    </tr>
                    <tr>
                      <td className="order-form__td-label">Shoulder</td>
                      <td className={selectedSize === 'S' ? 'order-form__td--selected' : ''}>16</td>
                      <td className={selectedSize === 'M' ? 'order-form__td--selected' : ''}>17</td>
                      <td className={selectedSize === 'L' ? 'order-form__td--selected' : ''}>18</td>
                      <td className={selectedSize === 'XL' ? 'order-form__td--selected' : ''}>19</td>
                      <td className={selectedSize === '2XL' ? 'order-form__td--selected' : ''}>20</td>
                      <td className={selectedSize === '3XL' ? 'order-form__td--selected' : ''}>21</td>
                    </tr>
                    <tr>
                      <td className="order-form__td-label">Sleeve Open</td>
                      <td className={selectedSize === 'S' ? 'order-form__td--selected' : ''}>3.5</td>
                      <td className={selectedSize === 'M' ? 'order-form__td--selected' : ''}>4</td>
                      <td className={selectedSize === 'L' ? 'order-form__td--selected' : ''}>4</td>
                      <td className={selectedSize === 'XL' ? 'order-form__td--selected' : ''}>4.5</td>
                      <td className={selectedSize === '2XL' ? 'order-form__td--selected' : ''}>4.5</td>
                      <td className={selectedSize === '3XL' ? 'order-form__td--selected' : ''}>5</td>
                    </tr>
                    <tr>
                      <td className="order-form__td-label">Sleeve Length</td>
                      <td className={selectedSize === 'S' ? 'order-form__td--selected' : ''}>24</td>
                      <td className={selectedSize === 'M' ? 'order-form__td--selected' : ''}>25</td>
                      <td className={selectedSize === 'L' ? 'order-form__td--selected' : ''}>26</td>
                      <td className={selectedSize === 'XL' ? 'order-form__td--selected' : ''}>27</td>
                      <td className={selectedSize === '2XL' ? 'order-form__td--selected' : ''}>28</td>
                      <td className={selectedSize === '3XL' ? 'order-form__td--selected' : ''}>28.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="order-form__size-chart-footnote">
                • Standard measurements in inches. For bespoke pattern cutting, choose &quot;Bespoke&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Custom Measurements Input when Bespoke chosen */}
        {(selectedSize === 'Bespoke' || selectedSize === 'Custom Bespoke') && (
          <div className="order-form__bespoke-inputs">
            <span className="order-form__label">Measurements (cm)</span>
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
          </div>
        )}

        {/* Fit Profiles - Minimal Segmented Pills */}
        <div className="order-form__group">
          <label className="order-form__label">Fit Profile</label>
          <div className="order-form__fit-pills">
            {FIT_PROFILES.map((fit) => (
              <button
                key={fit.id}
                type="button"
                className={`order-form__fit-pill ${
                  fitProfile === fit.id ? 'order-form__fit-pill--active' : ''
                }`}
                onClick={() => setFitProfile(fit.id)}
              >
                {fit.name}
              </button>
            ))}
          </div>
        </div>

        {/* Fabric Grade Selection */}
        <div className="order-form__group">
          <label className="order-form__label" htmlFor="order-fabric">Fabric Grade</label>
          <select
            id="order-fabric"
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

      {/* ── Section 2: Quantity & Live Pricing Card ───────────── */}
      <div className="order-form__price-card">
        <div className="order-form__qty-group">
          <span className="order-form__label">Quantity</span>
          <div className="order-form__stepper">
            <button
              type="button"
              className="order-form__stepper-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="order-form__qty-val">{quantity}</span>
            <button
              type="button"
              className="order-form__stepper-btn"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <div className="order-form__price-group">
          <span className="order-form__label">Estimated Total</span>
          <div className="order-form__total-price">
            AED {totalPrice.toLocaleString()}
          </div>
          {discountPercent > 0 && (
            <span className="order-form__discount-badge">
              {discountPercent}% volume savings
            </span>
          )}
        </div>
      </div>

      {/* ── Section 3: Contact & Order Submission ─────────────── */}
      <div className="order-form__section">
        <form onSubmit={handleWhatsAppSubmit} className="order-form__contact-grid">
          <div className="order-form__field">
            <label className="order-form__label" htmlFor="order-name">Full Name *</label>
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
            <label className="order-form__label" htmlFor="order-phone">WhatsApp / Phone *</label>
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
            <label className="order-form__label" htmlFor="order-emirate">Emirate</label>
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

          <div className="order-form__field">
            <label className="order-form__label" htmlFor="order-email">Email (Optional)</label>
            <input
              id="order-email"
              type="email"
              placeholder="name@example.ae"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="order-form__input"
            />
          </div>

          <div className="order-form__field order-form__field--full">
            <label className="order-form__label" htmlFor="order-notes">Special Requests (Optional)</label>
            <input
              id="order-notes"
              type="text"
              placeholder="Fitting preferences, embroidery placement..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="order-form__input"
            />
          </div>

          {/* Action Buttons: Unified in One Single Row */}
          <div className="order-form__actions">
            {onPrevStep && (
              <button
                type="button"
                className="order-form__back-btn"
                onClick={onPrevStep}
              >
                Back
              </button>
            )}

            <div className="order-form__right-actions">
              <button
                type="button"
                className="order-form__download-btn"
                onClick={onDownloadPreview}
                data-cursor-text="PNG"
                title="Download preview PNG"
              >
                <span>Download Preview</span>
              </button>

              <button
                type="submit"
                className="order-form__wa-btn"
                data-cursor-text="WHATSAPP"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.67-1.4 1.29-1.93 1.37-.51.08-1.18.11-3.41-.81-2.85-1.18-4.68-4.08-4.82-4.27-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.54-.15.15-.3.32-.13.62.17.3 1.05 1.73 2.25 2.8 1.55 1.38 2.85 1.81 3.26 2.01.41.2.65.17.89-.11.24-.28 1.03-1.2 1.3-1.61.27-.41.55-.35.92-.21.37.14 2.37 1.12 2.78 1.32.41.2.68.3.78.47.1.17.1.98-.14 1.65z" />
                </svg>
                <span>Order via WhatsApp</span>
              </button>
            </div>
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
