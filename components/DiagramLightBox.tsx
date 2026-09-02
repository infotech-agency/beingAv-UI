import { useEffect, useState, useCallback } from 'react';
import { X, ZoomIn } from 'lucide-react';

export function DiagramLightbox({ diagrams, productName }) {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % diagrams.length));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === null ? i : (i - 1 + diagrams.length) % diagrams.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, close, diagrams.length]);

  if (!diagrams || diagrams.length === 0) return null;

  return (
    <>
      <div
        className={`mt-8 grid grid-cols-1 gap-6 ${
          diagrams.length === 1
            ? 'sm:grid-cols-1 max-w-2xl mx-auto'
            : diagrams.length === 2
            ? 'sm:grid-cols-2'
            : 'sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {diagrams.map((diagram, i) => (
          <button
            key={diagram._id || i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative block overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-secondary/40">
              <img
                src={diagram.url}
                alt={diagram.title || `${productName} diagram ${i + 1}`}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/10">
                <span className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </div>
            </div>
            {diagram.title && (
              <div className="border-t border-border px-4 py-3">
                <p className="text-sm font-medium text-foreground">{diagram.title}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={diagrams[openIndex].title || `${productName} diagram`}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {diagrams.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + diagrams.length) % diagrams.length));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl transition-colors hover:bg-white/20 sm:left-4"
                aria-label="Previous diagram"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % diagrams.length));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl transition-colors hover:bg-white/20 sm:right-4"
                aria-label="Next diagram"
              >
                ›
              </button>
            </>
          )}

          <div
            className="flex max-h-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={diagrams[openIndex].url}
              alt={diagrams[openIndex].title || `${productName} diagram ${openIndex + 1}`}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl transition-transform duration-200"
            />
            {diagrams[openIndex].title && (
              <p className="mt-4 text-sm font-medium text-white/90">{diagrams[openIndex].title}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}