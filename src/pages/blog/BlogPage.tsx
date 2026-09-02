import type { Metadata } from '@/types/metadata';
import { api } from '@/lib/api';
import { fallbackBlogCategories, fallbackBlogPosts } from '@/lib/fallback-data';
import { BlogCard } from '@/components/BlogCard';
import { BlogFilters } from '@/components/BlogFilters';

export const metadata: Metadata = {
  title: 'Blog — Pro AV Insights & News',
  description:
    'Guides, product news, and industry insights from the BeingAV team.',
};

interface SearchParams {
  category?: string;
  tag?: string;
  search?: string;
  page?: string;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [categoriesRes, blogRes] = await Promise.all([
    api.getBlogCategories(),
    api.getBlogPosts({
      category: searchParams.category,
      tag: searchParams.tag,
      search: searchParams.search,
      page: searchParams.page ? parseInt(searchParams.page) : 1,
    }),
  ]);

  const categories = categoriesRes?.length ? categoriesRes : fallbackBlogCategories;
  // const posts = blogRes?.data?.length ? blogRes.data : fallbackBlogPosts;
  const posts = blogRes?.items?.length ? blogRes.items : fallbackBlogPosts;
    // const posts = blogRes;
  console.log("blogs posts", posts)

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Insights, guides, and product news from the BeingAV team.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="mb-8">
            <BlogFilters categories={categories} />
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-foreground">No articles found.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  category={categories.find(
                    (c) => c._id === (typeof post.category === 'object' ? post.category._id : post.category)
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
