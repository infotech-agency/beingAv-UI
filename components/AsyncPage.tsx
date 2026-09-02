import { useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageNotFoundError } from '@/lib/router';
import type { Metadata } from '@/types/metadata';

export function AsyncPage<T>({ component, props, getMetadata }: { component: (props: T) => Promise<ReactNode>; props: T; getMetadata?: (props: T) => Promise<Metadata> }) {
  const [content, setContent] = useState<ReactNode>(null);
  const [missing, setMissing] = useState(false);
  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const propsKey = JSON.stringify(props);

  useEffect(() => {
    let active = true;
    setContent(null);
    setMissing(false);
    setMetadata(null);
    if (getMetadata) getMetadata(props).then((result) => active && setMetadata(result)).catch(() => undefined);
    component(props).then((result) => active && setContent(result)).catch((error) => {
      if (active && error instanceof PageNotFoundError) setMissing(true);
      else console.error('Page data could not be loaded', error);
    });
    return () => { active = false; };
  }, [component, getMetadata, propsKey]);

  if (missing) return <section className="container-page section-padding"><h1 className="text-3xl font-bold">Page not found</h1></section>;
  const title = typeof metadata?.title === 'string' ? metadata.title : undefined;
  return <>{metadata && <Helmet><title>{title}</title>{metadata.description && <meta name="description" content={metadata.description} />}{title && <meta property="og:title" content={title} />}{metadata.description && <meta property="og:description" content={metadata.description} />}{title && <meta name="twitter:title" content={title} />}{metadata.description && <meta name="twitter:description" content={metadata.description} />}</Helmet>}{content ? <>{content}</> : <section className="container-page section-padding"><p className="text-muted-foreground">Loading...</p></section>}</>;
}
