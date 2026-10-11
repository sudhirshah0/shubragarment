/* ═══════════════════════════════════════════════════════════════
   collections.js — 5 Distinct Categories with authentic cutouts,
   multi-color variants, fabric grades, details & pricing.
   ═══════════════════════════════════════════════════════════════ */

export const collectionsData = [
  {
    id: 'coats',
    category: 'coat',
    title: 'Executive Coats',
    shortTitle: 'Coats',
    tagline: 'Pure Cashmere & Heavyweight Double-Faced Wool',
    description:
      'Architectural overcoats cut with floating canvas chest pieces, peak lapels, and horn buttons. Engineered for distinguished presence across boardroom entries and cooler seasons.',
    price: 'AED 1,850',
    basePriceNum: 1850,
    fabric: '100% Mongolian Cashmere & Virgin Wool (480 GSM)',
    fit: 'Classic Tailored / Slim Overcoat',
    lining: '100% Cupro Bemberg Jacquard',
    leadTime: '3 – 5 Days Delivery',
    care: 'Specialist Dry Clean Only',
    colors: [
      { name: 'Navy Blue', hex: '#1E2D4A', image: '/images/collections/blue coat.png' },
      { name: 'Camel Tan', hex: '#C19A6B', image: '/images/collections/camel tan coat.png' },
      { name: 'Forest Green', hex: '#2F4F3E', image: '/images/collections/green coat.png' },
      { name: 'Crimson Red', hex: '#8B1E2B', image: '/images/collections/red coat.png' },
    ],
    features: [
      'Hand-stitched horn buttons & functional cuff buttonholes',
      'Double interior passport and cigar pockets',
      'Wind-resistant structured shoulder architecture',
    ],
  },
  {
    id: 'suits',
    category: 'suit',
    title: 'Tailored Suits',
    shortTitle: 'Suits',
    tagline: 'Super 150s Italian Merino Wool & Floating Canvas',
    description:
      'Impeccably sculpted two-piece and three-piece business suits. Hand-padded lapels and natural horsehair canvas drape effortlessly to personal anatomical contours.',
    price: 'AED 2,900',
    basePriceNum: 2900,
    fabric: 'Super 150s Italian Merino Wool (260 GSM)',
    fit: 'Bespoke Anatomical Fit / European Slim',
    lining: 'Hand-Finished Silk Blend',
    leadTime: '4 – 7 Days Delivery',
    care: 'Steam & Dry Clean Only',
    colors: [
      { name: 'Midnight Navy', hex: '#162238', image: '/images/collections/navy hanger coat.png' },
      { name: 'Camel Tan', hex: '#B89263', image: '/images/collections/camel tan hanger coat.png' },
      { name: 'Charcoal Grey', hex: '#4A4E54', image: '/images/collections/grey hanger coat.png' },
      { name: 'Royal Crimson', hex: '#7A1C29', image: '/images/collections/red hanger coat.png' },
    ],
    features: [
      'Full floating horsehair canvas chest construction',
      'Milanese silk buttonhole hand-sewn on lapel',
      'Curved waistband trousers with brass side adjusters',
    ],
  },
  {
    id: 'pants',
    category: 'pants',
    title: 'Pleated Trousers',
    shortTitle: 'Pants',
    tagline: 'Tropical Wool & Extended Gurkha Fasteners',
    description:
      'Tailored dress trousers crafted with deep forward double pleats, clean 4cm cuffs, and signature side adjusters for beltless sartorial sophistication.',
    price: 'AED 750',
    basePriceNum: 750,
    fabric: 'High-Twist Tropical Wool Fresco (280 GSM)',
    fit: 'High-Rise Relaxed Taper / Medium Break',
    lining: 'Viscose Knee Lining for Smooth Drape',
    leadTime: '2 – 4 Days Delivery',
    care: 'Dry Clean or Gentle Steam',
    colors: [
      { name: 'Navy Blue', hex: '#1E2C44', image: '/images/collections/blue pant.png' },
      { name: 'Camel Tan', hex: '#BE9667', image: '/images/collections/camel tan pant.png' },
      { name: 'Sage Green', hex: '#3B5342', image: '/images/collections/green pant.png' },
      { name: 'Slate Grey', hex: '#585C63', image: '/images/collections/grey pant.png' },
    ],
    features: [
      'Dual forward architectural pleats with permanent crease',
      'Extended Gurkha crossover waistband with brass buckles',
      'Curved after-dinner split waistband for seat comfort',
    ],
  },
  {
    id: 'shirts',
    category: 'shirt',
    title: 'Artisan Dress Shirts',
    shortTitle: 'Shirts',
    tagline: '120/2 Two-Ply Giza Egyptian Cotton',
    description:
      'Silky, breathable bespoke dress shirts with reinforced split yokes, French mother-of-pearl buttons, and customized collar styles calibrated for business authority.',
    price: 'AED 450',
    basePriceNum: 450,
    fabric: '100% Giza Egyptian Long-Staple Cotton (120/2)',
    fit: 'Slim Fitted / Modern Tailored',
    lining: 'Lightweight Interlining Collar & Cuffs',
    leadTime: '2 – 3 Days Delivery',
    care: 'Machine Wash Gentle (30°C) or Professional Laundry',
    colors: [
      { name: 'Crisp White', hex: '#F7F7F8', image: '/images/collections/white shirt.png' },
      { name: 'Sky Blue', hex: '#7BA4D0', image: '/images/collections/light blue shirt.png' },
      { name: 'Heather Grey', hex: '#72777F', image: '/images/collections/grey shirt.png' },
      { name: 'Burgundy Red', hex: '#85202D', image: '/images/collections/red shirt.png' },
    ],
    features: [
      '22 stitches per inch single-needle tailoring',
      'Australian Mother-of-Pearl Trocas buttons',
      'Removable solid brass engraved collar stays',
    ],
  },
  {
    id: 't-shirts',
    category: 't-shirt',
    title: 'Luxury Heavyweight Tees',
    shortTitle: 'T-Shirts',
    tagline: '280 GSM Mercerized American Supima Cotton',
    description:
      'Ultra-dense mercerized crewneck t-shirts designed with structured anti-sag ribbing, silicon wash treatment, and a silk-soft matte drape.',
    price: 'AED 280',
    basePriceNum: 280,
    fabric: '100% Mercerized Organic Supima Cotton (280 GSM)',
    fit: 'Elevated Drop Shoulder / Boxy Luxury Cut',
    lining: 'Pre-Shrunk Enzymatic Wash',
    leadTime: '1 – 2 Days Delivery',
    care: 'Cold Wash Inside Out, Line Dry',
    colors: [
      { name: 'Deep Blue', hex: '#203352', image: '/images/collections/blue tshirt.png' },
      { name: 'Forest Green', hex: '#2B4A3A', image: '/images/collections/green tshirt.png' },
      { name: 'Charcoal Grey', hex: '#4B5056', image: '/images/collections/grey tshirt.png' },
      { name: 'Vibrant Red', hex: '#942230', image: '/images/collections/red tshirt.png' },
    ],
    features: [
      'Double-stitched 3cm neckband that retains tension',
      'Silicon bio-wash finish for lint-free surface luster',
      'Zero side-seam tubular body for frictionless comfort',
    ],
  },
];

export default collectionsData;
