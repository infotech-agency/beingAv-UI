import { useState } from 'react';
import { Check } from 'lucide-react';
import type { ProductVariant } from '@/types';

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  onChange?: (selections: Record<string, string>) => void;
}

export function ProductVariantSelector({ variants, onChange }: ProductVariantSelectorProps) {
  const groups = (variants || []).filter((g) => g.name && g.options?.length > 0);

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    groups.forEach((g) => {
      if (g.options.length > 0) initial[g.name] = g.options[0];
    });
    return initial;
  });

  if (groups.length === 0) return null;

  const handleSelect = (groupName: string, option: string) => {
    const next = { ...selections, [groupName]: option };
    setSelections(next);
    onChange?.(next);
  };

  return (
    <div className="mt-6 space-y-4">
      {groups.map((group) => (
        <div key={group.name}>
          <p className="text-sm font-semibold text-foreground mb-2">
            {group.name}
            {selections[group.name] ? `: ${selections[group.name]}` : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(group.name, option)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  selections[group.name] === option
                    ? 'border-destructive bg-destructive/5 text-destructive'
                    : 'border-border text-foreground hover:border-destructive/40'
                }`}
              >
                {selections[group.name] === option && <Check size={14} />}
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}