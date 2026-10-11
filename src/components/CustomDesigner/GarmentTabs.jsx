/* ═══════════════════════════════════════════════════════════════
   GarmentTabs — Garment category selection tabs
   ═══════════════════════════════════════════════════════════════ */

import { GARMENTS } from './garmentTemplates';

const GarmentTabs = ({ selectedGarment, onSelectGarment }) => {
  return (
    <div className="garment-tabs" role="tablist" aria-label="Select Garment Category">
      {GARMENTS.map((garment) => {
        const isSelected = selectedGarment.id === garment.id;

        return (
          <button
            key={garment.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            className={`garment-tab ${isSelected ? 'garment-tab--active' : ''}`}
            onClick={() => onSelectGarment(garment)}
            data-cursor-text="CHOOSE"
          >
            <div className="garment-tab__preview-img-wrap" aria-hidden="true">
              {garment.image ? (
                <img
                  src={garment.image}
                  alt={garment.name}
                  className="garment-tab__preview-img"
                  loading="lazy"
                />
              ) : (
                <span className="garment-tab__icon">
                  {garment.id === 'coat' && '🧥'}
                  {garment.id === 'suit' && '🤵'}
                  {garment.id === 'pants' && '👖'}
                  {garment.id === 'shirt' && '👔'}
                  {garment.id === 't-shirt' && '👕'}
                </span>
              )}
            </div>

            <div className="garment-tab__info">
              <span className="garment-tab__name">{garment.name}</span>
              <span className="garment-tab__price">AED {garment.basePrice}</span>
            </div>

            {isSelected && <span className="garment-tab__indicator" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
};

export default GarmentTabs;
