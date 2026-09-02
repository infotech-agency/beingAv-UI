// // import type { Metadata } from '@/types/metadata';
// // import { SectionHeading } from '@/components/SectionHeading';
// // import {
// //   Cpu,
// //   ShieldCheck,
// //   Globe2,
// //   Factory,
// //   Target,
// //   Eye,
// //   Heart,
// //   Award,
// //   Wrench,
// //   Users,
// // } from 'lucide-react';

// // export const metadata: Metadata = {
// //   title: 'About BeingAV — Pro AV & Unified Communications',
// //   description:
// //     'BeingAV is a premium Pro AV & Unified Communications hardware brand, connecting people with technology.',
// // };

// // const values = [
// //   { icon: Target, title: 'Mission', desc: 'To deliver premium Pro AV hardware that empowers integrators and enterprises to connect, collaborate, and communicate seamlessly.' },
// //   { icon: Eye, title: 'Vision', desc: 'To be the most trusted Pro AV brand worldwide, known for engineering excellence and customer-first support.' },
// //   { icon: Heart, title: 'Values', desc: 'Quality, reliability, and partnership. We build long-term relationships with our integrators and clients.' },
// // ];

// // const whyChoose = [
// //   { icon: Cpu, title: 'Premium Pro AV Engineering', desc: 'Products designed and tested to professional standards, supporting the latest video and audio formats.' },
// //   { icon: Globe2, title: 'Global Technical Support', desc: 'Pre-sales consultation, installation guidance, and post-installation support across the world.' },
// //   { icon: Award, title: 'OEM/ODM Capabilities', desc: 'Custom hardware design, branded solutions, and firmware customization for partners.' },
// //   { icon: Factory, title: 'Manufacturing & Quality', desc: 'ISO-certified facilities with rigorous testing. CE, FCC, and RoHS certified products.' },
// // ];

// // export default function AboutPage() {
// //   return (
// //     <>
// //       <section className="border-b border-border bg-secondary/30">
// //         <div className="container-page py-16">
// //           <div className="max-w-3xl">
// //             <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
// //               Connecting with Technology
// //             </h1>
// //             <p className="mt-4 text-lg text-muted-foreground">
// //               BeingAV is a premium Pro AV & Unified Communications hardware brand, serving system integrators, consultants, and enterprises worldwide.
// //             </p>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="w-full bg-black">
// //   <img
// //     src="/images/about-banner.png"
// //     alt="BeingAV — About Us Banner"
// //     className="w-full h-auto"
// //     width={1920}
// //     height={500}
// //   />
// // </section>

// //       <section className="section-padding bg-white">
// //         <div className="container-page">
// //           <div className="mx-auto max-w-3xl">
// //             <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
// //             <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
// //               <p>
// //                 BeingAV designs, manufactures, and distributes professional AV hardware for corporate, education, government, hospitality, healthcare, and broadcast environments. Our product range includes matrix switchers, distribution amplifiers, extenders, video conferencing solutions, audio processors, control systems, and more.
// //               </p>
// //               <p>
// //                 We partner with system integrators and consultants to deliver reliable, high-performance AV solutions — from huddle rooms to auditoriums, from classrooms to command centers. Every product is engineered for 24/7 operation and backed by global technical support.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <section className="section-padding bg-secondary/30">
// //         <div className="container-page">
// //           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
// //             {values.map((v) => (
// //               <div
// //                 key={v.title}
// //                 className="rounded-lg border border-border bg-white p-8 shadow-sm"
// //               >
// //                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
// //                   <v.icon className="h-6 w-6" />
// //                 </div>
// //                 <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
// //                 <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <section className="section-padding bg-white">
// //         <div className="container-page">
// //           <SectionHeading
// //             eyebrow="Why BeingAV"
// //             title="What sets us apart"
// //             description="We combine engineering excellence with a partner-first approach."
// //           />
// //           <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
// //             {whyChoose.map((item) => (
// //               <div
// //                 key={item.title}
// //                 className="rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
// //               >
// //                 <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground">
// //                   <item.icon className="h-5 w-5" />
// //                 </div>
// //                 <h3 className="mt-4 font-bold text-foreground">{item.title}</h3>
// //                 <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       <section className="section-padding bg-secondary/30">
// //         <div className="container-page">
// //           <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
// //             <div>
// //               <div className="flex items-center gap-2">
// //                 <Wrench className="h-5 w-5 text-destructive" />
// //                 <h2 className="text-2xl font-bold text-foreground">Manufacturing & Quality Commitment</h2>
// //               </div>
// //               <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
// //                 <p>
// //                   Our products are manufactured in ISO-certified facilities with rigorous quality control at every stage — from PCB assembly to final product testing.
// //                 </p>
// //                 <p>
// //                   Every product undergoes burn-in testing, signal integrity verification, and environmental testing before it ships. Our commitment to quality is backed by industry-standard certifications including CE, FCC, and RoHS.
// //                 </p>
// //               </div>
// //             </div>
// //             <div>
// //               <div className="flex items-center gap-2">
// //                 <Users className="h-5 w-5 text-destructive" />
// //                 <h2 className="text-2xl font-bold text-foreground">Partner-First Approach</h2>
// //               </div>
// //               <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
// //                 <p>
// //                   We work closely with system integrators, consultants, and enterprise IT teams. From pre-sales design consultation to post-installation support, we are with you at every step.
// //                 </p>
// //                 <p>
// //                   Our OEM/ODM services allow partners to customize hardware, firmware, and branding — delivering tailored solutions under your own brand identity.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // }

// import type { Metadata } from '@/types/metadata';
// import { SectionHeading } from '@/components/SectionHeading';
// import Image from '@/components/Image';
// import {
//   Cpu,
//   ShieldCheck,
//   Globe2,
//   Factory,
//   Target,
//   Eye,
//   Heart,
//   Award,
// } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'About BeingAV — Pro AV & Unified Communications',
//   description:
//     'BeingAV is a premium Pro AV & Unified Communications hardware brand, connecting people with technology.',
// };

// const values = [
//   { icon: Target, title: 'Mission', desc: 'To deliver premium Pro AV hardware that empowers integrators and enterprises to connect, collaborate, and communicate seamlessly.' },
//   { icon: Eye, title: 'Vision', desc: 'To be the most trusted Pro AV brand worldwide, known for engineering excellence and customer-first support.' },
//   { icon: Heart, title: 'Values', desc: 'Quality, reliability, and partnership. We build long-term relationships with our integrators and clients.' },
// ];

// const whyChoose = [
//   { icon: Cpu, title: 'Premium Pro AV Engineering', desc: 'Products designed and tested to professional standards, supporting the latest video and audio formats.' },
//   { icon: Globe2, title: 'Global Technical Support', desc: 'Pre-sales consultation, installation guidance, and post-installation support across the world.' },
//   { icon: Award, title: 'OEM/ODM Capabilities', desc: 'Custom hardware design, branded solutions, and firmware customization for partners.' },
//   { icon: Factory, title: 'Manufacturing & Quality', desc: 'ISO-certified facilities with rigorous testing. CE, FCC, and RoHS certified products.' },
// ];

// export default function AboutPage() {
//   return (
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-16">
//           <div className="max-w-3xl">
//             <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
//               Connecting with Technology
//             </h1>
//             <p className="mt-4 text-lg text-muted-foreground">
//               BeingAV is a premium Pro AV & Unified Communications hardware brand, serving system integrators, consultants, and enterprises worldwide.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="w-full bg-black">
//         <img
//           src="/images/about-banner.png"
//           alt="BeingAV — About Us Banner"
//           className="w-full h-auto"
//           width={1920}
//           height={500}
//         />
//       </section>

//       <section className="section-padding bg-white">
//         <div className="container-page">
//           <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
//             <div>
//               <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
//               <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed">
//                 <p>
//                   BeingAV designs, manufactures, and distributes professional AV hardware for corporate, education, government, hospitality, healthcare, and broadcast environments. Our product range includes matrix switchers, distribution amplifiers, extenders, video conferencing solutions, audio processors, control systems, and more.
//                 </p>
//                 <p>
//                   We partner with system integrators and consultants to deliver reliable, high-performance AV solutions — from huddle rooms to auditoriums, from classrooms to command centers. Every product is engineered for 24/7 operation and backed by global technical support.
//                 </p>
//               </div>
//             </div>
//             <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-secondary">
//               <Image
//                 src="/images/about-us.jpg"
//                 alt="BeingAV manufacturing and engineering facility"
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 objectFit="cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="section-padding bg-secondary/30">
//         <div className="container-page">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//             {values.map((v) => (
//               <div
//                 key={v.title}
//                 className="rounded-lg border border-border bg-white p-8 shadow-sm"
//               >
//                 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//                   <v.icon className="h-6 w-6" />
//                 </div>
//                 <h3 className="mt-4 text-lg font-bold text-foreground">{v.title}</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="section-padding bg-white">
//         <div className="container-page">
//           <SectionHeading
//             eyebrow="Why BeingAV"
//             title="What sets us apart"
//             description="We combine engineering excellence with a partner-first approach."
//           />
//           <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {whyChoose.map((item) => (
//               <div
//                 key={item.title}
//                 className="rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
//               >
//                 <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground">
//                   <item.icon className="h-5 w-5" />
//                 </div>
//                 <h3 className="mt-4 font-bold text-foreground">{item.title}</h3>
//                 <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from '@/types/metadata';
import { SectionHeading } from '@/components/SectionHeading';
import Image from '@/components/Image';
import {
  Cpu,
  ShieldCheck,
  Globe2,
  Factory,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Building2,
  Video,
  MonitorSmartphone,
  Speaker,
  Network,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Clock,
  Headphones,
  Star,
  Briefcase,
  Layout,
  Smartphone,
  Tablet,
  Laptop,
  Radio,
  Microphone,
  Camera,
  Share2,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const metadata: Metadata = {
  title: 'About BeingAV — Professional AV Solutions',
  description:
    'BeingAV is a USA-headquartered professional audiovisual solutions company dedicated to transforming the way people communicate, collaborate, present, and connect.',
};

// ------------------------------------------------------------
// Data from the provided content
// ------------------------------------------------------------
const values = [
  {
    icon: Target,
    title: 'Mission',
    desc: 'To deliver premium Pro AV hardware that empowers integrators and enterprises to connect, collaborate, and communicate seamlessly.',
  },
  {
    icon: Eye,
    title: 'Vision',
    desc: 'To be the most trusted Pro AV brand worldwide, known for engineering excellence and customer-first support.',
  },
  {
    icon: Heart,
    title: 'Values',
    desc: 'Quality, reliability, and partnership. We build long-term relationships with our integrators and clients.',
  },
];

const whyChoose = [
  {
    icon: Cpu,
    title: 'Premium Pro AV Engineering',
    desc: 'Products designed and tested to professional standards, supporting the latest video and audio formats.',
  },
  {
    icon: Globe2,
    title: 'Global Technical Support',
    desc: 'Pre-sales consultation, installation guidance, and post-installation support across the world.',
  },
  {
    icon: Award,
    title: 'OEM/ODM Capabilities',
    desc: 'Custom hardware design, branded solutions, and firmware customization for partners.',
  },
  {
    icon: Factory,
    title: 'Manufacturing & Quality',
    desc: 'ISO-certified facilities with rigorous testing. CE, FCC, and RoHS certified products.',
  },
];

const whatWeDo = [
  { icon: Video, label: 'Video Conferencing & Collaboration' },
  { icon: MonitorSmartphone, label: 'Wireless Presentation & Collaboration' },
  { icon: Share2, label: 'AV Switching & Signal Management' },
  { icon: Layout, label: 'Huddle Room Solutions' },
  { icon: Building2, label: 'Meeting & Conference Room Solutions' },
  { icon: Briefcase, label: 'Boardroom & Executive Room Solutions' },
  { icon: Users, label: 'Classroom & Training Room AV' },
  { icon: Speaker, label: 'Auditorium & Large Venue Solutions' },
  { icon: Layers, label: 'Integrated Professional AV Systems' },
  { icon: Sparkles, label: 'Custom AV Solutions' },
];

// Philosophy points from the text
const philosophyPoints = [
  'Professional AV should make things easier — not more complicated',
  'Solutions are built around real-world challenges',
  'We look beyond individual devices to understand how the entire system works together',
];

// ------------------------------------------------------------
// Scroll animation hook
// ------------------------------------------------------------
function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return { ref, isVisible };
}

// ------------------------------------------------------------
// Reusable animated section wrapper
// ------------------------------------------------------------
function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ------------------------------------------------------------
// Main Page Component
// ------------------------------------------------------------
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        {/* Animated gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/10 via-transparent to-transparent animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

        <div className="relative container-page py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626] animate-pulse" />
              About BeingAV
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
              Connecting People
              <br />
              <span className="bg-gradient-to-r from-[#dc2626] to-[#ef4444] bg-clip-text text-transparent">
                with Technology
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed sm:text-xl">
              BeingAV is a USA-headquartered professional audiovisual solutions
              company dedicated to transforming the way people communicate,
              collaborate, present, and connect.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 rounded-lg bg-[#dc2626] px-6 py-3 font-semibold text-white transition-all hover:bg-[#dc2626]/90 hover:scale-105"
              >
                Our Philosophy
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#what-we-do"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                What We Do
              </a>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute right-10 top-20 hidden text-[#dc2626]/20 lg:block">
          <Cpu className="h-32 w-32" strokeWidth={0.5} />
        </div>
        <div className="absolute bottom-10 left-10 hidden text-[#dc2626]/10 lg:block">
          <Network className="h-40 w-40" strokeWidth={0.5} />
        </div>
      </section>

      {/* ---------- Who We Are ---------- */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <AnimatedSection>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#dc2626]">
                  Who We Are
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[#0a0a0a] sm:text-4xl">
                  Professional AV, Purposefully Designed
                </h2>
                <div className="mt-6 space-y-4 text-[#1a1a1a]/80 leading-relaxed">
                  <p>
                    BeingAV designs, manufactures, and distributes professional
                    AV hardware for corporate, education, government,
                    hospitality, healthcare, and broadcast environments. Our
                    product range includes matrix switchers, distribution
                    amplifiers, extenders, video conferencing solutions, audio
                    processors, control systems, and more.
                  </p>
                  <p>
                    We partner with system integrators and consultants to
                    deliver reliable, high-performance AV solutions — from
                    huddle rooms to auditoriums, from classrooms to command
                    centers. Every product is engineered for 24/7 operation and
                    backed by global technical support.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0a0a0a]">
                    <CheckCircle className="h-5 w-5 text-[#dc2626]" />
                    ISO-certified facilities
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0a0a0a]">
                    <CheckCircle className="h-5 w-5 text-[#dc2626]" />
                    Global support network
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#0a0a0a]">
                    <CheckCircle className="h-5 w-5 text-[#dc2626]" />
                    24/7 engineered
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e4e4e7] bg-[#f4f4f5] shadow-lg">
                <Image
                  src="/images/about-us.jpg"
                  alt="BeingAV manufacturing and engineering facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  objectFit="cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section id="philosophy" className="section-padding bg-[#fafafa]">
        <div className="container-page">
          <AnimatedSection>
            <div className="mx-auto max-w-4xl text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#dc2626]">
                Our Philosophy
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#0a0a0a] sm:text-4xl">
                We don’t start with a product — we start with a problem.
              </h2>
              <p className="mt-4 text-lg text-[#1a1a1a]/70 leading-relaxed">
                Every space has different requirements. Every organization has
                different workflows. We focus on understanding what our
                customers actually need and developing solutions around those
                needs.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {philosophyPoints.map((point, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-[#e4e4e7] bg-white p-6 text-center transition-all hover:border-[#dc2626]/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626]/10 text-[#dc2626] transition-all group-hover:bg-[#dc2626] group-hover:text-white">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-[#0a0a0a] leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Mission, Vision, Values ---------- */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <AnimatedSection>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="group rounded-2xl border border-[#e4e4e7] bg-white p-8 transition-all hover:border-[#dc2626]/30 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#dc2626]/10 text-[#dc2626] transition-all group-hover:bg-[#dc2626] group-hover:text-white">
                    <v.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#0a0a0a]">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#1a1a1a]/70 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- What We Do ---------- */}
      <section id="what-we-do" className="section-padding bg-[#fafafa]">
        <div className="container-page">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Do"
              title="Comprehensive AV Solutions"
              description="From a single collaboration space to a complex multi-room AV environment, we bring the technology together into one purposeful solution."
            />

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {whatWeDo.map((item) => (
                <div
                  key={item.label}
                  className="group flex flex-col items-center rounded-xl border border-[#e4e4e7] bg-white p-6 text-center transition-all hover:border-[#dc2626]/30 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626]/10 text-[#dc2626] transition-all group-hover:bg-[#dc2626] group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-sm font-medium text-[#0a0a0a] leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Why Choose BeingAV ---------- */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Choose BeingAV"
              title="More Than Technology. A Better AV Experience."
              description="Choosing an AV partner should be about more than comparing specifications and prices. The right partner should understand why you need the technology, how your people will use it, and what success should look like."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyChoose.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white p-6 transition-all hover:border-[#dc2626]/30 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#dc2626]/5 transition-all group-hover:bg-[#dc2626]/10" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f4f5] text-[#0a0a0a] transition-all group-hover:bg-[#dc2626] group-hover:text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0a0a0a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#1a1a1a]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Extra feature list from the provided text */}
            <div className="mt-16 rounded-2xl border border-[#e4e4e7] bg-[#fafafa] p-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  'We listen before we recommend',
                  'We design around the requirement',
                  'We think beyond individual products',
                  'We prioritize usability',
                  'We build for reliability',
                  'We design with the future in mind',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-[#dc2626] mt-0.5" />
                    <span className="text-sm font-medium text-[#0a0a0a]">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Commitment / Footer CTA ---------- */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#dc2626]/10 via-transparent to-transparent" />
        <div className="container-page relative py-16 text-center md:py-20">
          <AnimatedSection>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Professional AV. <span className="text-[#dc2626]">Purposefully Designed.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70 text-lg leading-relaxed">
              We combine professional AV technology with a problem-solving
              mindset to create solutions that work for people, spaces, and
              organizations.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#dc2626] px-8 py-3 font-semibold text-white transition-all hover:bg-[#dc2626]/90 hover:scale-105"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-8 py-3 font-semibold text-white transition-all hover:bg-white/10 hover:scale-105"
              >
                Explore Products
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ---------- Styles for extra animations ---------- */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        .hover\\:scale-103:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}