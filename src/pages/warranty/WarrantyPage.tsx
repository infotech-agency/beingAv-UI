// import React, { useState, useEffect, useRef } from "react";
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
// } from "lucide-react";

// /* ---------------------------------------------------------
//    Design tokens (mirrors the supplied CSS variable theme)
// --------------------------------------------------------- */
// const T = {
//   bg: "hsl(0, 0%, 100%)",
//   ink: "hsl(222, 47%, 11%)",
//   inkSoft: "hsl(222, 30%, 24%)",
//   card: "hsl(0, 0%, 100%)",
//   secondary: "hsl(210, 40%, 96%)",
//   muted: "hsl(210, 40%, 96%)",
//   mutedFg: "hsl(215, 16%, 47%)",
//   accent: "hsl(0, 72%, 51%)",
//   accentSoft: "hsl(0, 72%, 96%)",
//   border: "hsl(214, 32%, 91%)",
// };

// /* ---------------------------------------------------------
//    Data — sourced from the policy document
// --------------------------------------------------------- */
// const CATEGORIES = [
//   {
//     icon: Cable,
//     name: "Professional AV Hardware",
//     value: "3",
//     unit: "Years",
//     note: "Mixers, processors, switchers, rack hardware.",
//   },
//   {
//     icon: MonitorPlay,
//     name: "Collaboration / BYOD / Conference",
//     value: "2",
//     unit: "Years",
//     note: "Video bars, room kits, USB & huddle devices.",
//   },
//   {
//     icon: Plug,
//     name: "Accessories, Adapters & Power",
//     value: "—",
//     unit: "No warranty",
//     note: "Cables, adapters and power supplies.",
//   },
//   {
//     icon: InfinityIcon,
//     name: "Passive Cables",
//     value: "∞",
//     unit: "Lifetime",
//     note: "Manufacturing defects, for as long as you own it.",
//   },
//   {
//     icon: RotateCcw,
//     name: "Refurbished / Demo / B-Stock",
//     value: "1",
//     unit: "Year",
//     note: "Open-box, demonstration and B-stock units.",
//   },
//   {
//     icon: FileText,
//     name: "Software, Firmware & Licenses",
//     value: "—",
//     unit: "Separate terms",
//     note: "Governed by the applicable license agreement.",
//   },
// ];

// const ELIGIBILITY = [
//   "Product is within its applicable warranty period",
//   "Purchased through BeingAV or an authorized sales channel",
//   "Original proof of purchase can be provided on request",
//   "Serial number is intact, legible and verifiable",
//   "Issue is confirmed as a manufacturing or workmanship defect",
//   "Product was used per BeingAV's documentation and specifications",
// ];

// const NOT_COVERED_GROUPS = [
//   {
//     title: "Handling & installation",
//     items: [
//       "Improper, incorrect or unauthorized installation",
//       "Misuse, abuse, negligence or improper handling",
//       "Accidental or physical damage",
//       "Failure to follow installation, operating or maintenance instructions",
//       "Damage during transport after delivery to the customer",
//     ],
//   },
//   {
//     title: "Environmental & electrical",
//     items: [
//       "Operation outside environmental, electrical or technical specifications",
//       "Liquid, moisture, corrosion, fire, smoke or unsuitable conditions",
//       "Lightning, surges, power fluctuations or unstable supply",
//       "Incorrect voltage, polarity, wiring or grounding",
//     ],
//   },
//   {
//     title: "Unauthorized service",
//     items: [
//       "Unauthorized modification, alteration, repair or tampering",
//       "Products opened, disassembled or repaired by non-authorized parties",
//       "Damage from accessories not approved by BeingAV",
//     ],
//   },
//   {
//     title: "Sourcing & identification",
//     items: [
//       "Removed, altered, damaged or illegible serial numbers",
//       "Products purchased from unauthorized dealers or resellers",
//       "Normal wear and tear, or cosmetic damage that doesn't affect function",
//     ],
//   },
//   {
//     title: "Compatibility & integration",
//     items: [
//       "Damage from third-party equipment, networks or connected devices",
//       "Compatibility issues from third-party hardware or software changes",
//       "Improper configuration, programming or system integration",
//       "Firmware/software issues not caused by a hardware defect",
//       "Obsolescence from changes in technology or infrastructure",
//     ],
//   },
// ];

// const COVERED = [
//   "Defects in materials under normal, intended use",
//   "Workmanship defects per product documentation",
//   "Free replacement — same model or equivalent",
//   "Return shipping on approved claims",
//   "Remaining warranty period carries to the replacement",
// ];

// const STEPS = [
//   {
//     icon: Phone,
//     title: "Contact BeingAV",
//     body: "Reach BeingAV or the authorized partner you purchased from with your model and serial number.",
//   },
//   {
//     icon: ScanLine,
//     title: "Diagnose the issue",
//     body: "Share photos, video or diagnostic results. Remote troubleshooting may be required first.",
//   },
//   {
//     icon: ClipboardCheck,
//     title: "RMA issued",
//     body: "If eligible, BeingAV issues a Return Material Authorization. Never ship without one.",
//   },
//   {
//     icon: Package,
//     title: "Return the product",
//     body: "Package securely, mark the RMA number clearly, and return within the specified window.",
//   },
//   {
//     icon: Truck,
//     title: "Replacement ships",
//     body: "BeingAV inspects, confirms eligibility, and ships a replacement of equivalent function.",
//   },
// ];

// const NOT_REIMBURSED = [
//   "Installation & reinstallation",
//   "Removal of the defective unit",
//   "Site visits & travel",
//   "Configuration & programming",
//   "System commissioning",
//   "Downtime or business interruption",
//   "Rental of alternative equipment",
//   "Loss of revenue",
// ];

// /* ---------------------------------------------------------
//    Small building blocks
// --------------------------------------------------------- */
// function SignalPath({ items }) {
//   const n = items.length;
//   const w = n * 100;
//   const dur = 3.2;
//   return (
//     <svg
//       viewBox={`0 0 ${w} 40`}
//       preserveAspectRatio="none"
//       style={{ width: "100%", height: 32, display: "block", overflow: "visible" }}
//     >
//       <line x1="0" y1="20" x2={w} y2="20" stroke={T.border} strokeWidth="1.5" />
//       {items.map((c, i) => {
//         const cx = (i + 0.5) * 100;
//         const begin = (cx / w) * dur;
//         return (
//           <g key={c.name}>
//             <circle cx={cx} cy={20} r="4" fill={T.ink} />
//             <circle cx={cx} cy={20} r="4" fill={T.accent} opacity="0">
//               <animate attributeName="opacity" values="0;1;0" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
//               <animate attributeName="r" values="4;10;4" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
//             </circle>
//           </g>
//         );
//       })}
//       <circle r="5" fill={T.accent}>
//         <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={`M0,20 L${w},20`} />
//       </circle>
//     </svg>
//   );
// }

// function useInView(threshold = 0.2) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           obs.disconnect();
//         }
//       },
//       { threshold }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);
//   return [ref, inView];
// }

// function SectionLabel({ index, children }) {
//   return (
//     <div className="flex items-center gap-3 mb-4">
//       <span
//         style={{
//           fontFamily: "'Lato', sans-serif",
//           color: T.accent,
//           fontVariantNumeric: "tabular-nums",
//           fontWeight: 700,
//           fontSize: 13,
//           letterSpacing: "0.02em",
//         }}
//       >
//         {index}
//       </span>
//       <span style={{ height: 1, width: 28, background: T.border }} />
//       <h2
//         style={{
//           fontFamily: "'Lato', sans-serif",
//           color: T.ink,
//           fontWeight: 700,
//           fontSize: 32,
//           letterSpacing: "-0.01em",
//           margin: 0,
//         }}
//       >
//         {children}
//       </h2>
//     </div>
//   );
// }

// /* ---------------------------------------------------------
//    Hero
// --------------------------------------------------------- */
// function Hero() {
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setReady(true), 120);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <header
//       style={{
//         background: T.bg,
//         borderBottom: `1px solid ${T.border}`,
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* faint blueprint grid */}
//       <div
//         aria-hidden
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
//           backgroundSize: "42px 42px",
//           opacity: 0.5,
//           maskImage: "linear-gradient(to bottom, black, transparent 85%)",
//           WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
//         }}
//       />
//       <div className="container-hero" style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 0" }}>
//           {/* <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//             <span
//               style={{
//                 width: 8,
//                 height: 8,
//                 borderRadius: "50%",
//                 background: T.accent,
//                 boxShadow: `0 0 0 4px ${T.accentSoft}`,
//                 animation: "pulseDot 2s ease-in-out infinite",
//               }}
//             />
//             <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: "0.02em", color: T.ink, fontSize: 15 }}>
//               BeingAV
//             </span>
//           </div> */}
         
//         </div>

//         <div style={{ padding: "64px 0 56px", maxWidth: 720 }}>
//           <p
//             style={{
//               fontFamily: "monospace",
//               fontSize: 12,
//               color: T.accent,
//               marginBottom: 18,
//               letterSpacing: "0.04em",
//             }}
//           >
//             LIMITED WARRANTY POLICY
//           </p>
//           <h1
//             style={{
//               fontFamily: "'Lato', sans-serif",
//               fontWeight: 700,
//               color: T.ink,
//               fontSize: "clamp(42px, 6vw, 68px)",
//               lineHeight: 1.04,
//               letterSpacing: "-0.01em",
//               margin: 0,
//               opacity: ready ? 1 : 0,
//               transform: ready ? "translateY(0)" : "translateY(10px)",
//               transition: "opacity 0.7s ease, transform 0.7s ease",
//             }}
//           >
//             Every signal path we build,
//             <br />
//             we stand behind.
//           </h1>
//           <p
//             style={{
//               fontFamily: "'Lato', sans-serif",
//               color: T.mutedFg,
//               fontSize: 19,
//               lineHeight: 1.65,
//               marginTop: 22,
//               maxWidth: 580,
//               opacity: ready ? 1 : 0,
//               transition: "opacity 0.9s ease 0.15s",
//             }}
//           >
//             Professional AV hardware, warranted against defects in materials
//             and workmanship — from the amplifier in the rack to the cable
//             behind the wall.
//           </p>
//         </div>

//         {/* signal path of category durations */}
//         <div style={{ paddingBottom: 44 }}>
//           <SignalPath items={CATEGORIES} />
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(6, 1fr)",
//               gap: 0,
//               marginTop: 14,
//             }}
//           >
//             {CATEGORIES.map((c) => (
//               <div key={c.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 24, color: T.ink }}>
//                   {c.value}
//                 </span>
//                 <span style={{ fontFamily: "monospace", fontSize: 10.5, color: T.mutedFg, marginTop: 2 }}>
//                   {c.unit.toUpperCase()}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* ---------------------------------------------------------
//    Coverage cards
// --------------------------------------------------------- */
// function CoverageGrid() {
//   return (
//     <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }} id="coverage">
//       <SectionLabel index="01">Coverage at a glance</SectionLabel>
//       <p style={{ fontFamily: "'Lato', sans-serif", color: T.mutedFg, fontSize: 16.5, maxWidth: 640, marginBottom: 40, lineHeight: 1.6 }}>
//         Warranty length depends on product category. The period is fixed at
//         purchase and does not restart on replacement.
//       </p>
//       <div className="coverage-grid" style={{ display: "grid", gap: 1, background: T.border, border: `1px solid ${T.border}` }}>
//         {CATEGORIES.map((c, i) => {
//           const Icon = c.icon;
//           const isLast = i === CATEGORIES.length - 1;

//           if (isLast) {
//             return (
//               <div
//                 key={c.name}
//                 style={{
//                   position: "relative",
//                   padding: "26px 24px",
//                   minHeight: 220,
//                   overflow: "hidden",
//                   isolation: "isolate",
//                 }}
//               >
//                 <img
//                   src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
//                   alt=""
//                   aria-hidden="true"
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     zIndex: -2,
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     background: `linear-gradient(180deg, ${T.ink} 0%, rgba(15,23,41,0.86) 55%, rgba(15,23,41,0.94) 100%)`,
//                     zIndex: -1,
//                   }}
//                 />
//                 <Icon size={22} color={T.accent} strokeWidth={1.75} />
//                 <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: 20 }}>
//                   <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 38, color: "#fff" }}>{c.value}</span>
//                   <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 14.5, color: "rgba(255,255,255,0.6)" }}>{c.unit}</span>
//                 </div>
//                 <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#fff", fontSize: 17, marginTop: 16, marginBottom: 7 }}>
//                   {c.name}
//                 </p>
//                 <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{c.note}</p>
//               </div>
//             );
//           }

//           return (
//             <div
//               key={c.name}
//               style={{
//                 background: T.card,
//                 padding: "26px 24px",
//                 transition: "background 0.2s ease",
//               }}
//               className="coverage-card"
//             >
//               <Icon size={22} color={T.accent} strokeWidth={1.75} />
//               <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: 20 }}>
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 38, color: T.ink }}>{c.value}</span>
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 14.5, color: T.mutedFg }}>{c.unit}</span>
//               </div>
//               <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: T.ink, fontSize: 17, marginTop: 16, marginBottom: 7 }}>
//                 {c.name}
//               </p>
//               <p style={{ fontFamily: "'Lato', sans-serif", color: T.mutedFg, fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{c.note}</p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Covered / Not covered toggle
// --------------------------------------------------------- */
// function CoveredToggle() {
//   const [tab, setTab] = useState("covered");
//   const [openGroup, setOpenGroup] = useState(0);

//   return (
//     <section style={{ background: T.secondary, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }} id="whats-covered">
//       <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
//         <SectionLabel index="02">What's covered</SectionLabel>

//         <div style={{ display: "inline-flex", border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 32, background: T.card }}>
//           {[
//             { key: "covered", label: "Covered", icon: CheckCircle2 },
//             { key: "excluded", label: "Not covered", icon: XCircle },
//           ].map((t) => {
//             const Icon = t.icon;
//             const active = tab === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => setTab(t.key)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 7,
//                   padding: "10px 18px",
//                   fontFamily: "'Lato', sans-serif",
//                   fontWeight: 700,
//                   fontSize: 14.5,
//                   color: active ? "#fff" : T.mutedFg,
//                   background: active ? (t.key === "covered" ? T.ink : T.accent) : "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                   transition: "background 0.2s ease, color 0.2s ease",
//                 }}
//               >
//                 <Icon size={15} />
//                 {t.label}
//               </button>
//             );
//           })}
//         </div>

//         {tab === "covered" ? (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
//             {COVERED.map((item) => (
//               <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: "16px 16px" }}>
//                 <CheckCircle2 size={17} color={T.ink} style={{ marginTop: 1, flexShrink: 0 }} />
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 15.5, color: T.inkSoft, lineHeight: 1.55 }}>{item}</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>
//             {NOT_COVERED_GROUPS.map((g, i) => {
//               const open = openGroup === i;
//               return (
//                 <div key={g.title} style={{ borderBottom: `1px solid ${T.border}`, background: T.card }}>
//                   <button
//                     onClick={() => setOpenGroup(open ? -1 : i)}
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       padding: "16px 18px",
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       textAlign: "left",
//                     }}
//                   >
//                     <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 16, color: T.ink }}>{g.title}</span>
//                     <ChevronDown
//                       size={17}
//                       color={T.mutedFg}
//                       style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}
//                     />
//                   </button>
//                   <div
//                     style={{
//                       maxHeight: open ? 300 : 0,
//                       overflow: "hidden",
//                       transition: "max-height 0.3s ease",
//                     }}
//                   >
//                     <ul style={{ margin: 0, padding: "0 18px 18px 18px", listStyle: "none" }}>
//                       {g.items.map((it) => (
//                         <li key={it} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 9 }}>
//                           <XCircle size={14} color={T.accent} style={{ marginTop: 3, flexShrink: 0 }} />
//                           <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 14.5, color: T.mutedFg, lineHeight: 1.55 }}>{it}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })}
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
//     <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }} id="eligibility">
//       <SectionLabel index="03">Eligibility requirements</SectionLabel>
//       <p style={{ fontFamily: "'Lato', sans-serif", color: T.mutedFg, fontSize: 16.5, maxWidth: 640, marginBottom: 36, lineHeight: 1.6 }}>
//         A warranty replacement is provided only where every condition below is
//         met.
//       </p>
//       <div style={{ border: `1px solid ${T.border}`, borderRadius: 10, overflow: "hidden" }}>
//         {ELIGIBILITY.map((item, i) => (
//           <div
//             key={item}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 16,
//               padding: "18px 20px",
//               borderBottom: i === ELIGIBILITY.length - 1 ? "none" : `1px solid ${T.border}`,
//             }}
//           >
//             <span
//               style={{
//                 fontFamily: "monospace",
//                 fontSize: 12,
//                 color: T.accent,
//                 width: 22,
//                 flexShrink: 0,
//               }}
//             >
//               {String(i + 1).padStart(2, "0")}
//             </span>
//             <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 16, color: T.inkSoft }}>{item}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Claim process — stepper
// --------------------------------------------------------- */
// // function ProcessSteps() {
// //   const [active, setActive] = useState(0);
// //   return (
// //     <section style={{ background: T.ink, position: "relative" }} id="process">
// //       <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
// //         <div className="flex items-center gap-3 mb-4">
// //           <span style={{ fontFamily: "'Lato', sans-serif", color: T.accent, fontWeight: 700, fontSize: 13 }}>04</span>
// //           <span style={{ height: 1, width: 28, background: "rgba(255,255,255,0.2)" }} />
// //           <h2 style={{ fontFamily: "'Lato', sans-serif", color: "#fff", fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em", margin: 0 }}>
// //             The claim process
// //           </h2>
// //         </div>
// //         <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 16.5, maxWidth: 580, marginBottom: 48, lineHeight: 1.6 }}>
// //           Products must not be returned without a written RMA. Select a step
// //           to see what it involves.
// //         </p>

// //         <div style={{ display: "flex", position: "relative", marginBottom: 8 }}>
// //           <div style={{ position: "absolute", top: 19, left: "10%", right: "10%", height: 1, background: "rgba(255,255,255,0.15)" }} />
// //           {STEPS.map((s, i) => {
// //             const Icon = s.icon;
// //             const isActive = active === i;
// //             return (
// //               <button
// //                 key={s.title}
// //                 onClick={() => setActive(i)}
// //                 style={{
// //                   flex: 1,
// //                   display: "flex",
// //                   flexDirection: "column",
// //                   alignItems: "center",
// //                   background: "none",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   position: "relative",
// //                   padding: "0 6px",
// //                 }}
// //               >
// //                 <span
// //                   style={{
// //                     width: 40,
// //                     height: 40,
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     background: isActive ? T.accent : "rgba(255,255,255,0.08)",
// //                     border: `1px solid ${isActive ? T.accent : "rgba(255,255,255,0.2)"}`,
// //                     transition: "background 0.25s ease, border-color 0.25s ease",
// //                     zIndex: 1,
// //                   }}
// //                 >
// //                   <Icon size={17} color={isActive ? "#fff" : "rgba(255,255,255,0.7)"} />
// //                 </span>
// //                 <span
// //                   style={{
// //                     fontFamily: "'Lato', sans-serif",
// //                     fontSize: 14,
// //                     fontWeight: 700,
// //                     color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
// //                     marginTop: 12,
// //                     textAlign: "center",
// //                     lineHeight: 1.3,
// //                     transition: "color 0.2s ease",
// //                   }}
// //                 >
// //                   {s.title}
// //                 </span>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         <div
// //           style={{
// //             marginTop: 28,
// //             background: "rgba(255,255,255,0.05)",
// //             border: "1px solid rgba(255,255,255,0.1)",
// //             borderRadius: 10,
// //             padding: "22px 26px",
// //             display: "flex",
// //             alignItems: "center",
// //             gap: 14,
// //           }}
// //         >
// //           <ArrowRight size={16} color={T.accent} style={{ flexShrink: 0 }} />
// //           <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: 16.5, lineHeight: 1.6, margin: 0 }}>
// //             {STEPS[active].body}
// //           </p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// function ProcessSteps() {
//   const [active, setActive] = useState(0);

//   // Automatic infinite animation cycle
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActive((prev) => (prev + 1) % STEPS.length);
//     }, 1800); // Har 3 second me step change hoga

//     return () => clearInterval(timer); // Cleanup on unmount
//   }, []);

//   return (
//     <section style={{ background: T.ink, position: "relative" }} id="process">
//       <div style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
//         <div className="flex items-center gap-3 mb-4">
//           <span style={{ fontFamily: "'Lato', sans-serif", color: T.accent, fontWeight: 700, fontSize: 13 }}>04</span>
//           <span style={{ height: 1, width: 28, background: "rgba(255,255,255,0.2)" }} />
//           <h2 style={{ fontFamily: "'Lato', sans-serif", color: "#fff", fontWeight: 700, fontSize: 32, letterSpacing: "-0.01em", margin: 0 }}>
//             The claim process
//           </h2>
//         </div>
//         <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 16.5, maxWidth: 580, marginBottom: 48, lineHeight: 1.6 }}>
//           Products must not be returned without a written RMA. Select a step to see what it involves.
//         </p>

//         <div style={{ display: "flex", position: "relative", marginBottom: 8 }}>
//           <div style={{ position: "absolute", top: 22, left: "10%", right: "10%", height: 1, background: "rgba(255,255,255,0.15)" }} />
//           {STEPS.map((s, i) => {
//             const Icon = s.icon;
//             const isActive = active === i;
//             return (
//               <button
//                 key={s.title}
//                 onClick={() => setActive(i)}
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                   position: "relative",
//                   padding: "0 6px",
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 46,
//                     height: 46,
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: isActive ? T.accent : "rgba(255,255,255,0.08)",
//                     border: `1px solid ${isActive ? T.accent : "rgba(255,255,255,0.2)"}`,
//                     transform: isActive ? "scale(1.15)" : "scale(1)",
//                     transition: "all 0.35s ease-in-out",
//                     zIndex: 1,
//                   }}
//                 >
//                   <Icon size={22} color={isActive ? "#fff" : "rgba(255,255,255,0.7)"} />
//                 </span>
//                 <span
//                   style={{
//                     fontFamily: "'Lato', sans-serif",
//                     fontSize: 14,
//                     fontWeight: 700,
//                     color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
//                     marginTop: 12,
//                     textAlign: "center",
//                     lineHeight: 1.3,
//                     transition: "color 0.3s ease",
//                   }}
//                 >
//                   {s.title}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         <div
//           style={{
//             marginTop: 28,
//             background: "rgba(255,255,255,0.05)",
//             border: "1px solid rgba(255,255,255,0.1)",
//             borderRadius: 10,
//             padding: "22px 26px",
//             display: "flex",
//             alignItems: "center",
//             gap: 14,
//             transition: "all 0.3s ease",
//           }}
//         >
//           <ArrowRight size={18} color={T.accent} style={{ flexShrink: 0 }} />
//           <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: 16.5, lineHeight: 1.6, margin: 0 }}>
//             {STEPS[active].body}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------
//    Remedy + cost exclusions
// --------------------------------------------------------- */
// function RemedySection() {
//   return (
//     <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }} id="remedy">
//       <SectionLabel index="05">Warranty remedy</SectionLabel>
//       <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40 }} className="remedy-grid">
//         <div>
//           <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "22px 24px", background: T.accentSoft, borderRadius: 10, border: `1px solid ${T.border}` }}>
//             <ShieldCheck size={22} color={T.accent} style={{ flexShrink: 0, marginTop: 2 }} />
//             <div>
//               <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: T.ink, fontSize: 18.5, margin: "0 0 8px 0" }}>
//                 Replacement only — no repairs
//               </p>
//               <p style={{ fontFamily: "'Lato', sans-serif", color: T.inkSoft, fontSize: 15.5, lineHeight: 1.6, margin: 0 }}>
//                 A confirmed defect is remedied with the same model, or a
//                 substantially equivalent one if discontinued. No cash refund,
//                 credit or partial refund is offered unless the law requires
//                 it. Replacements may be new or refurbished, and carry only
//                 the remaining time left on the original warranty.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div>
//           <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, color: T.ink, fontSize: 15.5, marginBottom: 16 }}>
//             Costs not reimbursed under this warranty
//           </p>
//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
//             {NOT_REIMBURSED.map((c) => (
//               <div key={c} style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.mutedFg, flexShrink: 0 }} />
//                 <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 14.5, color: T.mutedFg }}>{c}</span>
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


// /* ---------------------------------------------------------
//    App
// --------------------------------------------------------- */
// export default function App() {
//   return (
//     <div style={{ background: T.bg, minHeight: "100vh" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
//         * { box-sizing: border-box; }
//         @keyframes pulseDot {
//           0%, 100% { box-shadow: 0 0 0 4px ${T.accentSoft}; }
//           50% { box-shadow: 0 0 0 7px ${T.accentSoft}; }
//         }
//         .coverage-card:hover { background: ${T.secondary}; }
//         .coverage-grid { grid-template-columns: repeat(3, 1fr); }
//         @media (max-width: 900px) {
//           .coverage-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//         @media (max-width: 560px) {
//           .coverage-grid { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 760px) {
//           .remedy-grid { grid-template-columns: 1fr !important; }
//         }
//         @media (max-width: 640px) {
//           header .container-hero > div:nth-child(3) > div {
//             grid-template-columns: repeat(3, 1fr) !important;
//             row-gap: 20px;
//           }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation: none !important; transition: none !important; }
//         }
//       `}</style>
//       <Hero />
//       <CoverageGrid />
//       <CoveredToggle />
//       <Eligibility />
//       <ProcessSteps />
//       <RemedySection />

//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import {
  Cable,
  MonitorPlay,
  Plug,
  Infinity as InfinityIcon,
  RotateCcw,
  FileText,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  Package,
  Truck,
  Wrench,
  ClipboardCheck,
  ScanLine,
  ArrowRight,
  Home,
  BookOpen,
  ListChecks,
  Gavel,
  Clock,
  AlertCircle,
  ExternalLink,
  Menu,
  X,
  Hash,
} from 'lucide-react';

/* ---------------------------------------------------------
   Design tokens — refined for documentation style
--------------------------------------------------------- */
const T = {
  bg: '#fafafa',
  surface: '#ffffff',
  ink: '#0a0a0a',
  inkSoft: '#1a1a1a',
  muted: '#f4f4f5',
  mutedFg: '#71717a',
  border: '#e4e4e7',
  accent: '#dc2626',
  accentSoft: '#fef2f2',
  accentBorder: '#fecaca',
  shadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  shadowHover: '0 4px 12px rgba(0,0,0,0.07)',
};

/* ---------------------------------------------------------
   Data — from the policy document
--------------------------------------------------------- */
const CATEGORIES = [
  {
    icon: Cable,
    name: 'Professional AV Hardware',
    value: '3',
    unit: 'Years',
    note: 'Mixers, processors, switchers, rack hardware.',
  },
  {
    icon: MonitorPlay,
    name: 'Collaboration / BYOD / Conference',
    value: '2',
    unit: 'Years',
    note: 'Video bars, room kits, USB & huddle devices.',
  },
  {
    icon: Plug,
    name: 'Accessories, Adapters & Power',
    value: '—',
    unit: 'No warranty',
    note: 'Cables, adapters and power supplies.',
  },
  {
    icon: InfinityIcon,
    name: 'Passive Cables',
    value: '∞',
    unit: 'Lifetime',
    note: 'Manufacturing defects, for as long as you own it.',
  },
  {
    icon: RotateCcw,
    name: 'Refurbished / Demo / B-Stock',
    value: '1',
    unit: 'Year',
    note: 'Open-box, demonstration and B-stock units.',
  },
  {
    icon: FileText,
    name: 'Software, Firmware & Licenses',
    value: '—',
    unit: 'Separate terms',
    note: 'Governed by the applicable license agreement.',
  },
];

const COVERED = [
  'Defects in materials under normal, intended use',
  'Workmanship defects per product documentation',
  'Free replacement — same model or equivalent',
  'Return shipping on approved claims',
  'Remaining warranty period carries to the replacement',
];

const NOT_COVERED_GROUPS = [
  {
    title: 'Handling & installation',
    items: [
      'Improper, incorrect or unauthorized installation',
      'Misuse, abuse, negligence or improper handling',
      'Accidental or physical damage',
      'Failure to follow installation, operating or maintenance instructions',
      'Damage during transport after delivery to the customer',
    ],
  },
  {
    title: 'Environmental & electrical',
    items: [
      'Operation outside environmental, electrical or technical specifications',
      'Liquid, moisture, corrosion, fire, smoke or unsuitable conditions',
      'Lightning, surges, power fluctuations or unstable supply',
      'Incorrect voltage, polarity, wiring or grounding',
    ],
  },
  {
    title: 'Unauthorized service',
    items: [
      'Unauthorized modification, alteration, repair or tampering',
      'Products opened, disassembled or repaired by non-authorized parties',
      'Damage from accessories not approved by BeingAV',
    ],
  },
  {
    title: 'Sourcing & identification',
    items: [
      'Removed, altered, damaged or illegible serial numbers',
      'Products purchased from unauthorized dealers or resellers',
      'Normal wear and tear, or cosmetic damage that doesn\'t affect function',
    ],
  },
  {
    title: 'Compatibility & integration',
    items: [
      'Damage from third-party equipment, networks or connected devices',
      'Compatibility issues from third-party hardware or software changes',
      'Improper configuration, programming or system integration',
      'Firmware/software issues not caused by a hardware defect',
      'Obsolescence from changes in technology or infrastructure',
    ],
  },
];

const ELIGIBILITY = [
  'Product is within its applicable warranty period',
  'Purchased through BeingAV or an authorized sales channel',
  'Original proof of purchase can be provided on request',
  'Serial number is intact, legible and verifiable',
  'Issue is confirmed as a manufacturing or workmanship defect',
  'Product was used per BeingAV\'s documentation and specifications',
];

const STEPS = [
  {
    icon: Phone,
    title: 'Contact BeingAV',
    body: 'Reach BeingAV or the authorized partner you purchased from with your model and serial number.',
  },
  {
    icon: ScanLine,
    title: 'Diagnose the issue',
    body: 'Share photos, video or diagnostic results. Remote troubleshooting may be required first.',
  },
  {
    icon: ClipboardCheck,
    title: 'RMA issued',
    body: 'If eligible, BeingAV issues a Return Material Authorization. Never ship without one.',
  },
  {
    icon: Package,
    title: 'Return the product',
    body: 'Package securely, mark the RMA number clearly, and return within the specified window.',
  },
  {
    icon: Truck,
    title: 'Replacement ships',
    body: 'BeingAV inspects, confirms eligibility, and ships a replacement of equivalent function.',
  },
];

const NOT_REIMBURSED = [
  'Installation & reinstallation',
  'Removal of the defective unit',
  'Site visits & travel',
  'Configuration & programming',
  'System commissioning',
  'Downtime or business interruption',
  'Rental of alternative equipment',
  'Loss of revenue',
];

/* ---------------------------------------------------------
   Utility hook: scroll spy for active section
--------------------------------------------------------- */
function useScrollSpy(sectionIds: string[], offset = 80) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= offset && bottom > offset) {
            current = id;
            break;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}

/* ---------------------------------------------------------
   Section header component
--------------------------------------------------------- */
function SectionHeader({
  id,
  title,
  description,
}: {
  id?: string;
  title: string;
  description?: string;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#0a0a0a] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="font-sans text-[#71717a] text-base mt-2 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Hero — minimal documentation style
--------------------------------------------------------- */
function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <header className="border-b border-[#e4e4e7] bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 text-sm text-[#71717a] mb-2">
          <span className="font-mono text-xs font-bold text-[#dc2626] tracking-widest uppercase">
            Policy
          </span>
          <span className="h-px w-6 bg-[#e4e4e7]" />
          <span className="font-sans">Version 1.0 · Effective 01 Jan 2026</span>
        </div>
        <h1
          className="font-sans font-bold text-[#0a0a0a] text-3xl md:text-4xl lg:text-5xl tracking-tight"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          BeingAV Limited Warranty Policy
        </h1>
        <p
          className="font-sans text-[#71717a] text-lg max-w-2xl mt-3 leading-relaxed"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.8s ease 0.15s',
          }}
        >
          Every signal path we build, we stand behind.
        </p>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------
   Table of Contents — sticky sidebar with scrollspy
--------------------------------------------------------- */
function TableOfContents() {
  const sectionIds = [
    'coverage',
    'whats-covered',
    'eligibility',
    'process',
    'remedy',
    'contact',
  ];
  const activeId = useScrollSpy(sectionIds, 100);

  const sections = [
    { id: 'coverage', label: 'Warranty at a glance' },
    { id: 'whats-covered', label: "What's covered" },
    { id: 'eligibility', label: 'Eligibility requirements' },
    { id: 'process', label: 'The claim process' },
    { id: 'remedy', label: 'Warranty remedy' },
    { id: 'contact', label: 'Warranty support' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile TOC toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-white shadow-lg lg:hidden transition-transform hover:scale-105"
        aria-label="Table of contents"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile TOC drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setIsOpen(false)}>
          <div
            className="absolute bottom-20 left-4 right-4 rounded-xl bg-white p-5 shadow-xl border border-[#e4e4e7]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
              On this page
            </p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`block w-full text-left px-3 py-2 font-sans text-sm rounded-lg transition-colors ${
                    activeId === s.id
                      ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
                      : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop TOC */}
      <div className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
        <div className="bg-white rounded-xl border border-[#e4e4e7] p-4 shadow-sm">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-3">
            Contents
          </p>
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`block w-full text-left px-3 py-2 font-sans text-sm rounded-lg transition-colors ${
                  activeId === s.id
                    ? 'bg-[#fef2f2] text-[#dc2626] font-medium'
                    : 'text-[#0a0a0a] hover:bg-[#f4f4f5]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 opacity-50" />
                  {s.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
   Coverage Grid
--------------------------------------------------------- */
function CoverageGrid() {
  return (
    <section id="coverage" className="scroll-mt-20">
      <SectionHeader
        title="Warranty at a glance"
        description="Warranty length depends on product category. The period is fixed at purchase and does not restart on replacement."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          const isSpecial = i === CATEGORIES.length - 1;

          if (isSpecial) {
            return (
              <div
                key={c.name}
                className="relative overflow-hidden rounded-xl p-6 min-h-[180px]"
                style={{ background: '#0a0a0a' }}
              >
                <Icon className="h-5 w-5 text-[#dc2626]" />
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="font-sans text-4xl font-bold text-white">{c.value}</span>
                  <span className="font-sans text-sm font-semibold text-white/60">{c.unit}</span>
                </div>
                <p className="font-sans font-bold text-white text-base mt-3 mb-1">{c.name}</p>
                <p className="font-sans text-white/60 text-sm leading-relaxed">{c.note}</p>
              </div>
            );
          }

          return (
            <div
              key={c.name}
              className="rounded-xl border border-[#e4e4e7] bg-white p-6 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
            >
              <Icon className="h-5 w-5 text-[#dc2626]" />
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-sans text-4xl font-bold text-[#0a0a0a]">{c.value}</span>
                <span className="font-sans text-sm font-semibold text-[#71717a]">{c.unit}</span>
              </div>
              <p className="font-sans font-bold text-[#0a0a0a] text-base mt-3 mb-1">{c.name}</p>
              <p className="font-sans text-[#71717a] text-sm leading-relaxed">{c.note}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   What's Covered — Tabbed toggle
--------------------------------------------------------- */
function CoveredToggle() {
  const [tab, setTab] = useState<'covered' | 'excluded'>('covered');

  return (
    <section id="whats-covered" className="scroll-mt-20">
      <SectionHeader
        title="What's covered"
        description="Understand what falls under warranty protection and what does not."
      />

      <div className="mt-6">
        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-[#f4f4f5] p-1 w-fit mb-6">
          {[
            { key: 'covered', label: 'Covered', icon: CheckCircle2 },
            { key: 'excluded', label: 'Not covered', icon: XCircle },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-sans font-medium text-sm transition-all ${
                  active
                    ? 'bg-white shadow-sm text-[#0a0a0a]'
                    : 'text-[#71717a] hover:text-[#0a0a0a]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {tab === 'covered' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COVERED.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-[#e4e4e7] bg-white px-4 py-3.5"
              >
                <CheckCircle2 className="h-5 w-5 text-[#0a0a0a] shrink-0 mt-0.5" />
                <span className="font-sans text-[#1a1a1a] text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-[#e4e4e7] bg-white overflow-hidden divide-y divide-[#e4e4e7]">
            {NOT_COVERED_GROUPS.map((group) => (
              <details key={group.title} className="group">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-sans font-semibold text-[#0a0a0a] text-sm hover:bg-[#fafafa] transition-colors list-none">
                  {group.title}
                  <ChevronDown className="h-4 w-4 text-[#71717a] transition-transform group-open:rotate-180" />
                </summary>
                <ul className="px-5 pb-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-[#dc2626] shrink-0 mt-0.5" />
                      <span className="font-sans text-[#71717a] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Eligibility
--------------------------------------------------------- */
function Eligibility() {
  return (
    <section id="eligibility" className="scroll-mt-20">
      <SectionHeader
        title="Eligibility requirements"
        description="A warranty replacement is provided only where every condition below is met."
      />

      <div className="mt-6 rounded-xl border border-[#e4e4e7] bg-white overflow-hidden divide-y divide-[#e4e4e7]">
        {ELIGIBILITY.map((item, i) => (
          <div key={item} className="flex items-center gap-4 px-5 py-4">
            <span className="font-mono text-xs font-bold text-[#dc2626] w-6 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-sans text-[#1a1a1a] text-sm leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Process — Stepper with auto-advance
--------------------------------------------------------- */
function ProcessSteps() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="process" className="scroll-mt-20">
      <SectionHeader
        title="The claim process"
        description="Products must not be returned without a written RMA. Select a step to see what it involves."
      />

      <div className="mt-6">
        {/* Steps */}
        <div className="relative flex justify-between">
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-[#e4e4e7]" />

          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                className="relative flex flex-1 flex-col items-center gap-0 bg-transparent border-0 cursor-pointer px-1"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 z-10 ${
                    isActive
                      ? 'border-[#dc2626] bg-[#dc2626] scale-110'
                      : 'border-[#e4e4e7] bg-white'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      isActive ? 'text-white' : 'text-[#71717a]'
                    }`}
                  />
                </span>
                <span
                  className={`font-sans text-xs font-semibold text-center mt-2.5 leading-tight transition-colors ${
                    isActive ? 'text-[#0a0a0a]' : 'text-[#71717a]'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Description */}
        <div className="mt-8 rounded-xl border border-[#e4e4e7] bg-[#fafafa] p-5 flex items-start gap-3 transition-all">
          <ArrowRight className="h-5 w-5 text-[#dc2626] shrink-0 mt-0.5" />
          <p className="font-sans text-[#1a1a1a] text-sm leading-relaxed">
            {STEPS[active].body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Remedy
--------------------------------------------------------- */
function RemedySection() {
  return (
    <section id="remedy" className="scroll-mt-20">
      <SectionHeader
        title="Warranty remedy"
        description="What you get when a warranty claim is approved."
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-xl border border-[#e4e4e7] bg-[#fef2f2] p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 text-[#dc2626] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-bold text-[#0a0a0a] text-lg">
                Replacement only — no repairs
              </h3>
              <p className="font-sans text-[#1a1a1a] text-sm leading-relaxed mt-1">
                A confirmed defect is remedied with the same model, or a
                substantially equivalent one if discontinued. No cash refund,
                credit or partial refund is offered unless the law requires
                it. Replacements may be new or refurbished, and carry only
                the remaining time left on the original warranty.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-[#e4e4e7] bg-white p-6">
          <h4 className="font-sans font-bold text-[#0a0a0a] text-sm mb-4">
            Costs not reimbursed
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NOT_REIMBURSED.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#71717a] shrink-0" />
                <span className="font-sans text-[#71717a] text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Contact
--------------------------------------------------------- */
function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20">
      <SectionHeader
        title="Warranty support"
        description="For warranty claims, RMA requests or warranty-related inquiries."
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="mailto:support@beingav.com"
          className="flex items-center gap-4 rounded-xl border border-[#e4e4e7] bg-white px-5 py-4 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626]">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-[#0a0a0a]">Email</p>
            <p className="font-sans text-sm text-[#71717a]">support@beingav.com</p>
          </div>
        </a>

       
        <a
          href="https://www.beingav.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-xl border border-[#e4e4e7] bg-white px-5 py-4 transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2] text-[#dc2626]">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-[#0a0a0a]">Website</p>
            <p className="font-sans text-sm text-[#71717a]">www.beingav.com</p>
          </div>
        </a>
      </div>

      <p className="font-sans text-xs text-[#71717a] mt-6 text-center">
        Please provide the product model number and serial number when contacting BeingAV.
      </p>
    </section>
  );
}

/* ---------------------------------------------------------
   Main Page
--------------------------------------------------------- */
export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .font-sans { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', 'SF Mono', monospace; }
        details summary::-webkit-details-marker { display: none; }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-16">
            <CoverageGrid />
            <CoveredToggle />
            <Eligibility />
            <ProcessSteps />
            <RemedySection />
            <ContactSection />
          </div>

          {/* Sidebar TOC */}
          <TableOfContents />
        </div>
      </div>

      <footer className="border-t border-[#e4e4e7] bg-white py-6 text-center">
        <p className="font-sans text-xs text-[#71717a]">
          BeingAV Limited Warranty Policy — Version 1.0 · Effective 01 Jan 2026
        </p>
        <p className="font-sans text-xs text-[#71717a]/60 mt-1">
          This warranty provides additional rights and does not replace mandatory rights under applicable law.
        </p>
      </footer>
    </div>
  );
}