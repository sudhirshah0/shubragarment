/* ═══════════════════════════════════════════════════════════════
   ColorSwatches — Live garment recoloring palette
   ═══════════════════════════════════════════════════════════════ */

import { COLOR_SWATCHES } from './garmentTemplates';

const ColorSwatches = ({ selectedColor, onSelectColor }) => {
  return (
    <div className="color-swatches-wrap">
      <div className="color-swatches__header">
        <span className="label">PRIMARY FABRIC SHADE</span>
        <span className="color-swatches__active-name">
          {selectedColor.name}
        </span>
      </div>

      <div className="color-swatches" role="radiogroup" aria-label="Garment Fabric Color">
        {COLOR_SWATCHES.map((swatch) => {
          const isSelected = selectedColor.id === swatch.id;

          return (
            <button
              key={swatch.id}
              role="radio"
              type="button"
              aria-checked={isSelected}
              aria-label={swatch.name}
              title={swatch.name}
              className={`color-swatch ${isSelected ? 'color-swatch--active' : ''}`}
              style={{ backgroundColor: swatch.hex }}
              onClick={() => onSelectColor(swatch)}
              data-cursor-text="SHADE"
            >
              {isSelected && (
                <span
                  className="color-swatch__check"
                  style={{ color: swatch.textColor }}
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSwatches;
