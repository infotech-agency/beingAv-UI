import type { Metadata } from '@/types/metadata';
import Link from '@/components/RouterLink';
import { api } from '@/lib/api';
import { fallbackCategories, fallbackProducts } from '@/lib/fallback-data';
import { FileText, Download, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources — Downloads, Datasheets & Manuals',
  description:
    'Access product datasheets, user manuals, and brochures for BeingAV products.',
};

export default async function ResourcesPage() {
  const [categoriesRes, productsRes] = await Promise.all([
    api.getCategories(),
    api.getProducts({ limit: 50 }),
  ]);

  const categories = categoriesRes?.length ? categoriesRes : fallbackCategories;
  const products = productsRes?.items?.length ? productsRes.items : fallbackProducts;

  const productsWithDownloads = products.filter(
    (p) => Boolean(p.downloads?.datasheet || p.downloads?.userManual)
  );

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Resources</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Download datasheets, user manuals, and product brochures for BeingAV products.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {productsWithDownloads.length === 0 ? (
            <div className="rounded-lg border border-border bg-secondary/30 p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 text-lg font-medium text-foreground">
                No downloads available yet.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Product datasheets and manuals will appear here once uploaded.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
              >
                Browse products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {categories.map((cat) => {
                const catProducts = productsWithDownloads.filter((p) => {
                  const pc = typeof p.category === 'object' ? p.category.slug : p.category;
                  return pc === cat.slug;
                });
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat._id}>
                    <h2 className="text-xl font-bold text-foreground">{cat.name}</h2>
                    <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-white">
                      {catProducts.map((product) => (
                        <div
                          key={product._id}
                          className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <Link
                              href={`/products/${product.slug}`}
                              className="font-semibold text-foreground hover:text-destructive"
                            >
                              {product.name}
                            </Link>
                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                              {product.sku}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {[['datasheet', product.downloads?.datasheet], ['userManual', product.downloads?.userManual]].filter(([, url]) => Boolean(url)).map(([type, url]) => (
                              <a
                                key={type}
                                href={url!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-destructive hover:text-destructive"
                              >
                                <Download className="h-4 w-4" />
                                {type === 'datasheet' ? 'Datasheet' : 'User Manual'}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
