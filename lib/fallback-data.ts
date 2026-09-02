import type {
  AnnouncementBar,
  Banner,
  BlogCategory,
  BlogPost,
  CaseStudy,
  Category,
  ContactInfo,
  Faq,
  Product,
  Service,
  Testimonial,
} from '@/types';

export const fallbackCategories: Category[] = [
  { _id: '1', name: 'AV Distribution', slug: 'av-distribution', description: 'Matrix switchers, distribution amplifiers, and extenders for routing AV signals.', isActive: true },
  { _id: '2', name: 'Video Conferencing', slug: 'video-conferencing', description: 'Unified communications hardware for huddle rooms to boardrooms.', isActive: true },
  { _id: '3', name: 'Audio Processing', slug: 'audio-processing', description: 'DSPs, mixers, amplifiers, and microphones for clear audio.', isActive: true },
  { _id: '4', name: 'Display Solutions', slug: 'display-solutions', description: 'Controllers, processors, and matrices for LED walls and large displays.', isActive: true },
  { _id: '5', name: 'Control Systems', slug: 'control-systems', description: 'Programmable control processors and touch panels.', isActive: true },
  { _id: '6', name: 'Cable & Connectivity', slug: 'cable-connectivity', description: 'Premium cables, adapters, and signal converters.', isActive: true },
  { _id: '7', name: 'Mounting Solutions', slug: 'mounting-solutions', description: 'Ceiling mounts, wall mounts, and rack systems.', isActive: true },
  { _id: '8', name: 'Streaming & Capture', slug: 'streaming-capture', description: 'Encoders, decoders, and capture devices for live streaming.', isActive: true },
];

export const fallbackProducts: Product[] = [
  {
    _id: 'p1', name: '4K HDMI Matrix Switcher 8x8', slug: '4k-hdmi-matrix-switcher-8x8', sku: 'BAV-MX88-4K',
    category: '1', shortDescription: '8x8 4K60 HDMI Matrix with HDCP 2.2',
    description: '<p>Professional 8x8 HDMI matrix switcher supporting 4K@60Hz 4:4:4 with HDCP 2.2/1.4 management, EDID control, and RS-232/IP control.</p>',
    keyFeatures: ['4K@60Hz 4:4:4', 'HDCP 2.2/1.4', 'EDID management', 'RS-232 & IP control'],
    keyHighlights: ['Low latency switching', 'RS-232 control'],
    applications: ['Boardrooms', 'Control rooms', 'Broadcast'],
    specifications: [
      { label: 'Video Resolution', value: '4K@60Hz 4:4:4' },
      { label: 'HDMI Version', value: '2.0' },
      { label: 'HDCP Version', value: '2.2/1.4' },
      { label: 'Bandwidth', value: '18 Gbps' },
      { label: 'Input Ports', value: '8' },
      { label: 'Output Ports', value: '8' },
    ],
    warranty: '3 Years', certifications: ['CE', 'FCC', 'RoHS'],
    faqs: [{ question: 'Does it support HDR?', answer: 'Yes, HDR10 and Dolby Vision are supported.' }],
    isFeatured: true, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    _id: 'p2', name: 'USB 3.0 Conference Camera', slug: 'usb-conference-camera', sku: 'BAV-CAM-4K',
    category: '2', shortDescription: '4K USB conference camera with auto-framing',
    description: '<p>4K UHD USB 3.0 conference camera with AI auto-framing, wide-angle lens, and plug-and-play compatibility.</p>',
    keyFeatures: ['4K UHD', 'AI auto-framing', 'USB 3.0 plug-and-play', 'Wide 120° lens'],
    keyHighlights: ['AI auto-framing', 'Plug-and-play'],
    applications: ['Huddle rooms', 'Medium conference rooms'],
    specifications: [
      { label: 'Resolution', value: '4K UHD' },
      { label: 'Connection', value: 'USB 3.0' },
      { label: 'Field of View', value: '120°' },
      { label: 'Auto-framing', value: 'AI-based' },
    ],
    warranty: '2 Years', certifications: ['CE', 'FCC'],
    faqs: [{ question: 'Is it compatible with Teams and Zoom?', answer: 'Yes, it works with all major UC platforms.' }],
    isFeatured: true, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    _id: 'p3', name: 'Digital Audio DSP Processor', slug: 'digital-audio-dsp', sku: 'BAV-DSP-8X8',
    category: '3', shortDescription: '8x8 DSP matrix with echo cancellation',
    description: '<p>Professional 8x8 digital audio DSP processor with AEC, noise reduction, and mixing for conferencing and auditoriums.</p>',
    keyFeatures: ['8x8 DSP matrix', 'AEC', 'Noise reduction', 'Remote control via IP'],
    keyHighlights: ['Echo cancellation', '8-channel processing'],
    applications: ['Conference rooms', 'Auditoriums', 'Lecture halls'],
    specifications: [
      { label: 'Channels', value: '8 in / 8 out' },
      { label: 'AEC', value: 'Yes' },
      { label: 'Control', value: 'IP / RS-232' },
    ],
    warranty: '3 Years', certifications: ['CE', 'FCC', 'RoHS'],
    faqs: [],
    isFeatured: false, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    _id: 'p4', name: '4K HDMI to HDBaseT Extender', slug: 'hdmi-hdbaset-extender', sku: 'BAV-EXT-4K70',
    category: '1', shortDescription: 'Extend 4K HDMI up to 70m over Cat6',
    description: '<p>HDMI to HDBaseT extender pair supporting 4K@60Hz up to 70m over a single Cat6 cable with PoC and IR passthrough.</p>',
    keyFeatures: ['4K@60Hz up to 70m', 'HDBaseT', 'PoC', 'IR passthrough'],
    keyHighlights: ['Single Cat6 cable', 'Power over Cable'],
    applications: ['Classrooms', 'Boardrooms', 'Digital signage'],
    specifications: [
      { label: 'Max Distance', value: '70m' },
      { label: 'Resolution', value: '4K@60Hz' },
      { label: 'Cable', value: 'Cat6' },
    ],
    warranty: '2 Years', certifications: ['CE', 'FCC'],
    faqs: [],
    isFeatured: true, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    _id: 'p5', name: 'Programmable Control Processor', slug: 'control-processor', sku: 'BAV-CTRL-PRO',
    category: '5', shortDescription: 'Advanced control processor with IP & RS-232',
    description: '<p>Programmable control processor with 8 RS-232 ports, IR, relays, and IP control for integrated AV systems.</p>',
    keyFeatures: ['8x RS-232', 'IR ports', 'Relay outputs', 'IP control'],
    keyHighlights: ['Multi-protocol control', 'Programmable logic'],
    applications: ['Control rooms', 'Boardrooms', 'Command centers'],
    specifications: [
      { label: 'RS-232 Ports', value: '8' },
      { label: 'IR Ports', value: '8' },
      { label: 'Relays', value: '4' },
    ],
    warranty: '3 Years', certifications: ['CE', 'FCC', 'RoHS'],
    faqs: [],
    isFeatured: false, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
  {
    _id: 'p6', name: 'LED Wall Video Processor', slug: 'led-wall-processor', sku: 'BAV-LED-PRO',
    category: '4', shortDescription: '4K LED wall processor with scaling',
    description: '<p>Professional LED wall video processor with 4K scaling, multi-window display, and seamless source switching.</p>',
    keyFeatures: ['4K scaling', 'Multi-window', 'Seamless switching', 'Genlock'],
    keyHighlights: ['Multi-window display', '4K scaling'],
    applications: ['Events', 'Broadcast', 'Digital signage'],
    specifications: [
      { label: 'Max Resolution', value: '4K@60Hz' },
      { label: 'Windows', value: 'Up to 4' },
    ],
    warranty: '3 Years', certifications: ['CE', 'FCC'],
    faqs: [],
    isFeatured: true, isActive: true,
    images: [
      { type: 'front', url: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200' },
    ],
  },
];

export const fallbackServices: Service[] = [
  { _id: 's1', name: 'AV System Design & Consultation', slug: 'av-system-design-consultation', overview: 'End-to-end AV system design for corporate and broadcast environments.', content: '<p>Our engineers work with your team from site survey through commissioning.</p>', keyPoints: ['Site survey', 'System architecture', 'Equipment selection'], order: 1, isActive: true },
  { _id: 's2', name: 'Installation & Commissioning', slug: 'installation-commissioning', overview: 'Professional installation and commissioning by certified technicians.', content: '<p>Certified technicians handle installation, testing, and commissioning.</p>', keyPoints: ['Certified technicians', 'Full testing', 'Handover documentation'], order: 2, isActive: true },
  { _id: 's3', name: 'Technical Support & AMC', slug: 'technical-support-amc', overview: 'Ongoing support with annual maintenance contracts and SLAs.', content: '<p>Annual maintenance contracts with defined SLAs and priority response.</p>', keyPoints: ['SLA-backed', 'Priority response', 'Preventive maintenance'], order: 3, isActive: true },
  { _id: 's4', name: 'OEM/ODM Services', slug: 'oem-odm-services', overview: 'Custom hardware design and manufacturing for partners.', content: '<p>Custom hardware design, branding, and manufacturing for partners.</p>', keyPoints: ['Custom branding', 'Hardware customization', 'Manufacturing support'], order: 4, isActive: true },
];

export const fallbackBlogCategories: BlogCategory[] = [
  { _id: 'bc1', name: 'AV Trends', slug: 'av-trends' },
  { _id: 'bc2', name: 'Product News', slug: 'product-news' },
  { _id: 'bc3', name: 'Guides', slug: 'guides' },
];

export const fallbackBlogPosts: BlogPost[] = [
  { _id: 'b1', title: 'Understanding HDMI 2.1 for Pro AV', slug: 'understanding-hdmi-2-1', category: 'bc1', tags: ['HDMI', 'Pro AV'], featuredImage: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200', content: '<p>HDMI 2.1 brings higher bandwidth and new features to professional AV. Here is what integrators need to know.</p>', author: 'BeingAV Team', readingTime: '5 min read', isPublished: true, createdAt: '2026-07-20T10:00:00Z' },
  { _id: 'b2', title: 'Choosing the Right Matrix Switcher', slug: 'choosing-matrix-switcher', category: 'bc3', tags: ['Matrix', 'Switcher'], featuredImage: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200', content: '<p>A guide to selecting the right matrix switcher for your deployment.</p>', author: 'BeingAV Team', readingTime: '7 min read', isPublished: true, createdAt: '2026-07-10T10:00:00Z' },
  { _id: 'b3', title: 'New 4K Distribution Range Launched', slug: 'new-4k-distribution-range', category: 'bc2', tags: ['Product', 'Launch'], featuredImage: 'https://images.pexels.com/photos/164585/pexels-photo-164585.jpeg?auto=compress&cs=tinysrgb&w=1200', content: '<p>BeingAV announces a new range of 4K distribution products.</p>', author: 'BeingAV Team', readingTime: '3 min read', isPublished: true, createdAt: '2026-06-28T10:00:00Z' },
];

export const fallbackCaseStudies: CaseStudy[] = [
  { _id: 'cs1', title: 'Corporate Auditorium AV Upgrade', slug: 'corporate-auditorium-upgrade', overview: 'Full AV overhaul for a 500-seat auditorium.', content: '<p>Complete AV upgrade including 4K projection, line array audio, and lecture capture.</p>', keyPoints: ['4K projection', 'Line array audio', 'Lecture capture'], client: 'Acme Corp', industry: 'Corporate', isPublished: true },
  { _id: 'cs2', title: 'University Lecture Hall Modernization', slug: 'university-lecture-hall', overview: 'Modernized 12 lecture halls with hybrid learning tech.', content: '<p>Deployed hybrid learning systems across 12 halls with lecture capture and video conferencing.</p>', keyPoints: ['Hybrid learning', 'Lecture capture', '12 halls'], client: 'State University', industry: 'Education', isPublished: true },
  { _id: 'cs3', title: 'Government Command Center', slug: 'government-command-center', overview: 'Built a multi-source command center with video walls.', content: '<p>Designed and installed a 4K video wall command center with multi-source routing.</p>', keyPoints: ['4K video wall', 'Multi-source routing', 'Control system'], client: 'Gov Agency', industry: 'Government', isPublished: true },
];

export const fallbackTestimonials: Testimonial[] = [
  { _id: 't1', clientName: 'John Smith', designation: 'IT Head', company: 'Acme Corp', message: 'BeingAV transformed our boardroom AV experience with reliable, high-performance hardware.', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', order: 1, isActive: true },
  { _id: 't2', clientName: 'Sarah Lee', designation: 'AV Consultant', company: 'Design Partners', message: 'The build quality and support are exceptional. BeingAV is our go-to for Pro AV projects.', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400', order: 2, isActive: true },
  { _id: 't3', clientName: 'Raj Patel', designation: 'Facilities Director', company: 'Global Tech Ltd', message: 'From design to installation, the BeingAV team delivered on every promise.', image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400', order: 3, isActive: true },
];

export const fallbackFaqs: Faq[] = [
  { _id: 'f1', question: 'Do you ship internationally?', answer: 'Yes, we ship worldwide through our partner network.', order: 1, isActive: true },
  { _id: 'f2', question: 'Do you offer OEM/ODM services?', answer: 'Yes, we offer custom hardware design, branding, and manufacturing for partners.', order: 2, isActive: true },
  { _id: 'f3', question: 'What warranty do your products carry?', answer: 'Most products carry a 2-3 year warranty. Please check individual product pages for details.', order: 3, isActive: true },
  { _id: 'f4', question: 'How can I request a quote?', answer: 'You can request a quote via the Contact Sales button or the inquiry form on any product page.', order: 4, isActive: true },
];

export const fallbackBanners: Banner[] = [
  { _id: 'bn1', image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1920', heading: 'Next-Gen Pro AV Solutions', subheading: 'Engineered for performance, built for reliability.', buttonText: 'Explore Products', buttonLink: '/products', order: 1, isActive: true },
  { _id: 'bn2', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1920', heading: 'Unified Communications, Simplified', subheading: 'From huddle rooms to boardrooms, we connect your teams.', buttonText: 'View Solutions', buttonLink: '/services', order: 2, isActive: true },
  { _id: 'bn3', image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&w=1920', heading: 'Built for Integrators', subheading: 'Premium hardware with global technical support.', buttonText: 'Contact Sales', buttonLink: '/contact', order: 3, isActive: true },
];

export const fallbackAnnouncement: AnnouncementBar = {
  text: 'New product launch — check our latest AV distribution range.',
  link: '/products',
  isActive: true,
};

export const fallbackContactInfo: ContactInfo = {
  officeAddress: '123 AV Street, Tech Park, Bangalore 560001',
  email: 'info@beingav.com',
  phone: '+91 80 1234 5678',
  mapEmbedLink: '',
  socialLinks: {
    facebook: 'https://facebook.com/beingav',
    linkedin: 'https://linkedin.com/company/beingav',
    twitter: 'https://twitter.com/beingav',
    instagram: 'https://instagram.com/beingav',
    youtube: 'https://youtube.com/@beingav',
  },
  businessHours: 'Mon-Fri 9:00 AM - 6:00 PM IST',
};
