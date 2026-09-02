

import type { Metadata } from '@/types/metadata';
import Link from '@/components/RouterLink';
import { throwPageNotFound } from '@/lib/router';
import { api } from '@/lib/api';
import { fallbackServices } from '@/lib/fallback-data';
import Image from '@/components/Image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await api.getServiceBySlug(params.slug) || fallbackServices.find((item) => item.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: service.metaTitle || service.name,
    description: service.metaDescription || service.overview,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await api.getServiceBySlug(params.slug);
  const serviceData = service || fallbackServices.find((s) => s.slug === params.slug);
  if (!serviceData) throwPageNotFound();

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
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">{serviceData.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            {serviceData.name}
          </h1>
          {serviceData.overview && (
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {serviceData.overview}
            </p>
          )}
        </div>
      </section>

      {/* Full-width banner image */}
      {serviceData.bannerImage && (
        <section className="w-full">
          <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]">
            <Image
              src={serviceData.bannerImage}
              alt={serviceData.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {serviceData.content && (
                <div
                  className="prose-content max-w-none text-foreground/80 [&_a]:text-destructive [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5"
                  dangerouslySetInnerHTML={{ __html: serviceData.content }}
                />
              )}

              {/* Secondary image */}
              {serviceData.otherImage && (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                  <Image
                    src={serviceData.otherImage}
                    alt={`${serviceData.name} - additional view`}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              )}

              {serviceData.keyPoints && serviceData.keyPoints.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-foreground">Key Points</h2>
                  <ul className="mt-5 space-y-3">
                    {serviceData.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* <aside>
              <div className="sticky top-24 rounded-lg border border-border bg-white p-6 shadow-sm">
                <h3 className="font-bold text-foreground">Discuss your project</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Talk to our team about your AV requirements and how we can help.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-destructive/90"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside> */}
            <aside>
  <div className="sticky top-1/2 -translate-y-1/2 rounded-lg border border-border bg-white p-6 shadow-sm">
    <h3 className="font-bold text-foreground">Discuss your project</h3>
    <p className="mt-2 text-sm text-muted-foreground">
      Talk to our team about your AV requirements and how we can help.
    </p>
    <Link
      href="/contact"
      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-destructive/90"
    >
      Contact Us
      <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
</aside>
          </div>
        </div>
      </section>
    </>
  );
}