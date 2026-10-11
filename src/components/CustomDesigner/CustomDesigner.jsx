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
  { num: 1, label: 'Silhouette & Color', desc: 'Select garment & cloth' },
  { num: 2, label: 'Art & Monogram', desc: 'Add embroidery & logo' },
  { num: 3, label: 'Sizing & Specs', desc: 'Fit profile & fabric grade' },
  { num: 4, label: 'Review & Submit', desc: 'Direct WhatsApp order' },
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

  // ── Step Navigation ──────────────────────────────────────────
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

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
              Configure cloth shades, personal embroidery, and corporate insignia with live interactive preview.
            </p>
          </div>
        </div>

        {/* ── 4-Step Interactive Progress Bar ────────────────── */}
        <div className="custom-designer__progress-panel">
          <div className="custom-designer__progress-bar-bg">
            <div
              className="custom-designer__progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="custom-designer__steps-nav" role="tablist">
            {STEPS.map((s) => {
              const isCurrent = currentStep === s.num;
              const isPassed = currentStep > s.num;

              return (
                <button
                  key={s.num}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`custom-designer__step-btn ${
                    isCurrent ? 'custom-designer__step-btn--active' : ''
                  } ${isPassed ? 'custom-designer__step-btn--passed' : ''}`}
                  onClick={() => setCurrentStep(s.num)}
                  data-cursor-text="STEP"
                >
                  <span className="custom-designer__step-badge">
                    {isPassed ? '✓' : `0${s.num}`}
                  </span>
                  <div className="custom-designer__step-meta">
                    <span className="custom-designer__step-label">{s.label}</span>
                    <span className="custom-designer__step-desc">{s.desc}</span>
                  </div>
                </button>
              );
            })}
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
              <button
                type="button"
                className="custom-designer__stage-action-btn custom-designer__stage-action-btn--cart"
                onClick={() => {
                  const previewUrl = stageRef.current?.getPreviewDataURL();
                  window.dispatchEvent(
                    new CustomEvent('shubra:add-to-cart', {
                      detail: {
                        id: `custom-${selectedGarment.id}-${selectedColor.id}`,
                        title: `Custom Bespoke ${selectedGarment.name}`,
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
                }}
                title="Add current bespoke piece to bag"
                data-cursor-text="ADD"
              >
                <span>🛒 Add Bespoke Piece To Cart</span>
              </button>

              <button
                type="button"
                className="custom-designer__stage-action-btn"
                onClick={handleDownloadPreview}
                title="Download Hi-Res Image"
                data-cursor-text="PNG"
              >
                <span>📥 Export PNG</span>
              </button>

              <button
                type="button"
                className="custom-designer__stage-action-btn"
                onClick={handleClearCanvas}
                title="Clear current view"
              >
                <span>🗑️ Reset View</span>
              </button>

              <div className="custom-designer__price-pill">
                <span className="label">BASE PRICE:</span>
                <strong>AED {selectedGarment.basePrice}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Step-Specific Controls Panel */}
          <div className="custom-designer__controls-col">
            <div className="custom-designer__panel">
              {/* ── STEP 1: Garment & Color Selection ───────── */}
              {currentStep === 1 && (
                <div className="custom-designer__step-pane">
                  <div className="custom-designer__pane-header">
                    <h3 className="custom-designer__pane-title">Choose Silhouette & Color</h3>
                    <p className="custom-designer__pane-desc">
                      Select your desired garment type, followed by the primary textile hue.
                    </p>
                  </div>

                  <GarmentTabs
                    selectedGarment={selectedGarment}
                    onSelectGarment={setSelectedGarment}
                  />

                  <div className="custom-designer__pane-divider" />

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
                      Continue To Artwork & Monograms →
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* ── STEP 2: Art & Monogram Customization ────── */}
              {currentStep === 2 && (
                <div className="custom-designer__step-pane">
                  <div className="custom-designer__pane-header">
                    <h3 className="custom-designer__pane-title">Add Monograms & Artwork</h3>
                    <p className="custom-designer__pane-desc">
                      Personalize with custom typography or upload corporate logos. Drag, resize, and rotate elements directly on the canvas.
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
                      ← Back
                    </button>
                    <MagneticButton
                      onClick={goToNextStep}
                      variant="primary"
                      size="md"
                      cursorText="NEXT"
                    >
                      Proceed To Sizing & Specs →
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Sizing, Specs & Review ──────────── */}
              {currentStep === 3 && (
                <div className="custom-designer__step-pane">
                  <OrderForm
                    garment={selectedGarment}
                    color={selectedColor}
                    onDownloadPreview={handleDownloadPreview}
                    currentStep={currentStep}
                  />

                  <div className="custom-designer__pane-nav custom-designer__pane-nav--split">
                    <button
                      type="button"
                      className="custom-designer__back-btn"
                      onClick={goToPrevStep}
                    >
                      ← Back to Artwork
                    </button>
                    <MagneticButton
                      onClick={goToNextStep}
                      variant="primary"
                      size="md"
                      cursorText="FINAL"
                    >
                      Finalize Order Summary →
                    </MagneticButton>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Review & WhatsApp Submission ────── */}
              {currentStep === 4 && (
                <div className="custom-designer__step-pane">
                  <div className="custom-designer__pane-header">
                    <h3 className="custom-designer__pane-title">Direct WhatsApp Submission</h3>
                    <p className="custom-designer__pane-desc">
                      Your design blueprint is compiled. Submit directly to our Dubai atelier via WhatsApp to schedule delivery or your VIP bespoke fitting.
                    </p>
                  </div>

                  <OrderForm
                    garment={selectedGarment}
                    color={selectedColor}
                    onDownloadPreview={handleDownloadPreview}
                    currentStep={currentStep}
                  />

                  <div className="custom-designer__pane-nav">
                    <button
                      type="button"
                      className="custom-designer__back-btn"
                      onClick={goToPrevStep}
                    >
                      ← Adjust Sizing & Specs
                    </button>
                  </div>
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
