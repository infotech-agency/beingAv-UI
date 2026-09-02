

import { api } from '@/lib/api';
import { fallbackCategories } from '@/lib/fallback-data';
import { ProductCard } from '@/components/ProductCard';
import Link from '@/components/RouterLink';
import { ChevronRight } from 'lucide-react';
import { CategorySidebar } from '@/components/CategorySlider'; // ⚠️ apna actual filename confirm kar le

interface SearchParams {
  search?: string;
  category?: string;
  page?: string;
  limit?: string;
}

// NOTE: koi hooks yahan use NAHI karne — ye function AsyncPage dwara
// seedha call hota hai (Promise ki tarah), React render cycle ke bahar.
export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = {
    search: searchParams.search,
    category: searchParams.category,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 12,
  };

  const [categoriesRes, productsRes] = await Promise.all([
    api.getCategories(),
    api.getProducts(params),
  ]);

  const categories = categoriesRes?.length ? categoriesRes : fallbackCategories;
  const products = productsRes?.items?.length ? productsRes.items : [];
  const pagination = productsRes
    ? { page: productsRes.page, totalPages: productsRes.totalPages, total: productsRes.total }
    : undefined;

  const activeCat = categories.find((c) => c.slug === searchParams.category);
  const pageTitle = activeCat ? activeCat.name : 'Products';

  const buildPageHref = (pageNum: number) => {
    const p = new URLSearchParams();
    if (searchParams.search) p.set('search', searchParams.search);
    if (searchParams.category) p.set('category', searchParams.category);
    p.set('page', String(pageNum));
    return `/products?${p.toString()}`;
  };

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-6 sm:py-8">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
            <Link href="/" className="text-muted-foreground hover:text-destructive">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="rounded bg-foreground px-2 py-0.5 text-white">{pageTitle}</span>
          </div>

          <h1 className="inline-block border-b-4 border-destructive pb-2 text-2xl font-bold capitalize text-foreground sm:text-3xl">
            {pageTitle}
          </h1>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="lg:sticky lg:top-24 lg:w-64 lg:shrink-0">
            <CategorySidebar
              categories={categories}
              activeCategory={searchParams.category}
              activeSearch={searchParams.search}
            />
          </div>

          <div className="flex-1">
            {products.length === 0 ? (
              <div className="py-14 text-center">
                <p className="text-base font-medium text-foreground">No products found.</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1.5">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  
                   <a key={pageNum}
                    href={buildPageHref(pageNum)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-all ${
                      pageNum === pagination.page
                        ? 'bg-destructive text-white'
                        : 'border border-border bg-white text-foreground hover:border-destructive hover:text-destructive'
                    }`}
                  >
                    {pageNum}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}