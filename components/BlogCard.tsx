import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import type { BlogPost, BlogCategory } from '@/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

function formatDate(date?: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogCard({
  post,
  category,
}: {
  post: BlogPost;
  category?: BlogCategory;
}) {
  const catName =
    typeof post.category === 'object' ? post.category.name : category?.name;
    console.log("blog", post)

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-secondary">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40">
            <span className="text-sm">No image</span>
          </div>
        )}
        {catName && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {catName}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {post.author && <span>{post.author}</span>}
          {post.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.createdAt)}
            </span>
          )}
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
          )}
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-2 font-bold text-foreground transition-colors group-hover:text-destructive">
            {post.title}
          </h3>
        </Link>
        {post.content && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {post.content.replace(/<[^>]*>/g, '').slice(0, 120)}
          </p>
        )}
        <div className="mt-auto pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-destructive transition-all hover:gap-2"
          >
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
