import type { Metadata } from '@/types/metadata';
import { api } from '@/lib/api';
import { fallbackCaseStudies } from '@/lib/fallback-data';
import { CaseStudyCard } from '@/components/CaseStudyCard';

export const metadata: Metadata = {
  title: 'Case Studies — Pro AV Success Stories',
  description:
    'See how BeingAV solutions have transformed real-world AV deployments across industries.',
};

export default async function CaseStudiesPage() {
  const res = await api.getCaseStudies();
  const caseStudies = res?.length ? res : 'No Case Studies FoundWhy Choose BeingAV';
  console.log("case studies", res)

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-12">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Case Studies</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Real-world AV deployments powered by BeingAV hardware and expertise.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study._id} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
