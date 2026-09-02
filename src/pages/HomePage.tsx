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

  const banners = bannersRes?.length ? bannersRes : fallbackBanners;
  const categories = categoriesRes?.length ? categoriesRes : fallbackCategories;
  const subCategories = categories.filter((cat) => cat.parentCategory);
  const parentCategories = categories.filter((cat) => !cat.parentCategory);
  // FIX: API returns { items, total, page, limit, totalPages } — not { data, pagination }
  const products = productsRes?.items?.length ? productsRes.items : fallbackProducts;
  // NOTE: assuming /public/blog follows the same { items, ... } convention as /public/products.
  // Verify against the real blog API response — revert to `.data` if it actually returns that shape.
  // const blogPosts = blogRes?.data?.length ? blogRes.data : fallbackBlogPosts;
  const blogPosts = blogRes?.items?.length ? blogRes.items : fallbackBlogPosts;
  const caseStudies = caseStudiesRes?.length ? caseStudiesRes : fallbackCaseStudies;
  const testimonials = testimonialsRes?.length ? testimonialsRes : fallbackTestimonials;
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
    { url: 'https://azcorporateinteriors.com/wp-content/uploads/6-Conference-And-Meeting-Room-Styles-1024x683.jpg',label: 'Confrence Room'},
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVqAB8RzdRKpvqsOvWi9b7MNqY558uBbfP0p5y85XJuvulXNU_x5Ge2XM&s=10',
      label: 'Auditorium'
    },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2oMwJzMdsl6N-DIVO_32cJuAAnlHPEH8dAcSprvwsSmAduacet7nkfBc&s=10',label: 'Control Room' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcX0YZAtX1FMTCwwXu6HuHuPKQ1nA5dxJWscCDQSmpFFDk0OITMrjgoM_Z&s=10', label: 'AV Distribution' },
    { url: 'https://static.vecteezy.com/system/resources/thumbnails/046/925/027/small/data-center-with-network-servers-yellow-cables-blinking-lights-high-connectivity-showing-modern-it-infrastructure-photo.jpg', label: 'Network Infrastructure' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27RttSgbqEetQPNhlkB5rPJEnS6eq3GHXN0w3l0ax9Z0OBhOpuhM5nJU&s=10', label: 'Video Streaming' },
  ];

  return (
    <>
      <HeroSlider banners={banners} />

      {/* Product Types — what BeingAV makes */}
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading
            eyebrow="What We Make"
            title="Pro AV hardware for every signal path"
            description="From matrix switchers to AV over IP, BeingAV designs and manufactures the hardware that powers professional AV installations."
          />
          {/* <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((pt) => (
             
              <div
  key={pt.title}
  className="group relative flex items-start gap-4 bg-white p-6 transition-all duration-300 hover:z-10 hover:bg-secondary/40 hover:ring-2 hover:ring-destructive hover:shadow-lg hover:shadow-destructive/30"
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
          </div> */}
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
      </section>

      {/* Featured Products — WyreStorm style with spec tags */}
      <section className="section-padding bg-secondary/30">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow="Featured Products"
              title="Engineered for performance"
              description="Pro AV hardware trusted by integrators worldwide."
              align="left"
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
<section className="section-padding-sm bg-white">
  <div className="container-page">
    <SectionHeading
      eyebrow="Product Categories"
      title="Browse by category"
    />
    {/* <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((cat) => (
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
    </div> */}
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
</section>

      {/* Showcase / Installation gallery — WyreStorm style */}
      <section className="section-padding bg-secondary/30">
        <div className="container-page">
          <SectionHeading
            // eyebrow="Installations"
            title="AV systems in the field"
            description="Real-world deployments powered by BeingAV hardware — from boardrooms to broadcast studios."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
            {showcaseImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={img.url}
                  alt={img.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="text-sm font-semibold text-white">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
<section className="bg-[#0A0A0A]">
  <div className="container-page grid grid-cols-1 items-center gap-0 lg:grid-cols-2 p-6">
    {/* Left: content */}
    <div className="py-16 pr-0 lg:py-24 lg:pr-16">
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">
        Why Choose BeingAV
      </h2>
      <p className="mt-6 text-base leading-relaxed text-white/70">
        BeingAV is a specialist manufacturer of Pro AV hardware, engineering
        signal distribution and control solutions trusted by integrators
        around the world.
      </p>
      <p className="mt-4 text-base leading-relaxed text-white/70">
        Backed by ISO-certified manufacturing and global technical support,
        BeingAV powers reliable AV deployments across corporate, education,
        government, healthcare, hospitality, and broadcast environments.
      </p>
      <Link
        href="/about"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-red-600 hover:text-white"
      >
        Learn More About BeingAV
      </Link>
    </div>

    {/* Right: image */}
    <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-[520px]">
      <Image
        src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt="BeingAV manufacturing facility"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
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
      <section className="bg-destructive">
        <div className="container-page py-16 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
            Planning a new AV project? Let&apos;s talk.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Our team is ready to help you design, deploy, and support your next AV installation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-destructive shadow-lg transition-all hover:bg-white/90"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
