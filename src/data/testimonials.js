/* ═══════════════════════════════════════════════════════════════
   testimonials.js — Client reviews & sample endorsements
   Structured as { quote, name, role, company, photo }
   ═══════════════════════════════════════════════════════════════ */

export const clientLogosList = [
  { name: 'Jumeirah', src: '/images/clients/jumeirah.svg' },
  { name: 'Emirates', src: '/images/clients/emirates.svg' },
  { name: 'Rotana', src: '/images/clients/rotana.svg' },
  { name: 'Emaar', src: '/images/clients/emaar.svg' },
  { name: 'Sofitel', src: '/images/clients/sofitel.svg' },
  { name: 'Hilton', src: '/images/clients/hilton.svg' },
];

export const sampleReviews = [
  {
    id: 1,
    quote: 'Sample review: The precision tailoring and immaculate fabric hand-feel for our executive team exceeded every benchmark in Dubai.',
    name: 'Khalid Al Hashimi',
    role: 'Managing Director',
    company: 'DIFC Private Wealth Advisory',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 2,
    quote: 'Sample review: Seamless coordination across 800+ hospitality staff uniforms. Every single piece fit accurately on delivery day.',
    name: 'Victoria Sterling',
    role: 'VP Guest Experience',
    company: 'Jumeirah Luxury Resorts',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 3,
    quote: 'Sample review: High-twist wool engineered specifically for air-conditioned meetings and UAE climate. Exceptional comfort.',
    name: 'Tariq Mansoor',
    role: 'Head of Operations',
    company: 'Emaar Properties Group',
    photo: '', // tests initials avatar fallback
  },
  {
    id: 4,
    quote: 'Sample review: Our corporate flight crew attires remain crisp and wrinkle-free throughout 14-hour transcontinental flights.',
    name: 'Marcus Vance',
    role: 'Chief Flight Director',
    company: 'Royal Gulf VIP Aviation',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 5,
    quote: 'Sample review: Rapid 10-day turnaround without compromising custom embroidery seals or button detailing. True atelier mastery.',
    name: 'Elena Rostova',
    role: 'Procurement Director',
    company: 'Rotana Hospitality Suite',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 6,
    quote: 'Sample review: On-site master measuring saved our management team hours of valuable time. Outstanding craftsmanship.',
    name: 'Zayed Al Qasimi',
    role: 'Protocol Officer',
    company: 'Sharjah Diplomatic Guild',
    photo: '', // tests initials avatar fallback
  },
  {
    id: 7,
    quote: 'Sample review: The tailored suits have become an essential signature of our front-of-house luxury brand identity.',
    name: 'Sophie Laurent',
    role: 'Brand Experience Lead',
    company: 'Sofitel Dubai Downtown',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 8,
    quote: 'Sample review: Reliable replenishments for new team onboardings. Stored pattern files make reordering effortless.',
    name: 'Farooq Al Nuaimi',
    role: 'VP Corporate Services',
    company: 'Emirates Investment Authority',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: 9,
    quote: 'Sample review: Superb craftsmanship, elegant silhouettes, and courteous concierge service from consultation to final fitting.',
    name: 'Amina Al Shamsi',
    role: 'General Manager',
    company: 'Hilton Capital Towers',
    photo: '', // tests initials avatar fallback
  },
];
