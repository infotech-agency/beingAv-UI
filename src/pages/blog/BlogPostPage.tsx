import type { Metadata } from '@/types/metadata';
import Link from '@/components/RouterLink';
import { throwPageNotFound } from '@/lib/router';
import Image from '@/components/Image';
import { api } from '@/lib/api';
import { fallbackBlogPosts } from '@/lib/fallback-data';
import { BlogCard } from '@/components/BlogCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await api.getBlogPostBySlug(params.slug) || fallbackBlogPosts.find((item) => item.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await api.getBlogPostBySlug(params.slug);
  const postData = post || fallbackBlogPosts.find((p) => p.slug === params.slug);
  if (!postData) throwPageNotFound();

  const catName = typeof postData.category === 'object' ? postData.category.name : '';
  const catSlug = typeof postData.category === 'object' ? postData.category.slug : '';

  // const blogRes = await api.getBlogPosts({});
  // const allPosts = blogRes?.data?.length ? blogRes.data : fallbackBlogPosts;
  const blogRes = await api.getBlogPosts({});
  const allPosts = blogRes?.items?.length ? blogRes.items : fallbackBlogPosts;
  const related = allPosts.filter((p) => p.slug !== postData.slug).slice(0, 3);
  console.log("blogRes RAW", JSON.stringify(blogRes, null, 2))

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">{postData.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <article className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            {catName && (
              <Link
                href={`/blog?category=${catSlug}`}
                className="inline-block rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/20"
              >
                {catName}
              </Link>
            )}

            <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
              {postData.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {postData.author && <span className="font-medium text-foreground">{postData.author}</span>}
              {postData.createdAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(postData.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
              {postData.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {postData.readingTime}
                </span>
              )}
            </div>

            {postData.featuredImage && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                <Image
                  src={postData.featuredImage}
                  alt={postData.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}

            {postData.content && (
              <div
                className="prose-content mt-8 max-w-none text-foreground/80 [&_a]:text-destructive [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-foreground [&_img]:rounded-lg [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            )}

            <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Share2 className="h-4 w-4" />
                Share
              </span>
              <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground hover:border-destructive hover:text-destructive">
                LinkedIn
              </button>
              <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground hover:border-destructive hover:text-destructive">
                Twitter
              </button>
              <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground hover:border-destructive hover:text-destructive">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-padding bg-secondary/30">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-foreground">Related Articles</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
