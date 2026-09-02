

// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import Link from '@/components/RouterLink';
// // // import Image from '@/components/Image';
// // // import type { Product } from '@/types';
// // // import { ArrowRight, X } from 'lucide-react';

// // // export function ProductCard({ product }: { product: Product }) {
// // //   const catName =
// // //     typeof product.category === 'object' ? product.category.name : '';
// // //   const image = product.images?.[0]?.url;
// // //   const specs = (product.keyHighlights || product.keyFeatures || []).slice(0, 3);

// // //   const [previewOpen, setPreviewOpen] = useState(false);

// // //   // close on Escape + lock body scroll while open
// // //   useEffect(() => {
// // //     if (!previewOpen) return;
// // //     const onKey = (e: KeyboardEvent) => {
// // //       if (e.key === 'Escape') setPreviewOpen(false);
// // //     };
// // //     document.addEventListener('keydown', onKey);
// // //     const prevOverflow = document.body.style.overflow;
// // //     document.body.style.overflow = 'hidden';
// // //     return () => {
// // //       document.removeEventListener('keydown', onKey);
// // //       document.body.style.overflow = prevOverflow;
// // //     };
// // //   }, [previewOpen]);

// // //   return (
// // //     <>
// // //       <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-border bg-white shadow-sm transition-all duration-300 hover:border-destructive hover:shadow-[0_0_35px_rgba(220,38,38,0.45)]">
// // //         <div className="relative block aspect-[4/3] overflow-hidden bg-secondary">
// // //           {image ? (
// // //             <button
// // //               type="button"
// // //               onClick={() => setPreviewOpen(true)}
// // //               className="absolute inset-0 h-full w-full cursor-zoom-in"
// // //               aria-label={`Preview ${product.name}`}
// // //             >
// // //               <Image
// // //                 src={image}
// // //                 alt={product.name}
// // //                 fill
// // //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// // //                 className="object-cover transition-transform duration-300 group-hover:scale-105"
// // //               />
// // //             </button>
// // //           ) : (
// // //             <Link
// // //               href={`/products/${product.slug}`}
// // //               className="flex h-full items-center justify-center bg-secondary text-muted-foreground/40"
// // //             >
// // //               <span className="text-xs uppercase tracking-wider">No image</span>
// // //             </Link>
// // //           )}

// // //           {/* Category ribbon — flush right, notched left edge */}
// // //           {catName && (
// // //             <span
// // //               className="pointer-events-none absolute right-0 top-4 bg-destructive py-2 pl-[18px] pr-[10px] text-xs font-bold uppercase tracking-wide text-white shadow-md"
// // //               style={{
// // //                 clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
// // //               }}
// // //             >
// // //               {catName}
// // //             </span>
// // //           )}

// // //           {product.isFeatured && (
// // //             <span className="pointer-events-none absolute left-3 top-3 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
// // //               Featured
// // //             </span>
// // //           )}
// // //         </div>

// // //         <div className="flex flex-1 flex-col p-5">
// // //           <Link href={`/products/${product.slug}`}>
// // //             <h3 className="font-bold leading-snug text-foreground">
// // //               {product.name}
// // //             </h3>
// // //           </Link>
// // //           <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
// // //             {product.sku}
// // //           </p>
// // //           {product.shortDescription && (
// // //             <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
// // //               {product.shortDescription}
// // //             </p>
// // //           )}
// // //           {specs.length > 0 && (
// // //             <div className="mt-3 flex flex-wrap gap-1.5">
// // //               {specs.map((spec, i) => (
// // //                 <span key={i} className="spec-tag">{spec}</span>
// // //               ))}
// // //             </div>
// // //           )}
// // //           <div className="mt-auto pt-4">
// // //             <Link
// // //               href={`/products/${product.slug}`}
// // //               className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-white"
// // //             >
// // //               View details
// // //               <ArrowRight className="h-4 w-4" />
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Image preview lightbox — shows the full image, never cropped */}
// // //       {previewOpen && image && (
// // //         <div
// // //           className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
// // //           onClick={() => setPreviewOpen(false)}
// // //         >
// // //           <button
// // //             type="button"
// // //             onClick={() => setPreviewOpen(false)}
// // //             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
// // //             aria-label="Close preview"
// // //           >
// // //             <X className="h-5 w-5" />
// // //           </button>

// // //           <div
// // //             className="relative h-[50vh] w-full max-w-lg"
// // //             onClick={(e) => e.stopPropagation()}
// // //           >
// // //             <Image
// // //               src={image}
// // //               alt={product.name}
// // //               fill
// // //               sizes="512px"
// // //               className="object-contain"
// // //             />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // }

// // 'use client';

// // import { useEffect, useState } from 'react';
// // import Link from '@/components/RouterLink';
// // import Image from '@/components/Image';
// // import type { Product } from '@/types';
// // import { ArrowRight, X } from 'lucide-react';

// // export function ProductCard({ product }: { product: Product }) {
// //   const catName =
// //     product.category && typeof product.category === 'object' ? product.category.name : '';
// //   const image = product.images?.[0]?.url;
// //   const specs = (product.keyHighlights || product.keyFeatures || []).slice(0, 3);

// //   const [previewOpen, setPreviewOpen] = useState(false);

// //   // close on Escape + lock body scroll while open
// //   useEffect(() => {
// //     if (!previewOpen) return;
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === 'Escape') setPreviewOpen(false);
// //     };
// //     document.addEventListener('keydown', onKey);
// //     const prevOverflow = document.body.style.overflow;
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.removeEventListener('keydown', onKey);
// //       document.body.style.overflow = prevOverflow;
// //     };
// //   }, [previewOpen]);

// //   return (
// //     <>
// //       <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-border bg-white shadow-sm transition-all duration-300 hover:border-destructive hover:shadow-[0_0_35px_rgba(220,38,38,0.45)]">
// //         <div className="relative block aspect-[4/3] overflow-hidden bg-secondary">
// //           {image ? (
// //             <button
// //               type="button"
// //               onClick={() => setPreviewOpen(true)}
// //               className="absolute inset-0 h-full w-full cursor-zoom-in"
// //               aria-label={`Preview ${product.name}`}
// //             >
// //               <Image
// //                 src={image}
// //                 alt={product.name}
// //                 fill
// //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //                 className="object-cover transition-transform duration-300 group-hover:scale-105"
// //               />
// //             </button>
// //           ) : (
// //             <Link
// //               href={`/products/${product.slug}`}
// //               className="flex h-full items-center justify-center bg-secondary text-muted-foreground/40"
// //             >
// //               <span className="text-xs uppercase tracking-wider">No image</span>
// //             </Link>
// //           )}

// //           {/* Category ribbon — flush right, notched left edge */}
// //           {catName && (
// //             <span
// //               className="pointer-events-none absolute right-0 top-4 bg-destructive py-2 pl-[18px] pr-[10px] text-xs font-bold uppercase tracking-wide text-white shadow-md"
// //               style={{
// //                 clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
// //               }}
// //             >
// //               {catName}
// //             </span>
// //           )}

// //           {product.isFeatured && (
// //             <span className="pointer-events-none absolute left-3 top-3 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
// //               Featured
// //             </span>
// //           )}
// //         </div>

// //         <div className="flex flex-1 flex-col p-5">
// //           <Link href={`/products/${product.slug}`}>
// //             <h3 className="font-bold leading-snug text-foreground">
// //               {product.name}
// //             </h3>
// //           </Link>
// //           <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
// //             {product.sku}
// //           </p>
// //           {product.shortDescription && (
// //             <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
// //               {product.shortDescription}
// //             </p>
// //           )}
// //           {specs.length > 0 && (
// //             <div className="mt-3 flex flex-wrap gap-1.5">
// //               {specs.map((spec, i) => (
// //                 <span key={i} className="spec-tag">{spec}</span>
// //               ))}
// //             </div>
// //           )}
// //           <div className="mt-auto pt-4">
// //             <Link
// //               href={`/products/${product.slug}`}
// //               className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-white"
// //             >
// //               View details
// //               <ArrowRight className="h-4 w-4" />
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Image preview lightbox — shows the full image, never cropped */}
// //       {previewOpen && image && (
// //         <div
// //           className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
// //           onClick={() => setPreviewOpen(false)}
// //         >
// //           <button
// //             type="button"
// //             onClick={() => setPreviewOpen(false)}
// //             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
// //             aria-label="Close preview"
// //           >
// //             <X className="h-5 w-5" />
// //           </button>

// //           <div
// //             className="relative h-[50vh] w-full max-w-lg"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <Image
// //               src={image}
// //               alt={product.name}
// //               fill
// //               sizes="512px"
// //               className="object-contain"
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import Link from '@/components/RouterLink';
// import Image from '@/components/Image';
// import type { Product } from '@/types';
// import { ArrowRight, X } from 'lucide-react';

// export function ProductCard({ product }: { product: Product }) {
//   const catName =
//     product.category && typeof product.category === 'object' ? product.category.name : '';
//   const image = product.images?.[0]?.url;
//   const specs = (product.keyHighlights || product.keyFeatures || []).slice(0, 3);

//   const [previewOpen, setPreviewOpen] = useState(false);

//   // close on Escape + lock body scroll while open
//   useEffect(() => {
//     if (!previewOpen) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setPreviewOpen(false);
//     };
//     document.addEventListener('keydown', onKey);
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.body.style.overflow = prevOverflow;
//     };
//   }, [previewOpen]);

//   return (
//     <>
//       <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-border bg-white shadow-sm transition-all duration-300 hover:border-destructive hover:shadow-[0_0_35px_rgba(220,38,38,0.45)]">
//         <div className="relative block aspect-[4/3] overflow-hidden bg-secondary">
//           {image ? (
//             <button
//               type="button"
//               onClick={() => setPreviewOpen(true)}
//               className="absolute inset-0 h-full w-full cursor-zoom-in"
//               aria-label={`Preview ${product.name}`}
//             >
//               <Image
//                 src={image}
//                 alt={product.name}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 objectFit="contain"
//                 className="transition-transform duration-300 group-hover:scale-105"
//               />
//             </button>
//           ) : (
//             <Link
//               href={`/products/${product.slug}`}
//               className="flex h-full items-center justify-center bg-secondary text-muted-foreground/40"
//             >
//               <span className="text-xs uppercase tracking-wider">No image</span>
//             </Link>
//           )}

//           {/* Category ribbon — flush right, notched left edge */}
//           {catName && (
//             <span
//               className="pointer-events-none absolute right-0 top-4 bg-destructive py-2 pl-[18px] pr-[10px] text-xs font-bold uppercase tracking-wide text-white shadow-md"
//               style={{
//                 clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
//               }}
//             >
//               {catName}
//             </span>
//           )}

//           {product.isFeatured && (
//             <span className="pointer-events-none absolute left-3 top-3 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
//               Featured
//             </span>
//           )}
//         </div>

//         <div className="flex flex-1 flex-col p-5">
//           <Link href={`/products/${product.slug}`}>
//             <h3 className="font-bold leading-snug text-foreground">
//               {product.name}
//             </h3>
//           </Link>
//           <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
//             {product.sku}
//           </p>
//           {product.shortDescription && (
//             <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
//               {product.shortDescription}
//             </p>
//           )}
//           {specs.length > 0 && (
//             <div className="mt-3 flex flex-wrap gap-1.5">
//               {specs.map((spec, i) => (
//                 <span key={i} className="spec-tag">{spec}</span>
//               ))}
//             </div>
//           )}
//           <div className="mt-auto pt-4">
//             <Link
//               href={`/products/${product.slug}`}
//               className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-white"
//             >
//               View details
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Image preview lightbox — shows the full image, never cropped */}
//       {previewOpen && image && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
//           onClick={() => setPreviewOpen(false)}
//         >
//           <button
//             type="button"
//             onClick={() => setPreviewOpen(false)}
//             className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
//             aria-label="Close preview"
//           >
//             <X className="h-5 w-5" />
//           </button>

//           <div
//             className="relative h-[50vh] w-full max-w-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={image}
//               alt={product.name}
//               fill
//               sizes="512px"
//               objectFit="contain"
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

'use client';

import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import type { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const catName =
    product.category && typeof product.category === 'object' ? product.category.name : '';
  const image = product.images?.[0]?.url;
  const specs = (product.keyHighlights || product.keyFeatures || []).slice(0, 3);

  return (
    <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-2 border-border bg-white shadow-sm transition-all duration-300 hover:border-destructive hover:shadow-[0_0_35px_rgba(220,38,38,0.45)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-secondary"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="contain"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary text-muted-foreground/40">
            <span className="text-xs uppercase tracking-wider">No image</span>
          </div>
        )}

        {/* Category ribbon — flush right, notched left edge */}
        {catName && (
          <span
            className="pointer-events-none absolute right-0 top-4 bg-destructive py-2 pl-[18px] pr-[10px] text-xs font-bold uppercase tracking-wide text-white shadow-md"
            style={{
              clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
            }}
          >
            {catName}
          </span>
        )}

        {product.isFeatured && (
          <span className="pointer-events-none absolute left-3 top-3 rounded bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold leading-snug text-foreground">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
         <span className='text-zinc-900'>Model: </span> {product.sku}
        </p>
        {product.shortDescription && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        {specs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {specs.map((spec, i) => (
              <span key={i} className="spec-tag">{spec}</span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-destructive px-4 py-2.5 text-sm font-semibold text-white"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}