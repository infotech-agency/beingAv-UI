// // // import { useState, useEffect } from 'react';
// // // import Link from '@/components/RouterLink';
// // // // import SectionHeading from '@/components/SectionHeading';

// // // import {
// // //   Boxes,
// // //   Router,
// // //   Monitor,
// // //   Video,
// // //   AudioWaveform,
// // //   Cable,
// // //   Server,
// // //   // import any other icons you have
// // // } from 'lucide-react';
// // // import { SectionHeading } from './SectionHeading';

// // // // Map category names to Lucide icons – add/change as needed
// // // const categoryIcons: Record<string, React.ElementType> = {
// // //   Switchers: Router,
// // //   Extenders: Video,
// // //   Matrix: Monitor,
// // //   Audio: AudioWaveform,
// // //   Cables: Cable,
// // //   Racks: Server,
// // //   // fallback
// // // };

// // // export default function CategoryBrowse() {
// // //   // Assuming parentCategories comes from your data fetch or props
// // //   // For demonstration, I'll use a mock (replace with your actual data)
// // //   const parentCategories = [
// // //     { _id: '1', name: 'Switchers', slug: 'switchers' },
// // //     { _id: '2', name: 'Extenders', slug: 'extenders' },
// // //     { _id: '3', name: 'Matrix', slug: 'matrix' },
// // //     { _id: '4', name: 'Audio', slug: 'audio' },
// // //     { _id: '5', name: 'Cables', slug: 'cables' },
// // //   ];

// // //   return (
// // //     <section className="section-padding bg-white">
// // //       <div className="container-page">
// // //         <SectionHeading
// // //           eyebrow="Product Categories"
// // //           title="Browse by category"
// // //         />

// // //         <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
// // //           {parentCategories.map((cat) => {
// // //             const Icon = categoryIcons[cat.name] || Boxes; // fallback icon
// // //             return (
// // //               <Link
// // //                 key={cat._id}
// // //                 href={`/products/category/${cat.slug}`}
// // //                 className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-2 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
// // //               >
// // //                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
// // //                   <Icon className="h-5 w-5" />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-bold text-foreground">{cat.name}</h3>
// // //                   <p className="mt-1 text-sm text-muted-foreground">
// // //                     Browse {cat.name}
// // //                   </p>
// // //                 </div>
// // //               </Link>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // import { useState, useEffect } from 'react';
// // import Link from '@/components/RouterLink';
// // import { api } from '@/lib/api'; // ✅ API import karo
// // import { SectionHeading } from './SectionHeading';

// // import {
// //   Boxes,
// //   Router,
// //   Monitor,
// //   Video,
// //   AudioWaveform,
// //   Cable,
// //   Server,
// // } from 'lucide-react';

// // // Map category names to Lucide icons – add/change as needed
// // const categoryIcons: Record<string, React.ElementType> = {
// //   Switchers: Router,
// //   Extenders: Video,
// //   Matrix: Monitor,
// //   Audio: AudioWaveform,
// //   Cables: Cable,
// //   Racks: Server,
// //   // fallback
// // };

// // export  default async function CategoryBrowse() {
// //   // ✅ State for categories and loading
// //   const [categoriesRes,] =
// //     await Promise.all([

// //       api.getCategories(),
  
      
// //     ]);
// //     const categories = categoriesRes?.length;
// // //   const [parentCategories, setParentCategories] = useState<any[]>([]);
// //     const parentCategories = categories.filter((cat) => !cat.parentCategory);
// //   const [loading, setLoading] = useState(true);

// //   // ✅ Fetch categories from DB
// //   useEffect(() => {
// //     api.getParentCategories() // 🔁 Isko apni actual API method se replace kar do
// //       .then((data) => {
// //         if (data && data.length > 0) {
// //           setParentCategories(data);
// //         } else {
// //           setParentCategories([]); // agar data nahi aya to empty array
// //         }
// //       })
// //       .catch((error) => {
// //         console.error('Failed to fetch categories:', error);
// //         setParentCategories([]);
// //       })
// //       .finally(() => {
// //         setLoading(false);
// //       });
// //   }, []);

// //   // ✅ Loading state handle karo
// //   if (loading) {
// //     return (
// //       <section className="section-padding bg-white">
// //         <div className="container-page">
// //           <SectionHeading eyebrow="Product Categories" title="Browse by category" />
// //           <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
// //             {[...Array(6)].map((_, i) => (
// //               <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-100" />
// //             ))}
// //           </div>
// //         </div>
// //       </section>
// //     );
// //   }

// //   // ✅ Agar categories hi nahi hain to kuch mat dikhao (ya fallback dikhao)
// //   if (!parentCategories || parentCategories.length === 0) {
// //     return null; // Ya yahan "<p>No categories found</p>" bhi likh sakte ho
// //   }

// //   return (
// //     <section className="section-padding bg-white">
// //       <div className="container-page">
// //         <SectionHeading
// //           eyebrow="Product Categories"
// //           title="Browse by category"
// //         />

// //         <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
// //           {parentCategories.map((cat) => {
// //             const Icon = categoryIcons[cat.name] || Boxes; // fallback icon
// //             return (
// //               <Link
// //                 key={cat._id}
// //                 href={`/products/category/${cat.slug}`}
// //                 className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-2 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
// //               >
// //                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
// //                   <Icon className="h-5 w-5" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-bold text-foreground">{cat.name}</h3>
// //                   <p className="mt-1 text-sm text-muted-foreground">
// //                     Browse {cat.name}
// //                   </p>
// //                 </div>
// //               </Link>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import { useState, useEffect, useMemo } from 'react';
// import Link from '@/components/RouterLink';
// import { api } from '@/lib/api';
// import { SectionHeading } from './SectionHeading';
// import {
//   Boxes,
//   Router,
//   Monitor,
//   Video,
//   AudioWaveform,
//   Cable,
//   Server,
// } from 'lucide-react';

// // Icon mapping – category name → Icon component
// const categoryIcons: Record<string, React.ElementType> = {
//   Switchers: Router,
//   Extenders: Video,
//   Matrix: Monitor,
//   Audio: AudioWaveform,
//   Cables: Cable,
//   Racks: Server,
// };

// export default function CategoryBrowse() {
//   const [allCategories, setAllCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.getCategories()
//       .then((data) => {
//         if (data && data.length > 0) {
//           setAllCategories(data);
//         } else {
//           setAllCategories([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Failed to fetch categories:', error);
//         setAllCategories([]);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // 🧠 Parent categories ko filter karo – sirf wahi jinki parentCategory nahi hai
//   const parentCategories = useMemo(() => {
//     return allCategories.filter((cat) => !cat.parentCategory);
//   }, [allCategories]);

//   // ⏳ Loading skeleton
//   if (loading) {
//     return (
//       <section className="section-padding bg-white">
//         <div className="container-page">
//           <SectionHeading eyebrow="Product Categories" title="Browse by category" />
//           <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-100" />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // 🚫 Agar koi parent category nahi mili to kuch mat dikhao
//   if (parentCategories.length === 0) {
//     return null; // ya <p>No categories found</p>
//   }

//   return (
//     <section className="section-padding bg-white">
//       <div className="container-page">
//         <SectionHeading eyebrow="Product Categories" title="Browse by category" />

//         <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {parentCategories.map((cat) => {
//             const Icon = categoryIcons[cat.name] || Boxes;
//             return (
//               <Link
//                 key={cat._id}
//                 href={`/products/category/${cat.slug}`}
//                 className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-2 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
//               >
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
//                   <Icon className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-foreground">{cat.name}</h3>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     Browse {cat.name}
//                   </p>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect, useMemo } from 'react';
import Link from '@/components/RouterLink';
import { api } from '@/lib/api';
import { SectionHeading } from './SectionHeading';
import {
  Boxes,
  AudioWaveform,
  Cable,
  Shuffle,        // Converters
  Signal,         // Extender
  LayoutGrid,     // Matrix Switchers
  Split,          // Splitter
  GitBranch,      // Switcher
  Grid2x2,        // Video Wall
  Server,         // Racks
  Network,        // AV over IP
  Cpu,            // Processors
} from 'lucide-react';

// 🎯 Exact category name → Icon
const categoryIcons: Record<string, React.ElementType> = {
  Audio: AudioWaveform,
  Cables: Cable,
  Converters: Shuffle,
  Extender: Signal,
  'Matrix Switchers': LayoutGrid,
  Splitter: Split,
  Switcher: GitBranch,
  'Video Wall': Grid2x2,
  Racks: Server,
  'AV over IP': Network,
  Processors: Cpu,
};

export default function CategoryBrowse() {
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then((data) => {
        if (data && data.length > 0) {
          setAllCategories(data);
        } else {
          setAllCategories([]);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
        setAllCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const parentCategories = useMemo(() => {
    return allCategories.filter((cat) => !cat.parentCategory);
  }, [allCategories]);

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Product Categories" title="Browse by category" />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (parentCategories.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="
What We Make
" title="Pro AV hardware for every signal path" description='From matrix switchers to AV over IP, BeingAV designs and manufactures the hardware that powers professional AV installations.' />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {parentCategories.map((cat) => {
            const Icon = categoryIcons[cat.name] || Boxes; // fallback agar mapping na ho
            return (
              <Link
                key={cat._id}
                href={`/products/category/${cat.slug}`}
                className="group relative flex items-start gap-4 rounded-lg border border-border bg-white p-6 transition-all duration-300 hover:border-2 hover:border-destructive hover:bg-secondary/40 hover:shadow-lg hover:shadow-destructive/20"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-destructive/10 group-hover:text-destructive">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{cat.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Browse {cat.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}