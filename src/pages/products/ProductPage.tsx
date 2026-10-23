



// import type { Metadata } from '@/types/metadata';
// import { Link } from 'react-router-dom';
// import { throwPageNotFound } from '@/lib/router';
// import { api } from '@/lib/api';
// import { fallbackProducts } from '@/lib/fallback-data';
// import { ProductGallery } from '@/components/ProductGallery';
// import { ProductSpecsTable } from '@/components/ProductSpecsTable';
// import { ProductCard } from '@/components/ProductCard';
// import { FaqAccordion } from '@/components/FaqAccordion';
// import { ProductInfoTabs } from '@/components/ProductInfoTabs';
// import { DiagramLightbox } from '@/components/DiagramLightbox';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
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

//   return (
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-6">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/">Home</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/products">Products</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               {catSlug && (
//                 <>
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     <BreadcrumbLink asChild>
//                       <Link to={`/products/category/${catSlug}`}>{catName}</Link>
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

//       {/* Key Highlights / Key Features / Applications merged into one tabbed section
//           — removes the stacked, padding-heavy blocks that were causing dead space */}
//       <ProductInfoTabs
//         keyHighlights={productData.keyHighlights}
//         keyFeatures={productData.keyFeatures}
//         applications={productData.applications}
//       />

//       {productData.diagrams && productData.diagrams.length > 0 && (
//         <section className="section-padding-sm bg-white">
//           <div className="container-page">
//             <div className="mx-auto max-w-5xl text-center">
//               <h2 className="text-2xl font-bold text-foreground">Diagrams</h2>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Wiring, connection and system layout references for this product. Click any diagram to zoom in.
//               </p>
//               <DiagramLightbox diagrams={productData.diagrams} productName={productData.name} />
//             </div>
//           </div>
//         </section>
//       )}

//       {productData.specifications && productData.specifications.length > 0 && (
//         <section className="section-padding-sm bg-secondary/30">
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
//         <section className="section-padding-sm bg-white">
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
import { ProductCard } from '@/components/ProductCard';
import { DiagramLightbox } from '@/components/DiagramLightbox';
import { ProductVariantSelector } from '@/components/ProductVariantSelector';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ProductActions } from '@/components/ProductAction';
import { ProductInfoTabs } from '@/components/ProductInfoTabs'; // updated

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
             {productData.variants && productData.variants.length > 0 && (
  <ProductVariantSelector variants={productData.variants} />
)}
              <ProductActions product={productData} />
            </div>
          </div>
        </div>
      </section>

      {/* All product info tabs: highlights, features, applications, specs, FAQs */}
      <ProductInfoTabs
        keyHighlights={productData.keyHighlights}
        keyFeatures={productData.keyFeatures}
        applications={productData.applications}
        specifications={productData.specifications}   // passed here
        faqs={productData.faqs}                       // passed here
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