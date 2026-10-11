/* ═══════════════════════════════════════════════════════════════
   collections.js — Shubra Garments Curated Collections
   Structured category-wise featuring high-resolution tailored cutouts,
   multi-color swatches, fabric specifications, and custom tailoring details.
   ═══════════════════════════════════════════════════════════════ */

export const collectionsData = [
  /* ─────────────────────────────────────────────────────────────
     1. BESPOKE BLAZERS & BROCADE JACQUARD
     ───────────────────────────────────────────────────────────── */
  {
    id: 'crimson-baroque-blazer',
    category: 'blazers',
    title: 'Imperial Baroque Jacquard Blazer',
    shortTitle: 'Jacquard Blazer',
    tagline: 'Gilded Crimson Floral Tapestry & Velvet Peak Lapels',
    description:
      'Masterfully woven silk-brocade double-breasted jacket featuring hand-embroidered floral motifs, structured pagoda shoulders, and ornate golden filigree buttons. Crafted for gala evenings and royal occasions.',
    price: 'AED 3,450',
    basePriceNum: 3450,
    fabric: 'Silk & Metallic Filament Jacquard Brocade (380 GSM)',
    fit: 'Bespoke Structured / Double-Breasted Sculpt',
    lining: '100% Crimson Silk Satin Bemberg',
    leadTime: '5 – 7 Days Bespoke Tailoring',
    care: 'Specialist Dry Clean Only',
    colors: [
      { name: 'Imperial Crimson', hex: '#8C1D2F', image: '/images/collection1/Unknown-29-1.png' },
      { name: 'Royal Burgundy Gold', hex: '#631320', image: '/images/collection1/Unknown-30-1.png' },
      { name: 'Midnight Blue Brocade', hex: '#1C2942', image: '/images/collection1/Unknown-31-1.png' },
      { name: 'Sapphire Tapestry', hex: '#131B2E', image: '/images/collection1/Unknown-32-1.png' },
    ],
    features: [
      'Gilded antique brass filigree crested buttons',
      'Floating horsehair canvas chest construction',
      'Hand-basted Milanese buttonhole on velvet peak lapel',
    ],
  },
  {
    id: 'navy-bronze-brocade-blazer',
    category: 'blazers',
    title: 'Sovereign Brocade Dinner Jacket',
    shortTitle: 'Brocade Jacket',
    tagline: 'Deep Midnight Navy with Bronze Gold Filigree Weave',
    description:
      'A regal statement tuxedo jacket engineered from bespoke woven metallic jacquard. Flawless pattern symmetry across seams with deep jet pockets and hand-rolled shawl/peak collar.',
    price: 'AED 3,200',
    basePriceNum: 3200,
    fabric: 'Italian Lurex-Infused Brocade Wool Blend (340 GSM)',
    fit: 'Slim Bespoke Silhouette / Italian Cut',
    lining: 'Midnight Cupro Jacquard with Gold Piping',
    leadTime: '4 – 6 Days Delivery',
    care: 'Specialist Dry Clean Only',
    colors: [
      { name: 'Navy & Bronze', hex: '#1B263B', image: '/images/collection1/Unknown-34-1.png' },
      { name: 'Midnight Gold', hex: '#101726', image: '/images/collection1/Unknown-35-1.png' },
    ],
    features: [
      'Hand-matched floral tapestry across front panels',
      'Dual interior cigar and fountain pen breast pockets',
      'Functional working surgeon cuffs with matching brocade shank buttons',
    ],
  },
  {
    id: 'heritage-plaid-blazer',
    category: 'blazers',
    title: 'Heritage British Plaid Double-Breasted Blazer',
    shortTitle: 'Plaid Blazer',
    tagline: 'Fine Scottish Saxony Wool in Camel Tan & Tartan Overcheck',
    description:
      'Classic British tailoring reimagined with bold peak lapels, horn buttons, and an architectural hourglass waist drape. Flawlessly matched check patterns cut from heritage mills.',
    price: 'AED 2,850',
    basePriceNum: 2850,
    fabric: '100% Saxony Virgin Wool (310 GSM)',
    fit: 'Structured Double-Breasted / Modern British Fit',
    lining: '100% Breathable Viscose Twill',
    leadTime: '4 – 6 Days Delivery',
    care: 'Dry Clean Only',
    colors: [
      { name: 'Camel Tartan', hex: '#B89263', image: '/images/collection1/Unknown-28-1.png' },
    ],
    features: [
      '6x2 Double-breasted button stance with genuine horn buttons',
      'Roped shoulder sleeves with hand-stitched pick detailing',
      'Side double vents with reinforced bar-tack stitching',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     2. LEATHER & OUTERWEAR
     ───────────────────────────────────────────────────────────── */
  {
    id: 'cafe-racer-leather',
    category: 'leather',
    title: 'Artisan Burnished Cafe Racer Jacket',
    shortTitle: 'Leather Jacket',
    tagline: 'Full-Grain Hand-Waxed Lambskin with Antique Brass Hardware',
    description:
      'Hand-crafted cafe racer leather jacket treated with bespoke wax burnishing for rich patinated depth. Features snap tab mandarin collar, heavy-duty YKK two-way zip, and quilted shoulder padding.',
    price: 'AED 2,750',
    basePriceNum: 2750,
    fabric: '100% Full-Grain Vegetable Tanned Nappa Leather',
    fit: 'Tailored Biker Cut / Contoured Silhouette',
    lining: 'Thermal Diamond Quilted Satin Lining',
    leadTime: '3 – 5 Days Delivery',
    care: 'Specialist Leather Care Only',
    colors: [
      { name: 'Cognac Brown', hex: '#633B1E', image: '/images/collection1/Unknown-67-1.png' },
      { name: 'Onyx Black', hex: '#1C1C1E', image: '/images/collection1/Unknown-68-1.png' },
      { name: 'Camel Tan', hex: '#A36838', image: '/images/collection1/Unknown-69-1.png' },
    ],
    features: [
      'Solid antique brass industrial hardware & zippered cuffs',
      'Reinforced ergonomic elbow and shoulder articulation panels',
      'Concealed RFID-protected inner chest passport pocket',
    ],
  },
  {
    id: 'heritage-varsity-jacket',
    category: 'leather',
    title: 'Classic Wool & Leather Varsity Letterman',
    shortTitle: 'Varsity Jacket',
    tagline: 'Melton Wool Body with Top-Grain Leather Sleeves & Chenille Crest',
    description:
      'Timeless collegiate craftsmanship constructed with heavyweight 650 GSM melton wool body, supple calf leather sleeves, and striped heavy rib knit cuffs and hem.',
    price: 'AED 1,950',
    basePriceNum: 1950,
    fabric: '80% Melton Wool / 20% Polyamide + 100% Calf Leather Sleeves',
    fit: 'Relaxed Vintage Bomber Fit',
    lining: 'Lightweight Diamond Quilted Primaloft Insulated Lining',
    leadTime: '3 – 5 Days Delivery',
    care: 'Specialist Leather & Wool Clean Only',
    colors: [
      { name: 'Crimson & Cream', hex: '#7A1C29', image: '/images/collection1/Unknown-74-1.png' },
    ],
    features: [
      'Authentic chenille embroidered heritage crest patch',
      'Heavy-gauge 2x2 striped ribbing collar, cuffs, and waist',
      'Enamel-coated snap button front closure with leather welt pockets',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     3. AVIATION & CORPORATE SUITING
     ───────────────────────────────────────────────────────────── */
  {
    id: 'female-cabin-crew-uniform',
    category: 'aviation',
    title: 'Aviation Cabin Crew Tailored Uniform Set',
    shortTitle: 'Cabin Crew Set',
    tagline: 'Anti-Crease High-Performance Poly-Wool with Silk Accent Piping',
    description:
      'Bespoke commercial airline stewardess suiting engineered for long-haul durability and refined luxury. Includes precision single-breasted jacket with piped shawl lapel, matching pencil skirt, and silk ascot scarf.',
    price: 'AED 1,650',
    basePriceNum: 1650,
    fabric: 'Technical Travel Wool Fresco with 4-Way Lycra Stretch (270 GSM)',
    fit: 'Fitted Ergonomic Suiting / Professional Grade',
    lining: 'Anti-Static Breathable Micro-Mesh Lining',
    leadTime: '3 – 5 Days / Bulk Corporate Options',
    care: 'Machine Wash Gentle / Wrinkle-Resistant Finish',
    colors: [
      { name: 'Aviation Navy', hex: '#1C2B47', image: '/images/collection1/Unknown-52-1.png' },
      { name: 'Bordeaux Burgundy', hex: '#581622', image: '/images/collection1/Unknown-53-1.png' },
      { name: 'Charcoal Slate', hex: '#3C4046', image: '/images/collection1/Unknown-54-1.png' },
      { name: 'Airways Teal', hex: '#1C4A54', image: '/images/collection1/Unknown-55-1.png' },
    ],
    features: [
      'Stain-resistant Teflon fabric coating against spills and turbulence',
      'Stretch shoulder back gussets for complete overhead reach freedom',
      'Comfort-expandable contour waistband with concealed security pocket',
    ],
  },
  {
    id: 'male-flight-crew-suit',
    category: 'aviation',
    title: 'Commercial Flight Crew 3-Piece Suiting',
    shortTitle: 'Flight Crew Suit',
    tagline: 'Executive Pilot & Officer Tailored Suit with Vest & Trousers',
    description:
      'Impeccably tailored corporate three-piece suiting calibrated for commercial airline commanders and ground executives. Includes structured blazer, formal vest with satin back, and dress trousers.',
    price: 'AED 2,250',
    basePriceNum: 2250,
    fabric: 'High-Twist Virgin Merino Wool & Performance Core (290 GSM)',
    fit: 'Tailored European Cut / Aviation Standard',
    lining: 'Moisture-Wicking Silk Touch Cupro',
    leadTime: '4 – 7 Days / Corporate Tailoring',
    care: 'Professional Dry Clean',
    colors: [
      { name: 'Pilot Midnight Navy', hex: '#18243B', image: '/images/collection1/Unknown-56-1.png' },
      { name: 'Executive Burgundy', hex: '#501520', image: '/images/collection1/Unknown-57-1.png' },
      { name: 'Command Charcoal', hex: '#373A3F', image: '/images/collection1/Unknown-58-1.png' },
    ],
    features: [
      'Reinforced shoulder epaulette points for rank stripe sliders',
      'Double-breasted and single-breasted flight badge mounts',
      'Permanent razor crease heat-set trousers with comfort stretch waistband',
    ],
  },
  {
    id: 'captain-pilot-uniform',
    category: 'aviation',
    title: 'Airline Commander Captain Uniform',
    shortTitle: 'Captain Uniform',
    tagline: 'Four-Stripe Gold Bullion Cuffs, Aviation Cap & Tailored Trousers',
    description:
      'Full command pilot ensemble built to international airline specifications. Featuring authentic four-bar gold bullion embroidery on cuffs, captain peaked visor cap, and wrinkle-resistant officer trousers.',
    price: 'AED 2,850',
    basePriceNum: 2850,
    fabric: 'All-Climate Australian Wool Blend with Nano-Shield Protection',
    fit: 'Command Structured Fit',
    lining: 'Lightweight Thermocool Silk Blend',
    leadTime: '5 – 7 Days Delivery',
    care: 'Dry Clean Only',
    colors: [
      { name: 'Command Navy', hex: '#16233B', image: '/images/collection1/Unknown-64-1.png' },
      { name: 'First Officer Charcoal', hex: '#2F343B', image: '/images/collection1/Unknown-65-1.png' },
      { name: 'Aviation Navy Flight Crew', hex: '#1C2E4D', image: '/images/collection1/Unknown-62-1.png' },
      { name: 'Senior Purser Amethyst', hex: '#4B2848', image: '/images/collection1/Unknown-66-1.png' },
    ],
    features: [
      'Hand-embroidered gold wire bullion command stripes on cuffs',
      'Dual mic-clip loops and pen loops integrated seamlessly inside lapels',
      'Custom wings badge mounting points with heavy backing reinforcement',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     4. INDUSTRIAL & SAFETY WORKWEAR
     ───────────────────────────────────────────────────────────── */
  {
    id: 'hivis-utility-suit',
    category: 'workwear',
    title: 'Two-Piece High-Visibility Industrial Utility Suit',
    shortTitle: 'Workwear Suit',
    tagline: 'EN ISO 20471 Certified Hi-Vis Jacket & Heavy Cargo Pants',
    description:
      'Engineered for maximum protection and durability across oilfield, logistics, and construction operations. Includes heavy ripstop multi-pocket jacket and matching cargo work pants with 3M Scotchlite reflective bands.',
    price: 'AED 620',
    basePriceNum: 620,
    fabric: 'Heavyweight Poly-Cotton Ripstop with Teflon Shield (320 GSM)',
    fit: 'Ergonomic Action-Back Workwear Fit',
    lining: 'Ventilated Honeycomb Mesh Core',
    leadTime: '1 – 3 Days / Bulk Corporate Stock',
    care: 'Industrial Wash up to 60°C / Colorfast',
    colors: [
      { name: 'Safety Hi-Vis Orange', hex: '#E65C00', image: '/images/collection1/Unknown-59-1.png' },
      { name: 'Industrial Navy', hex: '#1C2942', image: '/images/collection1/Unknown-60-1.png' },
      { name: 'Fluorescent Yellow', hex: '#C2D110', image: '/images/collection1/Unknown-61-1.png' },
    ],
    features: [
      'Certified 3M Scotchlite 50mm reflective heat-sealed prismatic tape',
      'Triple-needle chain stitched seams with Cordura reinforced knee pad pockets',
      'Multi-compartment chest radio pocket, ID card window & heavy D-ring tabs',
    ],
  },
  {
    id: 'hivis-workwear-jacket',
    category: 'workwear',
    title: 'Multi-Pocket Technical Field Work Jacket',
    shortTitle: 'Work Jacket',
    tagline: 'Abrasion-Resistant Ripstop with 3M Reflective Safety Banding',
    description:
      'Heavy-duty industrial utility jacket engineered with storm flap zipper, adjustable Velcro storm cuffs, and deep cargo bellows pockets. Optimized for high visibility and tough environments.',
    price: 'AED 380',
    basePriceNum: 380,
    fabric: 'Poly-Cotton Duck Canvas (300 GSM) with Water-Repellent Treatment',
    fit: 'Relaxed Utility Over-Fit',
    lining: 'Breathable Moisture-Wicking Mesh',
    leadTime: '1 – 3 Days Delivery',
    care: 'Industrial Laundry Safe',
    colors: [
      { name: 'Safety Orange', hex: '#E85E00', image: '/images/collection1/Unknown-42-1.png' },
      { name: 'Contractor Navy', hex: '#1C283E', image: '/images/collection1/Unknown-43-1.png' },
      { name: 'Hi-Vis Yellow', hex: '#BDCA17', image: '/images/collection1/Unknown-44-1.png' },
      { name: 'All-Weather Parka', hex: '#D6580A', image: '/images/collection1/Unknown-49-1.png' },
    ],
    features: [
      'Heavy-duty YKK two-way zipper with storm flap snap closure',
      'Reinforced Cordura elbow patches for extreme abrasion resistance',
      'Detachable or roll-away high-visibility hood with bungee adjusters',
    ],
  },
  {
    id: 'hivis-cargo-pants',
    category: 'workwear',
    title: 'Reflective Cargo Heavy-Duty Work Pants',
    shortTitle: 'Work Pants',
    tagline: 'Triple-Stitched Utility Trousers with Kneepad Pockets',
    description:
      'Engineered for tradesmen, technicians, and field engineers. Features generous side cargo bellows pockets, top-loading kneepad slots, hammer loop, and dual 3M Scotchlite calf reflective bands.',
    price: 'AED 260',
    basePriceNum: 260,
    fabric: 'Tough Ripstop Cotton-Poly Blend (280 GSM)',
    fit: 'Relaxed Taper Work Fit with Gusseted Crotch',
    lining: 'Self-Faced Waistband with Gripper Elastic',
    leadTime: '1 – 3 Days Delivery',
    care: 'Machine Wash Warm, Tumble Dry Medium',
    colors: [
      { name: 'Safety Orange', hex: '#E65C00', image: '/images/collection1/Unknown-48-1.png' },
      { name: 'Fleet Navy', hex: '#1C2942', image: '/images/collection1/Unknown-50-1.png' },
      { name: 'Hi-Vis Yellow', hex: '#BDC915', image: '/images/collection1/Unknown-51-1.png' },
    ],
    features: [
      'Diamond gusset crotch eliminates seam blowout during kneeling',
      'Dual holster tool pockets with reinforced nylon webbing',
      'Integrated knee-pad inserts compatible with standard foam protectors',
    ],
  },
  {
    id: 'safety-hard-helmets',
    category: 'workwear',
    title: 'ANSI Certified Industrial Safety Hard Hat',
    shortTitle: 'Safety Helmet',
    tagline: 'High-Density ABS Shell with 6-Point Ratchet Suspension & Vents',
    description:
      'Engineered impact-absorbing industrial safety helmets complying with ANSI Z89.1 Type 1 Class C/E standards. Equipped with rapid-adjust wheel ratchet dial, sweat-wicking brow pad, and universal accessory slots.',
    price: 'AED 120',
    basePriceNum: 120,
    fabric: 'Impact-Modified UV-Stabilized Acrylonitrile Butadiene Styrene (ABS)',
    fit: 'Adjustable 53 – 63 cm Head Circumference',
    lining: 'Padded Hydro-Filic Sweatband',
    leadTime: '1 – 2 Days Stock Delivery',
    care: 'Wipe Clean with Mild Soap & Water',
    colors: [
      { name: 'Safety Orange', hex: '#E65C00', image: '/images/collection1/Unknown-45-1.png' },
      { name: 'Engineer White', hex: '#F0F0F2', image: '/images/collection1/Unknown-46-1.png' },
      { name: 'Site Supervisor Blue', hex: '#1E6292', image: '/images/collection1/Unknown-47-1.png' },
    ],
    features: [
      '6-point nylon textile suspension harness for superior kinetic shock dissipation',
      'Easy-grip rear turn ratchet adjuster operable even with heavy work gloves',
      'Universal 30mm side accessory slots for earmuffs and face shields',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     5. HEADWEAR & ACCESSORIES
     ───────────────────────────────────────────────────────────── */
  {
    id: 'jacquard-brocade-cap',
    category: 'headwear',
    title: 'Luxury Woven Brocade Baseball Cap',
    shortTitle: 'Brocade Cap',
    tagline: 'Embossed Floral Tapestry Weave with Antiqued Metal Clasp',
    description:
      'Elevated streetwear meets haute atelier tailoring. Crafted with rich silk-brocade floral jacquard, curved structured peak, and genuine calfskin leather backstrap with engraved brass clasp.',
    price: 'AED 320',
    basePriceNum: 320,
    fabric: 'Metallic Lurex & Silk Brocade Fabric',
    fit: 'Structured 6-Panel Crown / Adjustable Backstrap',
    lining: '100% Breathable Cotton Twill Sweatband',
    leadTime: '1 – 2 Days Delivery',
    care: 'Spot Clean Only',
    colors: [
      { name: 'Emerald Forest Brocade', hex: '#264D3B', image: '/images/collection1/Unknown-37-1.png' },
      { name: 'Imperial Crimson Brocade', hex: '#7A1C29', image: '/images/collection1/Unknown-36-1.png' },
      { name: 'Royal Navy Gold Brocade', hex: '#1C2942', image: '/images/collection1/Unknown-38-1.png' },
    ],
    features: [
      'Curved peak with shape-retention thermo-core insert',
      'Engraved brushed brass buckle closure with strap tuck-in slot',
      'Embroidered eyelets for discreet heat ventilation',
    ],
  },
  {
    id: 'performance-safety-cap',
    category: 'headwear',
    title: 'Technical High-Vis Athletic Field Cap',
    shortTitle: 'Field Cap',
    tagline: 'Quick-Dry Ripstop Nylon with 3M Reflective Trim & Laser Eyelets',
    description:
      'Ultra-lightweight technical baseball cap engineered for outdoor crews and athletic pursuits. Features laser-perforated breathability panels, UPF 50+ UV shielding, and reflective rim piping.',
    price: 'AED 150',
    basePriceNum: 150,
    fabric: 'Hydrophobic Ripstop Performance Nylon (110 GSM)',
    fit: 'Low-Profile 6-Panel Athletic Fit',
    lining: 'Coolmax Moisture-Absorbing Terry Sweatband',
    leadTime: '1 – 2 Days Delivery',
    care: 'Hand Wash Cold, Air Dry',
    colors: [
      { name: 'Hi-Vis Orange', hex: '#E65C00', image: '/images/collection1/Unknown-39-1.png' },
      { name: 'Navy Blue', hex: '#1C2942', image: '/images/collection1/Unknown-40-1.png' },
      { name: 'Fluorescent Yellow', hex: '#C2D110', image: '/images/collection1/Unknown-41-1.png' },
    ],
    features: [
      'Reflective 3M rim piping along bill edge for night safety',
      'UPF 50+ ultraviolet radiation blocking textile treatment',
      'Quick-release Velcro buckle with elasticized comfort tensioner',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     6. TAILORED TROUSERS & CHINOS
     ───────────────────────────────────────────────────────────── */
  {
    id: 'tailored-utility-chinos',
    category: 'trousers',
    title: 'Tailored Smart Chinos & Field Trousers',
    shortTitle: 'Tailored Chinos',
    tagline: 'Long-Staple Pima Cotton Twill with Clean Front & Extended Tab',
    description:
      'Refined smart-casual trousers tailored from premium high-density cotton twill with subtle stretch. Finished with clean slash pockets, horn buttons, and tailored split back waistband.',
    price: 'AED 580',
    basePriceNum: 580,
    fabric: '97% Pima Cotton Twill / 3% Spandex Comfort Stretch (260 GSM)',
    fit: 'Slim Tailored Taper / Medium Rise',
    lining: 'Chambray Cotton Pocket Bags & Fly Facing',
    leadTime: '2 – 4 Days Delivery',
    care: 'Machine Wash 30°C or Dry Clean',
    colors: [
      { name: 'Espresso Brown', hex: '#3E271D', image: '/images/collection1/Unknown-71-1.png' },
      { name: 'Camel Khaki', hex: '#9C7A4F', image: '/images/collection1/Unknown-72-1.png' },
      { name: 'Field Olive Green', hex: '#3B4D3C', image: '/images/collection1/Unknown-73-1.png' },
      { name: 'Deep Mocha', hex: '#332017', image: '/images/collection1/Unknown-71-2.png' },
    ],
    features: [
      'Concealed French fly with genuine horn extended button tab',
      'Interior shirt-gripper waistband lining keeps shirts tucked',
      'Double welt rear pockets with horn button closures',
    ],
  },

  /* ─────────────────────────────────────────────────────────────
     7. CASUAL & ATHLETIC WEAR
     ───────────────────────────────────────────────────────────── */
  {
    id: 'graphic-long-sleeve',
    category: 'casual',
    title: 'Streetwear Graphic Heavyweight Long-Sleeve',
    shortTitle: 'Graphic Long-Sleeve',
    tagline: '300 GSM Organic Combed Cotton with High-Density Screenprint',
    description:
      'Substantial heavyweight streetwear long-sleeve tee featuring custom collector graphic print, drop-shoulder architecture, and heavy-gauge ribbed collar and cuffs.',
    price: 'AED 340',
    basePriceNum: 340,
    fabric: '100% Organic Heavyweight Combed Cotton (300 GSM)',
    fit: 'Boxy Oversized Streetwear Silhouette',
    lining: 'Pre-Shrunk Carbon-Brushed Finish',
    leadTime: '1 – 3 Days Delivery',
    care: 'Wash Cold Inside-Out, Do Not Iron Print',
    colors: [
      { name: 'Midnight Purple', hex: '#4B2354', image: '/images/collection1/Unknown-75-1.png' },
      { name: 'Pitch Black', hex: '#1C1C1E', image: '/images/collection1/Unknown-76-1.png' },
      { name: 'Heather Smoke Grey', hex: '#585C63', image: '/images/collection1/Unknown-77-1.png' },
    ],
    features: [
      'Soft-hand feel water-based discharge graphic illustration',
      'Reinforced shoulder-to-shoulder herringbone internal neck tape',
      'Tubular seamless body construction for zero seam chafing',
    ],
  },
  {
    id: 'performance-athletic-jersey',
    category: 'casual',
    title: 'Technical Performance Athletic Jersey',
    shortTitle: 'Performance Jersey',
    tagline: 'Sublimated Moisture-Wicking Poly with Geometric Mesh Inserts',
    description:
      'High-performance sport jersey engineered for elite teamwear, training, and institutional athletic programs. Features ergonomic raglan sleeves and active breathability cooling zones.',
    price: 'AED 240',
    basePriceNum: 240,
    fabric: '100% Hydro-Dry Micro-Interlock Polyester (180 GSM)',
    fit: 'Athletic Fitted Cut / Ergonomic Movement',
    lining: 'Anti-Microbial Silver-Ion Fabric Treatment',
    leadTime: '1 – 3 Days / Custom Club Prints Available',
    care: 'Machine Wash Cold Quick Cycle',
    colors: [
      { name: 'Navy & Gold Chevron', hex: '#1A2A44', image: '/images/collection1/Unknown-78-1.png' },
    ],
    features: [
      'Advanced 4-way mechanical stretch interlock knit',
      'Underarm and flank laser ventilation mesh insets',
      'Reflective transfer logo detailing for low-light visibility',
    ],
  },
];

export default collectionsData;
