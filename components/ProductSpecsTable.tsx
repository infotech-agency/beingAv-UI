// import type { Product } from '@/types';

// export function ProductSpecsTable({ product }: { product: Product }) {
//   const specs = product.specifications || [];

//   if (specs.length === 0) return null;

//   return (
//     <div className="overflow-hidden rounded-lg border border-border">
//       <table className="w-full">
//         <tbody>
//           {specs.map((spec, i) => (
//             <tr
//               key={i}
//               className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/40'}
//             >
//               <td className="w-1/3 border-b border-border px-5 py-3.5 text-sm font-semibold text-foreground">
//                 {spec.label}
//               </td>
//               <td className="border-b border-border px-5 py-3.5 text-sm text-muted-foreground">
//                 {spec.value}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import type { Product } from '@/types';

interface ProductSpecsTableProps {
  product?: Product;
  specifications?: any[]; // array of { label: string; value: string }
}

export function ProductSpecsTable({ product, specifications }: ProductSpecsTableProps) {
  // Use specifications if provided, else fallback to product.specifications
  const specs = specifications || product?.specifications || [];

  if (specs.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full">
        <tbody>
          {specs.map((spec, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? 'bg-white' : 'bg-secondary/40'}
            >
              <td className="w-1/3 border-b border-border px-5 py-3.5 text-sm font-semibold text-foreground">
                {spec.label}
              </td>
              <td className="border-b border-border px-5 py-3.5 text-sm text-muted-foreground">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}