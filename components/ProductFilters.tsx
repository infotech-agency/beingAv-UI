// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import type { Category } from '@/types';
// import { Search, X } from 'lucide-react';

// export function ProductFilters({ categories }: { categories: Category[] }) {
//   const navigate = useNavigate();
//   const { search: locationSearch } = useLocation();
//   const searchParams = new URLSearchParams(locationSearch);
//   const [search, setSearch] = useState(searchParams.get('search') || '');

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (search) params.set('search', search);
//       else params.delete('search');
//       params.set('page', '1');
//       navigate(`/products?${params.toString()}`);
//     }, 400);
//     return () => clearTimeout(timer);
//   }, [search, locationSearch, navigate]);

//   const handleCategoryChange = (cat: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (cat) params.set('category', cat);
//     else params.delete('category');
//     params.set('page', '1');
//     navigate(`/products?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     setSearch('');
//     navigate('/products');
//   };

//   const category = searchParams.get('category') || '';

//   return (
//     <div className="mb-8 space-y-4">
//       <div className="relative">
//         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
//         <input
//           type="text"
//           placeholder="Search products by name, SKU, or keyword..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-lg border border-input bg-white py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
//         />
//       </div>

//       <div className="flex flex-wrap items-center gap-2">
//         <button
//           onClick={() => handleCategoryChange('')}
//           className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
//             !category
//               ? 'bg-destructive text-white'
//               : 'border border-border bg-white text-foreground hover:border-destructive hover:text-destructive'
//           }`}
//         >
//           All
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat._id}
//             onClick={() => handleCategoryChange(cat.slug)}
//             className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
//               category === cat.slug
//                 ? 'bg-destructive text-white'
//                 : 'border border-border bg-white text-foreground hover:border-destructive hover:text-destructive'
//             }`}
//           >
//             {cat.name}
//           </button>
//         ))}
//         {(search || category) && (
//           <button
//             onClick={clearFilters}
//             className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-sm text-muted-foreground hover:text-destructive"
//           >
//             <X className="h-3.5 w-3.5" />
//             Clear
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Category } from '@/types';
import { Search, X } from 'lucide-react';

export function ProductFilters({ categories }: { categories: Category[] }) {
  const navigate = useNavigate();
  const { search: locationSearch } = useLocation();
  const searchParams = new URLSearchParams(locationSearch);
  const urlSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(urlSearch);

  // Keep the search box in sync if the URL's search term changes from
  // elsewhere (e.g. "Clear" button, or navigating back). This does NOT
  // trigger a navigate — it just updates local state to match the URL.
  useEffect(() => {
    setSearch(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearch]);

  // Debounced navigate — fires ONLY when the user actually types something
  // different from what's currently in the URL. Previously this effect also
  // depended on `locationSearch`, so ANY url change (like clicking a
  // pagination link to ?page=2) re-ran it and forced page back to 1 after
  // 400ms. Now it bails out early if `search` already matches the URL.
  useEffect(() => {
    if (search === urlSearch) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(locationSearch);
      if (search) params.set('search', search);
      else params.delete('search');
      params.set('page', '1'); // reset to page 1 only because the search term changed
      navigate(`/products?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set('category', cat);
    else params.delete('category');
    params.set('page', '1');
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch('');
    navigate('/products');
  };

  const category = searchParams.get('category') || '';

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products by name, SKU, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-white py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleCategoryChange('')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            !category
              ? 'bg-destructive text-white'
              : 'border border-border bg-white text-foreground hover:border-destructive hover:text-destructive'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryChange(cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              category === cat.slug
                ? 'bg-destructive text-white'
                : 'border border-border bg-white text-foreground hover:border-destructive hover:text-destructive'
            }`}
          >
            {cat.name}
          </button>
        ))}
        {(search || category) && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-3 py-2 text-sm text-muted-foreground hover:text-destructive"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}