/* ═══════════════════════════════════════════════════════════════
   bulkCorporate.js — Bulk and corporate orders data
   ═══════════════════════════════════════════════════════════════ */

export const corporateBenefits = [
  {
    icon: '👔',
    title: 'Mobile Master Tailoring Across UAE',
    desc: 'Our master measuring team visits your corporate headquarters, luxury hotel, or embassy to fit each team member on-site.',
  },
  {
    icon: '🧵',
    title: 'Micro-Climatic Fabric Technology',
    desc: 'Bespoke high-twist wools and bamboo-cotton weaves engineered specifically for air-conditioned indoor comfort and UAE summer heat.',
  },
  {
    icon: '🏷️',
    title: 'Bespoke Branding & Gold Embroidery',
    desc: 'Discreet institutional silk labels, engraved horn buttons with corporate seals, and hand-stitched insignia.',
  },
  {
    icon: '📦',
    title: 'Lifetime Inventory Replenishment',
    desc: 'Seamless onboarding for new hires with stored digital patterns, fast 5-day reprint/refit, and dedicated account concierges.',
  },
  {
    icon: '⚡',
    title: 'Express 10-Day Bulk Turnaround',
    desc: 'High-capacity production facility in the UAE capable of delivering from 25 to 10,000+ units with zero quality compromise.',
  },
  {
    icon: '🛡️',
    title: 'Guaranteed 100% Fit Warranty',
    desc: 'Complimentary alterations and refits until every individual team member looks and feels exceptionally tailored.',
  },
];

export const corporateTiers = [
  {
    id: 'tier-1',
    name: 'Executive Boardroom',
    range: '10 – 49 Units',
    discount: '15% Off Atelier Rates',
    deliverables: [
      'Super 150s Wool Suiting',
      'Personal Initial Monograms',
      'Individual VIP In-Office Fitting',
      'Free Luxury Garment Bags',
    ],
    recommended: false,
  },
  {
    id: 'tier-2',
    name: 'Hospitality & Luxury Fleet',
    range: '50 – 249 Units',
    discount: '25% Off Atelier Rates',
    deliverables: [
      'Stain-Repellent Italian Cloth',
      'Custom Corporate Embroidery',
      'Full On-Site Staff Fitting Days',
      '12-Month Replenishment Guarantee',
    ],
    recommended: true,
  },
  {
    id: 'tier-3',
    name: 'Enterprise Fleet & Aviation',
    range: '250 – 5,000+ Units',
    discount: '35% Off Volume Rates',
    deliverables: [
      'Wrinkle-Resistant Performance Fabric',
      'Dedicated UAE Account Director',
      'Custom Mill Dye & Hardware',
      'Express Rapid Replenishment Stock',
    ],
    recommended: false,
  },
];
