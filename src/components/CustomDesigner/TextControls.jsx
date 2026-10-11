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
      {/* ── Section A: Monogram / Text Addition ──────────────── */}
      <div className="text-controls__group">
        <label className="text-controls__label label" htmlFor="designer-text-input">
          ADD MONOGRAM OR TEXT
        </label>
        <form onSubmit={handleAddText} className="text-controls__input-row">
          <input
            id="designer-text-input"
            type="text"
            className="text-controls__input"
            placeholder="e.g. SHUBRA or Your Initials"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            maxLength={32}
          />
          <button
            type="submit"
            className="text-controls__add-btn"
            data-cursor-text="ADD"
          >
            + Add Text
          </button>
        </form>

        {/* Quick Monogram Chips */}
        <div className="text-controls__presets">
          <span className="label">QUICK IDEAS:</span>
          {MONOGRAM_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="text-controls__preset-chip"
              onClick={() => onAddText(preset, { fontFamily: selectedFont, fontSize, fill: textColor })}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* ── Section B: Font Typography Selection ─────────────── */}
      <div className="text-controls__group">
        <label className="text-controls__label label" htmlFor="designer-font-select">
          FONT SELECTION
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

      {/* ── Section C: Text Size & Style Controls ────────────── */}
      <div className="text-controls__group">
        <div className="text-controls__row-between">
          <label className="text-controls__label label" htmlFor="font-size-slider">
            TEXT SIZE ({fontSize}px)
          </label>
          <div className="text-controls__styles">
            <button
              type="button"
              className={`text-controls__style-btn ${isBold ? 'text-controls__style-btn--active' : ''}`}
              onClick={toggleBold}
              title="Bold"
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              className={`text-controls__style-btn ${isItalic ? 'text-controls__style-btn--active' : ''}`}
              onClick={toggleItalic}
              title="Italic"
            >
              <em>I</em>
            </button>
          </div>
        </div>

        <input
          id="font-size-slider"
          type="range"
          min="14"
          max="64"
          value={fontSize}
          onChange={(e) => handleSizeChange(Number(e.target.value))}
          className="text-controls__slider"
        />
      </div>

      {/* ── Section D: Thread / Print Color Swatches ─────────── */}
      <div className="text-controls__group">
        <span className="text-controls__label label">EMBROIDERY & PRINT COLOR</span>
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
              onClick={() => handleColorChange(c.hex)}
            />
          ))}
        </div>
      </div>

      {/* ── Section E: Image / Logo Upload ──────────────────── */}
      <div className="text-controls__group text-controls__group--upload">
        <span className="text-controls__label label">COMPANY LOGO / ARTWORK</span>
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
          <span className="text-controls__upload-icon">📁</span>
          <div className="text-controls__upload-meta">
            <strong>Upload Custom Logo or Emblem</strong>
            <span>PNG, JPG or SVG • Transparent backgrounds recommended</span>
          </div>
        </button>
      </div>

      {/* ── Section F: Clear View ────────────────────────────── */}
      <div className="text-controls__footer">
        <button
          type="button"
          className="text-controls__clear-btn"
          onClick={onClearCanvas}
        >
          Clear Custom Artwork
        </button>
      </div>
    </div>
  );
};

export default TextControls;
