import Link from '@/components/RouterLink';
import Image from '@/components/Image';
import { api } from '@/lib/api';
import {
  fallbackBanners,
  fallbackBlogPosts,
  fallbackCaseStudies,
  fallbackCategories,
  fallbackProducts,
  fallbackTestimonials,
} from '@/lib/fallback-data';
import { HeroSlider } from '@/components/HeroSlider';
import { SectionHeading } from '@/components/SectionHeading';
import { ProductCard } from '@/components/ProductCard';
import { BlogCard } from '@/components/BlogCard';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { TestimonialSlider } from '@/components/TestimonialSlider';
import Presentation from '@/components/section/Presentation';
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Landmark,
  Hospital,
  Hotel,
  Radio,
  Monitor,
  Network,
  Cpu,
  Cable,
  Settings,
  Video,
  Boxes,

} from 'lucide-react';
import Banner from '@/components/section/Banner';
import CategoryBrowse from '@/components/CategoryBrowse';

export default async function HomePage() {
  const [bannersRes, categoriesRes, productsRes, blogRes, caseStudiesRes, testimonialsRes] =
    await Promise.all([
      api.getBanners(),
      api.getCategories(),
      api.getProducts({ limit: 8 }),
      api.getBlogPosts({}),
      api.getCaseStudies(),
      api.getTestimonials(),
    ]);

  const banners = bannersRes?.length ? bannersRes : '';
  const categories = categoriesRes?.length ? categoriesRes : '';
  const subCategories = categories.filter((cat) => cat.parentCategory);
  const parentCategories = categories.filter((cat) => !cat.parentCategory);
  // FIX: API returns { items, total, page, limit, totalPages } — not { data, pagination }
  const products = productsRes?.items?.length ? productsRes.items : fallbackProducts;
  // NOTE: assuming /public/blog follows the same { items, ... } convention as /public/products.
  // Verify against the real blog API response — revert to `.data` if it actually returns that shape.
  // const blogPosts = blogRes?.data?.length ? blogRes.data : fallbackBlogPosts;
  const blogPosts = blogRes?.items?.length ? blogRes.items : '';
  const caseStudies = caseStudiesRes?.length ? caseStudiesRes : '';
  const testimonials = testimonialsRes?.length ? testimonialsRes : '';
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const displayProducts = featuredProducts.length ? featuredProducts : products.slice(0, 4);

  // Static: product types BeingAV makes (marketing copy, not API data)
  const productTypes = [
    { icon: Network, title: 'AV over IP', desc: 'Network-based AV distribution over standard IP infrastructure.' },
    { icon: Monitor, title: 'Matrix Switchers', desc: 'Multi-input to multi-output routing with 4K/8K support.' },
    { icon: Cpu, title: 'Extenders & Splitters', desc: 'HDMI, HDBaseT, and fiber extenders for long-distance signal transport.' },
    { icon: Video, title: 'Conferencing Solutions', desc: 'USB, wireless, and appliance-based unified communications hardware.' },
    { icon: Settings, title: 'Control Systems', desc: 'Programmable control processors and touch panels for room automation.' },
    { icon: Cable, title: 'Cable & Connectivity', desc: 'Premium cables, adapters, and signal converters for reliable installs.' },
  ];



  const industries = [
  {
    icon: Building2,
    title: 'Corporate',
    desc: 'Meeting rooms, training rooms, and executive spaces.',
    image: 'https://3.imimg.com/data3/BJ/OK/MY-4404215/cooperate-office-interior.jpg',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'Smart classrooms, lecture halls, and hybrid learning.',
    image: 'https://ceeco.in/blog/wp-content/uploads/2024/07/Image-1-1-scaled.jpg',
  },
  {
    icon: Landmark,
    title: 'Government',
    desc: 'Command centers and secure government facilities.',
    image: 'https://www.advanosys.com/wp-content/uploads/2015/05/services-security-solutions-SECURITY-CONTROL-COMMAND-CENTER-1.jpg',
  },
  {
    icon: Hospital,
    title: 'Healthcare',
    desc: 'Medical AV, telemedicine, and digital signage.',
    image: 'https://resurgent.co.in/wp-content/themes/resurgent/assets/home/healthcare.webp',
  },
  {
    icon: Hotel,
    title: 'Hospitality',
    desc: 'Guest room entertainment and event venues.',
    image: 'https://content.jdmagicbox.com/comp/def_content/banquet-halls/banquet-halls-2-banquet-halls-15-iuu57.jpg',
  },
  {
    icon: Radio,
    title: 'Broadcast',
    desc: 'Production studios and broadcast facilities.',
    image: 'https://www.theswitch.tv/wp-content/uploads/the-switch-production-control-1156x650.jpg',
  },
];

  // Static: why choose BeingAV (marketing copy)
  const whyChoose = [
    {
      title: 'Pro AV Engineering',
      points: ['4K/8K video processing', 'Low-latency switching', 'HDCP 2.2/2.3 support'],
    },
    {
      title: 'Global Technical Support',
      points: ['Pre-sales consultation', 'Installation guidance', 'Post-installation support'],
    },
    {
      title: 'OEM/ODM Capabilities',
      points: ['Custom hardware design', 'Branded solutions', 'Firmware customization'],
    },
    {
      title: 'Manufacturing & Quality',
      points: ['ISO-certified facilities', 'Rigorous testing', 'CE, FCC, RoHS certified'],
    },
  ];

  // Showcase grid images (static marketing — real AV installation imagery)
  const showcaseImages = [
    { url: 'https://cdn.pixabay.com/photo/2015/07/02/09/52/meeting-room-828547_1280.jpg',label: 'Confrence Room'},
    { url: 'https://img.magnific.com/free-photo/rows-red-seats-theater_53876-64712.jpg?semt=ais_hybrid&w=740&q=80',
      label: 'Auditorium'
    },
    { url: 'https://cdn.pixabay.com/photo/2016/11/23/14/49/controls-1853330_1280.jpg',label: 'Control Room' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcX0YZAtX1FMTCwwXu6HuHuPKQ1nA5dxJWscCDQSmpFFDk0OITMrjgoM_Z&s=10', label: 'AV Distribution' },
    { url: 'https://static.vecteezy.com/system/resources/thumbnails/046/925/027/small/data-center-with-network-servers-yellow-cables-blinking-lights-high-connectivity-showing-modern-it-infrastructure-photo.jpg', label: 'Network Infrastructure' },
    { url: 'https://images.unsplash.com/photo-1550615511-c317ce7f1d03?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZpZGVvJTIwc3RyZWFtaW5nfGVufDB8fDB8fHww', label: 'Video Streaming' },
  ];

  return (
    <>
      <HeroSlider banners={banners} />

      {/* Product Types — what BeingAV makes */}
      {/* <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Make"
            title="Pro AV hardware for every signal path"
            description="From matrix switchers to AV over IP, BeingAV designs and manufactures the hardware that powers professional AV installations."
          />
          
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {productTypes.map((pt) => (
    // <div
    //   key={pt.title}
    //   className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
    // >
    <div
  key={pt.title}
  className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-2 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
        <pt.icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold text-foreground">{pt.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{pt.desc}</p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section> */}
         <CategoryBrowse/>
      {/* Featured Products — WyreStorm style with spec tags */}
     <section className="section-padding relative overflow-hidden bg-black">
  {/* Gradient blur background */}
  <div className="pointer-events-none absolute inset-0">
    {/* Red glow - top left */}
    <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-destructive/40 blur-[120px]" />
    {/* Red glow - bottom right */}
    <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-destructive/30 blur-[120px]" />
    {/* Subtle center glow for depth */}
    <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[150px]" />
    {/* Optional grid/noise overlay for texture */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
  </div>

  <div className="container-page relative z-10">
    <div className="flex items-end justify-between">
      <SectionHeading
        eyebrow="Featured Products"
        title="Engineered for performance"
        description="Pro AV hardware trusted by integrators worldwide."
        align="left"
          titleClassName="text-white"
      />
      <Link
        href="/products"
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all sm:inline-flex"
      >
        View all products
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {displayProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
</section>

    {/* Product Categories strip */}
{/* <section className="section-padding-sm bg-white">
  <div className="container-page">
    <SectionHeading
      eyebrow="Product Categories"
      title="Browse by category"
    />
   
    <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
  {parentCategories.map((cat) => (
    <Link
      key={cat._id}
      href={`/products/category/${cat.slug}`}
      className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-base font-medium text-foreground transition-all duration-300 hover:border-destructive hover:text-destructive hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
    >
      <Boxes className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-destructive" />
      {cat.name}
      <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100" />
    </Link>
  ))}
</div>
  </div>
</section> */}
     
      {/* Showcase / Installation gallery — WyreStorm style */}
    <section className="section-padding bg-gray-100">
  <div className="container-page">
    <SectionHeading
      title="AV systems in the field"
      description="Real-world deployments powered by BeingAV hardware — from boardrooms to broadcast studios."
    />
    <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
      {showcaseImages.map((img, i) => (
        <div
          key={i}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-red-500/60 bg-gray-800/20 shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 hover:border-red-400 hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
        >
          {/* Laser-scan lines (red shining) */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            <div className="absolute -top-[100%] left-0 h-[200%] w-[2px] rotate-12 bg-gradient-to-b from-transparent via-red-400/80 to-transparent blur-[1px] animate-laser-scan" />
            <div className="absolute -top-[100%] left-[30%] h-[200%] w-[1px] rotate-12 bg-gradient-to-b from-transparent via-red-400/50 to-transparent blur-[2px] animate-laser-scan animation-delay-500" />
            <div className="absolute -top-[100%] left-[70%] h-[200%] w-[1px] rotate-12 bg-gradient-to-b from-transparent via-red-400/40 to-transparent blur-[2px] animate-laser-scan animation-delay-1000" />
          </div>

          {/* Image */}
          <Image
            src={img.url}
            alt={img.label}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* 🔥 Greyish-red overlay — gives visible bg color */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 via-red-900/30 to-gray-800/50 mix-blend-multiply" />

          {/* Red radial glow behind image (for extra glow) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.2)_0%,transparent_70%)]" />

          {/* Shimmer overlay on hover */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Dark gradient at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Corner brackets */}
          <div className="absolute left-2 top-2 z-10 h-4 w-4 border-l-2 border-t-2 border-red-400/80" />
          <div className="absolute right-2 top-2 z-10 h-4 w-4 border-r-2 border-t-2 border-red-400/80" />
          <div className="absolute bottom-2 left-2 z-10 h-4 w-4 border-l-2 border-b-2 border-red-400/80" />
          <div className="absolute bottom-2 right-2 z-10 h-4 w-4 border-r-2 border-b-2 border-red-400/80" />

          {/* Label */}
          <div className="absolute bottom-0 left-0 z-10 p-4">
            <span className="text-sm font-semibold text-white drop-shadow-lg">
              {img.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>{`
    @keyframes laser-scan {
      0% { transform: translateY(-100%) rotate(12deg); }
      100% { transform: translateY(100%) rotate(12deg); }
    }
    .animate-laser-scan {
      animation: laser-scan 3s linear infinite;
    }
    .animation-delay-500 { animation-delay: 0.5s; }
    .animation-delay-1000 { animation-delay: 1s; }
  `}</style>
</section>
        
      {/* Industries */}
      {/* <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Solutions for every sector"
            description="From boardrooms to broadcast studios, BeingAV powers AV across industries."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
             
              <div
  key={ind.title}
  className="group rounded-lg border border-border bg-white p-6 transition-all duration-200 hover:border-red-800 hover:shadow-[0_20px_50px_-12px_rgba(153,27,27,0.45)]"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
    <ind.icon className="h-5 w-5" />
  </div>
  <h3 className="mt-4 font-bold text-foreground">{ind.title}</h3>
  <p className="mt-1.5 text-sm text-muted-foreground">{ind.desc}</p>
</div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="section-padding bg-white">
  <div className="container-page">
    <SectionHeading
      eyebrow="Industries We Serve"
      title="Solutions for every sector"
      description="From boardrooms to broadcast studios, BeingAV powers AV across industries."
    />
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind) => (
        <div key={ind.title} className="group h-56 [perspective:1000px]">
          <div
            className="relative h-full w-full rounded-lg transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col rounded-lg border border-border bg-white p-6 [backface-visibility:hidden]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-foreground">
                <ind.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">{ind.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{ind.desc}</p>
            </div>

            {/* Back — image, revealed on flip */}
            <div
              className="absolute inset-0 overflow-hidden rounded-lg border border-red-800 shadow-[0_20px_50px_-12px_rgba(153,27,27,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
            >
              <img
                src={ind.image}
                alt={ind.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <ind.icon className="h-5 w-5 text-white" />
                <h3 className="mt-1.5 font-bold text-white">{ind.title}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      
      {/* Why Choose BeingAV */}
      {/* <section className="section-padding bg-secondary/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why BeingAV"
            title="Built for integrators"
            description="We combine engineering excellence with a partner-first approach to deliver AV solutions integrators trust."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section> */}
        {/* Why Choose BeingAV — dark split section */}
<section className="relative overflow-hidden bg-[#0A0A0A]">
  {/* Grid background */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(220,38,38,0.15)_0%,transparent_60%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(220,38,38,0.08)_0%,transparent_50%)]" />
    
    {/* Grid lines */}
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(220,38,38,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(220,38,38,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    />
    
    {/* Horizontal accent glow */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
  </div>

  <div className="container-page relative grid grid-cols-1 items-center gap-0 lg:grid-cols-2">
    {/* Left: content */}
    <div className="py-16 pr-0 lg:py-24 lg:pr-16">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1 w-8 rounded-full bg-red-600" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-red-500">
          Why BeingAV
        </span>
      </div>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">
        Why Choose <span className="text-red-500">BeingAV</span>
      </h2>
      <p className="mt-6 text-base leading-relaxed text-white/70">
        BeingAV is a specialist manufacturer of Pro AV hardware, engineering
        signal distribution and control solutions trusted by integrators
        around the world.
      </p>
      <p className="mt-4 text-base leading-relaxed text-white/70">
        Backed by certified manufacturing and global technical support,
        BeingAV powers reliable AV deployments across corporate, education,
        government, healthcare, hospitality, and broadcast environments.
      </p>
      <Link
        href="/about"
        className="group mt-8 inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25"
      >
        Learn More About BeingAV
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>

    {/* Right: image with red glow border */}
    <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-[520px]">
      {/* Glow border */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-br from-red-600/30 via-transparent to-red-600/10 blur-sm" />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-600/20 via-transparent to-red-600/5" />
      
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <Image
          src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="BeingAV manufacturing facility"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Corner accents */}
      <div className="absolute -left-px -top-px h-8 w-8 border-l-2 border-t-2 border-red-500/60 rounded-tl-lg" />
      <div className="absolute -right-px -top-px h-8 w-8 border-r-2 border-t-2 border-red-500/60 rounded-tr-lg" />
      <div className="absolute -bottom-px -left-px h-8 w-8 border-l-2 border-b-2 border-red-500/60 rounded-bl-lg" />
      <div className="absolute -bottom-px -right-px h-8 w-8 border-r-2 border-b-2 border-red-500/60 rounded-br-lg" />
    </div>
  </div>
</section>
      {/* Case Studies — dynamic */}
      {/* <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow="Case Studies"
              title="Proven in the field"
              description="See how BeingAV solutions have transformed real-world AV deployments."
              align="left"
            />
            <Link
              href="/case-studies"
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all sm:inline-flex"
            >
              All case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {caseStudies.slice(0, 3).map((study) => (
    <div
      key={study._id}
      className="rounded-lg transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] hover:ring-2 hover:ring-destructive"
    >
      <CaseStudyCard study={study} />
    </div>
  ))}
</div>
        </div>
      </section> */}


      {/* Testimonials — dynamic */}
      <section className="section-padding bg-secondary/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="Testimonials"
            title="What our clients say"
            description="Trusted by integrators, consultants, and enterprises worldwide."
          />
          <div className="mt-12">
            <TestimonialSlider testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Latest Blog — dynamic */}
      {/* <section className="section-padding bg-white">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow="Latest Updates"
              title="From the BeingAV blog"
              description="Product news, guides, and industry insights."
              align="left"
            />
            <Link
              href="/blog"
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all sm:inline-flex"
            >
              View all posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {blogPosts.slice(0, 3).map((post) => (
    <div
      key={post._id}
      className="rounded-lg transition-all duration-300 hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] hover:ring-2 hover:ring-destructive"
    >
      <BlogCard post={post} />
    </div>
  ))}
</div>
        </div>
      </section> */}

      {/* CTA strip */}
<section className="relative overflow-hidden bg-black">
  {/* === BACKGROUND IMAGE (new) === */}
  <div
    className="absolute inset-0 bg-contain bg-center"
    style={{
      backgroundImage: "url('/images/cta.jpeg')",
    }}
  />

  {/* Semi‑transparent dark overlay – image ko dark kar ke contrast improve karta hai */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Original gradient overlay (abhi light hai, image ke upar layered) */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-destructive/20 to-black/80" />

  {/* Radial glow blobs – image ke upar hi rahenge */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full bg-destructive/40 blur-[130px]" />
    <div className="absolute -bottom-32 right-1/4 h-[450px] w-[450px] rounded-full bg-destructive/30 blur-[140px]" />
    <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/20 blur-[160px]" />
  </div>

  {/* Grid texture overlay */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.07]"
    style={{
      backgroundImage:
        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />

  {/* Noise/grain texture */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(/images/cta.jpeg)",
    }}
  />

  {/* Vignette for depth */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />

  {/* Content */}
  <div className="container-page relative z-10 py-20 text-center">
    <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
      Planning a new AV project? Let&apos;s Connect.
    </h2>
    <p className="mx-auto mt-4 max-w-xl text-white/70">
      Our team is ready to help you design, deploy, and support your next AV installation.
    </p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 rounded-md bg-destructive px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-destructive/30 transition-all hover:bg-destructive/90 hover:shadow-destructive/50"
      >
        Request a Quote
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/40"
      >
        Browse Products
      </Link>
    </div>
  </div>
</section>
    </>
  );
}
