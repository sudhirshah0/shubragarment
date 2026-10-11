/* ═══════════════════════════════════════════════════════════════
   clients.js — Corporate partners, 3 case studies, and atelier statistics
   ═══════════════════════════════════════════════════════════════ */

export const clientLogos = [
  { name: 'Jumeirah Resorts', sector: 'Ultra-Luxury Hospitality' },
  { name: 'Emirates Aviation', sector: 'VIP Flight Operations' },
  { name: 'DIFC Executive Guild', sector: 'Financial & Wealth Advisory' },
  { name: 'Address Hotels', sector: 'Hospitality & Luxury Suites' },
  { name: 'Emaar Hospitality', sector: 'High-End Concierge Staff' },
  { name: 'Bulgari Resort Dubai', sector: 'Private Island Luxury' },
  { name: 'Al Habtoor Polo Club', sector: 'VIP Members Uniforms' },
  { name: 'Rotana Executive', sector: 'Corporate Apparel' },
];

export const caseStudiesData = [
  {
    id: 'case-jumeirah',
    title: 'Jumeirah Luxury Hospitality Suite',
    sector: 'Hospitality • Dubai & Abu Dhabi',
    headline: '1,200 Hand-Tailored Concierge & Front-of-House Ensembles',
    description:
      'Engineered a complete uniform wardrobe for four 5-star resort properties across the UAE. Formulated with stain-resistant Italian merino wool and breathable bamboo silks for Dubai’s climate.',
    metrics: [
      { label: 'Garments Delivered', value: '1,250+' },
      { label: 'Turnaround Time', value: '14 Days' },
      { label: 'First-Fit Approval', value: '99.6%' },
    ],
    features: [
      'Nanotech Liquid-Repellent Wool',
      'Individual Tailoring per Staff Member',
      'Reinforced Ergonomic Stress Points',
    ],
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85',
    quote:
      '“Shubra Garments transformed our front-of-house presence. The drape and durability over thousands of hours of service remain extraordinary.”',
    author: 'Director of Guest Services, Jumeirah',
  },
  {
    id: 'case-difc',
    title: 'DIFC Executive Boardroom Suiting',
    sector: 'Private Wealth & Legal Guild • Dubai',
    headline: '350 Bespoke 3-Piece Super 150s Power Suits',
    description:
      'Commissioned by a premier private investment firm to outfit senior partners and directors with bespoke suiting crafted from Super 150s Vitale Barberis Canonico cloth.',
    metrics: [
      { label: 'Garments Delivered', value: '350+' },
      { label: 'Fabric Grade', value: 'Super 150s' },
      { label: 'Client Retention', value: '100%' },
    ],
    features: [
      'Full Floating Horsehair Canvas',
      'Discreet Monogrammed Silk Linings',
      'VIP In-Office Executive Fitting',
    ],
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    quote:
      '“The level of anatomical precision and fabric hand-feel rival Savile Row’s finest at a pace tailored for Dubai’s executive speed.”',
    author: 'Managing Partner, Financial Advisory',
  },
  {
    id: 'case-aviation',
    title: 'Royal Gulf Aviation Flight Crew',
    sector: 'Private Jet Fleet & VIP Aviation',
    headline: '450 Precision-Engineered Flight Crew Attires',
    description:
      'Designed for transcontinental long-haul flight operations. Lightweight, naturally wrinkle-resistant wool-elastane fabric with custom gold braid embroidery and hidden boarding pass pockets.',
    metrics: [
      { label: 'Flight Crew Outfitted', value: '450+' },
      { label: 'Crease Recovery', value: 'Immediate' },
      { label: 'Operational Service', value: '24 Months+' },
    ],
    features: [
      'Wrinkle-Resistant 4-Way Stretch Wool',
      'Hand-Embroidered Gold Bullion Insignia',
      'Thermal Regulating Breathable Linings',
    ],
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
    quote:
      '“Our cabin crew endure 14-hour flights between Dubai and London; our Shubra uniforms look as pristine landing as they did during take-off.”',
    author: 'VP Flight Operations, Royal Gulf Jet',
  },
];

export const clientStatsData = [
  {
    value: 50,
    suffix: '+',
    label: 'Enterprise Clients',
    subtext: 'UAE & Global Brands',
  },
  {
    value: 25000,
    suffix: '+',
    label: 'Delivered Pieces',
    subtext: 'Bespoke & Uniforms',
  },
  {
    value: 99.4,
    suffix: '%',
    decimals: 1,
    label: 'First-Fit Precision',
    subtext: 'Anatomical Cut',
  },
  {
    value: 48,
    suffix: 'h',
    label: 'Express Fitting',
    subtext: 'Mobile Across UAE',
  },
];
