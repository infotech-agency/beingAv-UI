// import type { Metadata } from '@/types/metadata';
// import Link from '@/components/RouterLink';
// import { throwPageNotFound } from '@/lib/router';
// import { api } from '@/lib/api';
// import { fallbackCaseStudies } from '@/lib/fallback-data';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
// import { CheckCircle2, ArrowRight } from 'lucide-react';

// interface PageProps {
//   params: { slug: string };
// }

// export async function getPageMetadata({ params }: PageProps): Promise<Metadata> {
//   const study = await api.getCaseStudyBySlug(params.slug) || fallbackCaseStudies.find((item) => item.slug === params.slug);
//   if (!study) return { title: 'Case Study Not Found' };
//   return {
//     title: study.title,
//     description: study.overview,
//   };
// }

// export default async function CaseStudyDetailPage({ params }: PageProps) {
//   const study = await api.getCaseStudyBySlug(params.slug);
//   const studyData = study || fallbackCaseStudies.find((s) => s.slug === params.slug);
//   if (!studyData) throwPageNotFound();

//   return (
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-12">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/">Home</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink href="/case-studies">Case Studies</BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <span className="text-foreground">{studyData.title}</span>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>

//           <div className="mt-4 flex flex-wrap items-center gap-3">
//             {studyData.industry && (
//               <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
//                 {studyData.industry}
//               </span>
//             )}
//             {studyData.client && (
//               <span className="text-sm font-medium text-muted-foreground">
//                 {studyData.client}
//               </span>
//             )}
//           </div>
//           <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
//             {studyData.title}
//           </h1>
//           {studyData.overview && (
//             <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
//               {studyData.overview}
//             </p>
//           )}
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <div className="mx-auto max-w-3xl">
//             {studyData.content && (
//               <div
//                 className="prose-content max-w-none text-foreground/80 [&_a]:text-destructive [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5"
//                 dangerouslySetInnerHTML={{ __html: studyData.content }}
//               />
//             )}

//             {studyData.keyPoints && studyData.keyPoints.length > 0 && (
//               <div className="mt-10 rounded-lg border border-border bg-secondary/30 p-6">
//                 <h2 className="text-lg font-bold text-foreground">Key Points</h2>
//                 <ul className="mt-4 space-y-3">
//                   {studyData.keyPoints.map((point, i) => (
//                     <li key={i} className="flex items-start gap-3 text-foreground/80">
//                       <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       <section className="bg-destructive">
//         <div className="container-page py-16 text-center">
//           <h2 className="text-3xl font-bold text-white">Plan a similar project</h2>
//           <p className="mx-auto mt-3 max-w-lg text-white/80">
//             Let our team help you design and deploy a solution tailored to your needs.
//           </p>
//           <Link
//             href="/contact"
//             className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-destructive shadow-lg transition-all hover:bg-white/90"
//           >
//             Contact Us
//             <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from '@/types/metadata';
import Link from '@/components/RouterLink';
import { throwPageNotFound } from '@/lib/router';
import { api } from '@/lib/api';
import { fallbackCaseStudies } from '@/lib/fallback-data';
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
  const study = await api.getCaseStudyBySlug(params.slug) || fallbackCaseStudies.find((item) => item.slug === params.slug);
  if (!study) return { title: 'Case Study Not Found' };
  return {
    title: study.title,
    description: study.overview,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const study = await api.getCaseStudyBySlug(params.slug);
  const studyData = study || fallbackCaseStudies.find((s) => s.slug === params.slug);
  if (!studyData) throwPageNotFound();

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
                <BreadcrumbLink href="/case-studies">Case Studies</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-foreground">{studyData.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {studyData.industry && (
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                {studyData.industry}
              </span>
            )}
            {studyData.client && (
              <span className="text-sm font-medium text-muted-foreground">
                {studyData.client}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl text-balance">
            {studyData.title}
          </h1>
          {studyData.overview && (
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {studyData.overview}
            </p>
          )}
        </div>
      </section>

      {/* Full-width banner image */}
      {studyData.bannerImage && (
        <section className="w-full">
          <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[3/1]">
            <Image
              src={studyData.bannerImage}
              alt={studyData.title}
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
          <div className="mx-auto max-w-3xl">
            {studyData.content && (
              <div
                className="prose-content max-w-none text-foreground/80 [&_a]:text-destructive [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5"
                dangerouslySetInnerHTML={{ __html: studyData.content }}
              />
            )}

            {/* Secondary image */}
            {studyData.otherImage && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
                <Image
                  src={studyData.otherImage}
                  alt={`${studyData.title} - additional view`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}

            {studyData.keyPoints && studyData.keyPoints.length > 0 && (
              <div className="mt-10 rounded-lg border border-border bg-secondary/30 p-6">
                <h2 className="text-lg font-bold text-foreground">Key Points</h2>
                <ul className="mt-4 space-y-3">
                  {studyData.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/80">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-destructive">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-white">Plan a similar project</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/80">
            Let our team help you design and deploy a solution tailored to your needs.
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