

// import { useState } from 'react';
// import Link from '@/components/RouterLink';
// import { ChevronDown, Search } from 'lucide-react';
// import type { Category } from '@/types';

// const getParentId = (parent: Category['parentCategory']): string => {
//   if (!parent) return '';
//   return typeof parent === 'object' ? (parent as { _id: string })._id : (parent as string);
// };

// interface CategorySidebarProps {
//   categories: Category[];
//   activeCategory?: string; // slug from ?category=
//   activeSearch?: string;
// }

// export function CategorySidebar({ categories, activeCategory, activeSearch }: CategorySidebarProps) {
//   const topLevel = categories.filter((c) => !getParentId(c.parentCategory));
//   const getSubCategories = (parentId: string) =>
//     categories.filter((c) => getParentId(c.parentCategory) === parentId);

//   // jis parent ke andar active category hai, wahi default open rahega
//   const initialOpen = topLevel.find(
//     (cat) =>
//       cat.slug === activeCategory ||
//       getSubCategories(cat._id).some((s) => s.slug === activeCategory)
//   )?._id;

//   const [openId, setOpenId] = useState<string | undefined>(initialOpen);

//   return (
//     <aside className="w-full shrink-0 lg:w-64">
//       {/* Search box - jaisa screenshot me hai */}
//       <form action="/products" className="mb-5 flex">
//         <input
//           name="search"
//           defaultValue={activeSearch}
//           placeholder="Search items..."
//           className="w-full rounded-l-md border border-border bg-secondary/40 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
//         />
//         <button
//           type="submit"
//           className="flex items-center justify-center rounded-r-md bg-secondary px-3 text-foreground"
//           aria-label="Search"
//         >
//           <Search className="h-4 w-4" />
//         </button>
//       </form>

//       <nav className="space-y-0.5">
//         {topLevel.map((cat) => {
//           const subCats = getSubCategories(cat._id);
//           const isOpen = openId === cat._id;
//           const isActiveParent = cat.slug === activeCategory;

//           return (
//             <div key={cat._id}>
//               <button
//                 type="button"
//                 onClick={() => setOpenId(isOpen ? undefined : cat._id)}
//                 className={`flex w-full items-center justify-between py-2 text-left text-[15px] font-medium transition-colors ${
//                   isActiveParent ? 'text-destructive' : 'text-foreground hover:text-destructive'
//                 }`}
//               >
//                 {cat.name}
//                 {subCats.length > 0 && (
//                   <ChevronDown
//                     className={`h-4 w-4 shrink-0 transition-transform ${
//                       isOpen ? 'rotate-180 text-destructive' : ''
//                     }`}
//                   />
//                 )}
//               </button>

//               {isOpen && subCats.length > 0 && (
//                 <div className="ml-1 space-y-0.5 border-l border-border pl-3">
//                   {subCats.map((sub) => {
//                     const isActiveSub = sub.slug === activeCategory;
//                     return (
//                       <Link
//                         key={sub._id}
//                         // href={`/products?category=${sub.slug}`}
//                           href={`/products/category/${sub.slug}`}
//                         className={`block py-1.5 text-sm transition-colors ${
//                           isActiveSub
//                             ? 'font-semibold text-destructive'
//                             : 'text-muted-foreground hover:text-destructive'
//                         }`}
//                       >
//                         {sub.name}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

import { useState } from 'react';
import Link from '@/components/RouterLink';
import { ChevronDown, Search } from 'lucide-react';
import type { Category } from '@/types';

const getParentId = (parent: Category['parentCategory']): string => {
  if (!parent) return '';
  return typeof parent === 'object' ? (parent as { _id: string })._id : (parent as string);
};

interface CategorySidebarProps {
  categories: Category[];
  activeCategory?: string;
  activeSearch?: string;
}

export function CategorySidebar({ categories, activeCategory, activeSearch }: CategorySidebarProps) {
  const topLevel = categories.filter((c) => !getParentId(c.parentCategory));
  const getSubCategories = (parentId: string) =>
    categories.filter((c) => getParentId(c.parentCategory) === parentId);

  const initialOpen = topLevel.find(
    (cat) =>
      cat.slug === activeCategory ||
      getSubCategories(cat._id).some((s) => s.slug === activeCategory)
  )?._id;

  const [openId, setOpenId] = useState<string | undefined>(initialOpen);

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <form action="/products" className="mb-5 flex">
        <input
          name="search"
          defaultValue={activeSearch}
          placeholder="Search items..."
          className="w-full rounded-l-md border border-border bg-secondary/40 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-r-md bg-secondary px-3 text-foreground"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <nav className="space-y-0.5">
        {topLevel.map((cat) => {
          const subCats = getSubCategories(cat._id);
          const isOpen = openId === cat._id;
          const isActiveParent = cat.slug === activeCategory;

          return (
            <div key={cat._id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? undefined : cat._id)}
                className={`flex w-full items-center justify-between py-2 text-left text-[15px] font-medium transition-colors ${
                  isActiveParent ? 'text-destructive' : 'text-foreground hover:text-destructive'
                }`}
              >
                {cat.name}
                {subCats.length > 0 && (
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-destructive' : ''
                    }`}
                  />
                )}
              </button>

              {isOpen && subCats.length > 0 && (
                <div className="ml-1 space-y-0.5 border-l border-border pl-3">
                  {subCats.map((sub) => {
                    const isActiveSub = sub.slug === activeCategory;
                    return (
                      <Link
                        key={sub._id}
                        href={`/products/category/${sub.slug}?parent=${cat.slug}`}
                        className={`block py-1.5 text-sm transition-colors ${
                          isActiveSub
                            ? 'font-semibold text-destructive'
                            : 'text-muted-foreground hover:text-destructive'
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}