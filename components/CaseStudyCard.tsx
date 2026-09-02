// import Link from '@/components/RouterLink';
// import type { CaseStudy } from '@/types';
// import { ArrowRight, CheckCircle2 } from 'lucide-react';

// export function CaseStudyCard({ study }: { study: CaseStudy }) {
//   return (
//     <div className="group flex flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
//       {study.industry && (
//         <span className="mb-3 inline-flex w-fit rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
//           {study.industry}
//         </span>
//       )}
//       <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-destructive">
//         {study.title}
//       </h3>
//       {study.client && (
//         <p className="mt-1 text-sm font-medium text-muted-foreground">
//           {study.client}
//         </p>
//       )}
//       {study.overview && (
//         <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
//           {study.overview}
//         </p>
//       )}
//       {study.keyPoints && study.keyPoints.length > 0 && (
//         <ul className="mt-4 space-y-1.5">
//           {study.keyPoints.slice(0, 3).map((point, i) => (
//             <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
//               <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//               <span>{point}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="mt-auto pt-5">
//         <Link
//           href={`/case-studies/${study.slug}`}
//           className="inline-flex items-center gap-1 text-sm font-semibold text-destructive transition-all hover:gap-2"
//         >
//           View details
//           <ArrowRight className="h-4 w-4" />
//         </Link>
//       </div>
//     </div>
//   );
// }


import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import type { CaseStudy } from '@/types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const displayImage = study.otherImage || study.bannerImage;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/case-studies/${study.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-secondary">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/40">
            <span className="text-sm">No image</span>
          </div>
        )}
        {study.industry && (
          <span className="absolute left-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {study.industry}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-destructive">
          {study.title}
        </h3>
        {study.client && (
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {study.client}
          </p>
        )}
        {study.overview && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {study.overview}
          </p>
        )}
        {study.keyPoints && study.keyPoints.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {study.keyPoints.slice(0, 3).map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-5">
          <Link
            href={`/case-studies/${study.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-destructive transition-all hover:gap-2"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}