import { Plus, Trash2, GripVertical } from 'lucide-react';


interface VariantsEditorProps {
  values: ProductVariant [];
  onChange: (values: ProductVariant[]) => void;
}

export function VariantsEditor({ values, onChange }: VariantsEditorProps) {
  const addVariant = () => {
    onChange([...values, { label: '', sku: '', isActive: true }]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: unknown) => {
    onChange(values.map((v, i) => (i === index ? { ...v, [field]: value } : v)));
  };

  const removeVariant = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="label mb-0">Variants (e.g. cable lengths, colors)</label>
        <button type="button" onClick={addVariant} className="btn-secondary text-xs">
          <Plus size={14} /> Add Variant
        </button>
      </div>

      {values.length === 0 && (
        <p className="text-xs text-gray-400 mb-2">
          No variants added. E.g. for a cable: 15m, 25m, 30m — each as a separate variant.
        </p>
      )}

      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg">
            <GripVertical size={14} className="text-gray-300 shrink-0" />
            <input
              type="text"
              className="input flex-1"
              placeholder="Label (e.g. 15m)"
              value={v.label}
              onChange={(e) => updateVariant(i, 'label', e.target.value)}
            />
            <input
              type="text"
              className="input flex-1"
              placeholder="Variant SKU (optional)"
              value={v.sku || ''}
              onChange={(e) => updateVariant(i, 'sku', e.target.value)}
            />
            <label className="flex items-center gap-1 text-xs text-gray-500 shrink-0 whitespace-nowrap">
              <input
                type="checkbox"
                checked={v.isActive !== false}
                onChange={(e) => updateVariant(i, 'isActive', e.target.checked)}
                className="rounded"
              />
              Active
            </label>
            <button
              type="button"
              onClick={() => removeVariant(i)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}