

// import type { Metadata } from '@/types/metadata';
// import { api } from '@/lib/api';
// import { fallbackContactInfo } from '@/lib/fallback-data';
// import { ContactForm } from '@/components/ContactForm';
// import { MapPin, Mail, Phone, Clock } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Contact BeingAV',
//   description:
//     'Get in touch with BeingAV for product inquiries, quotes, and support.',
// };

// export default async function ContactPage() {
//   const infoRes = await api.getContactInfo();
//   const info = infoRes || fallbackContactInfo;

//   // naye array fields use karo, khali hone par purane single fields pe fallback
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
//     <>
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-12">
//           <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Contact Us</h1>
//           <p className="mt-2 max-w-2xl text-muted-foreground">
//             Have a question or need a quote? Reach out and our team will get back to you.
//           </p>
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
//             <div>
//               <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
//               <p className="mt-2 text-muted-foreground">
//                 We are here to help with product inquiries, technical support, and project consultations.
//               </p>

//               <div className="mt-8 space-y-5">
//                 {addresses.map((addr, i) => (
//                   <div key={`addr-${i}`} className="flex gap-4">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//                       <MapPin className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-foreground">
//                         {addr.label || 'Office Address'}
//                       </h3>
//                       <p className="mt-1 text-sm text-muted-foreground">{addr.address}</p>
//                     </div>
//                   </div>
//                 ))}

//                 {emails.map((e, i) => (
//                   <div key={`email-${i}`} className="flex gap-4">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//                       <Mail className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-foreground">{e.label || 'Email'}</h3>
//                       <a href={`mailto:${e.value}`} className="mt-1 block text-sm text-muted-foreground hover:text-destructive">
//                         {e.value}
//                       </a>
//                     </div>
//                   </div>
//                 ))}

               
//                 {phones
//   // .filter((p) => p.value?.trim())
//    .filter((p) => {
//     const value = p.value?.trim();
//     return value && value !== "+1";
//   })
//   .map((p, i) => (
//     <div key={`phone-${i}`} className="flex gap-4">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//         <Phone className="h-5 w-5" />
//       </div>

//       <div>
//         <h3 className="font-semibold text-foreground">
//           {p.label || "Phone"}
//         </h3>

//         <a
//           href={`tel:${p.value}`}
//           className="mt-1 block text-sm text-muted-foreground hover:text-destructive"
//         >
//           {p.value}
//         </a>
//       </div>
//     </div>
//   ))}

//                 {info.businessHours && (
//                   <div className="flex gap-4">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//                       <Clock className="h-5 w-5" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-foreground">Business Hours</h3>
//                       <p className="mt-1 text-sm text-muted-foreground">{info.businessHours}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {info.mapEmbedLink && (
//                 <div className="mt-8 overflow-hidden rounded-lg border border-border">
//                   <iframe
//                     src={info.mapEmbedLink}
//                     width="100%"
//                     height="300"
//                     style={{ border: 0 }}
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     title="Office location"
//                   />
//                 </div>
//               )}
//             </div>

//             <div>
//               <div className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-8">
//                 <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Fill out the form and we will respond within one business day.
//                 </p>
//                 <div className="mt-6">
//                   <ContactForm />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// import type { Metadata } from '@/types/metadata';
// import { api } from '@/lib/api';
// import { fallbackContactInfo } from '@/lib/fallback-data';
// import { ContactForm } from '@/components/ContactForm';
// import { MapPin, Mail, Phone, Clock, ExternalLink, ArrowRight } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Contact BeingAV',
//   description:
//     'Get in touch with BeingAV for product inquiries, quotes, and support.',
// };

// export default async function ContactPage() {
//   const infoRes = await api.getContactInfo();
//   const info = infoRes || fallbackContactInfo;

//   const addresses = info.addresses?.length
//     ? info.addresses
//     : info.officeAddress
//     ? [{ label: 'Office Address', address: info.officeAddress }]
//     : [];

//   const emails = info.emails?.length
//     ? info.emails
//     : info.email
//     ? [{ label: 'Email', value: info.email }]
//     : [];

//   const phones = info.phones?.length
//     ? info.phones
//     : info.phone
//     ? [{ label: 'Phone', value: info.phone }]
//     : [];

//   // Better spacing and layout using cards
//   return (
//     <>
//       {/* Hero header – slightly refined */}
//       <section className="border-b border-border bg-secondary/30">
//         <div className="container-page py-16">
//           <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Contact Us</h1>
//           <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
//             Have a question or need a quote? Our team is here to help.
//           </p>
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
//             {/* Left column – contact info + map – spans 3 cols */}
//             <div className="lg:col-span-3">
//               <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
//                 <h2 className="text-2xl font-bold text-foreground">Get in touch</h2>
//                 <p className="mt-2 text-muted-foreground">
//                   We are here to help with product inquiries, technical support, and project consultations.
//                 </p>

//                 {/* Contact details – better spacing and dividers */}
//                 <div className="mt-8 divide-y divide-border/50">
//                   {/* Addresses */}
//                   <div className="space-y-5 pb-6">
//                     {addresses.map((addr, i) => (
//                       <div key={`addr-${i}`} className="flex gap-5">
//                         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
//                           <MapPin className="h-5 w-5" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-foreground">
//                             {addr.label || 'Office Address'}
//                           </h3>
//                           <p className="mt-0.5 text-sm text-muted-foreground">{addr.address}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Emails */}
//                   <div className="space-y-5 py-6">
//                     {emails.map((e, i) => (
//                       <div key={`email-${i}`} className="flex gap-5">
//                         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
//                           <Mail className="h-5 w-5" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-foreground">{e.label || 'Email'}</h3>
//                           <a
//                             href={`mailto:${e.value}`}
//                             className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive hover:underline"
//                           >
//                             {e.value}
//                             <ExternalLink className="h-3 w-3 opacity-70" />
//                           </a>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Phones – filtered and improved */}
//                   <div className="space-y-5 py-6">
//                     {phones
//                       .filter((p) => {
//                         const value = p.value?.trim();
//                         return value && value !== '+1';
//                       })
//                       .map((p, i) => (
//                         <div key={`phone-${i}`} className="flex gap-5">
//                           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
//                             <Phone className="h-5 w-5" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-foreground">
//                               {p.label || 'Phone'}
//                             </h3>
//                             <a
//                               href={`tel:${p.value}`}
//                               className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive hover:underline"
//                             >
//                               {p.value}
//                               <ArrowRight className="h-3 w-3 opacity-70" />
//                             </a>
//                           </div>
//                         </div>
//                       ))}
//                   </div>

//                   {/* Business Hours */}
//                   {info.businessHours && (
//                     <div className="flex gap-5 pt-6">
//                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
//                         <Clock className="h-5 w-5" />
//                       </div>
//                       <div>
//                         <h3 className="font-semibold text-foreground">Business Hours</h3>
//                         <p className="mt-0.5 text-sm text-muted-foreground">{info.businessHours}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Map – with better container styling */}
//                 {info.mapEmbedLink && (
//                   <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-sm">
//                     <iframe
//                       src={info.mapEmbedLink}
//                       width="100%"
//                       height="280"
//                       style={{ border: 0 }}
//                       loading="lazy"
//                       referrerPolicy="no-referrer-when-downgrade"
//                       title="Office location"
//                       className="block"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right column – form – spans 2 cols */}
//             <div className="lg:col-span-2">
//               <div className="sticky top-32 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
//                 <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Fill out the form and we will respond within one business day.
//                 </p>
//                 <div className="mt-6">
//                   <ContactForm />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import type { Metadata } from '@/types/metadata';
import { api } from '@/lib/api';
import { fallbackContactInfo } from '@/lib/fallback-data';
import { ContactForm } from '@/components/ContactForm';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  ArrowRight,
  Users,
  Globe2,
  Headphones,
  CheckCircle,
  MessageSquare,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  Send,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact BeingAV',
  description:
    'Get in touch with BeingAV for product inquiries, quotes, and support.',
};

export default async function ContactPage() {
  const infoRes = await api.getContactInfo();
  const info = infoRes || fallbackContactInfo;

  const addresses = info.addresses?.length
    ? info.addresses
    : info.officeAddress
    ? [{ label: 'Office Address', address: info.officeAddress }]
    : [];

  const emails = info.emails?.length
    ? info.emails
    : info.email
    ? [{ label: 'Email', value: info.email }]
    : [];

  const phones = info.phones?.length
    ? info.phones
    : info.phone
    ? [{ label: 'Phone', value: info.phone }]
    : [];

  return (
    <>
      {/* Hero - compact & refined */}
      <section className="relative overflow-hidden border-b border-border bg-secondary/30">
        <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent" />
        <div className="container-page relative py-12 md:py-16">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-destructive">
              Get in Touch
            </span>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Have a question or need a quote? Our team is here to help with
              product inquiries, technical support, and project consultations.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Left column - contact info */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-foreground">Get in touch</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We respond to all inquiries within one business day.
                </p>

                {/* Contact details - optimized spacing */}
                <div className="mt-6 space-y-4">
                  {/* Addresses */}
                  {addresses.map((addr, i) => (
                    <div key={`addr-${i}`} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {addr.label || 'Office Address'}
                        </h3>
                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                      </div>
                    </div>
                  ))}

                  {/* Emails */}
                  {emails.map((e, i) => (
                    <div key={`email-${i}`} className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{e.label || 'Email'}</h3>
                        <a
                          href={`mailto:${e.value}`}
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive hover:underline"
                        >
                          {e.value}
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </a>
                      </div>
                    </div>
                  ))}

                  {/* Phones */}
                  {phones
                    .filter((p) => {
                      const value = p.value?.trim();
                      return value && value !== '+1';
                    })
                    .map((p, i) => (
                      <div key={`phone-${i}`} className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {p.label || 'Phone'}
                          </h3>
                          <a
                            href={`tel:${p.value}`}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive hover:underline"
                          >
                            {p.value}
                            <ArrowRight className="h-3 w-3 opacity-60" />
                          </a>
                        </div>
                      </div>
                    ))}

                  {/* Business Hours */}
                  {info.businessHours && (
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Business Hours</h3>
                        <p className="text-sm text-muted-foreground">{info.businessHours}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider with "Quick Response" badge */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs font-medium text-muted-foreground">
                      Quick Response
                    </span>
                  </div>
                </div>

                {/* Trust indicators - compact row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5">
                    <CheckCircle className="h-4 w-4 text-destructive" />
                    <span className="text-xs font-medium text-foreground">24hr Response</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5">
                    <Headphones className="h-4 w-4 text-destructive" />
                    <span className="text-xs font-medium text-foreground">Expert Support</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5">
                    <Globe2 className="h-4 w-4 text-destructive" />
                    <span className="text-xs font-medium text-foreground">Global Reach</span>
                  </div>
                </div>

                {/* Map */}
                {info.mapEmbedLink && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-border shadow-sm">
                    <iframe
                      src={info.mapEmbedLink}
                      width="100%"
                      height="260"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Office location"
                      className="block"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right column - form */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Send us a message</h2>
                    <p className="text-xs text-muted-foreground">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <ContactForm />
                </div>

              
               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}