import type { Metadata } from '@/types/metadata';
import { api } from '@/lib/api';
import { fallbackFaqs } from '@/lib/fallback-data';
import { FaqAccordion } from '@/components/FaqAccordion';
import Link from '@/components/RouterLink';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQs — Frequently Asked Questions',
  description:
    'Find answers to common questions about BeingAV products, services, and support.',
};

export default async function FaqsPage() {
  const res = await api.getFaqs();
  const faqs = res?.length ? res : fallbackFaqs;

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Find answers to common questions about BeingAV products and services.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <FaqAccordion faqs={faqs} />

          <div className="mt-12 rounded-lg border border-border bg-secondary/30 p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">Still have questions?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team is happy to help with any questions you may have.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-destructive/90"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
