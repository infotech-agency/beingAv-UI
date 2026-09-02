

import Image from '@/components/Image';
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';

const ZOOM = 2.2; // magnification factor for the side panel
const LENS_SIZE = 130; // px
const SWIPE_THRESHOLD = 50; // px — minimum drag distance to count as a swipe

export function ProductGallery({ product }: { product: Product }) {
  const images = product.images || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // % position within the image
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goNext = () => setActiveIdx((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);

  // Close lightbox on ESC, navigate with arrow keys
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, images.length]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground/40">
        <span className="text-sm">No images available</span>
      </div>
    );
  }

  const activeImage = images[activeIdx]?.url || images[0].url;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  // --- Swipe handlers (shared logic for both main box and lightbox) ---
  const onTouchStart = (e: React.TouchEvent) => {
    if (images.length <= 1) return;
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    setDragOffset(touchDeltaX.current);
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goPrev();
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goNext();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  // Mouse-drag swipe (desktop, e.g. trackpad drag) for the lightbox
  const mouseStartX = useRef<number | null>(null);
  const onMouseDownDrag = (e: React.MouseEvent) => {
    if (images.length <= 1) return;
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };
  const onMouseMoveDrag = (e: React.MouseEvent) => {
    if (mouseStartX.current === null) return;
    touchDeltaX.current = e.clientX - mouseStartX.current;
    setDragOffset(touchDeltaX.current);
  };
  const onMouseUpDrag = () => {
    if (mouseStartX.current === null) return;
    if (touchDeltaX.current > SWIPE_THRESHOLD) {
      goPrev();
    } else if (touchDeltaX.current < -SWIPE_THRESHOLD) {
      goNext();
    }
    mouseStartX.current = null;
    touchDeltaX.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div>
      <div className="relative">
        <div
          ref={boxRef}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={() => !isDragging && setLightboxOpen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative aspect-[4/3] cursor-zoom-in touch-pan-y overflow-hidden rounded-lg border border-border bg-secondary p-4"
        >
          <div
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            }}
            className="h-full w-full"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              objectFit="contain"
            />
          </div>

          {/* Lens box that follows the cursor, dims everything outside it */}
          {hovering && !isDragging && (
            <div
              className="pointer-events-none absolute border-2 border-destructive bg-white/20"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: `calc(${pos.x}% - ${LENS_SIZE / 2}px)`,
                top: `calc(${pos.y}% - ${LENS_SIZE / 2}px)`,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.15)',
              }}
            />
          )}

          {/* Arrow nav on the main box, shown on hover when multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-foreground opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100 sm:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-foreground opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100 sm:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Magnified panel — desktop only, sits to the right of the image */}
        {hovering && !isDragging && (
          <div
            className="pointer-events-none absolute left-full top-0 z-20 ml-4 hidden aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-white shadow-xl lg:block"
            style={{
              backgroundImage: `url(${activeImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${ZOOM * 100}%`,
              backgroundPosition: `${pos.x}% ${pos.y}%`,
            }}
          />
        )}

        {/* Dot indicators below main image on mobile */}
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5 lg:hidden">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx ? 'w-5 bg-destructive' : 'w-1.5 bg-border'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img._id || i}
              onClick={() => setActiveIdx(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-secondary p-1 transition-all ${
                i === activeIdx
                  ? 'border-destructive'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={img.url}
                alt={`${product.name} ${img.type}`}
                fill
                sizes="80px"
                objectFit="contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox — full-size image on click, swipeable */}
      {/* {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDownDrag}
            onMouseMove={onMouseMoveDrag}
            onMouseUp={onMouseUpDrag}
            onMouseLeave={() => {
              if (isDragging) onMouseUpDrag();
            }}
            className="flex max-h-full max-w-full cursor-grab items-center justify-center active:cursor-grabbing"
          >
            <img
              src={activeImage}
              alt={product.name}
              draggable={false}
              style={{
                transform: `translateX(${dragOffset}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              }}
              className="max-h-[85vh] max-w-full select-none rounded-lg object-contain shadow-2xl"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {activeIdx + 1} / {images.length}
            </div>
          )}
        </div>
      )} */}

      {/* Lightbox — full-size image on click, swipeable */}
{/* Lightbox — full-size image on click */}
{lightboxOpen && (
  <div
    onClick={() => setLightboxOpen(false)}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative inline-flex max-h-[85vh] max-w-full items-center justify-center"
    >
      {/* Backdrop glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-white/5 backdrop-blur-sm" />

      {/* Image */}
      <img
        src={activeImage}
        alt={product.name}
        draggable={false}
        className="max-h-[85vh] max-w-full select-none rounded-lg object-contain shadow-2xl"
      />

      {/* ====== IMPROVED CLOSE BUTTON ====== */}
      <button
        onClick={() => setLightboxOpen(false)}
        className="absolute -right-2 -top-2 z-30 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/80 hover:shadow-xl active:scale-95 sm:-right-3 sm:-top-3 sm:p-2.5"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* ====== IMPROVED NAVIGATION BUTTONS ====== */}
      {images.length > 1 && (
        <>
          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="group absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70 hover:shadow-xl active:scale-95 sm:left-4 sm:p-3.5"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="group absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70 hover:shadow-xl active:scale-95 sm:right-4 sm:p-3.5"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* ====== IMPROVED COUNTER ====== */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm sm:px-5 sm:py-2 sm:text-base">
          {activeIdx + 1} <span className="text-white/50">/</span> {images.length}
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
}