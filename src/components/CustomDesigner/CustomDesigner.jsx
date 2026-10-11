/* ═══════════════════════════════════════════════════════════════
   CustomDesigner — Master 4-Step Interactive 3D Tailoring Studio
   Features:
   - 4 Sequential Steps with interactive progress indicator
   - Subcomponents: GarmentTabs, ColorSwatches, CanvasStage, TextControls, OrderForm
   - Full drag, resize, rotate, and text styling powered by Fabric.js
   - Front & Back view toggle with persistent artwork state
   - High-resolution design preview download (PNG)
   - Real-time WhatsApp order concierge submission
   - Memory-safe canvas lifecycle disposal on unmount
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import { GARMENTS, COLOR_SWATCHES } from './garmentTemplates';
import GarmentTabs from './GarmentTabs';
import ColorSwatches from './ColorSwatches';
import CanvasStage from './CanvasStage';
import TextControls from './TextControls';
import OrderForm from './OrderForm';
import MagneticButton from '../MagneticButton/MagneticButton';
import './CustomDesigner.css';

const STEPS = [
  { num: 1, label: 'Select colour' },
  { num: 2, label: 'Personalize' },
  { num: 3, label: 'Size & Order' },
];

const CustomDesigner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGarment, setSelectedGarment] = useState(GARMENTS[0]); // default T-Shirt
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0]); // default Onyx Black
  const [currentView, setCurrentView] = useState('front'); // 'front' | 'back'
  const [activeObject, setActiveObject] = useState(null);

  const stageRef = useRef(null);

  // ── Sync with external collection card clicks ────────────────
  useEffect(() => {
    const handleExternalSelect = (e) => {
      const categoryId = e.detail?.category;
      if (!categoryId) return;

      const found = GARMENTS.find(
        (g) => g.id === categoryId || g.id === categoryId.replace(/s$/, '')
      );
      if (found) {
        setSelectedGarment(found);
        setCurrentStep(1);
      }
    };

    window.addEventListener('shubra:select-garment', handleExternalSelect);
    return () => window.removeEventListener('shubra:select-garment', handleExternalSelect);
  }, []);

  // ── Canvas Interaction Handlers ──────────────────────────────
  const handleAddText = (text, options) => {
    stageRef.current?.addText(text, options);
  };

  const handleUploadImage = (file) => {
    stageRef.current?.addImageFromFile(file);
  };

  const handleClearCanvas = () => {
    if (window.confirm('Clear all custom embroidery and artwork from this view?')) {
      stageRef.current?.clearCanvas();
    }
  };

  // ── Download PNG Preview ─────────────────────────────────────
  const handleDownloadPreview = () => {
    const dataUrl = stageRef.current?.getPreviewDataURL();
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `shubra-${selectedGarment.id}-${selectedColor.id}-${currentView}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddToCart = () => {
    const previewUrl = stageRef.current?.getPreviewDataURL();
    window.dispatchEvent(
      new CustomEvent('shubra:add-to-cart', {
        detail: {
          id: `custom-${selectedGarment.id}-${selectedColor.id}`,
          title: `Custom ${selectedGarment.name}`,
          color: selectedColor.name,
          size: 'Custom Fit',
          price: `AED ${selectedGarment.basePrice}`,
          quantity: 1,
          image: previewUrl || selectedGarment.thumbnail,
        },
      })
    );

    // Trigger cart bounce & open cart popup
    const cartBtnEl = document.querySelector('.navbar__cart-btn');
    if (cartBtnEl) {
      cartBtnEl.classList.add('navbar__cart-btn--bounce');
      setTimeout(() => cartBtnEl.classList.remove('navbar__cart-btn--bounce'), 600);
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('shubra:open-cart'));
    }, 400);
  };

  // ── Step Navigation ──────────────────────────────────────────
  const goToNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section
      className="custom-designer section"
      id="custom-designer"
      aria-label="Interactive Custom Garment Designer"
    >
      {/* Anchor alias for #designer navigation */}
      <div id="designer" style={{ position: 'absolute', top: '-80px' }} />

      <div className="custom-designer__container container">
        {/* ── Section Header ─────────────────────────────────── */}
        <div className="custom-designer__header">
          <div className="custom-designer__title-row">
            <h2 className="custom-designer__title">Design Your Signature Garment</h2>
            <p className="custom-designer__subtitle tagline">
              Configure silhouette, fabric shade, and bespoke embroidery with live interactive preview.
            </p>
          </div>
        </div>

        {/* ── Main 2-Column Interactive Workspace ────────────── */}
        <div className="custom-designer__workspace">
          {/* Left Column: Canvas Studio Stage */}
          <div className="custom-designer__stage-col">
            <CanvasStage
              ref={stageRef}
              garment={selectedGarment}
              color={selectedColor}
              currentView={currentView}
              onViewToggle={setCurrentView}
              onActiveObjectChange={setActiveObject}
            />

            {/* Stage Quick Actions Bar */}
            <div className="custom-designer__stage-actions">
              <div className="custom-designer__stage-left">
                <button
                  type="button"
                  className="custom-designer__stage-action-btn custom-designer__stage-action-btn--cart"
                  onClick={handleAddToCart}
                  title="Add to bag"
                  data-cursor-text="ADD"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <span className="custom-designer__btn-text--desktop">Add to Bag</span>
                  <span className="custom-designer__btn-text--mobile">Add</span>
                </button>

                <button
                  type="button"
                  className="custom-designer__stage-action-btn"
                  onClick={handleDownloadPreview}
                  title="Download preview image"
                  data-cursor-text="PNG"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  <span>Download</span>
                </button>

                <button
                  type="button"
                  className="custom-designer__stage-action-btn custom-designer__stage-action-btn--reset"
                  onClick={handleClearCanvas}
                  title="Reset canvas"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                  <span>Reset</span>
                </button>
              </div>

              <div className="custom-designer__price-pill">
                <span className="custom-designer__price-pill-currency">AED</span>
                <span className="custom-designer__price-pill-val">{selectedGarment.basePrice}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Step-Specific Controls Panel */}
          <div className="custom-designer__controls-col">
            {/* Minimal Segmented Step Tabs (Right Side, No Numbering) */}
            <div className="custom-designer__tabs" role="tablist" aria-label="Customizer Steps">
              {STEPS.map((s) => (
                <button
                  key={s.num}
                  type="button"
                  role="tab"
                  aria-selected={currentStep === s.num}
                  className={`custom-designer__tab ${
                    currentStep === s.num ? 'custom-designer__tab--active' : ''
                  }`}
                  onClick={() => setCurrentStep(s.num)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="custom-designer__panel">
              {/* ── STEP 1: Garment & Color Selection ───────── */}
              {currentStep === 1 && (
                <div className="custom-designer__step-pane">
                  <div className="custom-designer__pane-header">
                    <h3 className="custom-designer__pane-title">Select colour</h3>
                    <p className="custom-designer__pane-desc">
                      Select your desired garment type, followed by the fabric shade.
                    </p>
                  </div>

                  <GarmentTabs
                    selectedGarment={selectedGarment}
                    onSelectGarment={setSelectedGarment}
                  />

                  <ColorSwatches
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                  />

                  <div className="custom-designer__pane-nav">
                    <MagneticButton
                      onClick={goToNextStep}
                      variant="primary"
                      size="md"
                      cursorText="NEXT"
                    >
                      Next: Personalize →
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Art & Monogram Customization ────── */}
              {currentStep === 2 && (
                <div className="custom-designer__step-pane">
                  <div className="custom-designer__pane-header">
                    <h3 className="custom-designer__pane-title">Personalize</h3>
                    <p className="custom-designer__pane-desc">
                      Add custom initials, embroidery or upload your logo. Drag, resize and position on the canvas.
                    </p>
                  </div>

                  <TextControls
                    onAddText={handleAddText}
                    onUploadImage={handleUploadImage}
                    onClearCanvas={handleClearCanvas}
                    activeObject={activeObject}
                  />

                  <div className="custom-designer__pane-nav custom-designer__pane-nav--split">
                    <button
                      type="button"
                      className="custom-designer__back-btn"
                      onClick={goToPrevStep}
                    >
                      Back
                    </button>
                    <MagneticButton
                      onClick={goToNextStep}
                      variant="primary"
                      size="md"
                      cursorText="NEXT"
                    >
                      Next: Size & Order →
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Sizing & WhatsApp Order ─────────── */}
              {currentStep === 3 && (
                <div className="custom-designer__step-pane">
                  <OrderForm
                    garment={selectedGarment}
                    color={selectedColor}
                    onDownloadPreview={handleDownloadPreview}
                    currentStep={currentStep}
                    onPrevStep={goToPrevStep}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesigner;
