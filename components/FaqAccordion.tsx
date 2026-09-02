import { useState } from 'react';
import type { Faq } from '@/types';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?._id || null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border bg-white">
      {faqs.map((faq) => {
        const isOpen = open === faq._id;
        return (
          <div key={faq._id}>
            <button
              className="flex w-full items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : faq._id)}
            >
              <span className="font-semibold text-foreground">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
