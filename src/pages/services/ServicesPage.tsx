import type { Metadata } from '@/types/metadata';
import Link from '@/components/RouterLink';
import { api } from '@/lib/api';
import { fallbackServices } from '@/lib/fallback-data';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services — AV Design, Installation & Support',
  description:
    'From system design to installation and ongoing support, BeingAV provides end-to-end services for Pro AV deployments.',
};

export default async function ServicesPage() {
  const servicesRes = await api.getServices();
  const services = servicesRes?.length ? servicesRes : fallbackServices;

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Services</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            End-to-end Pro AV services — from design consultation to installation and lifetime support.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service._id}
                className="group flex flex-col rounded-lg border border-border bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-bold text-foreground transition-colors group-hover:text-destructive">
                  {service.name}
                </h2>
                {service.overview && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {service.overview}
                  </p>
                )}
                {service.keyPoints && service.keyPoints.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {service.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-destructive transition-all hover:gap-2"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-destructive">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to discuss your project?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/80">
            Our team is here to help you plan, design, and deploy your next AV solution.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-destructive shadow-lg transition-all hover:bg-white/90"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
