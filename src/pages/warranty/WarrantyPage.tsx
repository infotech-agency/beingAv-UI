// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Cable,
//   MonitorPlay,
//   Plug,
//   Infinity as InfinityIcon,
//   RotateCcw,
//   FileText,
//   CheckCircle2,
//   XCircle,
//   ShieldCheck,
//   ChevronDown,
//   Mail,
//   Phone,
//   Globe,
//   Package,
//   Truck,
//   Wrench,
//   ClipboardCheck,
//   ScanLine,
//   ArrowRight,
//   Home,
//   BookOpen,
//   ListChecks,
//   Gavel,
//   Clock,
//   AlertCircle,
//   ExternalLink,
//   Menu,
//   X,
//   Hash,
// } from 'lucide-react';

// /* ---------------------------------------------------------
//    Design tokens — refined for documentation style
// --------------------------------------------------------- */
// const T = {
//   bg: '#fafafa',
//   surface: '#ffffff',
//   ink: '#0a0a0a',
//   inkSoft: '#1a1a1a',
//   muted: '#f4f4f5',
//   mutedFg: '#71717a',
//   border: '#e4e4e7',
//   accent: '#dc2626',
//   accentSoft: '#fef2f2',
//   accentBorder: '#fecaca',
//   shadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
//   shadowHover: '0 4px 12px rgba(0,0,0,0.07)',
// };

// /* ---------------------------------------------------------
//    Data — from the policy document
// --------------------------------------------------------- */
// const CATEGORIES = [
//   {
//     icon: Cable,
//     name: 'Professional AV Hardware',
//     value: '3',
//     unit: 'Years',
//     note: 'Mixers, processors, switchers, rack hardware.',
//   },
//   {
//     icon: MonitorPlay,
//     name: 'Collaboration / BYOD / Conference',
//     value: '2',
//     unit: 'Years',
//     note: 'Video bars, room kits, USB & huddle devices.',
//   },
//   {
//     icon: Plug,
//     name: 'Accessories, Adapters & Power',
//     value: '—',
//     unit: 'No warranty',
//     note: 'Cables, adapters and power supplies.',
//   },
//   {
//     icon: InfinityIcon,
//     name: 'Passive Cables',
//     value: '∞',
//     unit: 'Lifetime',
//     note: 'Manufacturing defects, for as long as you own it.',
//   },
//   {
//     icon: RotateCcw,
//     name: 'Refurbished / Demo / B-Stock',
//     value: '1',
//     unit: 'Year',
//     note: 'Open-box, demonstration and B-stock units.',
//   },
//   {
//     icon: FileText,
//     name: 'Software, Firmware & Licenses',
//     value: '—',
//     unit: 'Separate terms',
//     note: 'Governed by the applicable license agreement.',
//   },
// ];

// const COVERED = [
//   'Defects in materials under normal, intended use',
//   'Workmanship defects per product documentation',
//   'Free replacement — same model or equivalent',
//   'Return shipping on approved claims',
//   'Remaining warranty period carries to the replacement',
// ];

// const NOT_COVERED_GROUPS = [
//   {
//     title: 'Handling & installation',
//     items: [
//       'Improper, incorrect or unauthorized installation',
//       'Misuse, abuse, negligence or improper handling',
//       'Accidental or physical damage',
//       'Failure to follow installation, operating or maintenance instructions',
//       'Damage during transport after delivery to the customer',
//     ],
//   },
//   {
//     title: 'Environmental & electrical',
//     items: [
//       'Operation outside environmental, electrical or technical specifications',
//       'Liquid, moisture, corrosion, fire, smoke or unsuitable conditions',
//       'Lightning, surges, power fluctuations or unstable supply',
//       'Incorrect voltage, polarity, wiring or grounding',
//     ],
//   },
//   {
//     title: 'Unauthorized service',
//     items: [
//       'Unauthorized modification, alteration, repair or tampering',
//       'Products opened, disassembled or repaired by non-authorized parties',
//       'Damage from accessories not approved by BeingAV',
//     ],
//   },
//   {
//     title: 'Sourcing & identification',
//     items: [
//       'Removed, altered, damaged or illegible serial numbers',
//       'Products purchased from unauthorized dealers or resellers',
//       'Normal wear and tear, or cosmetic damage that doesn\'t affect function',
//     ],
//   },
//   {
//     title: 'Compatibility & integration',
//     items: [
//       'Damage from third-party equipment, networks or connected devices',
//       'Compatibility issues from third-party hardware or software changes',
//       'Improper configuration, programming or system integration',
//       'Firmware/software issues not caused by a hardware defect',
//       'Obsolescence from changes in technology or infrastructure',
//     ],
//   },
// ];

// const ELIGIBILITY = [
//   'Product is within its applicable warranty period',
//   'Purchased through BeingAV or an authorized sales channel',
//   'Original proof of purchase can be provided on request',
//   'Serial number is intact, legible and verifiable',
//   'Issue is confirmed as a manufacturing or workmanship defect',
//   'Product was used per BeingAV\'s documentation and specifications',
// ];

// const STEPS = [
//   {
//     icon: Phone,
//     title: 'Contact BeingAV',
//     body: 'Reach BeingAV or the authorized partner you purchased from with your model and serial number.',
//   },
//   {
//     icon: ScanLine,
//     title: 'Diagnose the issue',
//     body: 'Share photos, video or diagnostic results. Remote troubleshooting may be required first.',
//   },
//   {
//     icon: ClipboardCheck,
//     title: 'RMA issued',
//     body: 'If eligible, BeingAV issues a Return Material Authorization. Never ship without one.',
//   },
//   {
//     icon: Package,
//     title: 'Return the product',
//     body: 'Package securely, mark the RMA number clearly, and return within the specified window.',
//   },
//   {
//     icon: Truck,
//     title: 'Replacement ships',
//     body: 'BeingAV inspects, confirms eligibility, and ships a replacement of equivalent function.',
//   },
// ];

// const NOT_REIMBURSED = [
//   'Installation & reinstallation',
//   'Removal of the defective unit',
//   'Site visits & travel',
//   'Configuration & programming',
//   'System commissioning',
//   'Downtime or business interruption',
//   'Rental of alternative equipment',
//   'Loss of revenue',
// ];

// /* ---------------------------------------------------------
//    Utility hook: scroll spy for active section
// --------------------------------------------------------- */
// function useScrollSpy(sectionIds: string[], offset = 80) {
//   const [activeId, setActiveId] = useState<string>('');

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY + offset;
//       let current = '';
//       for (const id of sectionIds) {
//         const el = document.getElementById(id);
//         if (el) {
//           const { top, bottom } = el.getBoundingClientRect();
//           if (top <= offset && bottom > offset) {
//             current = id;
//             break;
//           }
//         }
//       }
//       setActiveId(current);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [sectionIds, offset]);

//   return activeId;
// }

// /* ---------------------------------------------------------
//    Section header component
// --------------------------------------------------------- */
// function SectionHeader({
//   id,
//   title,
//   description,
// }: {
//   id?: string;
//   title: string;
//   description?: string;
// }) {
//   return (
//     <div id={id} className="scroll-mt-20">
//       <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">
//         {title}
//       </h2>
//       {description && (
//         <p className="font-sans text-[#71717a] text-base mt-2 max-w-3xl leading-relaxed">
//           {description}
//         </p>
//       )}
//     </div>
//   );
// }

// /* ---------------------------------------------------------
//    Hero — minimal documentation style
// --------------------------------------------------------- */
// function Hero() {
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setReady(true), 120);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <header className="border-b border-[#e4e4e7] bg-white py-12 md:py-16">
//       <div className="max-w-5xl mx-auto px-6">
//         <div className="flex items-center gap-3 text-sm text-[#71717a] mb-2">
//           <span className="font-mono text-xs font-bold text-[#dc2626] tracking-widest uppercase">
//             Policy
//           </span>
//           <span className="h-px w-6 bg-[#e4e4e7]" />
//           <span className="font-sans">Version 1.0 · Effective 01 Jan 2026</span>
//         </div>
//         <h1
//           className="font-sans font-bold text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl tracking-tight"
//           style={{
//             opacity: ready ? 1 : 0,
//             transform: ready ? 'translateY(0)' : 'translateY(8px)',
//             transition: 'opacity 0.6s ease, transform 0.6s ease',
//           }}
//         >
//           BeingAV Limited Warranty Policy
//         </h1>
//         <p
//           className="font-sans text-[#71717a] text-lg max-w-2xl mt-3 leading-relaxed"
//           style={{
//             opacity: ready ? 1 : 0,
//             transition: 'opacity 0.8s ease 0.15s',
//           }}
//         >
//           Every signal path we build, we stand behind.
//         </p>
//       </div>
//     </header>
//   );
// }

// /* ---------------------------------------------------------
//    Table of Contents — sticky sidebar with scrollspy
// --------------------------------------------------------- */
// // function TableOfContents() {
// //   const sectionIds = [
// //     'coverage',
// //     'whats-covered',
// //     'eligibility',
// //     'process',
// //     'remedy',
// //     'contact',
// //   ];
// //   const activeId = useScrollSpy(sectionIds, 100);

// //   const sections = [
// //     { id: 'coverage', label: 'Warranty at a glance' },
// //     { id: 'whats-covered', label: "What's covered" },
// //     { id: 'eligibility', label: 'Eligibility requirements' },
// //     { id: 'process', label: 'The claim process' },
// //     { id: 'remedy', label: 'Warranty remedy' },
// //     { id: 'contact', label: 'Warranty support' },
// //   ];

// //   const [isOpen, setIsOpen] = useState(false);

// //   const scrollTo = (id: string) => {
// //     const el = document.getElementById(id);
// //     if (el) {
// //       const offset = 80;
// //       const top = el.getBoundingClientRect().top + window.scrollY - offset;
// //       window.scrollTo({ top, behavior: 'smooth' });
// //     }
// //     setIsOpen(false);
// //   };

// //   return (
// //     <>
// //       {/* Mobile TOC toggle */}
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-lg lg:hidden transition-transform hover:scale-105"
// //         aria-label="Table of contents"
// //       >
// //         {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
// //       </button>

// //       {/* Mobile TOC drawer */}
// //       {isOpen && (
// //         <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setIsOpen(false)}>
// //           <div
// //             className="absolute bottom-20 left-4 right-4 rounded-xl bg-white p-5 shadow-xl border border-[#e4e4e7]"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
// //               On this page
// //             </p>
// //             <nav className="space-y-1">
// //               {sections.map((s) => (
// //                 <button
// //                   key={s.id}
// //                   onClick={() => scrollTo(s.id)}
// //                   className={`block w-full text-left px-3 py-2 font-sans text-sm rounded-lg transition-colors ${
// //                     activeId === s.id
// //                       ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
// //                       : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
// //                   }`}
// //                 >
// //                   {s.label}
// //                 </button>
// //               ))}
// //             </nav>
// //           </div>
// //         </div>
// //       )}

// //       {/* Desktop TOC */}
// //       <div className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
// //         <div className="bg-white rounded-xl border border-[#e4e4e7] p-4 shadow-sm">
// //           <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
// //             Contents
// //           </p>
// //           <nav className="space-y-0.5">
// //             {sections.map((s) => (
// //               <button
// //                 key={s.id}
// //                 onClick={() => scrollTo(s.id)}
// //                 className={`block w-full text-left px-3 py-2 font-sans text-sm rounded-lg transition-colors ${
// //                   activeId === s.id
// //                     ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
// //                     : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
// //                 }`}
// //               >
// //                 <span className="flex items-center gap-2">
// //                   <Hash className="h-3.5 w-3.5 opacity-50" />
// //                   {s.label}
// //                 </span>
// //               </button>
// //             ))}
// //           </nav>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// function TableOfContents() {
//   const sectionIds = [
//     'coverage',
//     'whats-covered',
//     'eligibility',
//     'process',
//     'remedy',
//     'contact',
//   ];
//   const activeId = useScrollSpy(sectionIds, 100);

//   const sections = [
//     { id: 'coverage', label: 'Warranty at a glance' },
//     { id: 'whats-covered', label: "What's covered" },
//     { id: 'eligibility', label: 'Eligibility requirements' },
//     { id: 'process', label: 'The claim process' },
//     { id: 'remedy', label: 'Warranty remedy' },
//     { id: 'contact', label: 'Warranty support' },
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   const scrollTo = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       const offset = 80;
//       const top = el.getBoundingClientRect().top + window.scrollY - offset;
//       window.scrollTo({ top, behavior: 'smooth' });
//     }
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile TOC toggle - same as before */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-lg lg:hidden transition-transform hover:scale-105"
//         aria-label="Table of contents"
//       >
//         {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </button>

//       {/* Mobile TOC drawer */}
//       {isOpen && (
//         <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setIsOpen(false)}>
//           <div
//             className="absolute bottom-20 left-4 right-4 rounded-xl bg-white p-5 shadow-xl border border-[#e4e4e7]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
//               On this page
//             </p>
//             <nav className="space-y-1">
//               {sections.map((s) => (
//                 <button
//                   key={s.id}
//                   onClick={() => scrollTo(s.id)}
//                   className={`block w-full text-left px-3 py-2 font-sans text-sm rounded-lg transition-colors ${
//                     activeId === s.id
//                       ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
//                       : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
//                   }`}
//                 >
//                   {s.label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Desktop TOC — COMPACT + MIDDLE STICKY */}
//       <div className="hidden lg:block sticky top-1/2 -translate-y-1/2 self-start w-48 shrink-0">
//         <div className="bg-white rounded-xl border border-[#e4e4e7] p-3 shadow-sm">
//           <p className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#71717a] mb-2">
//             Contents
//           </p>
//           <nav className="space-y-0.5">
//             {sections.map((s) => (
//               <button
//                 key={s.id}
//                 onClick={() => scrollTo(s.id)}
//                 className={`block w-full text-left px-2 py-1.5 font-sans text-xs rounded-lg transition-colors ${
//                   activeId === s.id
//                     ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
//                     : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
//                 }`}
//               >
//                 <span className="flex items-center gap-1.5">
//                   <Hash className="h-3 w-3 opacity-50" />
//                   {s.label}
//                 </span>
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// }

// /* ---------------------------------------------------------
//    Coverage Grid
// --------------------------------------------------------- */
// function CoverageGrid() {
//   return (
//     <section id="coverage" className="scroll-mt-20">
//       <SectionHeader
//         title="Warranty at a glance"
//         description="Warranty length depends on product category. The period is fixed at purchase and does not restart on replacement."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//         {CATEGORIES.map((c, i) => {
//           const Icon = c.icon;
//           const isSpecial = i === CATEGORIES.length - 1;

//           if (isSpecial) {
//             return (
//               <div
//                 key={c.name}
//                 className="relative overflow-hidden rounded-xl p-6 min-h-[180px]"
//                 style={{ background: '#0a0a0a' }}
//               >
//                 <Icon className="h-5 w-5 text-[#dc2626]" />
//                 <div className="flex items-baseline gap-2 mt-4">
//                   <span className="font-sans text-4xl font-bold text-white">{c.value}</span>
//                   <span className="font-sans text-sm font-semibold text-white/60">{c.unit}</span>
//                 </div>
//                 <p className="font-sans font-bold text-white text-base mt-3 mb-1">{c.name}</p>
//                 <p className="font-sans text-white/60 text-sm leading-relaxed">{c.note}</p>
//               </div>
//             );
//           }

//           return (
//             <div
//               key={c.name}
//               className="rounded-xl border border-[#e4e4e7] bg-white p-6 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
//             >
//               <Icon className="h-5 w-5 text-[#dc2626]" />
//               <div className="flex items-baseline gap-2 mt-4">
//                 <span className="font-sans text-4xl font-bold text-[#0a0a0a]">{c.value}</span>
//                 <span className="font-sans text-sm font-semibold text-[#71717a]">{c.unit}</span>
//               </div>
//               <p className="font-sans font-bold text-[#0a0a0a] text-base mt-3 mb-1">{c.name}</p>
//               <p className="font-sans text-[#71717a] text-sm leading-relaxed">{c.note}</p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    What's Covered — Tabbed toggle
// --------------------------------------------------------- */
// function CoveredToggle() {
//   const [tab, setTab] = useState<'covered' | 'excluded'>('covered');

//   return (
//     <section id="whats-covered" className="scroll-mt-20">
//       <SectionHeader
//         title="What's covered"
//         description="Understand what falls under warranty protection and what does not."
//       />

//       <div className="mt-6">
//         {/* Tabs */}
//         <div className="flex gap-1 rounded-lg bg-[#f4f4f5] p-1 w-fit mb-6">
//           {[
//             { key: 'covered', label: 'Covered', icon: CheckCircle2 },
//             { key: 'excluded', label: 'Not covered', icon: XCircle },
//           ].map((t) => {
//             const Icon = t.icon;
//             const active = tab === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => setTab(t.key as typeof tab)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-md font-sans font-medium text-sm transition-all ${
//                   active
//                     ? 'bg-white shadow-sm text-[#0a0a0a]'
//                     : 'text-[#71717a] hover:text-[#0a0a0a]'
//                 }`}
//               >
//                 <Icon className="h-4 w-4" />
//                 {t.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* Content */}
//         {tab === 'covered' ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {COVERED.map((item) => (
//               <div
//                 key={item}
//                 className="flex items-start gap-3 rounded-lg border border-[#e4e4e7] bg-white px-4 py-3.5"
//               >
//                 <CheckCircle2 className="h-5 w-5 text-[#0a0a0a] shrink-0 mt-0.5" />
//                 <span className="font-sans text-[#1a1a1a] text-sm leading-relaxed">{item}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-xl border border-[#e4e4e7] bg-white overflow-hidden divide-y divide-[#e4e4e7]">
//             {NOT_COVERED_GROUPS.map((group) => (
//               <details key={group.title} className="group">
//                 <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-sans font-semibold text-[#0a0a0a] text-sm hover:bg-[#fafafa] transition-colors list-none">
//                   {group.title}
//                   <ChevronDown className="h-4 w-4 text-[#71717a] transition-transform group-open:rotate-180" />
//                 </summary>
//                 <ul className="px-5 pb-4 space-y-2">
//                   {group.items.map((item) => (
//                     <li key={item} className="flex items-start gap-3">
//                       <XCircle className="h-4 w-4 text-[#dc2626] shrink-0 mt-0.5" />
//                       <span className="font-sans text-[#71717a] text-sm leading-relaxed">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </details>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Eligibility
// --------------------------------------------------------- */
// function Eligibility() {
//   return (
//     <section id="eligibility" className="scroll-mt-20">
//       <SectionHeader
//         title="Eligibility requirements"
//         description="A warranty replacement is provided only where every condition below is met."
//       />

//       <div className="mt-6 rounded-xl border border-[#e4e4e7] bg-white overflow-hidden divide-y divide-[#e4e4e7]">
//         {ELIGIBILITY.map((item, i) => (
//           <div key={item} className="flex items-center gap-4 px-5 py-4">
//             <span className="font-mono text-xs font-bold text-[#dc2626] w-6 shrink-0">
//               {String(i + 1).padStart(2, '0')}
//             </span>
//             <span className="font-sans text-[#1a1a1a] text-sm leading-relaxed">{item}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Process — Stepper with auto-advance
// --------------------------------------------------------- */
// function ProcessSteps() {
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActive((prev) => (prev + 1) % STEPS.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section id="process" className="scroll-mt-20">
//       <SectionHeader
//         title="The claim process"
//         description="Products must not be returned without a written RMA. Select a step to see what it involves."
//       />

//       <div className="mt-6">
//         {/* Steps */}
//         <div className="relative flex justify-between">
//           <div className="absolute top-5 left-[10%] right-[10%] h-px bg-[#e4e4e7]" />

//           {STEPS.map((s, i) => {
//             const Icon = s.icon;
//             const isActive = active === i;
//             return (
//               <button
//                 key={s.title}
//                 onClick={() => setActive(i)}
//                 className="relative flex flex-1 flex-col items-center gap-0 bg-transparent border-0 cursor-pointer px-1"
//               >
//                 <span
//                   className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 z-10 ${
//                     isActive
//                       ? 'border-[#dc2626] bg-[#dc2626] scale-110'
//                       : 'border-[#e4e4e7] bg-white'
//                   }`}
//                 >
//                   <Icon
//                     className={`h-5 w-5 transition-colors ${
//                       isActive ? 'text-white' : 'text-[#71717a]'
//                     }`}
//                   />
//                 </span>
//                 <span
//                   className={`font-sans text-xs font-semibold text-center mt-2.5 leading-tight transition-colors ${
//                     isActive ? 'text-[#0a0a0a]' : 'text-[#71717a]'
//                   }`}
//                 >
//                   {s.title}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* Description */}
//         <div className="mt-8 rounded-xl border border-[#e4e4e7] bg-[#fafafa] p-5 flex items-start gap-3 transition-all">
//           <ArrowRight className="h-5 w-5 text-[#dc2626] shrink-0 mt-0.5" />
//           <p className="font-sans text-[#1a1a1a] text-sm leading-relaxed">
//             {STEPS[active].body}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Remedy
// --------------------------------------------------------- */
// function RemedySection() {
//   return (
//     <section id="remedy" className="scroll-mt-20">
//       <SectionHeader
//         title="Warranty remedy"
//         description="What you get when a warranty claim is approved."
//       />

//       <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
//         <div className="lg:col-span-3 rounded-xl border border-[#e4e4e7] bg-[#fef2f2] p-6">
//           <div className="flex items-start gap-4">
//             <ShieldCheck className="h-6 w-6 text-[#dc2626] shrink-0 mt-0.5" />
//             <div>
//               <h3 className="font-sans font-bold text-[#0a0a0a] text-lg">
//                 Replacement only — no repairs
//               </h3>
//               <p className="font-sans text-[#1a1a1a] text-sm leading-relaxed mt-1">
//                 A confirmed defect is remedied with the same model, or a
//                 substantially equivalent one if discontinued. No cash refund,
//                 credit or partial refund is offered unless the law requires
//                 it. Replacements may be new or refurbished, and carry only
//                 the remaining time left on the original warranty.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-2 rounded-xl border border-[#e4e4e7] bg-white p-6">
//           <h4 className="font-sans font-bold text-[#0a0a0a] text-sm mb-4">
//             Costs not reimbursed
//           </h4>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//             {NOT_REIMBURSED.map((item) => (
//               <div key={item} className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[#71717a] shrink-0" />
//                 <span className="font-sans text-[#71717a] text-xs">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Contact
// --------------------------------------------------------- */
// function ContactSection() {
//   return (
//     <section id="contact" className="scroll-mt-20">
//       <SectionHeader
//         title="Warranty support"
//         description="For warranty claims, RMA requests or warranty-related inquiries."
//       />

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a
//           href="mailto:support@beingav.com"
//           className="flex items-center gap-4 rounded-xl border border-[#e4e4e7] bg-white px-5 py-4 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
//         >
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626]">
//             <Mail className="h-5 w-5" />
//           </div>
//           <div>
//             <p className="font-sans text-sm font-medium text-[#0a0a0a]">Email</p>
//             <p className="font-sans text-sm text-[#71717a]">support@beingav.com</p>
//           </div>
//         </a>

       
//         <a
//           href="https://www.beingav.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-4 rounded-xl border border-[#e4e4e7] bg-white px-5 py-4 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
//         >
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626]">
//             <Globe className="h-5 w-5" />
//           </div>
//           <div>
//             <p className="font-sans text-sm font-medium text-[#0a0a0a]">Website</p>
//             <p className="font-sans text-sm text-[#71717a]">www.beingav.com</p>
//           </div>
//         </a>
//       </div>

//       <p className="font-sans text-xs text-[#71717a] mt-6 text-center">
//         Please provide the product model number and serial number when contacting BeingAV.
//       </p>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Main Page
// --------------------------------------------------------- */
// export default function WarrantyPage() {
//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans antialiased">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
//         * { box-sizing: border-box; }
//         body { margin: 0; }
//         .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
//         .font-mono { font-family: 'JetBrains Mono', 'SF Mono', monospace; }
//         details summary::-webkit-details-marker { display: none; }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation: none !important; transition: none !important; }
//         }
//       `}</style>

//       <Hero />

//       <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
//         <div className="flex gap-12">
//           {/* Main content */}
//           <div className="flex-1 min-w-0 space-y-16">
//             <CoverageGrid />
//             <CoveredToggle />
//             <Eligibility />
//             <ProcessSteps />
//             <RemedySection />
//             <ContactSection />
//           </div>

//           {/* Sidebar TOC */}
//           <TableOfContents />
//         </div>
//       </div>

//       <footer className="border-t border-[#e4e4e7] bg-white py-6 text-center">
//         <p className="font-sans text-xs text-[#71717a]">
//           BeingAV Limited Warranty Policy — Version 1.0 · Effective 01 Jan 2026
//         </p>
//         <p className="font-sans text-xs text-[#71717a]/60 mt-1">
//           This warranty provides additional rights and does not replace mandatory rights under applicable law.
//         </p>
//       </footer>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { api } from '@/lib/api'; // apna actual api import path check kar lena
import type { Warranty } from '@/types';

export default function WarrantyPage() {
  const [warranty, setWarranty] = useState<Warranty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getWarranty().then((data) => {
      if (mounted) {
        setWarranty(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (warranty?.metaTitle) document.title = warranty.metaTitle;
    if (warranty?.metaDescription) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', warranty.metaDescription);
    }
  }, [warranty]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#dc2626] border-t-transparent" />
      </div>
    );
  }

  if (!warranty || !warranty.content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#1a1a1a]/60">
        Content coming soon.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white font-sans antialiased"
      dangerouslySetInnerHTML={{ __html: warranty.content }}
    />
  );
}