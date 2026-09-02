export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentCategory?: string | null;
  isActive?: boolean;
  image?: string;
}

export interface ProductImage {
  _id?: string;
  type: 'front' | 'rear' | 'side' | 'application' | 'installation' | string;
  url: string;
}

// export interface ProductDownload {
//   _id?: string;
//   type: 'datasheet' | 'userManual';
//   url: string;
//   fileName?: string;
// }

export interface ProductDownloads {
  datasheet: string | null;
  userManual: string | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

// export interface Product {
//   _id: string;
//   name: string;
//   slug: string;
//   sku: string;
//   category: string | Category;
//   shortDescription?: string;
//   description?: string;
//   keyFeatures?: string[];
//   keyHighlights?: string[];
//   applications?: string[];
//   specifications?: ProductSpecification[];
//   warranty?: string;
//   certifications?: string[];
//   faqs?: ProductFaq[];
//   images?: ProductImage[];
//   downloads?: ProductDownload[];
//   isFeatured?: boolean;
//   isActive?: boolean;
//   metaTitle?: string;
//   metaDescription?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: string | Category;
  shortDescription?: string;
  description?: string;
  keyFeatures?: string[];
  keyHighlights?: string[];
  applications?: string[];
  compatibleProducts?: (string | Product)[];
  specifications?: ProductSpecification[];
  warranty?: string;
  certifications?: string[];
  faqs?: ProductFaq[];
  images?: ProductImage[];
  downloads?: ProductDownloads;   // object, not array
  isFeatured?: boolean;
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// export interface ProductListResponse {
//   data: Product[];
//   pagination?: {
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//   };
// }

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  overview?: string;
  content?: string;
  keyPoints?: string[];
  order?: number;
  isActive?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string | BlogCategory;
  tags?: string[];
  featuredImage?: string;
  content?: string;
  author?: string;
  readingTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogListResponse {
  data: BlogPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  overview?: string;
  content?: string;
  keyPoints?: string[];
  client?: string;
  industry?: string;
  isPublished?: boolean;
  createdAt?: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  designation?: string;
  company?: string;
  message: string;
  image?: string;
  order?: number;
  isActive?: boolean;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  isActive?: boolean;
}

export interface Banner {
  _id: string;
  image: string;
  heading: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  isActive?: boolean;
}

export interface AnnouncementBar {
  _id?: string;
  type?: string;
  text: string;
  link?: string;
  isActive: boolean;
}

export interface ContactInfo {
  _id?: string;
  officeAddress: string;
  email: string;
  phone: string;
  mapEmbedLink?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  businessHours?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
