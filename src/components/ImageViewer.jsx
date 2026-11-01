import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const MAX_SCALE = 6;
const toolButton = "p-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors";

const ImageViewer = ({ src, alt, isLogo, onClose }) => {
  const [scale, setScale] = useState(1);
  const zoom = useRef(null);
  const pointerStart = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "+" || e.key === "=") zoom.current?.zoomIn();
      else if (e.key === "-") zoom.current?.zoomOut();
      else if (e.key === "0") zoom.current?.resetTransform();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close on a backdrop click, but not when the click ends a pan or lands on the image or controls.
  const onClick = (e) => {
    const start = pointerStart.current;
    if (!start || e.target.closest("button, img")) return;
    if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < 5) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl"
      role="dialog" aria-modal="true" aria-label="Image viewer"
      onPointerDown={(e) => { pointerStart.current = { x: e.clientX, y: e.clientY }; }}
      onClick={onClick}
    >
      <TransformWrapper
        ref={zoom}
        minScale={1}
        maxScale={MAX_SCALE}
        doubleClick={{ mode: "toggle", step: 1.5 }}
        wheel={{ step: 0.2 }}
        onTransformed={(_, state) => setScale(state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full flex items-center justify-center p-4 sm:p-8"
            >
              <motion.img
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={src} alt={alt} draggable={false}
                // logos are small squares of different pixel sizes, so they get one fixed display size
                className={`${isLogo ? "w-[min(70vw,50vh)] aspect-square rounded-full object-cover bg-white" : "max-w-full max-h-[85vh] rounded-xl object-contain"} shadow-2xl select-none ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              />
            </TransformComponent>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
              <button onClick={() => zoomOut()} disabled={scale <= 1.01} aria-label="Zoom out" className={toolButton}>
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-xs font-mono tabular-nums text-white/80">{Math.round(scale * 100)}%</span>
              <button onClick={() => zoomIn()} disabled={scale >= MAX_SCALE - 0.01} aria-label="Zoom in" className={toolButton}>
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-white/15 mx-1" />
              <button onClick={() => resetTransform()} disabled={scale <= 1.01} aria-label="Reset zoom" className={toolButton}>
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </TransformWrapper>

      <button autoFocus onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all" aria-label="Close image">
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default ImageViewer;
