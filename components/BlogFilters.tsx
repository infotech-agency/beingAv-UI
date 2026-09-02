import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { BlogCategory } from '@/types';
import { Search, X } from 'lucide-react';

export function BlogFilters({ categories }: { categories: BlogCategory[] }) {
  const navigate = useNavigate();
  const { search: locationSearch } = useLocation();
  const searchParams = new URLSearchParams(locationSearch);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set('search', search);
      else params.delete('search');
      navigate(`/blog?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, locationSearch, navigate]);

  const handleCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set('category', cat);
    else params.delete('category');
    navigate(`/blog?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-white py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => handleCategory('')}
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
            onClick={() => handleCategory(cat.slug)}
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
            onClick={() => {
              setSearch('');
              navigate('/blog');
            }}
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
