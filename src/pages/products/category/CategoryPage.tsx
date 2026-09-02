

// import type { Metadata } from '@/types/metadata';
// import { throwPageNotFound } from '@/lib/router';
// import Link from '@/components/RouterLink';
// import { api } from '@/lib/api';
// import { fallbackCategories, fallbackProducts } from '@/lib/fallback-data';
// import type { Category } from '@/types';
// import { ProductCard } from '@/components/ProductCard';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import { ChevronLeft } from 'lucide-react';

// interface PageProps {
//   params: { slug: string };
// }

// export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
//   const category = await api.getCategoryBySlug(params.slug) || fallbackCategories.find((item) => item.slug === params.slug);
//   if (!category) return { title: 'Category Not Found' };
//   return {
//     title: `${category.name} — Products`,
//     description: category.description,
//   };
// }

// // A category's parentCategory can come back populated ({_id,name,slug}) or as a plain id string
// const getParentInfo = (parent: Category['parentCategory']) => {
//   if (!parent) return null;
//   return typeof parent === 'object' ? parent : null;
// };

// export default async function CategoryPage({ params }: PageProps) {
//   const [category, allCategoriesRes] = await Promise.all([
//     api.getCategoryBySlug(params.slug),
//     api.getCategories(),
//   ]);

//   const catData = category || fallbackCategories.find((c) => c.slug === params.slug);
//   if (!catData) throwPageNotFound();

//   // Is this slug a subcategory (has a parentCategory) or a top-level category?
//   const parentInfo = getParentInfo(catData.parentCategory);
//   const isSubCategory = !!parentInfo;

//   // Fetch products using the correct filter param depending on which kind of page this is.
//   const productsRes = isSubCategory
//     ? await api.getProducts({ subCategory: params.slug, limit: 24 })
//     : await api.getProducts({ category: params.slug, limit: 24 });

//   // FIX: API returns { items, total, page, limit, totalPages } — not { data, pagination }
//   const products = productsRes?.items?.length
//     ? productsRes.items
//     : fallbackProducts.filter((p) => {
//         if (isSubCategory) {
//           const ps = typeof p.subCategory === 'object' ? p.subCategory?.slug : p.subCategory;
//           return ps === params.slug;
//         }
//         const pc = typeof p.category === 'object' ? p.category?.slug : p.category;
//         return pc === params.slug;
//       });

//   return (
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-12">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/products">Products</BreadcrumbLink>
//               </BreadcrumbItem>
//               {isSubCategory && parentInfo && (
//                 <>
//                   <BreadcrumbSeparator />
//                   <BreadcrumbItem>
//                     <BreadcrumbLink href={`/products/category/${parentInfo.slug}`}>
//                       {parentInfo.name}
//                     </BreadcrumbLink>
//                   </BreadcrumbItem>
//                 </>
//               )}
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <span className="text-foreground">{catData.name}</span>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//           <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
//             {catData.name}
//           </h1>
//           {catData.description && (
//             <p className="mt-2 max-w-2xl text-muted-foreground">
//               {catData.description}
//             </p>
//           )}
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <Link
//             href="/products"
//             className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             All Products
//           </Link>

//           {products.length === 0 ? (
//             <div className="py-20 text-center">
//               <p className="text-lg font-medium text-foreground">
//                 No products in this category yet.
//               </p>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 Check back soon or contact us for availability.
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from '@/types/metadata';
import { throwPageNotFound } from '@/lib/router';
import Link from '@/components/RouterLink';
import { api } from '@/lib/api';
import { fallbackCategories, fallbackProducts } from '@/lib/fallback-data';
import type { Category } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { CategorySidebar } from '@/components/CategorySlider'; // same import jo ProductsPage me hai
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await api.getCategoryBySlug(params.slug) || fallbackCategories.find((item) => item.slug === params.slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} — Products`,
    description: category.description,
  };
}

const getParentInfo = (parent: Category['parentCategory']) => {
  if (!parent) return null;
  return typeof parent === 'object' ? parent : null;
};

export default async function CategoryPage({ params }: PageProps) {
  const [category, allCategoriesRes] = await Promise.all([
    api.getCategoryBySlug(params.slug),
    api.getCategories(),
  ]);

  const catData = category || fallbackCategories.find((c) => c.slug === params.slug);
  if (!catData) throwPageNotFound();

  const parentInfo = getParentInfo(catData.parentCategory);
  const isSubCategory = !!parentInfo;

  const productsRes = isSubCategory
    ? await api.getProducts({ subCategory: params.slug, limit: 24 })
    : await api.getProducts({ category: params.slug, limit: 24 });

  const products = productsRes?.items?.length
    ? productsRes.items
    : fallbackProducts.filter((p) => {
        if (isSubCategory) {
          const ps = typeof p.subCategory === 'object' ? p.subCategory?.slug : p.subCategory;
          return ps === params.slug;
        }
        const pc = typeof p.category === 'object' ? p.category?.slug : p.category;
        return pc === params.slug;
      });

  // categories list for sidebar — allCategoriesRes se, fallback ke saath
  const categories = allCategoriesRes?.length ? allCategoriesRes : fallbackCategories;

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              {isSubCategory && parentInfo && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/products/category/${parentInfo.slug}`}>
                      {parentInfo.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">{catData.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            {catData.name}
          </h1>
          {catData.description && (
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {catData.description}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="lg:sticky lg:top-24 lg:w-64 lg:shrink-0">
            <CategorySidebar
              categories={categories}
              activeCategory={isSubCategory ? parentInfo?.slug : params.slug}
              activeSearch={undefined}
            />
          </div>

          <div className="flex-1">
            <Link
              href="/products"
              className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              All Products
            </Link>

            {products.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg font-medium text-foreground">
                  No products in this category yet.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back soon or contact us for availability.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}