// // import { useState, useEffect, useRef } from 'react';
// // import Link from '@/components/RouterLink';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { Logo } from '@/components/Logo';
// // import { api } from '@/lib/api';
// // import { fallbackCategories, fallbackServices } from '@/lib/fallback-data';
// // import type { Category, Service } from '@/types';
// // import {
// //   Menu,
// //   X,
// //   ChevronDown,
// //   ArrowRight,
// //   Search,
// // } from 'lucide-react';

// // const navLinks = [
// //   { label: 'Home', href: '/' },
// //   { label: 'Products', href: '/products', hasMega: true },
// //   { label: 'Solutions', href: '/services', hasDropdown: true },
// //   { label: 'About Us', href: '/about', hasAboutDropdown: true },
// //   { label: 'Contact', href: '/contact' },
// // ];

// // const aboutDropdownLinks = [
// //   { label: 'Company', href: '/about', desc: 'Who we are and what we do' },
// //   { label: 'Case Studies', href: '/case-studies', desc: 'Real-world project deployments' },
// //   { label: 'Blog', href: '/blog', desc: 'Insights, guides, and AV trends' },
// // ];

// // // A category's parentCategory can come back populated ({_id,name,slug}) or as a plain id string
// // const getParentId = (parent: Category['parentCategory']): string => {
// //   if (!parent) return '';
// //   return typeof parent === 'object' ? (parent as { _id: string })._id : (parent as string);
// // };

// // // Minimal shape we need from a searched product — adjust field names if your API differs
// // type ProductSearchResult = {
// //   _id: string;
// //   name: string;
// //   slug: string;
// //   sku?: string;
// //   images?: { url: string; type?: string }[];
// // };

// // export function Navbar() {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [services, setServices] = useState<Service[]>([]);
// //   const [openMega, setOpenMega] = useState(false);
// //   const [openServices, setOpenServices] = useState(false);
// //   const [openAbout, setOpenAbout] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
// //   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
// //   const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   // --- search state ---
// //   // searchOpen now only controls whether the RESULTS dropdown is visible —
// //   // the input box itself is always rendered (no more icon-click-to-reveal).
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
// //   const [searchLoading, setSearchLoading] = useState(false);
// //   const searchBoxRef = useRef<HTMLDivElement | null>(null);
// //   const searchInputRef = useRef<HTMLInputElement | null>(null);
// //   const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   useEffect(() => {
// //     api.getCategories().then((data) => {
// //       const cats = data && data.length ? data : fallbackCategories;
// //       setCategories(cats);
// //     });
// //     api.getServices().then((data) => {
// //       setServices(data && data.length ? data : fallbackServices);
// //     });
// //   }, []);

// //   // Mega menu columns = top-level categories only
// //   const topLevelCategories = categories.filter((c) => !getParentId(c.parentCategory));
// //   // Rows under each column = that category's subcategories
// //   const getSubCategories = (parentId: string) =>
// //     categories.filter((c) => getParentId(c.parentCategory) === parentId);

// //   // Scroll listener — toggles navbar theme
// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     handleScroll();
// //     window.addEventListener('scroll', handleScroll, { passive: true });
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const isActive = (href: string) =>
// //     href === '/' ? pathname === '/' : pathname.startsWith(href);

// //   const handleEnter = (setter: (v: boolean) => void) => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     // Jo bhi naya dropdown khulne wala hai, uske alawa baaki sab turant band kar do —
// //     // taaki Products se About Us pe hover karte waqt dono ek saath overlap na ho.
// //     setOpenMega(false);
// //     setOpenServices(false);
// //     setOpenAbout(false);
// //     setter(true);
// //   };
// //   const handleLeave = () => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     closeTimer.current = setTimeout(() => {
// //       setOpenMega(false);
// //       setOpenServices(false);
// //       setOpenAbout(false);
// //     }, 200);
// //   };

// //   // --- search behaviour ---

// //   // Debounced fetch whenever the query changes
// //   useEffect(() => {
// //     if (searchDebounce.current) clearTimeout(searchDebounce.current);

// //     const q = searchQuery.trim();
// //     if (q.length < 2) {
// //       setSearchResults([]);
// //       setSearchLoading(false);
// //       return;
// //     }

// //     setSearchLoading(true);
// //     searchDebounce.current = setTimeout(async () => {
// //       try {
// //         const res = await api.getProducts({ search: q, limit: 6 });
// //         setSearchResults((res?.items as ProductSearchResult[]) || []);
// //       } catch {
// //         setSearchResults([]);
// //       } finally {
// //         setSearchLoading(false);
// //       }
// //     }, 300);

// //     return () => {
// //       if (searchDebounce.current) clearTimeout(searchDebounce.current);
// //     };
// //   }, [searchQuery]);

// //   // Close results dropdown on outside click (input itself stays visible)
// //   useEffect(() => {
// //     if (!searchOpen) return;
// //     const handleClickOutside = (e: MouseEvent) => {
// //       if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
// //         setSearchOpen(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [searchOpen]);

// //   const goToProduct = (product: ProductSearchResult) => {
// //     setSearchOpen(false);
// //     setSearchQuery('');
// //     setMobileOpen(false);
// //     navigate(`/products/${product.slug}`);
// //   };

// //   const submitSearch = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     const q = searchQuery.trim();
// //     if (!q) return;
// //     // Falls back to a full search-results listing on the products page
// //     setSearchOpen(false);
// //     setMobileOpen(false);
// //     navigate(`/products?search=${encodeURIComponent(q)}`);
// //   };

// //   const clearSearch = () => {
// //     setSearchQuery('');
// //     setSearchResults([]);
// //     setSearchOpen(false);
// //     searchInputRef.current?.focus();
// //   };

// //   const getThumb = (product: ProductSearchResult) =>
// //     product.images?.find((img) => img.type === 'front')?.url || product.images?.[0]?.url;

// //   return (
// //     <header
// //       className={`sticky top-0 z-50 border-b backdrop-blur transition-colors duration-300 ${
// //         scrolled
// //           ? 'border-white/10 bg-black/95'
// //           : 'border-border bg-white/95'
// //       }`}
// //     >
// //       <nav className="container-page">
// //         <div className="flex h-28 items-center justify-between">
// //           <div className="scale-125 origin-left">
// //             <Logo variant={scrolled ? 'white' : 'default'} />
// //           </div>

// //           {/* Desktop nav */}
// //           <div className="hidden items-center gap-1 lg:flex">
// //             {navLinks.map((link) => (
// //               <div
// //                 key={link.label}
// //                 className="relative"
// //                 onMouseEnter={() =>
// //                   link.hasMega
// //                     ? handleEnter(setOpenMega)
// //                     : link.hasDropdown
// //                     ? handleEnter(setOpenServices)
// //                     : link.hasAboutDropdown
// //                     ? handleEnter(setOpenAbout)
// //                     : handleLeave()
// //                 }
// //                 onMouseLeave={handleLeave}
// //               >
// //                 <Link
// //                   href={link.href}
// //                   className={`flex items-center gap-1 px-4 py-2.5 text-lg font-medium transition-colors ${
// //                     isActive(link.href)
// //                       ? 'text-destructive'
// //                       : scrolled
// //                       ? 'text-white hover:text-destructive'
// //                       : 'text-foreground hover:text-destructive'
// //                   }`}
// //                 >
// //                   {link.label}
// //                   {link.hasMega && <ChevronDown className={`h-4 w-4 transition-transform ${openMega ? 'rotate-180' : ''}`} />}
// //                   {link.hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openServices ? 'rotate-180' : ''}`} />}
// //                   {link.hasAboutDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openAbout ? 'rotate-180' : ''}`} />}
// //                 </Link>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Search + CTA */}
// //           <div className="hidden items-center gap-3 lg:flex">
// //             {/* Search input is now always visible — no more icon-click-to-reveal */}
// //             <div ref={searchBoxRef} className="relative">
// //               <form onSubmit={submitSearch} className="flex items-center">
// //                 <div
// //                   className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
// //                     scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
// //                   }`}
// //                 >
// //                   <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
// //                   <input
// //                     ref={searchInputRef}
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     onFocus={() => setSearchOpen(true)}
// //                     onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
// //                     placeholder="Search by product name or SKU"
// //                     className={`ml-2 w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground xl:w-64 ${
// //                       scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
// //                     }`}
// //                   />
// //                   {searchQuery && (
// //                     <button
// //                       type="button"
// //                       onClick={clearSearch}
// //                       className={`ml-2 ${scrolled ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
// //                       aria-label="Clear search"
// //                     >
// //                       <X className="h-4 w-4" />
// //                     </button>
// //                   )}
// //                 </div>

// //                 {/* Results dropdown */}
// //                 {searchOpen && searchQuery.trim().length >= 2 && (
// //                   <div className="absolute right-0 top-full mt-2 w-96 rounded-md border border-border bg-white shadow-xl">
// //                     {searchLoading ? (
// //                       <div className="px-4 py-4 text-sm text-muted-foreground">Searching…</div>
// //                     ) : searchResults.length > 0 ? (
// //                       <ul className="max-h-96 overflow-y-auto py-1">
// //                         {searchResults.map((product) => (
// //                           <li key={product._id}>
// //                             <button
// //                               type="button"
// //                               onClick={() => goToProduct(product)}
// //                               className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent"
// //                             >
// //                               {getThumb(product) ? (
// //                                 <img
// //                                   src={getThumb(product)}
// //                                   alt={product.name}
// //                                   className="h-10 w-10 shrink-0 rounded object-contain"
// //                                 />
// //                               ) : (
// //                                 <div className="h-10 w-10 shrink-0 rounded bg-accent" />
// //                               )}
// //                               <div className="min-w-0">
// //                                 <div className="truncate text-sm font-semibold text-foreground">
// //                                   {product.name}
// //                                 </div>
// //                                 {product.sku && (
// //                                   <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
// //                                 )}
// //                               </div>
// //                             </button>
// //                           </li>
// //                         ))}
// //                       </ul>
// //                     ) : (
// //                       <div className="px-4 py-4 text-sm text-muted-foreground">
// //                         No products found for "{searchQuery}"
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </form>
// //             </div>

// //             <Link
// //               href="/contact"
// //               className="inline-flex items-center gap-2 rounded-md bg-destructive px-5 py-2.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 hover:shadow-md"
// //             >
// //               Contact Sales
// //               <ArrowRight className="h-4 w-4" />
// //             </Link>
// //           </div>

// //           {/* Mobile toggle */}
// //           <button
// //             className={`p-2 lg:hidden ${scrolled ? 'text-white' : 'text-foreground'}`}
// //             onClick={() => setMobileOpen(!mobileOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Products mega dropdown */}
// //       {openMega && (
// //         <div
// //           className="mega-panel hidden lg:block bg-white"
// //           onMouseEnter={() => handleEnter(setOpenMega)}
// //           onMouseLeave={handleLeave}
// //         >
// //           <div className="container-page py-8">
// //             <div className="mb-5 flex items-center justify-between">
// //               <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Categories</span>
// //               <Link
// //                 href="/products"
// //                 className="inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
// //               >
// //                 Browse all products
// //                 <ArrowRight className="h-4 w-4" />
// //               </Link>
// //             </div>
// //             <div className="grid grid-cols-3 gap-x-8 gap-y-6">
// //               {topLevelCategories.map((cat) => {
// //                 const subCats = getSubCategories(cat._id);
// //                 return (
// //                   <div key={cat._id} className="group/cat">
// //                     <Link
// //                       href={`/products/category/${cat.slug}`}
// //                       className="text-sm font-bold text-foreground transition-colors hover:text-destructive"
// //                     >
// //                       {cat.name}
// //                     </Link>
// //                     <ul className="mt-2.5 space-y-1.5 border-l border-border pl-3">
// //                       {subCats.slice(0, 6).map((sub) => (
// //                         <li key={sub._id}>
// //                           <Link
// //                             href={`/products/category/${sub.slug}`}
// //                             className="text-sm text-muted-foreground transition-colors hover:text-destructive"
// //                           >
// //                             {sub.name}
// //                           </Link>
// //                         </li>
// //                       ))}
// //                       {subCats.length === 0 && (
// //                         <li className="text-sm text-muted-foreground/50">No sub categories</li>
// //                       )}
// //                     </ul>
// //                     <Link
// //                       href={`/products/category/${cat.slug}`}
// //                       className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:gap-1.5 transition-all"
// //                     >
// //                       View all
// //                       <ArrowRight className="h-3 w-3" />
// //                     </Link>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Services dropdown */}
// //       {openServices && (
// //         <div
// //           className="absolute left-1/2 top-full hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
// //           onMouseEnter={() => handleEnter(setOpenServices)}
// //           onMouseLeave={handleLeave}
// //         >
// //           <div className="w-96 py-2">
// //             {services.map((svc) => (
// //               <Link
// //                 key={svc._id}
// //                 href={`/services/${svc.slug}`}
// //                 className="block border-b border-border px-6 py-3.5 last:border-0 transition-colors hover:bg-accent"
// //               >
// //                 <div className="text-sm font-bold text-foreground">{svc.name}</div>
// //                 {svc.overview && (
// //                   <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
// //                     {svc.overview}
// //                   </div>
// //                 )}
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* About Us dropdown */}
// //       {openAbout && (
// //         <div
// //           className="absolute left-1/2 top-full hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
// //           onMouseEnter={() => handleEnter(setOpenAbout)}
// //           onMouseLeave={handleLeave}
// //         >
// //           <div className="w-80 py-2">
// //             {aboutDropdownLinks.map((item) => (
// //               <Link
// //                 key={item.href}
// //                 href={item.href}
// //                 className="block border-b border-border px-6 py-3.5 last:border-0 transition-colors hover:bg-accent"
// //               >
// //                 <div className="text-sm font-bold text-foreground">{item.label}</div>
// //                 <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
// //                   {item.desc}
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Mobile menu */}
// //       {mobileOpen && (
// //         <div className={`border-t lg:hidden ${scrolled ? 'border-white/10 bg-black' : 'border-border bg-white'}`}>
// //           <div className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
// //             {/* Mobile search */}
// //             <form onSubmit={submitSearch} className="mb-3">
// //               <div
// //                 className={`flex items-center rounded-md border px-3 py-2 ${
// //                   scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
// //                 }`}
// //               >
// //                 <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
// //                 <input
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   placeholder="Search by product name or SKU"
// //                   className={`ml-2 w-full bg-transparent text-sm outline-none ${
// //                     scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
// //                   }`}
// //                 />
// //               </div>
// //               {searchQuery.trim().length >= 2 && (
// //                 <div className="mt-2 rounded-md border border-border bg-white shadow-sm">
// //                   {searchLoading ? (
// //                     <div className="px-4 py-3 text-sm text-muted-foreground">Searching…</div>
// //                   ) : searchResults.length > 0 ? (
// //                     <ul className="max-h-72 overflow-y-auto py-1">
// //                       {searchResults.map((product) => (
// //                         <li key={product._id}>
// //                           <button
// //                             type="button"
// //                             onClick={() => goToProduct(product)}
// //                             className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-accent"
// //                           >
// //                             {getThumb(product) ? (
// //                               <img src={getThumb(product)} alt={product.name} className="h-9 w-9 rounded object-contain" />
// //                             ) : (
// //                               <div className="h-9 w-9 rounded bg-accent" />
// //                             )}
// //                             <div className="min-w-0">
// //                               <div className="truncate text-sm font-semibold text-foreground">{product.name}</div>
// //                               {product.sku && <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>}
// //                             </div>
// //                           </button>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   ) : (
// //                     <div className="px-4 py-3 text-sm text-muted-foreground">No products found</div>
// //                   )}
// //                 </div>
// //               )}
// //             </form>

// //             {navLinks.map((link) => (
// //               <div key={link.label}>
// //                 {link.hasMega ? (
// //                   <div>
// //                     {/* Label navigates to /products on tap; chevron button only toggles the submenu */}
// //                     <div className="flex items-center justify-between">
// //                       <Link
// //                         href={link.href}
// //                         className={`flex-1 py-2.5 text-lg font-medium ${
// //                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
// //                         }`}
// //                         onClick={() => setMobileOpen(false)}
// //                       >
// //                         {link.label}
// //                       </Link>
// //                       <button
// //                         type="button"
// //                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
// //                         onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
// //                         aria-label={`Toggle ${link.label} submenu`}
// //                       >
// //                         <ChevronDown
// //                           className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
// //                         />
// //                       </button>
// //                     </div>
// //                     {mobileProductsOpen && (
// //                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
// //                         {topLevelCategories.map((cat) => (
// //                           <div key={cat._id} className="py-1">
// //                             <Link
// //                               href={`/products/category/${cat.slug}`}
// //                               className={`block py-1 text-sm font-semibold hover:text-destructive ${scrolled ? 'text-white' : 'text-foreground'}`}
// //                               onClick={() => setMobileOpen(false)}
// //                             >
// //                               {cat.name}
// //                             </Link>
// //                             <div className="ml-3">
// //                               {getSubCategories(cat._id).map((sub) => (
// //                                 <Link
// //                                   key={sub._id}
// //                                   href={`/products/category/${sub.slug}`}
// //                                   className={`block py-1 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
// //                                   onClick={() => setMobileOpen(false)}
// //                                 >
// //                                   {sub.name}
// //                                 </Link>
// //                               ))}
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : link.hasDropdown ? (
// //                   <div>
// //                     {/* Label navigates to /services on tap; chevron button only toggles the submenu */}
// //                     <div className="flex items-center justify-between">
// //                       <Link
// //                         href={link.href}
// //                         className={`flex-1 py-2.5 text-lg font-medium ${
// //                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
// //                         }`}
// //                         onClick={() => setMobileOpen(false)}
// //                       >
// //                         {link.label}
// //                       </Link>
// //                       <button
// //                         type="button"
// //                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
// //                         onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
// //                         aria-label={`Toggle ${link.label} submenu`}
// //                       >
// //                         <ChevronDown
// //                           className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
// //                         />
// //                       </button>
// //                     </div>
// //                     {mobileServicesOpen && (
// //                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
// //                         {services.map((svc) => (
// //                           <Link
// //                             key={svc._id}
// //                             href={`/services/${svc.slug}`}
// //                             className={`block py-1.5 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
// //                             onClick={() => setMobileOpen(false)}
// //                           >
// //                             {svc.name}
// //                           </Link>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : link.hasAboutDropdown ? (
// //                   <div>
// //                     {/* Label navigates to /about on tap; chevron button only toggles the submenu */}
// //                     <div className="flex items-center justify-between">
// //                       <Link
// //                         href={link.href}
// //                         className={`flex-1 py-2.5 text-lg font-medium ${
// //                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
// //                         }`}
// //                         onClick={() => setMobileOpen(false)}
// //                       >
// //                         {link.label}
// //                       </Link>
// //                       <button
// //                         type="button"
// //                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
// //                         onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
// //                         aria-label={`Toggle ${link.label} submenu`}
// //                       >
// //                         <ChevronDown
// //                           className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
// //                         />
// //                       </button>
// //                     </div>
// //                     {mobileAboutOpen && (
// //                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
// //                         {aboutDropdownLinks.map((item) => (
// //                           <Link
// //                             key={item.href}
// //                             href={item.href}
// //                             className={`block py-1.5 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
// //                             onClick={() => setMobileOpen(false)}
// //                           >
// //                             {item.label}
// //                           </Link>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <Link
// //                     href={link.href}
// //                     className={`block py-2.5 text-lg font-medium ${
// //                       isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
// //                     }`}
// //                     onClick={() => setMobileOpen(false)}
// //                   >
// //                     {link.label}
// //                   </Link>
// //                 )}
// //               </div>
// //             ))}
// //             <Link
// //               href="/contact"
// //               className="mt-4 flex items-center justify-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white"
// //               onClick={() => setMobileOpen(false)}
// //             >
// //               Contact Sales
// //               <ArrowRight className="h-4 w-4" />
// //             </Link>
// //           </div>
// //         </div>
// //       )}
// //     </header>
// //   );
// // }

// import { useState, useEffect, useRef } from 'react';
// import Link from '@/components/RouterLink';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Logo } from '@/components/Logo';
// import { api } from '@/lib/api';
// import { fallbackCategories, fallbackServices } from '@/lib/fallback-data';
// import type { Category, Service } from '@/types';
// import {
//   Menu,
//   X,
//   ChevronDown,
//   ArrowRight,
//   Search,
// } from 'lucide-react';

// const navLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'Products', href: '/products', hasMega: true },
//   { label: 'Solutions', href: '/services', hasDropdown: true },
//   { label: 'About Us', href: '/about', hasAboutDropdown: true },
//   { label: 'Contact', href: '/contact' },
// ];

// const aboutDropdownLinks = [
//   { label: 'Company', href: '/about', desc: 'Who we are and what we do' },
//    { label: 'Warranty Policy', href: '/warranty', desc: 'Our Warranty Policy' },
//   { label: 'Case Studies', href: '/case-studies', desc: 'Real-world project deployments' },
//   { label: 'Blog', href: '/blog', desc: 'Insights, guides, and AV trends' },
// ];

// // A category's parentCategory can come back populated ({_id,name,slug}) or as a plain id string
// const getParentId = (parent: Category['parentCategory']): string => {
//   if (!parent) return '';
//   return typeof parent === 'object' ? (parent as { _id: string })._id : (parent as string);
// };

// // Minimal shape we need from a searched product — adjust field names if your API differs
// type ProductSearchResult = {
//   _id: string;
//   name: string;
//   slug: string;
//   sku?: string;
//   images?: { url: string; type?: string }[];
// };

// export function Navbar() {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [services, setServices] = useState<Service[]>([]);
//   const [openMega, setOpenMega] = useState(false);
//   const [openServices, setOpenServices] = useState(false);
//   const [openAbout, setOpenAbout] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
//   const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // --- search state ---
//   // searchOpen now only controls whether the RESULTS dropdown is visible —
//   // the input box itself is always rendered (no more icon-click-to-reveal).
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const searchBoxRef = useRef<HTMLDivElement | null>(null);
//   const searchInputRef = useRef<HTMLInputElement | null>(null);
//   const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     api.getCategories().then((data) => {
//       const cats = data && data.length ? data : fallbackCategories;
//       setCategories(cats);
//     });
//     api.getServices().then((data) => {
//       setServices(data && data.length ? data : fallbackServices);
//     });
//   }, []);

//   // Mega menu columns = top-level categories only
//   const topLevelCategories = categories.filter((c) => !getParentId(c.parentCategory));
//   // Rows under each column = that category's subcategories
//   const getSubCategories = (parentId: string) =>
//     categories.filter((c) => getParentId(c.parentCategory) === parentId);

//   // Scroll listener — toggles navbar theme
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     handleScroll();
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const isActive = (href: string) =>
//     href === '/' ? pathname === '/' : pathname.startsWith(href);

//   const handleEnter = (setter: (v: boolean) => void) => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     // Jo bhi naya dropdown khulne wala hai, uske alawa baaki sab turant band kar do —
//     // taaki Products se About Us pe hover karte waqt dono ek saath overlap na ho.
//     setOpenMega(false);
//     setOpenServices(false);
//     setOpenAbout(false);
//     setter(true);
//   };
//   const handleLeave = () => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     closeTimer.current = setTimeout(() => {
//       setOpenMega(false);
//       setOpenServices(false);
//       setOpenAbout(false);
//     }, 200);
//   };

//   // Close every desktop dropdown immediately — used on link click so
//   // navigating doesn't leave the panel hanging open until mouseleave fires.
//   const closeAllDropdowns = () => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setOpenMega(false);
//     setOpenServices(false);
//     setOpenAbout(false);
//   };

//   // --- search behaviour ---

//   // Debounced fetch whenever the query changes
//   useEffect(() => {
//     if (searchDebounce.current) clearTimeout(searchDebounce.current);

//     const q = searchQuery.trim();
//     if (q.length < 2) {
//       setSearchResults([]);
//       setSearchLoading(false);
//       return;
//     }

//     setSearchLoading(true);
//     searchDebounce.current = setTimeout(async () => {
//       try {
//         const res = await api.getProducts({ search: q, limit: 6 });
//         setSearchResults((res?.items as ProductSearchResult[]) || []);
//       } catch {
//         setSearchResults([]);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);

//     return () => {
//       if (searchDebounce.current) clearTimeout(searchDebounce.current);
//     };
//   }, [searchQuery]);

//   // Close results dropdown on outside click (input itself stays visible)
//   useEffect(() => {
//     if (!searchOpen) return;
//     const handleClickOutside = (e: MouseEvent) => {
//       if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [searchOpen]);

//   const goToProduct = (product: ProductSearchResult) => {
//     setSearchOpen(false);
//     setSearchQuery('');
//     setMobileOpen(false);
//     navigate(`/products/${product.slug}`);
//   };

//   const submitSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     const q = searchQuery.trim();
//     if (!q) return;
//     // Falls back to a full search-results listing on the products page
//     setSearchOpen(false);
//     setMobileOpen(false);
//     navigate(`/products?search=${encodeURIComponent(q)}`);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setSearchOpen(false);
//     searchInputRef.current?.focus();
//   };

//   const getThumb = (product: ProductSearchResult) =>
//     product.images?.find((img) => img.type === 'front')?.url || product.images?.[0]?.url;

//   return (
//     <header
//       className={`sticky top-0 z-50 relative border-b backdrop-blur transition-colors duration-300 ${
//         scrolled
//           ? 'border-white/10 bg-black/95'
//           : 'border-border bg-white/95'
//       }`}
//     >
//       <nav className="container-page">
//         <div className="flex h-28 items-center justify-between">
//           <div className="scale-125 origin-left">
//             <Logo variant={scrolled ? 'white' : 'default'} />
//           </div>

//           {/* Desktop nav */}
//           <div className="hidden items-center gap-1 lg:flex">
//             {navLinks.map((link) => (
//               <div
//                 key={link.label}
//                 className="relative"
//                 onMouseEnter={() =>
//                   link.hasMega
//                     ? handleEnter(setOpenMega)
//                     : link.hasDropdown
//                     ? handleEnter(setOpenServices)
//                     : link.hasAboutDropdown
//                     ? handleEnter(setOpenAbout)
//                     : handleLeave()
//                 }
//                 onMouseLeave={handleLeave}
//               >
//                 <Link
//                   href={link.href}
//                   className={`flex items-center gap-1 px-4 py-2.5 text-lg font-medium transition-colors ${
//                     isActive(link.href)
//                       ? 'text-destructive'
//                       : scrolled
//                       ? 'text-white hover:text-destructive'
//                       : 'text-foreground hover:text-destructive'
//                   }`}
//                   onClick={closeAllDropdowns}
//                 >
//                   {link.label}
//                   {link.hasMega && <ChevronDown className={`h-4 w-4 transition-transform ${openMega ? 'rotate-180' : ''}`} />}
//                   {link.hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openServices ? 'rotate-180' : ''}`} />}
//                   {link.hasAboutDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openAbout ? 'rotate-180' : ''}`} />}
//                 </Link>
//               </div>
//             ))}
//           </div>

//           {/* Search + CTA */}
//           <div className="hidden items-center gap-3 lg:flex">
//             {/* Search input is now always visible — no more icon-click-to-reveal */}
//             <div ref={searchBoxRef} className="relative">
//               <form onSubmit={submitSearch} className="flex items-center">
//                 <div
//                   className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
//                     scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
//                   }`}
//                 >
//                   <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
//                   <input
//                     ref={searchInputRef}
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setSearchOpen(true)}
//                     onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
//                     placeholder="Search by product name or SKU"
//                     className={`ml-2 w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground xl:w-64 ${
//                       scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
//                     }`}
//                   />
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={clearSearch}
//                       className={`ml-2 ${scrolled ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
//                       aria-label="Clear search"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   )}
//                 </div>

//                 {/* Results dropdown */}
//                 {searchOpen && searchQuery.trim().length >= 2 && (
//                   <div className="absolute right-0 top-full mt-2 w-96 rounded-md border border-border bg-white shadow-xl z-40">
//                     {searchLoading ? (
//                       <div className="px-4 py-4 text-sm text-muted-foreground">Searching…</div>
//                     ) : searchResults.length > 0 ? (
//                       <ul className="max-h-96 overflow-y-auto py-1">
//                         {searchResults.map((product) => (
//                           <li key={product._id}>
//                             <button
//                               type="button"
//                               onClick={() => goToProduct(product)}
//                               className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent"
//                             >
//                               {getThumb(product) ? (
//                                 <img
//                                   src={getThumb(product)}
//                                   alt={product.name}
//                                   className="h-10 w-10 shrink-0 rounded object-contain"
//                                 />
//                               ) : (
//                                 <div className="h-10 w-10 shrink-0 rounded bg-accent" />
//                               )}
//                               <div className="min-w-0">
//                                 <div className="truncate text-sm font-semibold text-foreground">
//                                   {product.name}
//                                 </div>
//                                 {product.sku && (
//                                   <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
//                                 )}
//                               </div>
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <div className="px-4 py-4 text-sm text-muted-foreground">
//                         No products found for "{searchQuery}"
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </form>
//             </div>

//             <Link
//               href="/contact"
//               className="inline-flex items-center gap-2 rounded-md bg-destructive px-5 py-2.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 hover:shadow-md"
//               onClick={closeAllDropdowns}
//             >
//               Contact Sales
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>

//           {/* Mobile toggle */}
//           <button
//             className={`p-2 lg:hidden ${scrolled ? 'text-white' : 'text-foreground'}`}
//             onClick={() => setMobileOpen(!mobileOpen)}
//             aria-label="Toggle menu"
//           >
//             {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
//           </button>
//         </div>
//       </nav>

//       {/* Products mega dropdown */}
//       {openMega && (
//         <div
//           className="absolute left-0 top-full z-40 hidden w-full border-t border-border bg-white shadow-xl lg:block"
//           onMouseEnter={() => handleEnter(setOpenMega)}
//           onMouseLeave={handleLeave}
//         >
//           <div className="container-page py-8">
//             <div className="mb-5 flex items-center justify-between">
//               <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Categories</span>
//               <Link
//                 href="/products"
//                 className="inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
//                 onClick={closeAllDropdowns}
//               >
//                 Browse all products
//                 <ArrowRight className="h-4 w-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-3 gap-x-8 gap-y-6">
//               {topLevelCategories.map((cat) => {
//                 const subCats = getSubCategories(cat._id);
//                 return (
//                   <div key={cat._id} className="group/cat">
//                     <Link
//                       href={`/products/category/${cat.slug}`}
//                       className="text-sm font-bold text-foreground transition-colors hover:text-destructive"
//                       onClick={closeAllDropdowns}
//                     >
//                       {cat.name}
//                     </Link>
//                     <ul className="mt-2.5 space-y-1.5 border-l border-border pl-3">
//                       {subCats.slice(0, 6).map((sub) => (
//                         <li key={sub._id}>
//                           <Link
//                             href={`/products/category/${sub.slug}`}
//                             className="text-sm text-muted-foreground transition-colors hover:text-destructive"
//                             onClick={closeAllDropdowns}
//                           >
//                             {sub.name}
//                           </Link>
//                         </li>
//                       ))}
//                       {subCats.length === 0 && (
//                         <li className="text-sm text-muted-foreground/50">No sub categories</li>
//                       )}
//                     </ul>
//                     <Link
//                       href={`/products/category/${cat.slug}`}
//                       className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:gap-1.5 transition-all"
//                       onClick={closeAllDropdowns}
//                     >
//                       View all
//                       <ArrowRight className="h-3 w-3" />
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Services dropdown */}
//       {openServices && (
//         <div
//           className="absolute left-1/2 top-full z-40 hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
//           onMouseEnter={() => handleEnter(setOpenServices)}
//           onMouseLeave={handleLeave}
//         >
//           <div className="w-96 py-2">
//             {services.map((svc) => (
//               <Link
//                 key={svc._id}
//                 href={`/services/${svc.slug}`}
//                 className="block border-b border-border px-6 py-3.5 last:border-0 transition-colors hover:bg-accent"
//                 onClick={closeAllDropdowns}
//               >
//                 <div className="text-sm font-bold text-foreground">{svc.name}</div>
//                 {svc.overview && (
//                   <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
//                     {svc.overview}
//                   </div>
//                 )}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* About Us dropdown */}
//       {openAbout && (
//         <div
//           className="absolute left-1/2 top-full z-40 hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
//           onMouseEnter={() => handleEnter(setOpenAbout)}
//           onMouseLeave={handleLeave}
//         >
//           <div className="w-80 py-2">
//             {aboutDropdownLinks.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="block border-b border-border px-6 py-3.5 last:border-0 transition-colors hover:bg-accent"
//                 onClick={closeAllDropdowns}
//               >
//                 <div className="text-sm font-bold text-foreground">{item.label}</div>
//                 <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
//                   {item.desc}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <div className={`border-t lg:hidden ${scrolled ? 'border-white/10 bg-black' : 'border-border bg-white'}`}>
//           <div className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
//             {/* Mobile search */}
//             <form onSubmit={submitSearch} className="mb-3">
//               <div
//                 className={`flex items-center rounded-md border px-3 py-2 ${
//                   scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
//                 }`}
//               >
//                 <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
//                 <input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search by product name or SKU"
//                   className={`ml-2 w-full bg-transparent text-sm outline-none ${
//                     scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
//                   }`}
//                 />
//               </div>
//               {searchQuery.trim().length >= 2 && (
//                 <div className="mt-2 rounded-md border border-border bg-white shadow-sm">
//                   {searchLoading ? (
//                     <div className="px-4 py-3 text-sm text-muted-foreground">Searching…</div>
//                   ) : searchResults.length > 0 ? (
//                     <ul className="max-h-72 overflow-y-auto py-1">
//                       {searchResults.map((product) => (
//                         <li key={product._id}>
//                           <button
//                             type="button"
//                             onClick={() => goToProduct(product)}
//                             className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-accent"
//                           >
//                             {getThumb(product) ? (
//                               <img src={getThumb(product)} alt={product.name} className="h-9 w-9 rounded object-contain" />
//                             ) : (
//                               <div className="h-9 w-9 rounded bg-accent" />
//                             )}
//                             <div className="min-w-0">
//                               <div className="truncate text-sm font-semibold text-foreground">{product.name}</div>
//                               {product.sku && <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>}
//                             </div>
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <div className="px-4 py-3 text-sm text-muted-foreground">No products found</div>
//                   )}
//                 </div>
//               )}
//             </form>

//             {navLinks.map((link) => (
//               <div key={link.label}>
//                 {link.hasMega ? (
//                   <div>
//                     {/* Label navigates to /products on tap; chevron button only toggles the submenu */}
//                     <div className="flex items-center justify-between">
//                       <Link
//                         href={link.href}
//                         className={`flex-1 py-2.5 text-lg font-medium ${
//                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
//                         }`}
//                         onClick={() => setMobileOpen(false)}
//                       >
//                         {link.label}
//                       </Link>
//                       <button
//                         type="button"
//                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
//                         onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
//                         aria-label={`Toggle ${link.label} submenu`}
//                       >
//                         <ChevronDown
//                           className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
//                         />
//                       </button>
//                     </div>
//                     {mobileProductsOpen && (
//                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
//                         {topLevelCategories.map((cat) => (
//                           <div key={cat._id} className="py-1">
//                             <Link
//                               href={`/products/category/${cat.slug}`}
//                               className={`block py-1 text-sm font-semibold hover:text-destructive ${scrolled ? 'text-white' : 'text-foreground'}`}
//                               onClick={() => setMobileOpen(false)}
//                             >
//                               {cat.name}
//                             </Link>
//                             <div className="ml-3">
//                               {getSubCategories(cat._id).map((sub) => (
//                                 <Link
//                                   key={sub._id}
//                                   href={`/products/category/${sub.slug}`}
//                                   className={`block py-1 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
//                                   onClick={() => setMobileOpen(false)}
//                                 >
//                                   {sub.name}
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : link.hasDropdown ? (
//                   <div>
//                     {/* Label navigates to /services on tap; chevron button only toggles the submenu */}
//                     <div className="flex items-center justify-between">
//                       <Link
//                         href={link.href}
//                         className={`flex-1 py-2.5 text-lg font-medium ${
//                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
//                         }`}
//                         onClick={() => setMobileOpen(false)}
//                       >
//                         {link.label}
//                       </Link>
//                       <button
//                         type="button"
//                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
//                         onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
//                         aria-label={`Toggle ${link.label} submenu`}
//                       >
//                         <ChevronDown
//                           className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
//                         />
//                       </button>
//                     </div>
//                     {mobileServicesOpen && (
//                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
//                         {services.map((svc) => (
//                           <Link
//                             key={svc._id}
//                             href={`/services/${svc.slug}`}
//                             className={`block py-1.5 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
//                             onClick={() => setMobileOpen(false)}
//                           >
//                             {svc.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : link.hasAboutDropdown ? (
//                   <div>
//                     {/* Label navigates to /about on tap; chevron button only toggles the submenu */}
//                     <div className="flex items-center justify-between">
//                       <Link
//                         href={link.href}
//                         className={`flex-1 py-2.5 text-lg font-medium ${
//                           isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
//                         }`}
//                         onClick={() => setMobileOpen(false)}
//                       >
//                         {link.label}
//                       </Link>
//                       <button
//                         type="button"
//                         className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
//                         onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
//                         aria-label={`Toggle ${link.label} submenu`}
//                       >
//                         <ChevronDown
//                           className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
//                         />
//                       </button>
//                     </div>
//                     {mobileAboutOpen && (
//                       <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
//                         {aboutDropdownLinks.map((item) => (
//                           <Link
//                             key={item.href}
//                             href={item.href}
//                             className={`block py-1.5 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
//                             onClick={() => setMobileOpen(false)}
//                           >
//                             {item.label}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     href={link.href}
//                     className={`block py-2.5 text-lg font-medium ${
//                       isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
//                     }`}
//                     onClick={() => setMobileOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                 )}
//               </div>
//             ))}
//             <Link
//               href="/contact"
//               className="mt-4 flex items-center justify-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white"
//               onClick={() => setMobileOpen(false)}
//             >
//               Contact Sales
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import Link from '@/components/RouterLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { api } from '@/lib/api';
import { fallbackCategories, fallbackServices } from '@/lib/fallback-data';
import type { Category, Service } from '@/types';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Search,
  // Service icons
  Settings,
  Shield,
  Monitor,
  Headphones,
  Wrench,
  Zap,
  Code,
  Database,
  Cloud,
  Lock,
  Smartphone,
  Tablet,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Network,
  Radio,
  Speaker,
  Video,
  Mic,
  Camera,
  Lightbulb,
  FileText,
  BarChart,
  Users,
  Briefcase,
  Palette,
  TrendingUp,
  Award,
  Clock,
  Target,
  Heart,
  Star,
  CheckCircle,

  Home,
  Building,
  Thermometer,


} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products', hasMega: true },
  { label: 'Solutions', href: '/services', hasDropdown: true },
  { label: 'About Us', href: '/about', hasAboutDropdown: true },
  { label: 'Contact', href: '/contact' },
];

const aboutDropdownLinks = [
  { label: 'Company', href: '/about', desc: 'Who we are and what we do' },
  { label: 'Warranty Policy', href: '/warranty', desc: 'Our Warranty Policy' },
  { label: 'Case Studies', href: '/case-studies', desc: 'Real-world project deployments' },
  { label: 'Blog', href: '/blog', desc: 'Insights, guides, and AV trends' },
];

// A category's parentCategory can come back populated ({_id,name,slug}) or as a plain id string
const getParentId = (parent: Category['parentCategory']): string => {
  if (!parent) return '';
  return typeof parent === 'object' ? (parent as { _id: string })._id : (parent as string);
};

// Minimal shape we need from a searched product — adjust field names if your API differs
type ProductSearchResult = {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  images?: { url: string; type?: string }[];
};
// Icon mapping function for services - More precise matching
const getServiceIcon = (serviceName: string) => {
  const name = serviceName.toLowerCase().trim();
  const iconClass = "h-5 w-5 text-destructive";
  
  // 1. AUDIO & SOUND SERVICES
  if (name.includes('audio') || name.includes('sound')) {
    if (name.includes('design') || name.includes('system')) return <Speaker className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    if (name.includes('consulting') || name.includes('consult')) return <Users className={iconClass} />;
    if (name.includes('repair') || name.includes('maintenance')) return <Headphones className={iconClass} />;
    return <Speaker className={iconClass} />;
  }
  
  // 2. VIDEO & DISPLAY SERVICES
  if (name.includes('video') || name.includes('display') || name.includes('projector')) {
    if (name.includes('wall') || name.includes('led')) return <Monitor className={iconClass} />;
    if (name.includes('conferencing') || name.includes('meeting')) return <Users className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    if (name.includes('design') || name.includes('creative')) return <Palette className={iconClass} />;
    return <Video className={iconClass} />;
  }
  
  // 3. LIGHTING SERVICES
  if (name.includes('lighting') || name.includes('light') || name.includes('illumination')) {
    if (name.includes('design') || name.includes('planning')) return <Palette className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    if (name.includes('stage') || name.includes('event')) return <Zap className={iconClass} />;
    if (name.includes('smart') || name.includes('automation')) return <Cpu className={iconClass} />;
    return <Lightbulb className={iconClass} />;
  }
  
  // 4. CONFERENCE & MEETING SERVICES
  if (name.includes('conferencing') || name.includes('meeting') || name.includes('collaboration')) {
    if (name.includes('audio') || name.includes('sound')) return <Mic className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    if (name.includes('room') || name.includes('space')) return <Monitor className={iconClass} />;
    if (name.includes('solution') || name.includes('system')) return <Settings className={iconClass} />;
    return <Users className={iconClass} />;
  }
  
  // 5. MICROPHONE & VOICE SERVICES
  if (name.includes('microphone') || name.includes('mic') || name.includes('voice')) {
    if (name.includes('wireless') || name.includes('cordless')) return <Radio className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    if (name.includes('studio') || name.includes('recording')) return <Camera className={iconClass} />;
    return <Mic className={iconClass} />;
  }
  
  // 6. CAMERA & RECORDING SERVICES
  if (name.includes('camera') || name.includes('recording') || name.includes('photography')) {
    if (name.includes('security') || name.includes('surveillance')) return <Shield className={iconClass} />;
    if (name.includes('studio') || name.includes('production')) return <Video className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    return <Camera className={iconClass} />;
  }
  
  // 7. NETWORK & CONNECTIVITY SERVICES
  if (name.includes('network') || name.includes('connectivity') || name.includes('wifi')) {
    if (name.includes('security') || name.includes('protect')) return <Shield className={iconClass} />;
    if (name.includes('installation') || name.includes('setup')) return <Wrench className={iconClass} />;
    if (name.includes('design') || name.includes('planning')) return <Globe className={iconClass} />;
    if (name.includes('speed') || name.includes('performance')) return <Zap className={iconClass} />;
    return <Network className={iconClass} />;
  }
  
  // 8. AUTOMATION & CONTROL SERVICES
  if (name.includes('automation') || name.includes('control') || name.includes('smart')) {
    if (name.includes('home') || name.includes('residential')) return <Home className={iconClass} />;
    if (name.includes('commercial') || name.includes('business')) return <Building className={iconClass} />;
    if (name.includes('lighting')) return <Lightbulb className={iconClass} />;
    if (name.includes('climate') || name.includes('temperature')) return <Thermometer className={iconClass} />;
    return <Cpu className={iconClass} />;
  }
  
  // 9. SYSTEM INTEGRATION SERVICES
  if (name.includes('integration') || name.includes('system')) {
    if (name.includes('audio') || name.includes('sound')) return <Speaker className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    if (name.includes('software') || name.includes('app')) return <Code className={iconClass} />;
    if (name.includes('cloud') || name.includes('remote')) return <Cloud className={iconClass} />;
    return <Code className={iconClass} />;
  }
  
  // 10. SECURITY SERVICES
  if (name.includes('security') || name.includes('protect') || name.includes('surveillance')) {
    if (name.includes('camera') || name.includes('recording')) return <Camera className={iconClass} />;
    if (name.includes('network') || name.includes('cyber')) return <Shield className={iconClass} />;
    if (name.includes('access') || name.includes('entry')) return <Lock className={iconClass} />;
    return <Shield className={iconClass} />;
  }
  
  // 11. DATA & ANALYTICS SERVICES
  if (name.includes('data') || name.includes('analytics') || name.includes('insights')) {
    if (name.includes('business') || name.includes('commercial')) return <Briefcase className={iconClass} />;
    if (name.includes('real-time') || name.includes('live')) return <Zap className={iconClass} />;
    if (name.includes('visualization') || name.includes('dashboard')) return <Monitor className={iconClass} />;
    return <BarChart className={iconClass} />;
  }
  
  // 12. CONSULTING & ADVISORY SERVICES
  if (name.includes('consult') || name.includes('advisory') || name.includes('strategy')) {
    if (name.includes('audio') || name.includes('sound')) return <Speaker className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    if (name.includes('technical') || name.includes('technology')) return <Cpu className={iconClass} />;
    if (name.includes('business') || name.includes('commercial')) return <Briefcase className={iconClass} />;
    return <Users className={iconClass} />;
  }
  
  // 13. INSTALLATION & DEPLOYMENT SERVICES
  if (name.includes('install') || name.includes('deploy') || name.includes('implementation')) {
    if (name.includes('audio') || name.includes('sound')) return <Speaker className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    if (name.includes('lighting')) return <Lightbulb className={iconClass} />;
    if (name.includes('network') || name.includes('cabling')) return <Network className={iconClass} />;
    return <Wrench className={iconClass} />;
  }
  
  // 14. DESIGN & CREATIVE SERVICES
  if (name.includes('design') || name.includes('creative') || name.includes('ui') || name.includes('ux')) {
    if (name.includes('audio') || name.includes('sound')) return <Speaker className={iconClass} />;
    if (name.includes('lighting')) return <Palette className={iconClass} />;
    if (name.includes('interior') || name.includes('space')) return <Monitor className={iconClass} />;
    return <Palette className={iconClass} />;
  }
  
  // 15. SUPPORT & MAINTENANCE SERVICES
  if (name.includes('support') || name.includes('help') || name.includes('maintenance') || name.includes('repair')) {
    if (name.includes('technical')) return <Settings className={iconClass} />;
    if (name.includes('emergency') || name.includes('urgent')) return <Clock className={iconClass} />;
    if (name.includes('on-site') || name.includes('field')) return <Users className={iconClass} />;
    return <Headphones className={iconClass} />;
  }
  
  // 16. TRAINING & EDUCATION SERVICES
  if (name.includes('training') || name.includes('learn') || name.includes('education') || name.includes('workshop')) {
    if (name.includes('technical') || name.includes('technology')) return <Cpu className={iconClass} />;
    if (name.includes('business') || name.includes('commercial')) return <Briefcase className={iconClass} />;
    return <FileText className={iconClass} />;
  }
  
  // 17. MANAGEMENT & OPERATIONS SERVICES
  if (name.includes('management') || name.includes('admin') || name.includes('operations')) {
    if (name.includes('project') || name.includes('program')) return <Target className={iconClass} />;
    if (name.includes('facility') || name.includes('building')) return <Building className={iconClass} />;
    if (name.includes('it') || name.includes('technology')) return <Settings className={iconClass} />;
    return <Settings className={iconClass} />;
  }
  
  // 18. BROADCAST & STREAMING SERVICES
  if (name.includes('broadcast') || name.includes('streaming') || name.includes('live')) {
    if (name.includes('audio') || name.includes('sound')) return <Mic className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    return <Radio className={iconClass} />;
  }
  
  // 19. STAGE & EVENT SERVICES
  if (name.includes('stage') || name.includes('event') || name.includes('production')) {
    if (name.includes('lighting')) return <Lightbulb className={iconClass} />;
    if (name.includes('audio') || name.includes('sound')) return <Speaker className={iconClass} />;
    if (name.includes('video') || name.includes('visual')) return <Video className={iconClass} />;
    return <Zap className={iconClass} />;
  }
  
  // 20. DEFAULT - If no match found
  return <Briefcase className="h-5 w-5 text-muted-foreground" />;
};

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [openMega, setOpenMega] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- search state ---
  // searchOpen now only controls whether the RESULTS dropdown is visible —
  // the input box itself is always rendered (no more icon-click-to-reveal).
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    api.getCategories().then((data) => {
      const cats = data && data.length ? data : fallbackCategories;
      setCategories(cats);
    });
    api.getServices().then((data) => {
      setServices(data && data.length ? data : fallbackServices);
    });
  }, []);

  // Mega menu columns = top-level categories only
  const topLevelCategories = categories.filter((c) => !getParentId(c.parentCategory));
  // Rows under each column = that category's subcategories
  const getSubCategories = (parentId: string) =>
    categories.filter((c) => getParentId(c.parentCategory) === parentId);

  // Scroll listener — toggles navbar theme
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleEnter = (setter: (v: boolean) => void) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Jo bhi naya dropdown khulne wala hai, uske alawa baaki sab turant band kar do —
    // taaki Products se About Us pe hover karte waqt dono ek saath overlap na ho.
    setOpenMega(false);
    setOpenServices(false);
    setOpenAbout(false);
    setter(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMega(false);
      setOpenServices(false);
      setOpenAbout(false);
    }, 200);
  };

  // Close every desktop dropdown immediately — used on link click so
  // navigating doesn't leave the panel hanging open until mouseleave fires.
  const closeAllDropdowns = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(false);
    setOpenServices(false);
    setOpenAbout(false);
  };

  // --- search behaviour ---

  // Debounced fetch whenever the query changes
  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);

    const q = searchQuery.trim();
    if (q.length < 2) {
      setSearchResults([]);
      setSearchLoading(false);
      return;
    }

    setSearchLoading(true);
    searchDebounce.current = setTimeout(async () => {
      try {
        const res = await api.getProducts({ search: q, limit: 6 });
        setSearchResults((res?.items as ProductSearchResult[]) || []);
      } catch {
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      if (searchDebounce.current) clearTimeout(searchDebounce.current);
    };
  }, [searchQuery]);

  // Close results dropdown on outside click (input itself stays visible)
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  const goToProduct = (product: ProductSearchResult) => {
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);
    navigate(`/products/${product.slug}`);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    // Falls back to a full search-results listing on the products page
    setSearchOpen(false);
    setMobileOpen(false);
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchOpen(false);
    searchInputRef.current?.focus();
  };

  const getThumb = (product: ProductSearchResult) =>
    product.images?.find((img) => img.type === 'front')?.url || product.images?.[0]?.url;

  return (
    <header
      className={`sticky top-0 z-50 relative border-b backdrop-blur transition-colors duration-300 ${
        scrolled
          ? 'border-white/10 bg-black/95'
          : 'border-border bg-white/95'
      }`}
    >
      <nav className="container-page">
        <div className="flex h-28 items-center justify-between">
          <div className="scale-125 origin-left">
            <Logo variant={scrolled ? 'white' : 'default'} />
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.hasMega
                    ? handleEnter(setOpenMega)
                    : link.hasDropdown
                    ? handleEnter(setOpenServices)
                    : link.hasAboutDropdown
                    ? handleEnter(setOpenAbout)
                    : handleLeave()
                }
                onMouseLeave={handleLeave}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2.5 text-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-destructive'
                      : scrolled
                      ? 'text-white hover:text-destructive'
                      : 'text-foreground hover:text-destructive'
                  }`}
                  onClick={closeAllDropdowns}
                >
                  {link.label}
                  {link.hasMega && <ChevronDown className={`h-4 w-4 transition-transform ${openMega ? 'rotate-180' : ''}`} />}
                  {link.hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openServices ? 'rotate-180' : ''}`} />}
                  {link.hasAboutDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${openAbout ? 'rotate-180' : ''}`} />}
                </Link>
              </div>
            ))}
          </div>

          {/* Search + CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Search input is now always visible — no more icon-click-to-reveal */}
            <div ref={searchBoxRef} className="relative">
              <form onSubmit={submitSearch} className="flex items-center">
                <div
                  className={`flex items-center rounded-md border px-3 py-2 transition-colors ${
                    scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
                  }`}
                >
                  <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                    placeholder="Search by product name or SKU"
                    className={`ml-2 w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground xl:w-64 ${
                      scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className={`ml-2 ${scrolled ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Results dropdown */}
                {searchOpen && searchQuery.trim().length >= 2 && (
                  <div className="absolute right-0 top-full mt-2 w-96 rounded-md border border-border bg-white shadow-xl z-40">
                    {searchLoading ? (
                      <div className="px-4 py-4 text-sm text-muted-foreground">Searching…</div>
                    ) : searchResults.length > 0 ? (
                      <ul className="max-h-96 overflow-y-auto py-1">
                        {searchResults.map((product) => (
                          <li key={product._id}>
                            <button
                              type="button"
                              onClick={() => goToProduct(product)}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent"
                            >
                              {getThumb(product) ? (
                                <img
                                  src={getThumb(product)}
                                  alt={product.name}
                                  className="h-10 w-10 shrink-0 rounded object-contain"
                                />
                              ) : (
                                <div className="h-10 w-10 shrink-0 rounded bg-accent" />
                              )}
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold text-foreground">
                                  {product.name}
                                </div>
                                {product.sku && (
                                  <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-4 text-sm text-muted-foreground">
                        No products found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-destructive px-5 py-2.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 hover:shadow-md"
              onClick={closeAllDropdowns}
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`p-2 lg:hidden ${scrolled ? 'text-white' : 'text-foreground'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Products mega dropdown */}
      {/* {openMega && (
        <div
          className="absolute left-0 top-full z-40 hidden w-full border-t border-border bg-white shadow-xl lg:block"
          onMouseEnter={() => handleEnter(setOpenMega)}
          onMouseLeave={handleLeave}
        >
          <div className="container-page py-8">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Categories</span>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-semibold text-destructive hover:gap-2 transition-all"
                onClick={closeAllDropdowns}
              >
                Browse all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              {topLevelCategories.map((cat) => {
                const subCats = getSubCategories(cat._id);
                return (
                  <div key={cat._id} className="group/cat">
                    <Link
                      href={`/products/category/${cat.slug}`}
                      className="text-sm font-bold text-foreground transition-colors hover:text-destructive"
                      onClick={closeAllDropdowns}
                    >
                      {cat.name}
                    </Link>
                    <ul className="mt-2.5 space-y-1.5 border-l border-border pl-3">
                      {subCats.slice(0, 6).map((sub) => (
                        <li key={sub._id}>
                          <Link
                            href={`/products/category/${sub.slug}`}
                            className="text-sm text-muted-foreground transition-colors hover:text-destructive"
                            onClick={closeAllDropdowns}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      {subCats.length === 0 && (
                        <li className="text-sm text-muted-foreground/50">No sub categories</li>
                      )}
                    </ul>
                    <Link
                      href={`/products/category/${cat.slug}`}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:gap-1.5 transition-all"
                      onClick={closeAllDropdowns}
                    >
                      View all
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )} */}

      {/* Products mega dropdown - Compact row-wise layout */}
{/* Products mega dropdown - Improved with better spacing and bolder red lines */}

{openMega && (
  <div
    className="absolute left-0 top-full z-40 hidden w-full border-t border-border bg-white shadow-xl lg:block"
    onMouseEnter={() => handleEnter(setOpenMega)}
    onMouseLeave={handleLeave}
  >
    <div className="container-page py-4">
      {/* Header - tighter */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Product Categories
        </span>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:gap-2 transition-all"
          onClick={closeAllDropdowns}
        >
          Browse all products
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Categories grid - 4 columns, minimal gaps */}
      <div className="grid grid-cols-4 gap-x-4 gap-y-1">
        {topLevelCategories.map((cat) => {
          const subCats = getSubCategories(cat._id);
          return (
            <div
              key={cat._id}
              className="flex flex-col"
            >
              {/* Category name - no extra padding */}
              <Link
                href={`/products/category/${cat.slug}`}
                className="text-sm font-bold text-foreground transition-colors hover:text-destructive"
                onClick={closeAllDropdowns}
              >
                {cat.name}
              </Link>

              {/* Subcategories with red border & background boxes - tighter */}
              {subCats.length > 0 && (
                <ul className="mt-0.5 border-l-[3px] border-destructive pl-2.5 space-y-0.5">
                  {subCats.slice(0, 6).map((sub) => (
                    <li key={sub._id}>
                      <Link
                        href={`/products/category/${sub.slug}`}
                        className="block rounded-md bg-muted/20 px-1.5 py-0.5 text-xs text-foreground transition-colors hover:bg-muted/40 hover:text-destructive hover:underline"
                        onClick={closeAllDropdowns}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* View all link - tighter */}
              {subCats.length > 0 && (
                <Link
                  href={`/products/category/${cat.slug}`}
                  className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-destructive hover:gap-2 transition-all"
                  onClick={closeAllDropdowns}
                >
                  View all
                  <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
)}

   {/* Services dropdown with icons */}
      {openServices && (
        <div
          className="absolute left-1/2 top-full z-40 hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
          onMouseEnter={() => handleEnter(setOpenServices)}
          onMouseLeave={handleLeave}
        >
          <div className="w-[480px] max-h-[400px] overflow-y-auto py-2">
            {services.map((svc) => (
              <Link
                key={svc._id}
                href={`/services/${svc.slug}`}
                className="flex items-start gap-3 border-b border-border px-6 py-3.5 last:border-0 transition-all hover:bg-accent group"
                onClick={closeAllDropdowns}
              >
                {/* Icon with circle background */}
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-all group-hover:bg-destructive/20 group-hover:scale-110">
                  {getServiceIcon(svc.name)}
                </div>
                
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{svc.name}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  {/* {svc.overview && (
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {svc.overview}
                    </div>
                  )} */}
                </div>
              </Link>
            ))}
            {services.length === 0 && (
              <div className="px-6 py-4 text-sm text-muted-foreground text-center">
                No services available
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Us dropdown */}
      {openAbout && (
        <div
          className="absolute left-1/2 top-full z-40 hidden -translate-x-1/2 border-t border-border bg-white shadow-xl lg:block"
          onMouseEnter={() => handleEnter(setOpenAbout)}
          onMouseLeave={handleLeave}
        >
          <div className="w-80 py-2">
            {aboutDropdownLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-border px-6 py-3.5 last:border-0 transition-colors hover:bg-accent"
                onClick={closeAllDropdowns}
              >
                <div className="text-sm font-bold text-foreground">{item.label}</div>
                <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`border-t lg:hidden ${scrolled ? 'border-white/10 bg-black' : 'border-border bg-white'}`}>
          <div className="container-page max-h-[calc(100vh-4rem)] overflow-y-auto py-4">
            {/* Mobile search */}
            <form onSubmit={submitSearch} className="mb-3">
              <div
                className={`flex items-center rounded-md border px-3 py-2 ${
                  scrolled ? 'border-white/20 bg-black/40' : 'border-border bg-white'
                }`}
              >
                <Search className={`h-4 w-4 ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name or SKU"
                  className={`ml-2 w-full bg-transparent text-sm outline-none ${
                    scrolled ? 'text-white placeholder:text-white/50' : 'text-foreground'
                  }`}
                />
              </div>
              {searchQuery.trim().length >= 2 && (
                <div className="mt-2 rounded-md border border-border bg-white shadow-sm">
                  {searchLoading ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">Searching…</div>
                  ) : searchResults.length > 0 ? (
                    <ul className="max-h-72 overflow-y-auto py-1">
                      {searchResults.map((product) => (
                        <li key={product._id}>
                          <button
                            type="button"
                            onClick={() => goToProduct(product)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-accent"
                          >
                            {getThumb(product) ? (
                              <img src={getThumb(product)} alt={product.name} className="h-9 w-9 rounded object-contain" />
                            ) : (
                              <div className="h-9 w-9 rounded bg-accent" />
                            )}
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-foreground">{product.name}</div>
                              {product.sku && <div className="text-xs text-muted-foreground">SKU: {product.sku}</div>}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">No products found</div>
                  )}
                </div>
              )}
            </form>

            {navLinks.map((link) => (
              <div key={link.label}>
                {link.hasMega ? (
                  <div>
                    {/* Label navigates to /products on tap; chevron button only toggles the submenu */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        className={`flex-1 py-2.5 text-lg font-medium ${
                          isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    {mobileProductsOpen && (
                      <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
                        {topLevelCategories.map((cat) => (
                          <div key={cat._id} className="py-1">
                            <Link
                              href={`/products/category/${cat.slug}`}
                              className={`block py-1 text-sm font-semibold hover:text-destructive ${scrolled ? 'text-white' : 'text-foreground'}`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {cat.name}
                            </Link>
                            <div className="ml-3">
                              {getSubCategories(cat._id).map((sub) => (
                                <Link
                                  key={sub._id}
                                  href={`/products/category/${sub.slug}`}
                                  className={`block py-1 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.hasDropdown ? (
                  <div>
                    {/* Label navigates to /services on tap; chevron button only toggles the submenu */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        className={`flex-1 py-2.5 text-lg font-medium ${
                          isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    {mobileServicesOpen && (
                      <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
                        {services.map((svc) => (
                          <Link
                            key={svc._id}
                            href={`/services/${svc.slug}`}
                            className="flex items-center gap-3 py-2 text-sm hover:text-destructive group"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                              {getServiceIcon(svc.name)}
                            </span>
                            <span className={scrolled ? 'text-white/70' : 'text-muted-foreground'}>
                              {svc.name}
                            </span>
                          </Link>
                        ))}
                        {services.length === 0 && (
                          <div className="py-2 text-sm text-muted-foreground">No services available</div>
                        )}
                      </div>
                    )}
                  </div>
                ) : link.hasAboutDropdown ? (
                  <div>
                    {/* Label navigates to /about on tap; chevron button only toggles the submenu */}
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        className={`flex-1 py-2.5 text-lg font-medium ${
                          isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        className={`p-2.5 ${scrolled ? 'text-white' : 'text-foreground'}`}
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>
                    {mobileAboutOpen && (
                      <div className={`ml-4 border-l pl-3 ${scrolled ? 'border-white/10' : 'border-border'}`}>
                        {aboutDropdownLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block py-1.5 text-sm hover:text-destructive ${scrolled ? 'text-white/70' : 'text-muted-foreground'}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-2.5 text-lg font-medium ${
                      isActive(link.href) ? 'text-destructive' : scrolled ? 'text-white' : 'text-foreground'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}