// import { useState, useEffect, useCallback } from 'react';
// import Image from '@/components/Image';
// import type { Testimonial } from '@/types';
// import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// export function TestimonialSlider({
//   testimonials,
// }: {
//   testimonials: Testimonial[];
// }) {
//   const [current, setCurrent] = useState(0);
//   const count = testimonials.length;

//   const next = useCallback(() => {
//     setCurrent((c) => (c + 1) % count);
//   }, [count]);

//   const prev = () => setCurrent((c) => (c - 1 + count) % count);

//   useEffect(() => {
//     if (count <= 1) return;
//     const timer = setInterval(next, 6000);
//     return () => clearInterval(timer);
//   }, [next, count]);

//   if (count === 0) return null;

//   return (
//     <div className="relative mx-auto max-w-3xl">
//       <div className="overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {testimonials.map((t) => (
//             <div key={t._id} className="w-full shrink-0 px-4">
//               <div className="relative rounded-xl border border-border bg-white p-8 shadow-sm sm:p-12">
//                 <Quote className="absolute right-8 top-8 h-10 w-10 text-destructive/15" />
//                 <p className="text-lg leading-relaxed text-foreground/90">
//                   &ldquo;{t.message}&rdquo;
//                 </p>
//                 <div className="mt-6 flex items-center gap-4">
//                   {t.image && (
//                     <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
//                       <Image
//                         src={t.image}
//                         alt={t.clientName}
//                         fill
//                         sizes="56px"
//                         className="object-cover"
//                       />
//                     </div>
//                   )}
//                   <div>
//                     <div className="font-bold text-foreground">{t.clientName}</div>
//                     <div className="text-sm text-muted-foreground">
//                       {t.designation}
//                       {t.company ? `, ${t.company}` : ''}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {count > 1 && (
//         <>
//           <button
//             onClick={prev}
//             className="absolute -left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all hover:border-destructive hover:text-destructive"
//             aria-label="Previous"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <button
//             onClick={next}
//             className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all hover:border-destructive hover:text-destructive"
//             aria-label="Next"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <div className="mt-6 flex justify-center gap-2">
//             {testimonials.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrent(i)}
//                 className={`h-2 rounded-full transition-all ${
//                   i === current ? 'w-8 bg-destructive' : 'w-2 bg-border'
//                 }`}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from '@/components/Image';
import type { Testimonial } from '@/types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);
  const count = testimonials.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % count);
  }, [count]);

  const prev = () => setCurrent((c) => (c - 1 + count) % count);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, count]);

  if (count === 0) return null;

  // shortest signed distance from `current`, in a circular list
  const getOffset = (index: number) => {
    let diff = index - current;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    return diff;
  };

  const gap = 24;
  const slideWidth = containerWidth
    ? Math.min(containerWidth * 0.72, 560)
    : 0;
  // shift the track so the current slide's center lands on the container's center
  const trackOffset = containerWidth
    ? containerWidth / 2 - slideWidth / 2 - current * (slideWidth + gap)
    : 0;

  return (
    <div className="relative mx-auto max-w-4xl">
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${trackOffset}px)`,
            gap: `${gap}px`,
          }}
        >
          {testimonials.map((t, i) => {
            const offset = getOffset(i);
            const isCenter = offset === 0;

            return (
              <div
                key={i}
                className="shrink-0 py-2 transition-all duration-500 ease-out"
                style={{
                  width: slideWidth ? `${slideWidth}px` : '100%',
                  transform: `scale(${isCenter ? 1 : 0.88})`,
                  filter: isCenter ? 'blur(0px)' : 'blur(2px)',
                  opacity: isCenter ? 1 : 0.45,
                }}
              >
                <div className="relative h-full rounded-xl border border-border bg-white p-8 shadow-sm sm:p-12">
                  <Quote className="absolute right-8 top-8 h-10 w-10 text-destructive/15" />
                  <p className="text-lg leading-relaxed text-foreground/90">
                    &ldquo;{t.message}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    {t.image && (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                        <Image
                          src={t.image}
                          alt={t.clientName}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-foreground">{t.clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {t.designation}
                        {t.company ? `, ${t.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-destructive bg-destructive text-white shadow-sm transition-all hover:bg-destructive/90 sm:-left-2"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-destructive bg-destructive text-white shadow-sm transition-all hover:bg-destructive/90 sm:-right-2"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-8 bg-destructive' : 'w-2 bg-border'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}