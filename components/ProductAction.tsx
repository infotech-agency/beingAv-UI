// import { useState } from 'react';
// import { Download, FileText } from 'lucide-react';
// import { ProductInquiryModal } from '@/components/ProductInquiryModal';
// import type { Product } from '@/types';

// export function ProductActions({ product }: { product: Product }) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [pendingDownload, setPendingDownload] = useState<'datasheet' | 'userManual' | null>(null);

//   const openInquiry = (download: 'datasheet' | 'userManual' | null) => {
//     setPendingDownload(download);
//     setModalOpen(true);
//   };

//   return (
//     <>
//       <div className="mt-8 flex flex-wrap gap-3">
//         <button
//           type="button"
//           onClick={() => openInquiry(null)}
//           className="inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90"
//         >
//           Request Product Inquiry
//         </button>

//         {product.downloads?.datasheet?.url && (
//           <button
//             type="button"
//             onClick={() => openInquiry('datasheet')}
//             className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
//           >
//             <Download className="h-4 w-4" />
//             Datasheet
//           </button>
//         )}

//         {product.downloads?.userManual?.url && (
//           <button
//             type="button"
//             onClick={() => openInquiry('userManual')}
//             className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
//           >
//             <FileText className="h-4 w-4" />
//             User Manual
//           </button>
//         )}
//       </div>

//       <ProductInquiryModal
//         product={product}
//         open={modalOpen}
//         onOpenChange={setModalOpen}
//         pendingDownload={pendingDownload}
//       />
//     </>
//   );
// }

import { useState } from 'react';
import { Download } from 'lucide-react';
import { ProductInquiryModal } from '@/components/ProductInquiryModal';
import type { Product } from '@/types';

export function ProductActions({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<'datasheet' | 'userManual' | 'both' | null>(null);

  const openInquiry = (download: 'datasheet' | 'userManual' | 'both' | null) => {
    setPendingDownload(download);
    setModalOpen(true);
  };

  const hasDatasheet = !!product.downloads?.datasheet?.url;
  const hasUserManual = !!product.downloads?.userManual?.url;

  // Label adjusts to whichever files are actually available for this product
  const downloadLabel =
    hasDatasheet && hasUserManual
      ? 'Download Datasheet & User Manual'
      : hasDatasheet
      ? 'Download Datasheet'
      : 'Download User Manual';

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => openInquiry(null)}
          className="inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90"
        >
          Request Product Inquiry
        </button>

        {(hasDatasheet || hasUserManual) && (
          <button
            type="button"
            onClick={() => openInquiry('both')}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
          >
            <Download className="h-4 w-4" />
            {downloadLabel}
          </button>
        )}
      </div>

      <ProductInquiryModal
        product={product}
        open={modalOpen}
        onOpenChange={setModalOpen}
        pendingDownload={pendingDownload}
      />
    </>
  );
}