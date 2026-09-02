// import Link from '@/components/RouterLink';
// import { Logo } from '@/components/Logo';
// import { api } from '@/lib/api';
// import { fallbackCategories, fallbackContactInfo, fallbackServices } from '@/lib/fallback-data';
// import type { ContactInfo, Service } from '@/types';
// import { useEffect, useState } from 'react';
// import {
//   Linkedin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Youtube,
//   MapPin,
//   Mail,
//   Phone,
//   Clock,
// } from 'lucide-react';

// export function Footer() {
//   const [info, setInfo] = useState<ContactInfo>(fallbackContactInfo);
//   const [categories, setCategories] = useState(fallbackCategories);
//   const [services, setServices] = useState<Service[]>(fallbackServices);

//   useEffect(() => {
//     api.getContactInfo().then((data) => {
//       if (data) setInfo(data);
//     });
//     api.getCategories().then((data) => {
//       if (data && data.length) setCategories(data);
//     });
//     api.getServices().then((data) => {
//       if (data && data.length) setServices(data);
//     });
//   }, []);

//   const socials = [
//     { icon: Linkedin, url: info.socialLinks?.linkedin },
//     { icon: Facebook, url: info.socialLinks?.facebook },
//     { icon: Twitter, url: info.socialLinks?.twitter },
//     { icon: Instagram, url: info.socialLinks?.instagram },
//     { icon: Youtube, url: info.socialLinks?.youtube },
//   ].filter((s) => s.url);

//   // naye array fields use karo, agar khali hain to purane single fields pe fallback
//   const addresses = info.addresses?.length
//     ? info.addresses
//     : info.officeAddress
//     ? [{ label: '', address: info.officeAddress }]
//     : [];

//   const emails = info.emails?.length
//     ? info.emails
//     : info.email
//     ? [{ label: '', value: info.email }]
//     : [];

//   const phones = info.phones?.length
//     ? info.phones
//     : info.phone
//     ? [{ label: '', value: info.phone }]
//     : [];

//   return (
//     <footer className="border-t border-white/10 bg-black">
//       <div className="container-page py-16">
//         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             {/* <Logo /> */}
//             <img className='w-32' src="/images/whitelogo.png" alt="" />
//             <p className="mt-4 max-w-xs text-sm text-gray-400">
//               Connecting with Technology. Premium Pro AV & Unified Communications
//               hardware for integrators and enterprises.
//             </p>
//             <div className="mt-6 flex gap-3">
//               {socials.map((s, i) => (
                
//                  <a key={i}
//                   href={s.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-400 transition-all hover:border-destructive hover:text-destructive"
//                 >
//                   <s.icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Products */}
//           <div>
//             <h3 className="text-sm font-bold uppercase tracking-wider text-white">
//               Products
//             </h3>
//             <ul className="mt-4 space-y-2.5">
//               {categories.slice(0, 6).map((cat) => (
//                 <li key={cat._id}>
//                   <Link
//                     href={`/products/category/${cat.slug}`}
//                     className="text-sm text-gray-400 hover:text-destructive"
//                   >
//                     {cat.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Solutions / Industries -> ab /services API se aa raha hai */}
//           <div>
//             <h3 className="text-sm font-bold uppercase tracking-wider text-white">
//               Solutions
//             </h3>
//             <ul className="mt-4 space-y-2.5">
//               {services.slice(0, 6).map((srv) => (
//                 <li key={srv._id}>
//                   <Link
//                     href={`/services/${srv.slug}`}
//                     className="text-sm text-gray-400 hover:text-destructive"
//                   >
//                     {srv.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Resources */}
//           <div>
//             <h3 className="text-sm font-bold uppercase tracking-wider text-white">
//               Resources
//             </h3>
//             <ul className="mt-4 space-y-2.5">
//               <li><Link href="/blog" className="text-sm text-gray-400 hover:text-destructive">Blog</Link></li>
//               <li><Link href="/resources" className="text-sm text-gray-400 hover:text-destructive">Downloads</Link></li>
//               <li><Link href="/faqs" className="text-sm text-gray-400 hover:text-destructive">FAQs</Link></li>
//               <li><Link href="/case-studies" className="text-sm text-gray-400 hover:text-destructive">Case Studies</Link></li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-sm font-bold uppercase tracking-wider text-white">
//               Contact
//             </h3>
//             <ul className="mt-4 space-y-3">
//               {addresses.map((addr, i) => (
//                 <li key={i} className="flex gap-2.5 text-sm text-gray-400">
//                   <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//                   <span>
//                     {addr.label && <span className="block text-xs font-semibold text-gray-300">{addr.label}</span>}
//                     {addr.address}
//                   </span>
//                 </li>
//               ))}

//               {emails.map((e, i) => (
//                 <li key={i} className="flex gap-2.5 text-sm text-gray-400">
//                   <Mail className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//                   <span>
//                     {e.label && <span className="block text-xs font-semibold text-gray-300">{e.label}</span>}
//                     <a href={`mailto:${e.value}`} className="hover:text-destructive">{e.value}</a>
//                   </span>
//                 </li>
//               ))}

//               {/* { phones.map((p, i) => (
//                 <li key={i} className="flex gap-2.5 text-sm text-gray-400">
//                   <Phone className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//                   <span>
//                     {p.label && <span className="block text-xs font-semibold text-gray-300">{p.label}</span>}
//                     <a href={`tel:${p.value}`} className="hover:text-destructive">{p.value}</a>
//                   </span>
//                 </li>
//               ))} */}
//               {phones
//   .filter((p) => p.value && p.value.replace(/[^0-9]/g, '').length > 1)
//   .map((p, i) => (
//     <li key={i} className="flex gap-2.5 text-sm text-gray-400">
//       <Phone className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//       <span>
//         {p.label && <span className="block text-xs font-semibold text-gray-300">{p.label}</span>}
//         <a href={`tel:${p.value}`} className="hover:text-destructive">{p.value}</a>
//       </span>
//     </li>
// ))}

//               {info.businessHours && (
//                 <li className="flex gap-2.5 text-sm text-gray-400">
//                   <Clock className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
//                   <span>{info.businessHours}</span>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="border-t border-white/10">
//         <div className="container-page flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
//           <p className="text-xs text-gray-500">
//             © {new Date().getFullYear()} BeingAV — Professional AV & Collaboration Solutions.
//           </p>
//           <p className="text-xs text-gray-500">
//             Connecting with Technology
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from '@/components/RouterLink';
import { Logo } from '@/components/Logo';
import { api } from '@/lib/api';
import { fallbackCategories, fallbackContactInfo, fallbackServices } from '@/lib/fallback-data';
import type { ContactInfo, Service } from '@/types';
import { useEffect, useState } from 'react';
import {
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';

export function Footer() {
  const [info, setInfo] = useState<ContactInfo>(fallbackContactInfo);
  const [categories, setCategories] = useState(fallbackCategories);
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    api.getContactInfo().then((data) => {
      if (data) setInfo(data);
    });
    api.getCategories().then((data) => {
      if (data && data.length) setCategories(data);
    });
    api.getServices().then((data) => {
      if (data && data.length) setServices(data);
    });
  }, []);

  const socials = [
    { icon: Linkedin, url: info.socialLinks?.linkedin },
    { icon: Facebook, url: info.socialLinks?.facebook },
    { icon: Twitter, url: info.socialLinks?.twitter },
    { icon: Instagram, url: info.socialLinks?.instagram },
    { icon: Youtube, url: info.socialLinks?.youtube },
  ].filter((s) => s.url);

  const addresses = info.addresses?.length
    ? info.addresses
    : info.officeAddress
    ? [{ label: '', address: info.officeAddress }]
    : [];

  const emails = info.emails?.length
    ? info.emails
    : info.email
    ? [{ label: '', value: info.email }]
    : [];

  const phones = info.phones?.length
    ? info.phones
    : info.phone
    ? [{ label: '', value: info.phone }]
    : [];

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img className="w-32" src="/images/whitelogo.png" alt="" />
            <p className="mt-4 max-w-xs text-sm text-gray-400">
              Connecting with Technology. Premium Pro AV & Unified Communications
              hardware for integrators and enterprises.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-400 transition-all hover:border-destructive hover:text-destructive"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat._id}>
                  <Link
                    href={`/products/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-destructive"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((srv) => (
                <li key={srv._id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-sm text-gray-400 hover:text-destructive"
                  >
                    {srv.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-destructive">Blog</Link></li>
              <li><Link href="/resources" className="text-sm text-gray-400 hover:text-destructive">Downloads</Link></li>
              <li><Link href="/faqs" className="text-sm text-gray-400 hover:text-destructive">FAQs</Link></li>
              <li><Link href="/case-studies" className="text-sm text-gray-400 hover:text-destructive">Case Studies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              {addresses.map((addr, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>
                    {addr.label && <span className="block text-xs font-semibold text-gray-300">{addr.label}</span>}
                    {addr.address}
                  </span>
                </li>
              ))}

              {emails.map((e, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-gray-400">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>
                    {e.label && <span className="block text-xs font-semibold text-gray-300">{e.label}</span>}
                    <a href={`mailto:${e.value}`} className="hover:text-destructive">{e.value}</a>
                  </span>
                </li>
              ))}

              {phones
                .filter((p) => p.value && p.value.replace(/[^0-9]/g, '').length > 1)
                .map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-400">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <span>
                      {p.label && <span className="block text-xs font-semibold text-gray-300">{p.label}</span>}
                      <a href={`tel:${p.value}`} className="hover:text-destructive">{p.value}</a>
                    </span>
                  </li>
                ))}

              {info.businessHours && (
                <li className="flex gap-2.5 text-sm text-gray-400">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <span>{info.businessHours}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright now centered */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BeingAV 
          </p>
        </div>
      </div>
    </footer>
  );
}