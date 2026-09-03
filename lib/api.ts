// import type {
//   AnnouncementBar,
//   Banner,
//   BlogCategory,
//   BlogListResponse,
//   BlogPost,
//   CaseStudy,
//   Category,
//   ContactInfo,
//   Faq,
//   Product,
//   ProductListResponse,
//   Service,
//   Testimonial,
// } from '@/types';

// export const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || 'https://mediumvioletred-lobster-308070.hostingersite.com/api';

// // async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
// //   try {
// //     const res = await fetch(`${API_BASE_URL}${path}`, {
// //       ...init,
// //       headers: {
// //         'Content-Type': 'application/json',
// //         ...(init?.headers || {}),
// //       },
// //       cache: 'no-store',
// //     });
// //     if (!res.ok) return null;
// //     const data = await res.json();
// //     return data as T;
// //   } catch {
// //     return null;
// //   }
// // }

// async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
//   try {
//     const isFormData = init?.body instanceof FormData;

//     const res = await fetch(`${API_BASE_URL}${path}`, {
//       ...init,
//       headers: {
//         ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
//         ...(init?.headers || {}),
//       },
//       cache: 'no-store',
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data as T;
//   } catch {
//     return null;
//   }
// }

// export const api = {
//   health: () => apiFetch<{ status: string }>('/health'),

//   getCategories: () => apiFetch<Category[]>('/public/categories'),
//   getCategoryBySlug: (slug: string) =>
//     apiFetch<Category>(`/public/categories/${slug}`),

//   getProducts: (params: {
//     category?: string;
//     search?: string;
//     page?: number;
//     limit?: number;
//     isFeatured?: boolean;
//   } = {}) => {
//     const q = new URLSearchParams();
//     if (params.category) q.set('category', params.category);
//     if (params.search) q.set('search', params.search);
//     if (params.page) q.set('page', String(params.page));
//     if (params.limit) q.set('limit', String(params.limit));
//     return apiFetch<ProductListResponse>(`/public/products?${q.toString()}`);
//   },

//   getProductBySlug: (slug: string) =>
//     apiFetch<Product>(`/public/products/${slug}`),

//   getServices: () => apiFetch<Service[]>('/public/services'),
//   getServiceBySlug: (slug: string) =>
//     apiFetch<Service>(`/public/services/${slug}`),

//   getBlogCategories: () => apiFetch<BlogCategory[]>('/public/blog-categories'),
//   getBlogPosts: (params: {
//     category?: string;
//     tag?: string;
//     search?: string;
//     page?: number;
//   } = {}) => {
//     const q = new URLSearchParams();
//     if (params.category) q.set('category', params.category);
//     if (params.tag) q.set('tag', params.tag);
//     if (params.search) q.set('search', params.search);
//     if (params.page) q.set('page', String(params.page));
//     return apiFetch<BlogListResponse>(`/public/blog?${q.toString()}`);
//   },
//   getBlogPostBySlug: (slug: string) =>
//     apiFetch<BlogPost>(`/public/blog/${slug}`),

//   getCaseStudies: () => apiFetch<CaseStudy[]>('/public/case-studies'),
//   getCaseStudyBySlug: (slug: string) =>
//     apiFetch<CaseStudy>(`/public/case-studies/${slug}`),

//   getTestimonials: () => apiFetch<Testimonial[]>('/public/testimonials'),
//   getFaqs: () => apiFetch<Faq[]>('/public/faqs'),
//   getBanners: () => apiFetch<Banner[]>('/public/banners'),
//   getAnnouncementBar: () =>
//     apiFetch<AnnouncementBar>('/public/announcement-bar'),
//   getContactInfo: () => apiFetch<ContactInfo>('/public/contact-info'),

//   submitContact: (data: {
//     name: string;
//     email: string;
//     phone: string;
//     message: string;
//     recaptchaToken: string;
//   }) =>
//     apiFetch<{ success: boolean; message: string }>('/public/contact', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }),

//   submitInquiry: (formData: FormData) =>
//     apiFetch<{ success: boolean; message: string }>('/public/inquiry', {
//       method: 'POST',
//       body: formData,
//     }),
// };

import type {
  AboutUs,
  AnnouncementBar,
  Banner,
  BlogCategory,
  BlogListResponse,
  BlogPost,
  CaseStudy,
  Category,
  ContactInfo,
  Faq,
  Product,
  ProductListResponse,
  Service,
  Testimonial,
} from '@/types';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://mediumvioletred-lobster-308070.hostingersite.com/api';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const isFormData = init?.body instanceof FormData;

    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(init?.headers || {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch {
    return null;
  }
}

export const api = {
  health: () => apiFetch<{ status: string }>('/health'),

  getCategories: () => apiFetch<Category[]>('/public/categories'),
  getCategoryBySlug: (slug: string) =>
    apiFetch<Category>(`/public/categories/${slug}`),

  // getProducts: (params: {
  //   category?: string;
  //   subCategory?: string;
  //   search?: string;
  //   page?: number;
  //   limit?: number;
  //   isFeatured?: boolean;
  // } = {}) => {
  //   const q = new URLSearchParams();
  //   if (params.category) q.set('category', params.category);
  //   if (params.subCategory) q.set('subCategory', params.subCategory);
  //   if (params.search) q.set('search', params.search);
  //   if (params.page) q.set('page', String(params.page));
  //   if (params.limit) q.set('limit', String(params.limit));
  //   return apiFetch<ProductListResponse>(`/public/products?${q.toString()}`);
  // },

    getProducts: (params: {
    category?: string;
    subCategory?: string;
    search?: string;
    page?: number;
    limit?: number;
    isFeatured?: boolean;
  } = {}) => {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.subCategory) q.set('subCategory', params.subCategory);
    if (params.search) q.set('search', params.search);
    if (params.page) q.set('page', String(params.page));
    if (params.limit) q.set('limit', String(params.limit));
    if (params.isFeatured !== undefined) q.set('isFeatured', String(params.isFeatured));
    return apiFetch<ProductListResponse>(`/public/products?${q.toString()}`);
  },

  getProductBySlug: (slug: string) =>
    apiFetch<Product>(`/public/products/${slug}`),

  getServices: () => apiFetch<Service[]>('/public/services'),
  getServiceBySlug: (slug: string) =>
    apiFetch<Service>(`/public/services/${slug}`),

  getBlogCategories: () => apiFetch<BlogCategory[]>('/public/blog-categories'),
  getBlogPosts: (params: {
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
  } = {}) => {
    const q = new URLSearchParams();
    if (params.category) q.set('category', params.category);
    if (params.tag) q.set('tag', params.tag);
    if (params.search) q.set('search', params.search);
    if (params.page) q.set('page', String(params.page));
    return apiFetch<BlogListResponse>(`/public/blog?${q.toString()}`);
  },
  getBlogPostBySlug: (slug: string) =>
    apiFetch<BlogPost>(`/public/blog/${slug}`),

  getCaseStudies: () => apiFetch<CaseStudy[]>('/public/case-studies'),
  getCaseStudyBySlug: (slug: string) =>
    apiFetch<CaseStudy>(`/public/case-studies/${slug}`),

  getTestimonials: () => apiFetch<Testimonial[]>('/public/testimonials'),
  getFaqs: () => apiFetch<Faq[]>('/public/faqs'),
  getBanners: () => apiFetch<Banner[]>('/public/banners'),
  getAnnouncementBar: () =>
    apiFetch<AnnouncementBar>('/public/announcement-bar'),
  getContactInfo: () => apiFetch<ContactInfo>('/public/contact-info'),
  getAboutUs: () => apiFetch<AboutUs>('/public/about-us'), 

  submitContact: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    recaptchaToken: string;
  }) =>
    apiFetch<{ success: boolean; message: string }>('/public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitInquiry: (formData: FormData) =>
    apiFetch<{ success: boolean; message: string }>('/public/inquiry', {
      method: 'POST',
      body: formData,
    }),
};

