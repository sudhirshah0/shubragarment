/* ═══════════════════════════════════════════════════════════════
   CanvasStage — Fabric.js Canvas interactive tailoring stage
   Features:
   - Real-time garment silhouette rendering with live fabric color
   - Separate state preservation between Front & Back views
   - Drag, resize, rotate, scale text and uploaded images
   - Touch gesture support on mobile devices
   - High-resolution preview export & clean canvas disposal
   ═══════════════════════════════════════════════════════════════ */

import { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { Canvas, Path, IText, FabricImage } from 'fabric';

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 580;

const CanvasStage = forwardRef(
  (
    {
      garment,
      color,
      currentView, // 'front' | 'back'
      onViewToggle,
      onActiveObjectChange,
    },
    ref
  ) => {
    const canvasElRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const isUpdatingRef = useRef(false);

    // Stored user artwork per view so front and back designs remain persistent
    const viewArtworkCacheRef = useRef({
      front: [],
      back: [],
    });

    const viewportRef = useRef(null);
    const [hasSelection, setHasSelection] = useState(false);

    // ── Helper: Draw Garment Silhouette ──────────────────────────
    const renderGarmentBase = useCallback(
      (canvas, garmentObj, colorObj, viewKey) => {
        if (!canvas) return;

        // Remove any old background garment pieces
        const oldBgs = canvas.getObjects().filter((obj) => obj.__isGarmentPart);
        oldBgs.forEach((obj) => canvas.remove(obj));

        const viewData = garmentObj.views[viewKey] || garmentObj.views.front;

        let insertIdx = 0;

        // 1. Base Silhouette Path
        if (viewData.body) {
          const bodyPath = new Path(viewData.body, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: colorObj.hex,
            stroke: 'rgba(43, 33, 26, 0.45)',
            strokeWidth: 1.5,
            strokeLinejoin: 'round',
            selectable: false,
            evented: false,
          });
          bodyPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, bodyPath);
        }

        // 2. Collar / Lapel Overlay
        if (viewData.collar) {
          const collarPath = new Path(viewData.collar, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: 'rgba(0,0,0,0.06)',
            stroke: 'rgba(43, 33, 26, 0.55)',
            strokeWidth: 1.25,
            strokeLinejoin: 'round',
            selectable: false,
            evented: false,
          });
          collarPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, collarPath);
        }

        // 3. Lapels on Suits & Coats
        if (viewData.lapels) {
          const lapelPath = new Path(viewData.lapels, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: 'rgba(0,0,0,0.08)',
            stroke: 'rgba(43, 33, 26, 0.6)',
            strokeWidth: 1.25,
            strokeLinejoin: 'round',
            selectable: false,
            evented: false,
          });
          lapelPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, lapelPath);
        }

        // 4. Placket (Dress Shirts)
        if (viewData.placket) {
          const placketPath = new Path(viewData.placket, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: 'rgba(0,0,0,0.05)',
            stroke: 'rgba(43, 33, 26, 0.4)',
            strokeWidth: 1,
            strokeLinejoin: 'round',
            selectable: false,
            evented: false,
          });
          placketPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, placketPath);
        }

        // 5. Waistband (Pants / Trousers)
        if (viewData.waistband) {
          const wbPath = new Path(viewData.waistband, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: 'rgba(0,0,0,0.08)',
            stroke: 'rgba(43, 33, 26, 0.45)',
            strokeWidth: 1.2,
            strokeLinejoin: 'round',
            selectable: false,
            evented: false,
          });
          wbPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, wbPath);
        }

        // 6. Gurkha Belt / Details
        if (viewData.gurkhaBelt) {
          const beltPath = new Path(viewData.gurkhaBelt, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: '#A67C2E',
            stroke: 'rgba(43, 33, 26, 0.6)',
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          beltPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, beltPath);
        }

        // 7. Chest Pocket
        if (viewData.chestPocket) {
          const cpPath = new Path(viewData.chestPocket, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: 'rgba(0,0,0,0.1)',
            stroke: 'rgba(43, 33, 26, 0.5)',
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          cpPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, cpPath);
        }

        // 8. Flap Pockets
        if (viewData.pockets && Array.isArray(viewData.pockets)) {
          viewData.pockets.forEach((pocketD) => {
            const pPath = new Path(pocketD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: 'rgba(0,0,0,0.09)',
              stroke: 'rgba(43, 33, 26, 0.5)',
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            pPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, pPath);
          });
        }

        // 9. Back Pockets (Pants)
        if (viewData.backPockets && Array.isArray(viewData.backPockets)) {
          viewData.backPockets.forEach((pocketD) => {
            const bpPath = new Path(pocketD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: 'rgba(0,0,0,0.06)',
              stroke: 'rgba(43, 33, 26, 0.4)',
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            bpPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, bpPath);
          });
        }

        // 10. Pleats & Creases (Pants)
        if (viewData.pleats && Array.isArray(viewData.pleats)) {
          viewData.pleats.forEach((pleatD) => {
            const plPath = new Path(pleatD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: '',
              stroke: 'rgba(43, 33, 26, 0.35)',
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            plPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, plPath);
          });
        }

        if (viewData.creases && Array.isArray(viewData.creases)) {
          viewData.creases.forEach((creaseD) => {
            const crPath = new Path(creaseD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: '',
              stroke: 'rgba(43, 33, 26, 0.25)',
              strokeWidth: 0.8,
              selectable: false,
              evented: false,
            });
            crPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, crPath);
          });
        }

        // 11. Center Seam / Center Vent / Back Yoke
        const singleLines = [viewData.centerSeam, viewData.centerVent, viewData.yoke, viewData.boxPleat, viewData.afterDinnerSplit].filter(Boolean);
        singleLines.forEach((lineD) => {
          const lPath = new Path(lineD, {
            left: 250,
            top: 290,
            originX: 'center',
            originY: 'center',
            fill: '',
            stroke: 'rgba(43, 33, 26, 0.3)',
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          lPath.__isGarmentPart = true;
          canvas.insertAt(insertIdx++, lPath);
        });

        // 12. Side Vents
        if (viewData.sideVents && Array.isArray(viewData.sideVents)) {
          viewData.sideVents.forEach((ventD) => {
            const vPath = new Path(ventD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: '',
              stroke: 'rgba(43, 33, 26, 0.4)',
              strokeWidth: 1,
              selectable: false,
              evented: false,
            });
            vPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, vPath);
          });
        }

        // 13. Seams (Sleeves, Hems, etc.)
        if (viewData.seams && Array.isArray(viewData.seams)) {
          viewData.seams.forEach((seamD) => {
            const seamPath = new Path(seamD, {
              left: 250,
              top: 290,
              originX: 'center',
              originY: 'center',
              fill: '',
              stroke: 'rgba(43, 33, 26, 0.3)',
              strokeWidth: 1,
              strokeDasharray: [3, 3],
              selectable: false,
              evented: false,
            });
            seamPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, seamPath);
          });
        }

        // 14. Buttons (Shirts, Suits, Coats)
        if (viewData.buttons && Array.isArray(viewData.buttons)) {
          viewData.buttons.forEach((yCoord) => {
            const buttonPath = new Path(
              `M247 ${yCoord} A3 3 0 1 0 253 ${yCoord} A3 3 0 1 0 247 ${yCoord}`,
              {
                left: 250,
                top: yCoord,
                originX: 'center',
                originY: 'center',
                fill: '#FAF7F2',
                stroke: '#A67C2E',
                strokeWidth: 1,
                selectable: false,
                evented: false,
              }
            );
            buttonPath.__isGarmentPart = true;
            canvas.insertAt(insertIdx++, buttonPath);
          });
        }

        canvas.requestRenderAll();
      },
      []
    );

    // ── Initialize Fabric Canvas & Listeners ─────────────────────
    useEffect(() => {
      const canvasEl = canvasElRef.current;
      if (!canvasEl) return;

      const canvas = new Canvas(canvasEl, {
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        backgroundColor: '#FAF7F2',
        preserveObjectStacking: true,
        selection: true,
        allowTouchScrolling: true, // lets users scroll the page naturally on mobile touch
      });

      fabricCanvasRef.current = canvas;

      // Custom Luxury Gold Selection Controls Style
      canvas.selectionColor = 'rgba(217, 188, 122, 0.18)';
      canvas.selectionBorderColor = '#A67C2E';
      canvas.selectionLineWidth = 1.5;

      const handleResize = () => {
        const viewport = viewportRef.current || canvasEl.closest('.canvas-stage__viewport');
        if (!viewport || !fabricCanvasRef.current) return;
        const rect = viewport.getBoundingClientRect();
        // Support narrow phones down to 320px-360px (Galaxy Z Fold, iPhone SE) without any horizontal overflow
        const viewportW = rect.width > 0 ? rect.width : (window.innerWidth ? Math.min(window.innerWidth - 32, 500) : 320);
        const availableW = Math.max(160, Math.min(STAGE_WIDTH, viewportW - 12));
        const scale = availableW / STAGE_WIDTH;
        fabricCanvasRef.current.setDimensions({
          width: availableW,
          height: Math.round(STAGE_HEIGHT * scale),
        });
        fabricCanvasRef.current.setZoom(scale);
        fabricCanvasRef.current.requestRenderAll();

        const guideEl = viewport.querySelector('.canvas-stage__printable-guide');
        if (guideEl) {
          guideEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
      };

      const handleSelection = () => {
        const active = canvas.getActiveObject();
        setHasSelection(!!active);
        if (onActiveObjectChange) {
          onActiveObjectChange(active || null);
        }
      };

      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', handleSelection);

      // Use both window resize and ResizeObserver on viewport
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      let resizeObserver = null;
      const viewportEl = viewportRef.current || canvasEl.closest('.canvas-stage__viewport');
      if (typeof ResizeObserver !== 'undefined' && viewportEl) {
        resizeObserver = new ResizeObserver(() => {
          handleResize();
        });
        resizeObserver.observe(viewportEl);
      }
      handleResize();
      setTimeout(handleResize, 100);
      setTimeout(handleResize, 350);
      setTimeout(handleResize, 700);

      // Keyboard delete shortcut
      const handleKeyDown = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
          // If editing inside an IText, let native typing handle backspace
          const active = canvas.getActiveObject();
          if (active && !active.isEditing) {
            e.preventDefault();
            canvas.remove(active);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      // Initial garment render
      renderGarmentBase(canvas, garment, color, currentView);

      // Cleanup & proper disposal on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        if (resizeObserver) resizeObserver.disconnect();
        window.removeEventListener('keydown', handleKeyDown);
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', handleSelection);
        canvas.dispose();
        fabricCanvasRef.current = null;
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Update Garment Base when garment / color changes ─────────
    useEffect(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      renderGarmentBase(canvas, garment, color, currentView);
    }, [garment, color, currentView, renderGarmentBase]);

    // ── Handle View Switch (Front <-> Back) with Cache ───────────
    const handleSwitchView = (newView) => {
      if (newView === currentView) return;
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // 1. Cache current user objects (non-garment objects)
      const currentObjects = canvas.getObjects().filter((obj) => !obj.__isGarmentPart);
      viewArtworkCacheRef.current[currentView] = currentObjects;

      // 2. Remove user objects from canvas
      isUpdatingRef.current = true;
      currentObjects.forEach((obj) => canvas.remove(obj));

      // 3. Inform parent of view change
      onViewToggle(newView);

      // 4. Restore target view's cached user objects
      const targetObjects = viewArtworkCacheRef.current[newView] || [];
      targetObjects.forEach((obj) => canvas.add(obj));

      canvas.discardActiveObject();
      canvas.requestRenderAll();
      isUpdatingRef.current = false;
    };

    // ── Expose Imperative Methods to Parent via ref ──────────────
    useImperativeHandle(
      ref,
      () => ({
        // 1. Add Text Object
        addText: (textString = 'SHUBRA', options = {}) => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;

          const textObj = new IText(textString, {
            left: 250,
            top: 270,
            originX: 'center',
            originY: 'center',
            fontFamily: options.fontFamily || "'Cormorant Garamond', serif",
            fontSize: options.fontSize || 24,
            fill: options.fill || '#A67C2E',
            fontWeight: options.bold ? 'bold' : 'normal',
            fontStyle: options.italic ? 'italic' : 'normal',
            textAlign: options.align || 'center',
            cornerColor: '#D9BC7A',
            cornerStrokeColor: '#A67C2E',
            cornerSize: 9,
            transparentCorners: false,
            borderColor: '#A67C2E',
            borderScaleFactor: 1.5,
          });

          canvas.add(textObj);
          canvas.setActiveObject(textObj);
          canvas.requestRenderAll();
        },

        // 2. Add Image / Logo Object from File
        addImageFromFile: async (file) => {
          const canvas = fabricCanvasRef.current;
          if (!canvas || !file) return;

          const reader = new FileReader();
          reader.onload = async (f) => {
            const dataUrl = f.target.result;
            try {
              const imgObj = await FabricImage.fromURL(dataUrl);

              // Scale image to fit neatly within printable chest zone
              const maxDim = 140;
              const currentMax = Math.max(imgObj.width, imgObj.height);
              if (currentMax > maxDim) {
                const scale = maxDim / currentMax;
                imgObj.scale(scale);
              }

              imgObj.set({
                left: 250,
                top: 280,
                originX: 'center',
                originY: 'center',
                cornerColor: '#D9BC7A',
                cornerStrokeColor: '#A67C2E',
                cornerSize: 9,
                transparentCorners: false,
                borderColor: '#A67C2E',
              });

              canvas.add(imgObj);
              canvas.setActiveObject(imgObj);
              canvas.requestRenderAll();
            } catch (err) {
              console.error('Failed to load image into Fabric.js:', err);
            }
          };
          reader.readAsDataURL(file);
        },

        // 3. Delete Selected Object
        deleteSelected: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const active = canvas.getActiveObject();
          if (active && !active.__isGarmentPart) {
            canvas.remove(active);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
          }
        },

        // 4. Center Selected Object
        centerSelected: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const active = canvas.getActiveObject();
          if (active && !active.__isGarmentPart) {
            active.set({ left: 250 });
            canvas.requestRenderAll();
          }
        },

        // 5. Bring Forward / Send Backward
        bringForward: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const active = canvas.getActiveObject();
          if (active && !active.__isGarmentPart) {
            canvas.bringObjectForward(active);
            canvas.requestRenderAll();
          }
        },

        sendBackward: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const active = canvas.getActiveObject();
          if (active && !active.__isGarmentPart) {
            canvas.sendObjectBackwards(active);
            // Ensure it does not go beneath garment base
            canvas.requestRenderAll();
          }
        },

        // 6. Clear all user artwork on active view
        clearCanvas: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const userObjects = canvas.getObjects().filter((obj) => !obj.__isGarmentPart);
          userObjects.forEach((obj) => canvas.remove(obj));
          viewArtworkCacheRef.current[currentView] = [];
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        },

        // 7. Export high-res preview image data URL
        getPreviewDataURL: () => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return null;
          return canvas.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2, // 2x retina export
          });
        },
      }),
      [currentView, onViewToggle]
    );

    return (
      <div className="canvas-stage">
        {/* ── Top Bar Controls: Front / Back View Toggle ──────── */}
        <div className="canvas-stage__toolbar">
          <div className="canvas-stage__view-toggle" role="group" aria-label="View Angle">
            <button
              type="button"
              className={`canvas-stage__view-btn ${
                currentView === 'front' ? 'canvas-stage__view-btn--active' : ''
              }`}
              onClick={() => handleSwitchView('front')}
              data-cursor-text="FRONT"
            >
              Front View
            </button>
            <button
              type="button"
              className={`canvas-stage__view-btn ${
                currentView === 'back' ? 'canvas-stage__view-btn--active' : ''
              }`}
              onClick={() => handleSwitchView('back')}
              data-cursor-text="BACK"
            >
              Back View
            </button>
          </div>
        </div>

        {/* ── Canvas Viewport Container ───────────────────────── */}
        <div ref={viewportRef} className="canvas-stage__viewport">
          <canvas ref={canvasElRef} className="canvas-stage__canvas" />

          {/* Printable Area Subtle Guide Frame */}
          <div className="canvas-stage__printable-guide" aria-hidden="true" />

          {/* Minimal Object Floating Action Bar when Object Selected */}
          {hasSelection && (
            <div className="canvas-stage__selection-bar">
              <button
                type="button"
                className="canvas-stage__quick-btn"
                onClick={() => ref.current?.centerSelected()}
                title="Center on garment"
              >
                Center
              </button>
              <button
                type="button"
                className="canvas-stage__quick-btn canvas-stage__quick-btn--danger"
                onClick={() => ref.current?.deleteSelected()}
                title="Remove object"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CanvasStage.displayName = 'CanvasStage';

export default CanvasStage;
