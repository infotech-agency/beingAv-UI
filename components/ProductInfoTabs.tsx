// import { useState, useMemo } from 'react';
// import { CheckCircle2, Sparkles, Settings2, Layers } from 'lucide-react';

// export function ProductInfoTabs({
//   keyHighlights = [],
//   keyFeatures = [],
//   applications = [],
// }) {
//   const tabs = useMemo(() => {
//     const list = [];
//     if (keyHighlights.length > 0) {
//       list.push({ key: 'highlights', label: 'Key Highlights', items: keyHighlights, icon: Sparkles });
//     }
//     if (keyFeatures.length > 0) {
//       list.push({ key: 'features', label: 'Key Features', items: keyFeatures, icon: Settings2 });
//     }
//     if (applications.length > 0) {
//       list.push({ key: 'applications', label: 'Applications', items: applications, icon: Layers });
//     }
//     return list;
//   }, [keyHighlights, keyFeatures, applications]);

//   const [active, setActive] = useState(tabs[0]?.key ?? null);

//   if (tabs.length === 0) return null;

//   const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

//   return (
//     <section className="section-padding-sm bg-secondary/30">
//       <div className="container-page">
//         <div className="mx-auto max-w-5xl">
//           {/* Tab bar */}
//           <div className="flex flex-wrap justify-center gap-2 border-b border-border">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = tab.key === activeTab.key;
//               return (
//                 <button
//                   key={tab.key}
//                   type="button"
//                   onClick={() => setActive(tab.key)}
//                   aria-selected={isActive}
//                   className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 rounded-t-md ${
//                     isActive
//                       ? 'text-destructive'
//                       : 'text-muted-foreground hover:text-foreground'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4" />
//                   {tab.label}
//                   <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
//                     {tab.items.length}
//                   </span>
//                   {isActive && (
//                     <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-destructive" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Tab content */}
//           <div className="mt-8">
//             <ul
//               key={activeTab.key}
//               style={{ animation: 'productInfoFadeIn 180ms ease-out' }}
//               className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
//             >
//               {activeTab.items.map((item, i) => (
//                 <li key={i} className="flex items-start gap-3 text-foreground/80">
//                   <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
//                   <span className="text-sm leading-relaxed">{item}</span>
//                 </li>
//               ))}
//             </ul>
//             <style>{`
//               @keyframes productInfoFadeIn {
//                 from {
//                   opacity: 0;
//                   transform: translateY(4px);
//                 }
//                 to {
//                   opacity: 1;
//                   transform: translateY(0);
//                 }
//               }
//             `}</style>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useMemo } from 'react';
import { CheckCircle2, Sparkles, Settings2, Layers } from 'lucide-react';

interface ProductInfoTabsProps {
  keyHighlights?: string[];
  keyFeatures?: string[];
  applications?: string[];
}

type TabKey = 'highlights' | 'features' | 'applications';

export function ProductInfoTabs({
  keyHighlights = [],
  keyFeatures = [],
  applications = [],
}: ProductInfoTabsProps) {
  const tabs = useMemo(() => {
    const list: { key: TabKey; label: string; items: string[]; icon: typeof Sparkles }[] = [];
    if (keyHighlights.length > 0) {
      list.push({ key: 'highlights', label: 'Key Highlights', items: keyHighlights, icon: Sparkles });
    }
    if (keyFeatures.length > 0) {
      list.push({ key: 'features', label: 'Key Features', items: keyFeatures, icon: Settings2 });
    }
    if (applications.length > 0) {
      list.push({ key: 'applications', label: 'Applications', items: applications, icon: Layers });
    }
    return list;
  }, [keyHighlights, keyFeatures, applications]);

  const [active, setActive] = useState<TabKey | null>(tabs[0]?.key ?? null);

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <section className="section-padding-sm bg-secondary/30">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.key === activeTab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  aria-selected={isActive}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 rounded-t-md ${
                    isActive
                      ? 'text-destructive'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    {tab.items.length}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="mt-8">
            <ul
              key={activeTab.key}
              style={{ animation: 'productInfoFadeIn 180ms ease-out' }}
              className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
            >
              {activeTab.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <style jsx>{`
              @keyframes productInfoFadeIn {
                from {
                  opacity: 0;
                  transform: translateY(4px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}