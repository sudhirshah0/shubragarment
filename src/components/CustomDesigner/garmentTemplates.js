/* ═══════════════════════════════════════════════════════════════
   garmentTemplates.js — Vector paths & metadata for Custom Designer
   Supports 5 categories: T-Shirt, Shirt, Suit, Coat, Pants
   Each with Front & Back views, base prices, fabrics, and swatches.
   ═══════════════════════════════════════════════════════════════ */

export const GARMENTS = [
  {
    id: 't-shirt',
    name: 'T-Shirt',
    basePrice: 280,
    category: 'Everyday Luxury',
    image: '/images/collections/blue tshirt.png',
    fabrics: ['Organic Egyptian Cotton', '100% Mercerized Organic Supima Cotton (280 GSM)', 'Silk-Cotton Knit'],
    printableArea: { top: 180, left: 160, width: 180, height: 240 },
    views: {
      front: {
        body: 'M140 100 L195 100 C210 125 290 125 305 100 L360 100 L430 165 L385 220 L350 185 L350 490 C350 495 345 500 340 500 L160 500 C155 500 150 495 150 490 L150 185 L115 220 L70 165 Z',
        collar: 'M195 100 C210 135 290 135 305 100 C285 118 215 118 195 100 Z',
        seams: [
          'M150 185 L350 185', // Sleeve seams
          'M70 165 L115 220',
          'M430 165 L385 220',
          'M150 490 L350 490', // Hem
        ],
      },
      back: {
        body: 'M140 100 L195 100 C220 110 280 110 305 100 L360 100 L430 165 L385 220 L350 185 L350 490 C350 495 345 500 340 500 L160 500 C155 500 150 495 150 490 L150 185 L115 220 L70 165 Z',
        collar: 'M195 100 C220 115 280 115 305 100 C285 108 215 108 195 100 Z',
        seams: [
          'M150 185 L350 185',
          'M160 140 L340 140', // Back yoke
          'M150 490 L350 490',
        ],
      },
    },
  },
  {
    id: 'shirt',
    name: 'Shirt',
    basePrice: 450,
    category: 'Formal Suiting',
    image: '/images/collections/white shirt.png',
    fabrics: ['100% Giza Egyptian Long-Staple Cotton (120/2)', 'Sea Island Luxury Weave', 'Italian Royal Oxford'],
    printableArea: { top: 190, left: 165, width: 170, height: 230 },
    views: {
      front: {
        body: 'M145 95 L185 95 L250 150 L315 95 L355 95 L435 155 L395 215 L355 180 L355 495 C355 500 345 510 330 505 L250 490 L170 505 C155 510 145 500 145 495 L145 180 L105 215 L65 155 Z',
        collar: 'M185 95 L250 150 L220 175 L180 115 Z M315 95 L250 150 L280 175 L320 115 Z',
        placket: 'M244 145 L256 145 L256 490 L244 490 Z',
        buttons: [190, 240, 290, 340, 390, 440],
        seams: ['M145 180 L355 180', 'M145 495 C200 480 300 480 355 495'],
      },
      back: {
        body: 'M145 95 L200 100 C225 108 275 108 300 100 L355 95 L435 155 L395 215 L355 180 L355 495 C355 500 345 510 330 505 L250 490 L170 505 C155 510 145 500 145 495 L145 180 L105 215 L65 155 Z',
        collar: 'M200 100 C225 112 275 112 300 100 L300 88 C275 95 225 95 200 88 Z',
        yoke: 'M145 155 L355 155',
        boxPleat: 'M248 155 L248 490 M252 155 L252 490',
      },
    },
  },
  {
    id: 'pants',
    name: 'Pants',
    basePrice: 750,
    category: 'Sartorial Cut',
    image: '/images/collections/blue pant.png',
    fabrics: ['High-Twist Tropical Wool Fresco (280 GSM)', 'Heavyweight Irish Linen', 'Wool & Cashmere Flannel'],
    printableArea: { top: 120, left: 175, width: 150, height: 200 },
    views: {
      front: {
        body: 'M160 90 L340 90 L345 130 L360 490 L300 490 L260 250 L240 250 L200 490 L140 490 L155 130 Z',
        waistband: 'M160 90 L340 90 L340 125 L160 125 Z',
        gurkhaBelt: 'M210 100 L290 100 L290 115 L210 115 Z',
        pleats: [
          'M195 125 L195 240 M215 125 L215 210',
          'M305 125 L305 240 M285 125 L285 210',
        ],
        creases: ['M170 240 L170 490', 'M330 240 L330 490'],
      },
      back: {
        body: 'M160 90 L340 90 L345 130 L360 490 L300 490 L260 250 L240 250 L200 490 L140 490 L155 130 Z',
        waistband: 'M160 90 L340 90 L340 125 L160 125 Z',
        afterDinnerSplit: 'M250 90 L250 125',
        backPockets: [
          'M180 150 L220 150 L220 160 L180 160 Z',
          'M280 150 L320 150 L320 160 L280 160 Z',
        ],
        creases: ['M170 240 L170 490', 'M330 240 L330 490'],
      },
    },
  },
  {
    id: 'suit',
    name: 'Suit',
    basePrice: 2900,
    category: 'Master Bespoke',
    image: '/images/collections/navy hanger coat.png',
    fabrics: ['Super 150s Italian Merino Wool (260 GSM)', 'Loro Piana Tasmanian Wool', 'Scabal Diamond Chip'],
    printableArea: { top: 190, left: 180, width: 140, height: 210 },
    views: {
      front: {
        body: 'M130 90 L190 90 L250 260 L310 90 L370 90 L445 155 L405 235 L365 200 L365 510 L135 510 L135 200 L95 235 L55 155 Z',
        lapels: 'M190 90 L210 160 L245 175 L215 270 L250 270 L285 270 L255 175 L290 160 L310 90 Z',
        chestPocket: 'M170 215 L210 215 L210 225 L170 225 Z',
        pockets: [
          'M150 380 L210 380 L210 395 L150 395 Z',
          'M290 380 L350 380 L350 395 L290 395 Z',
        ],
        buttons: [290, 350],
      },
      back: {
        body: 'M130 90 L195 95 C220 102 280 102 305 95 L370 90 L445 155 L405 235 L365 200 L365 510 L135 510 L135 200 L95 235 L55 155 Z',
        collar: 'M195 95 C220 106 280 106 305 95 L305 84 C280 92 220 92 195 84 Z',
        centerSeam: 'M250 102 L250 510',
        sideVents: ['M180 430 L180 510', 'M320 430 L320 510'],
      },
    },
  },
];

export const COLOR_SWATCHES = [
  { id: 'navy', name: 'Navy Blue', hex: '#1E2D4A', textColor: '#F7F2EC' },
  { id: 'camel', name: 'Camel Tan', hex: '#C19A6B', textColor: '#2B211A' },
  { id: 'green', name: 'Forest Green', hex: '#2F4F3E', textColor: '#F7F2EC' },
  { id: 'red', name: 'Crimson Red', hex: '#8B1E2B', textColor: '#F7F2EC' },
  { id: 'black', name: 'Midnight Onyx', hex: '#1A1817', textColor: '#F7F2EC' },
  { id: 'white', name: 'Crisp White', hex: '#FFFFFF', textColor: '#2B211A' },
];

export const FONTS_LIST = [
  { id: 'Cormorant Garamond', name: 'Editorial Serif', family: "'Cormorant Garamond', serif" },
  { id: 'DM Sans', name: 'Modern Sans', family: "'DM Sans', sans-serif" },
  { id: 'Georgia', name: 'Classic Roman', family: 'Georgia, serif' },
  { id: 'Helvetica', name: 'Minimal Sans', family: "'Helvetica Neue', sans-serif" },
];

export const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', 'Bespoke'];

export const FIT_PROFILES = [
  { id: 'slim', name: 'Slim Fit' },
  { id: 'tailored', name: 'Tailored Fit' },
  { id: 'classic', name: 'Classic Fit' },
];
