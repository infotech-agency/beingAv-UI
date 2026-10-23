import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import '@/src/styles/globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { AsyncPage } from '@/components/AsyncPage';
import Home from '@/src/pages/HomePage';
import About from '@/src/pages/AboutPage';
import Blog from '@/src/pages/blog/BlogPage';
import BlogPost, { getPageMetadata as getBlogPostMetadata } from '@/src/pages/blog/BlogPostPage';
import CaseStudies from '@/src/pages/case-studies/CaseStudiesPage';
import CaseStudy, { getPageMetadata as getCaseStudyMetadata } from '@/src/pages/case-studies/CaseStudyPage';
import Contact from '@/src/pages/ContactPage';
import Faqs from '@/src/pages/FaqsPage';
import Products from '@/src/pages/products/ProductsPage';
import Product, { getPageMetadata as getProductMetadata } from '@/src/pages/products/ProductPage';
import Category, { getPageMetadata as getCategoryMetadata } from '@/src/pages/products/category/CategoryPage';
import Resources from '@/src/pages/ResourcesPage';
import Services from '@/src/pages/services/ServicesPage';
import Service, { getPageMetadata as getServiceMetadata } from '@/src/pages/services/ServicePage';
import type { Metadata } from '@/types/metadata';
import { ScrollToTop } from '@/components/ScrollTop';
import Warranty from "@/src/pages/warranty/WarrantyPage";

const pageSeo: Record<string, { title: string; description: string }> = {
  '/': { title: 'BeingAV — Professional AV & Collaboration Solutions', description: 'BeingAV is a premium Pro AV & Unified Communications hardware brand. Explore our range of matrix switchers, video conferencing, audio processing, and control systems.' },
  '/about': { title: 'About BeingAV — Pro AV & Unified Communications', description: 'BeingAV is a premium Pro AV & Unified Communications hardware brand, connecting people with technology.' },
  '/blog': { title: 'Blog — Pro AV Insights & News', description: 'Guides, product news, and industry insights from the BeingAV team.' },
  '/case-studies': { title: 'Case Studies — Pro AV Success Stories', description: 'See how BeingAV solutions have transformed real-world AV deployments across industries.' },
  '/contact': { title: 'Contact BeingAV', description: 'Get in touch with BeingAV for product inquiries, quotes, and support.' },
  '/faqs': { title: 'FAQs — Frequently Asked Questions', description: 'Find answers to common questions about BeingAV products, services, and support.' },
  '/products': { title: 'Products — Pro AV & Collaboration Hardware', description: 'Browse the full range of BeingAV Pro AV products: matrix switchers, video conferencing, audio processing, control systems, and more.' },
  '/resources': { title: 'Resources — Downloads, Datasheets & Manuals', description: 'Access product datasheets, user manuals, and brochures for BeingAV products.' },
  '/services': { title: 'Services — AV Design, Installation & Support', description: 'From system design to installation and ongoing support, BeingAV provides end-to-end services for Pro AV deployments.' },
};

// function Dynamic({ component, getMetadata }: { component: (props: { params: { slug: string } }) => Promise<React.ReactNode>; getMetadata?: (props: { params: { slug: string } }) => Promise<Metadata> }) {
//   const { slug = '' } = useParams();
//   return <AsyncPage component={component} getMetadata={getMetadata} props={{ params: { slug } }} />;
// }

function Dynamic({ component, getMetadata }: { component: (props: { params: { slug: string }; searchParams?: Record<string, string> }) => Promise<React.ReactNode>; getMetadata?: (props: { params: { slug: string }; searchParams?: Record<string, string> }) => Promise<Metadata> }) {
  const { slug = '' } = useParams();
  const { search } = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(search));
  return <AsyncPage component={component} getMetadata={getMetadata} props={{ params: { slug }, searchParams }} />;
}

function QueryPage({ component }: { component: (props: { searchParams: Record<string, string> }) => Promise<React.ReactNode> }) {
  const { search } = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(search));
  return <AsyncPage component={component} props={{ searchParams }} />;
}

function App() {
  const { pathname } = useLocation();
  const seo = pageSeo[pathname] || pageSeo['/'];
  return <>
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={`https://beingav.com${pathname}`} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content="https://beingav.com/images/logo.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content="https://beingav.com/images/logo.png" />
    </Helmet>
     <ScrollToTop />
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar /><Navbar /><main className="flex-1"><Routes>
        <Route path="/" element={<AsyncPage component={Home} props={{}} />} />
        <Route path="/about" element={<About />} />
         <Route path="/warranty" element={<Warranty />} />
        <Route path="/blog" element={<QueryPage component={Blog} />} />
        <Route path="/blog/:slug" element={<Dynamic component={BlogPost} getMetadata={getBlogPostMetadata} />} />
        <Route path="/case-studies" element={<AsyncPage component={CaseStudies} props={{}} />} />
        <Route path="/case-studies/:slug" element={<Dynamic component={CaseStudy} getMetadata={getCaseStudyMetadata} />} />
        <Route path="/contact" element={<AsyncPage component={Contact} props={{}} />} />
        <Route path="/faqs" element={<AsyncPage component={Faqs} props={{}} />} />
        <Route path="/products" element={<QueryPage component={Products} />} />
        <Route path="/products/category/:slug" element={<Dynamic component={Category} getMetadata={getCategoryMetadata} />} />
        <Route path="/products/:slug" element={<Dynamic component={Product} getMetadata={getProductMetadata} />} />
        <Route path="/resources" element={<AsyncPage component={Resources} props={{}} />} />
        <Route path="/services" element={<AsyncPage component={Services} props={{}} />} />
        <Route path="/services/:slug" element={<Dynamic component={Service} getMetadata={getServiceMetadata} />} />
        <Route path="*" element={<section className="container-page section-padding"><h1 className="text-3xl font-bold">Page not found</h1></section>} />
      </Routes></main><Footer />
    </div>
  </>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><HelmetProvider><BrowserRouter><App /></BrowserRouter></HelmetProvider></React.StrictMode>);
