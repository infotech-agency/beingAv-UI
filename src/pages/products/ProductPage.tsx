// import type { Metadata } from '@/types/metadata';
// import Link from '@/components/RouterLink';
// import { throwPageNotFound } from '@/lib/router';
// import { api } from '@/lib/api';
// import { fallbackProducts } from '@/lib/fallback-data';
// import { ProductGallery } from '@/components/ProductGallery';
// import { ProductSpecsTable } from '@/components/ProductSpecsTable';

// import { ProductCard } from '@/components/ProductCard';
// import { FaqAccordion } from '@/components/FaqAccordion';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import { CheckCircle2 } from 'lucide-react';
// import { ProductActions } from '@/components/ProductAction';

// interface PageProps {
//   params: { slug: string };
// }

// export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
//   const product = await api.getProductBySlug(params.slug) || fallbackProducts.find((item) => item.slug === params.slug);
//   if (!product) return { title: 'Product Not Found' };
//   return {
//     title: product.metaTitle || product.name,
//     description: product.metaDescription || product.shortDescription,
//   };
// }

// export default async function ProductDetailPage({ params }: PageProps) {
//   const product = await api.getProductBySlug(params.slug);
//   const productData = product || fallbackProducts.find((p) => p.slug === params.slug);
//   if (!productData) throwPageNotFound();

//   const catSlug =
//     productData.category && typeof productData.category === 'object' ? productData.category.slug : '';
//   const catName =
//     productData.category && typeof productData.category === 'object' ? productData.category.name : '';

//   const relatedRes = catSlug
//     ? await api.getProducts({ category: catSlug, limit: 5 })
//     : null;
//   const relatedProducts = (relatedRes?.items || [])
//     .filter((p) => p._id !== productData._id)
//     .slice(0, 4);

//   const hasHighlightsOrFeatures =
//     (productData.keyHighlights && productData.keyHighlights.length > 0) ||
//     (productData.keyFeatures && productData.keyFeatures.length > 0);

//   return (
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-6">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/products">Products</BreadcrumbLink>
//               </BreadcrumbItem>
//               {catSlug && (
//                 <>
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     <BreadcrumbLink href={`/products/category/${catSlug}`}>
//                       {catName}
//                     </BreadcrumbLink>
//                   </BreadcrumbItem>
//                 </>
//               )}
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <span className="text-foreground">{productData.name}</span>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
//             <ProductGallery product={productData} />

//             <div>
//               {catName && (
//                 <span className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
//                   {catName}
//                 </span>
//               )}
//               <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
//                 {productData.name}
//               </h1>
//               <p className="mt-1 text-sm font-bold text-black uppercase tracking-wider ">
//                 SKU: {productData.sku}
//               </p>
//               {productData.shortDescription && (
//                 <p className="mt-4 text-base text-muted-foreground">
//                   {productData.shortDescription}
//                 </p>
//               )}

//               {productData.description && (
//                 <div className="mt-4">
//                   <h2 className="text-2xl font-bold text-foreground">Product Overview</h2>
//                   <p className="mt-3 max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">
//                     {productData.description}
//                   </p>
//                 </div>
//               )}

//               <ProductActions product={productData} />
//             </div>
//           </div>
//         </div>
//       </section>

//       {hasHighlightsOrFeatures && (
//         <section className="section-padding-sm bg-secondary/30">
//           <div className="container-page">
//             <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
//               {productData.keyHighlights && productData.keyHighlights.length > 0 && (
//                 <div>
//                   <h2 className="text-xl font-bold text-foreground text-center md:text-left">
//                     Key Highlights
//                   </h2>
//                   <ul className="mt-5 space-y-3">
//                     {productData.keyHighlights.map((h, i) => (
//                       <li key={i} className="flex items-start gap-3 text-foreground/80">
//                         <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
//                         <span className="text-sm">{h}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {productData.keyFeatures && productData.keyFeatures.length > 0 && (
//                 <div>
//                   <h2 className="text-xl font-bold text-foreground text-center md:text-left">
//                     Key Features
//                   </h2>
//                   <ul className="mt-5 space-y-3">
//                     {productData.keyFeatures.map((feature, i) => (
//                       <li key={i} className="flex items-start gap-3 text-foreground/80">
//                         <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
//                         <span className="text-sm">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {productData.applications && productData.applications.length > 0 && (
//         <section className="section-padding-sm bg-white">
//           <div className="container-page">
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="text-xl font-bold text-foreground">Applications</h2>
//               <div className="mt-5 flex flex-wrap justify-center gap-2.5">
//                 {productData.applications.map((app, i) => (
//                   <span
//                     key={i}
//                     className="rounded-lg border border-border bg-secondary/50 px-3.5 py-2 text-sm font-medium text-foreground shadow-sm"
//                   >
//                     {app}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* NEW: Product Diagrams — schematic/wiring/layout images (max 3, backend field `diagrams`) */}
//       {productData.diagrams && productData.diagrams.length > 0 && (
//         <section className="section-padding-sm bg-secondary/30">
//           <div className="container-page">
//             <div className="mx-auto max-w-5xl text-center">
//               <h2 className="text-2xl font-bold text-foreground">Diagrams</h2>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Wiring, connection and system layout references for this product.
//               </p>
//               <div
//                 className={`mt-8 grid grid-cols-1 gap-6 ${
//                   productData.diagrams.length === 1
//                     ? 'sm:grid-cols-1 max-w-2xl mx-auto'
//                     : productData.diagrams.length === 2
//                     ? 'sm:grid-cols-2'
//                     : 'sm:grid-cols-2 lg:grid-cols-3'
//                 }`}
//               >
//                 {productData.diagrams.map((diagram, i) => (
//                   <a
//                     key={diagram._id || i}
//                     href={diagram.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group block overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
//                   >
//                     <div className="aspect-[4/3] w-full overflow-hidden bg-secondary/40">
//                       <img
//                         src={diagram.url}
//                         alt={diagram.title || `${productData.name} diagram ${i + 1}`}
//                         className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     </div>
//                     {diagram.title && (
//                       <div className="border-t border-border px-4 py-3 text-left">
//                         <p className="text-sm font-medium text-foreground">{diagram.title}</p>
//                       </div>
//                     )}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {productData.specifications && productData.specifications.length > 0 && (
//         <section className="section-padding-sm bg-white">
//           <div className="container-page">
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="text-2xl font-bold text-foreground">Technical Specifications</h2>
//               <div className="mt-6 text-left">
//                 <ProductSpecsTable product={productData} />
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {productData.faqs && productData.faqs.length > 0 && (
//         <section className="section-padding-sm bg-secondary/30">
//           <div className="container-page">
//             <div className="mx-auto max-w-3xl text-center">
//               <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
//               <div className="mt-6 text-left">
//                 <FaqAccordion
//                   faqs={productData.faqs.map((f, i) => ({
//                     _id: `faq-${i}`,
//                     question: f.question,
//                     answer: f.answer,
//                   }))}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {relatedProducts.length > 0 && (
//         <section className="section-padding-sm bg-secondary/30">
//           <div className="container-page">
//             <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
//             <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {relatedProducts.map((p) => (
//                 <ProductCard key={p._id} product={p} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// }



import type { Metadata } from '@/types/metadata';
import { Link } from 'react-router-dom';
import { throwPageNotFound } from '@/lib/router';
import { api } from '@/lib/api';
import { fallbackProducts } from '@/lib/fallback-data';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductSpecsTable } from '@/components/ProductSpecsTable';
import { ProductCard } from '@/components/ProductCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ProductInfoTabs } from '@/components/ProductInfoTabs';
import { DiagramLightbox } from '@/components/DiagramLightbox';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductActions } from '@/components/ProductAction';

interface PageProps {
  params: { slug: string };
}

export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await api.getProductBySlug(params.slug) || fallbackProducts.find((item) => item.slug === params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.metaTitle || product.name,
    description: product.metaDescription || product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await api.getProductBySlug(params.slug);
  const productData = product || fallbackProducts.find((p) => p.slug === params.slug);
  if (!productData) throwPageNotFound();

  const catSlug =
    productData.category && typeof productData.category === 'object' ? productData.category.slug : '';
  const catName =
    productData.category && typeof productData.category === 'object' ? productData.category.name : '';

  const relatedRes = catSlug
    ? await api.getProducts({ category: catSlug, limit: 5 })
    : null;
  const relatedProducts = (relatedRes?.items || [])
    .filter((p) => p._id !== productData._id)
    .slice(0, 4);

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {catSlug && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/products/category/${catSlug}`}>{catName}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">{productData.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductGallery product={productData} />

            <div>
              {catName && (
                <span className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                  {catName}
                </span>
              )}
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                {productData.name}
              </h1>
              <p className="mt-1 text-sm font-bold text-black uppercase tracking-wider ">
                SKU: {productData.sku}
              </p>
              {productData.shortDescription && (
                <p className="mt-4 text-base text-muted-foreground">
                  {productData.shortDescription}
                </p>
              )}

              {productData.description && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-foreground">Product Overview</h2>
                  <p className="mt-3 max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                    {productData.description}
                  </p>
                </div>
              )}

              <ProductActions product={productData} />
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights / Key Features / Applications merged into one tabbed section
          — removes the stacked, padding-heavy blocks that were causing dead space */}
      <ProductInfoTabs
        keyHighlights={productData.keyHighlights}
        keyFeatures={productData.keyFeatures}
        applications={productData.applications}
      />

      {productData.diagrams && productData.diagrams.length > 0 && (
        <section className="section-padding-sm bg-white">
          <div className="container-page">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-2xl font-bold text-foreground">Diagrams</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Wiring, connection and system layout references for this product. Click any diagram to zoom in.
              </p>
              <DiagramLightbox diagrams={productData.diagrams} productName={productData.name} />
            </div>
          </div>
        </section>
      )}

      {productData.specifications && productData.specifications.length > 0 && (
        <section className="section-padding-sm bg-secondary/30">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground">Technical Specifications</h2>
              <div className="mt-6 text-left">
                <ProductSpecsTable product={productData} />
              </div>
            </div>
          </div>
        </section>
      )}

      {productData.faqs && productData.faqs.length > 0 && (
        <section className="section-padding-sm bg-white">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="mt-6 text-left">
                <FaqAccordion
                  faqs={productData.faqs.map((f, i) => ({
                    _id: `faq-${i}`,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="section-padding-sm bg-secondary/30">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}