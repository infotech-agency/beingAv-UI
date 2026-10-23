// import Image from '@/components/Image';
// import Link from '@/components/RouterLink';
// import { useState, useEffect, useCallback } from 'react';
// import type { Banner } from '@/types';
// import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

// export function HeroSlider({ banners }: { banners: Banner[] }) {
//   const [current, setCurrent] = useState(0);
//   const count = banners.length;
//   console.log("banners", banners);

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
//     <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
//       {banners.map((banner, i) => (
//         <div
//           key={banner._id}
//           className={`absolute inset-0 transition-opacity duration-700 ${
//             i === current ? 'opacity-100' : 'pointer-events-none opacity-0'
//           }`}
//         >
//           {banner.image && (
//             <Image
//               src={banner.image}
//               alt={banner.heading}
//               fill
//               priority={i === 0}
//               sizes="100vw"
//               className="object-cover"
//             />
//           )}
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
//           <div className="container-page relative flex h-full items-center">
//             <div className="max-w-3xl">
//               <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
//                 {banner.heading}
//               </h1>
//               {banner.subheading && (
//                 <p className="mt-4 text-lg text-white/85 sm:text-xl text-zinc-300">
//                   {banner.subheading}
//                 </p>
//               )}
//               <div className="mt-8 flex flex-wrap gap-4">
//                 {banner.buttonText && banner.buttonLink && (
//                   <Link
//                     href={banner.buttonLink}
//                     className="inline-flex items-center gap-2 rounded-md bg-destructive px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-destructive/90 hover:shadow-xl"
//                   >
//                     {banner.buttonText}
//                     <ArrowRight className="h-4 w-4" />
//                   </Link>
//                 )}
//                 <Link
//                   href="/products"
//                   className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
//                 >
//                   View All Products
//                 </Link>
//               </div>
//               <p className="mt-8 text-sm text-white/60">
//                 Trusted by system integrators, consultants and enterprises worldwide
//               </p>
//             </div>
//           </div>
//         </div>
//       ))}

//       {count > 1 && (
//         <>
//           <button
//             onClick={prev}
//             className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
//             aria-label="Previous"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <button
//             onClick={next}
//             className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
//             aria-label="Next"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//           <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
//             {banners.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrent(i)}
//                 className={`h-2 rounded-full transition-all ${
//                   i === current ? 'w-8 bg-white' : 'w-2 bg-white/40'
//                 }`}
//                 aria-label={`Go to slide ${i + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// }


import Image from '@/components/Image';
import Link from '@/components/RouterLink';
import { useState, useEffect, useCallback } from 'react';
import type { Banner } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  const count = banners.length;


  const next = useCallback(() => {
    if (count <= 1) return;

    setCurrent((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    if (count <= 1) return;

    setCurrent((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return;

    const timer = setInterval(next, 6000);

    return () => clearInterval(timer);
  }, [next, count]);

  if (count === 0) {
    return null;
  }

  const activeIndex = current >= count ? 0 : current;

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-black">

      {/* ================= SLIDES ================= */}
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === activeIndex
              ? 'z-10 opacity-100'
              : 'pointer-events-none z-0 opacity-0'
          }`}
        >

          {/* ================= IMAGE ================= */}
          {banner.image && (
            <Image
              src={banner.image}
              alt={banner.heading || 'Banner'}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          )}

          {/* ================= OVERLAY ================= */}
          <div className="absolute inset-0 z-10 bg-black/40" />

          {/* ================= CONTENT ================= */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
              <div className="max-w-3xl text-white">

                {/* HEADING */}
                {banner.heading && (
                  <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    {banner.heading}
                  </h1>
                )}

                {/* SUBHEADING */}
                {banner.subheading && (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                    {banner.subheading}
                  </p>
                )}

                {/* BUTTON */}
                {banner.buttonText && banner.buttonLink && (
                  <div className="mt-8">
                    <Link
                      href={banner.buttonLink}
                      className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-black transition-all hover:bg-white/90"
                    >
                      {banner.buttonText}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      ))}

      {/* ================= ARROWS ================= */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* ================= DOTS ================= */}
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </section>
  );
}

