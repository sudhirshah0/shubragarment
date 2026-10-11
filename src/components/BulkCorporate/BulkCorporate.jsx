/* ═══════════════════════════════════════════════════════════════
   BulkCorporate — Enterprise Fleet & Corporate Orders
   Features:
   - 6 Institutional uniform benefits & UAE mobile fitting guarantees
   - 3 Scalable volume tiers with wholesale discount pricing
   - Interactive corporate inquiry form with WhatsApp concierge routing
   ═══════════════════════════════════════════════════════════════ */

import { corporateBenefits, corporateTiers } from '../../data/bulkCorporate';
import './BulkCorporate.css';

const BulkCorporate = () => {

  return (
    <section
      className="bulk-corporate section"
      id="corporate"
      aria-label="Bulk and Corporate Uniform Orders"
    >
      <div className="bulk-corporate__container container">
        {/* ── Section Header (Centered) ─────────────────────── */}
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
            <h3 className="bulk-corporate__tiers-heading">Volume & Fleet Packages</h3>
            <p className="bulk-corporate__tiers-sub">
              From boutique executive teams to high-volume multi-location fleets across the GCC.
            </p>
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
      </div>
    </section>
  );
};

export default BulkCorporate;
