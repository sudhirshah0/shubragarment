/* ═══════════════════════════════════════════════════════════════
   TextControls — Custom typography, monogram & image upload panel
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef } from 'react';
import { FONTS_LIST } from './garmentTemplates';

const TEXT_COLORS = [
  { name: 'Dubai Bronze', hex: '#A67C2E' },
  { name: 'Champagne Gold', hex: '#D9BC7A' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Midnight Onyx', hex: '#1A1817' },
  { name: 'Royal Navy', hex: '#162238' },
  { name: 'Rich Bordeaux', hex: '#4A1525' },
];

const MONOGRAM_PRESETS = ['SHUBRA', 'DUBAI', 'EST. 2024', 'ATELIER', 'VIP'];

const TextControls = ({
  onAddText,
  onUploadImage,
  onClearCanvas,
  activeObject,
  onUpdateActiveText,
}) => {
  const [textInput, setTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONTS_LIST[0].family);
  const [fontSize, setFontSize] = useState(26);
  const [textColor, setTextColor] = useState('#A67C2E');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddText = (e) => {
    e.preventDefault();
    const textToAdd = textInput.trim() || 'SHUBRA';
    onAddText(textToAdd, {
      fontFamily: selectedFont,
      fontSize,
      fill: textColor,
      bold: isBold,
      italic: isItalic,
    });
    setTextInput('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadImage(file);
      e.target.value = ''; // reset input so same file can be chosen again
    }
  };

  // If activeObject is IText, update it live
  const handleColorChange = (hex) => {
    setTextColor(hex);
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fill: hex });
      activeObject.canvas?.requestRenderAll();
    }
  };

  const handleFontChange = (fontFamily) => {
    setSelectedFont(fontFamily);
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontFamily });
      activeObject.canvas?.requestRenderAll();
    }
  };

  const handleSizeChange = (size) => {
    setFontSize(size);
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontSize: size });
      activeObject.canvas?.requestRenderAll();
    }
  };

  const toggleBold = () => {
    const next = !isBold;
    setIsBold(next);
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontWeight: next ? 'bold' : 'normal' });
      activeObject.canvas?.requestRenderAll();
    }
  };

  const toggleItalic = () => {
    const next = !isItalic;
    setIsItalic(next);
    if (activeObject && activeObject.type === 'i-text') {
      activeObject.set({ fontStyle: next ? 'italic' : 'normal' });
      activeObject.canvas?.requestRenderAll();
    }
  };

  return (
    <div className="text-controls">
      {/* ── Section A: Upload Logo at Top & Text Monogram ── */}
      <div className="text-controls__group">
        <label className="text-controls__label">
          Personalize Artwork
        </label>
        <div className="text-controls__creation-box">
          {/* 1. Upload Logo on the Top */}
          <div className="text-controls__upload-row">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="text-controls__upload-btn"
              onClick={() => fileInputRef.current?.click()}
              data-cursor-text="UPLOAD"
            >
              <svg className="text-controls__upload-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <span className="text-controls__upload-title">Upload Logo or Emblem (PNG, SVG)</span>
            </button>
          </div>

          {/* 2. Text / Monogram Input */}
          <form onSubmit={handleAddText} className="text-controls__input-row">
            <input
              id="designer-text-input"
              type="text"
              className="text-controls__input"
              placeholder="Or add custom name / initials..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              maxLength={32}
            />
            <button
              type="submit"
              className="text-controls__add-btn"
              data-cursor-text="ADD"
            >
              Add Text
            </button>
          </form>
        </div>
      </div>

      {/* ── Section B: Typography & Style ────────────────────── */}
      <div className="text-controls__group">
        <label className="text-controls__label">
          Typography
        </label>
        <div className="text-controls__font-grid">
          {FONTS_LIST.map((font) => (
            <button
              key={font.id}
              type="button"
              className={`text-controls__font-pill ${
                selectedFont === font.family ? 'text-controls__font-pill--active' : ''
              }`}
              style={{ fontFamily: font.family }}
              onClick={() => handleFontChange(font.family)}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section C: Formatting & Thread Color ─────────────── */}
      <div className="text-controls__row-split">
        {/* Formatting Buttons */}
        <div className="text-controls__subgroup">
          <label className="text-controls__label">
            Style
          </label>
          <div className="text-controls__styles">
            <button
              type="button"
              className={`text-controls__style-btn ${isBold ? 'text-controls__style-btn--active' : ''}`}
              onClick={toggleBold}
              title="Bold"
              aria-label="Bold text"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className={`text-controls__style-btn ${isItalic ? 'text-controls__style-btn--active' : ''}`}
              onClick={toggleItalic}
              title="Italic"
              aria-label="Italic text"
            >
              <em>I</em>
            </button>
          </div>
        </div>

        {/* Thread Color Dots */}
        <div className="text-controls__subgroup">
          <label className="text-controls__label">
            Thread Color
          </label>
          <div className="text-controls__color-swatches">
            {TEXT_COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`text-controls__color-dot ${
                  textColor === c.hex ? 'text-controls__color-dot--active' : ''
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => handleColorChange(c.hex)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Section E: Canvas Quick Reset ────────────────────── */}
      <div className="text-controls__footer">
        <button
          type="button"
          className="text-controls__clear-btn"
          onClick={onClearCanvas}
        >
          Clear Canvas Artwork
        </button>
      </div>
    </div>
  );
};

export default TextControls;
