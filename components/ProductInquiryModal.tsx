// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { X, ChevronRight } from 'lucide-react';
// // import { InquiryForm } from '@/components/InquiryForm';
// // import type { Product } from '@/types';

// // export function ProductInquiryModal({ product }: { product: Product }) {
// //   const [open, setOpen] = useState(false);

// //   // close on Escape + lock body scroll while open
// //   useEffect(() => {
// //     if (!open) return;
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === 'Escape') setOpen(false);
// //     };
// //     document.addEventListener('keydown', onKey);
// //     const prevOverflow = document.body.style.overflow;
// //     document.body.style.overflow = 'hidden';
// //     return () => {
// //       document.removeEventListener('keydown', onKey);
// //       document.body.style.overflow = prevOverflow;
// //     };
// //   }, [open]);

// //   return (
// //     <>
// //       <button
// //         type="button"
// //         onClick={() => setOpen(true)}
// //         className="inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90"
// //       >
// //         Request Product Inquiry
// //         <ChevronRight className="h-4 w-4" />
// //       </button>

// //       {open && (
// //         <div
// //           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
// //           onClick={() => setOpen(false)}
// //         >
// //           <div
// //             className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <button
// //               type="button"
// //               onClick={() => setOpen(false)}
// //               className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
// //               aria-label="Close"
// //             >
// //               <X className="h-4 w-4" />
// //             </button>

// //             <div className="mb-6 text-center">
// //               <h2 className="text-2xl font-bold text-foreground">Request a Quote</h2>
// //               <p className="mt-2 text-sm text-muted-foreground">
// //                 Fill out the form below and our sales team will get back to you with pricing and availability.
// //               </p>
// //             </div>

// //             <InquiryForm product={product} />
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // }
// // 'use client';

// import { useEffect, useState } from 'react';
// import { X, ChevronRight, Download, FileText, CheckCircle2 } from 'lucide-react';
// import { InquiryForm } from '@/components/InquiryForm';
// import type { Product } from '@/types';

// interface ProductInquiryModalProps {
//   product: Product;
//   /** Controlled open state — if omitted, the modal manages its own state via the built-in trigger button. */
//   open?: boolean;
//   onOpenChange?: (open: boolean) => void;
//   /** Which download the user was trying to get, so we can offer it after a successful submission. */
//   pendingDownload?: 'datasheet' | 'userManual' | null;
// }

// export function ProductInquiryModal({
//   product,
//   open: controlledOpen,
//   onOpenChange,
//   pendingDownload = null,
// }: ProductInquiryModalProps) {
//   const [internalOpen, setInternalOpen] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   // Support both controlled (from parent page) and uncontrolled (built-in trigger) usage
//   const isControlled = controlledOpen !== undefined;
//   const open = isControlled ? controlledOpen : internalOpen;
//   const setOpen = (value: boolean) => {
//     if (isControlled) {
//       onOpenChange?.(value);
//     } else {
//       setInternalOpen(value);
//     }
//   };

//   // Reset the "submitted" view each time the modal is freshly opened
//   useEffect(() => {
//     if (open) setSubmitted(false);
//   }, [open]);

//   // close on Escape + lock body scroll while open
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setOpen(false);
//     };
//     document.addEventListener('keydown', onKey);
//     const prevOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.body.style.overflow = prevOverflow;
//     };
//   }, [open]);

//   const handleDownload = async (url: string, filename: string) => {
//     try {
//       const res = await fetch(url);
//       const blob = await res.blob();
//       const pdfBlob = new Blob([blob], { type: 'application/pdf' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(pdfBlob);
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(link.href);
//     } catch (err) {
//       console.error('Download failed:', err);
//     }
//   };

//   const datasheetUrl = product.downloads?.datasheet?.url;
//   const userManualUrl = product.downloads?.userManual?.url;

//   return (
//     <>
//       {/* Built-in trigger — only rendered when the modal isn't externally controlled */}
//       {!isControlled && (
//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           className="inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90"
//         >
//           Request Product Inquiry
//           <ChevronRight className="h-4 w-4" />
//         </button>
//       )}

//       {open && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
//           onClick={() => setOpen(false)}
//         >
//           <div
//             className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               type="button"
//               onClick={() => setOpen(false)}
//               className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
//               aria-label="Close"
//             >
//               <X className="h-4 w-4" />
//             </button>

//             {!submitted ? (
//               <>
//                 <div className="mb-6 text-center">
//                   <h2 className="text-2xl font-bold text-foreground">
//                     {pendingDownload ? 'Get the Document' : 'Request a Quote'}
//                   </h2>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     {pendingDownload
//                       ? `Fill out the form below and we'll unlock the ${
//                           pendingDownload === 'datasheet' ? 'datasheet' : 'user manual'
//                         } for download.`
//                       : "Fill out the form below and our sales team will get back to you with pricing and availability."}
//                   </p>
//                 </div>

//                 <InquiryForm product={product} onSuccess={() => setSubmitted(true)} />
//               </>
//             ) : (
//               <div className="flex flex-col items-center py-6 text-center">
//                 <CheckCircle2 className="h-12 w-12 text-destructive" />
//                 <h2 className="mt-4 text-2xl font-bold text-foreground">Thank you!</h2>
//                 <p className="mt-2 max-w-sm text-sm text-muted-foreground">
//                   {pendingDownload
//                     ? 'Your request has been received. You can now download the file below.'
//                     : "We've received your inquiry and our sales team will get back to you shortly."}
//                 </p>

//                 <div className="mt-6 flex flex-wrap justify-center gap-3">
//                   {(pendingDownload === 'datasheet' || pendingDownload === null) && datasheetUrl && (
//                     <button
//                       type="button"
//                       onClick={() => handleDownload(datasheetUrl, 'datasheet.pdf')}
//                       className="inline-flex items-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white hover:bg-destructive/90"
//                     >
//                       <Download className="h-4 w-4" />
//                       Download Datasheet
//                     </button>
//                   )}
//                   {(pendingDownload === 'userManual' || pendingDownload === null) && userManualUrl && (
//                     <button
//                       type="button"
//                       onClick={() => handleDownload(userManualUrl, 'user-manual.pdf')}
//                       className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
//                     >
//                       <FileText className="h-4 w-4" />
//                       Download User Manual
//                     </button>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => setOpen(false)}
//                   className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground"
//                 >
//                   Close
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import { X, ChevronRight, Download, FileText, CheckCircle2 } from 'lucide-react';
import { InquiryForm } from '@/components/InquiryForm';
import type { Product } from '@/types';

interface ProductInquiryModalProps {
  product: Product;
  /** Controlled open state — if omitted, the modal manages its own state via the built-in trigger button. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Which download the user was trying to get, so we can offer it after a successful submission. */
  pendingDownload?: 'datasheet' | 'userManual' | 'both' | null;
}

export function ProductInquiryModal({
  product,
  open: controlledOpen,
  onOpenChange,
  pendingDownload = null,
}: ProductInquiryModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Support both controlled (from parent page) and uncontrolled (built-in trigger) usage
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  // Reset the "submitted" view each time the modal is freshly opened
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  // close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const datasheetUrl = product.downloads?.datasheet?.url;
  const userManualUrl = product.downloads?.userManual?.url;

  // Show the datasheet button when it was specifically requested, or when both were requested together
  const showDatasheet = (pendingDownload === 'datasheet' || pendingDownload === 'both') && datasheetUrl;
  const showUserManual = (pendingDownload === 'userManual' || pendingDownload === 'both') && userManualUrl;

  const documentLabel =
    pendingDownload === 'both'
      ? 'datasheet and user manual'
      : pendingDownload === 'datasheet'
      ? 'datasheet'
      : 'user manual';

  return (
    <>
      {/* Built-in trigger — only rendered when the modal isn't externally controlled */}
      {!isControlled && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-destructive px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90"
        >
          Request Product Inquiry
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-foreground">
                    {pendingDownload ? 'Get the Document' : 'Request a Quote'}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pendingDownload
                      ? `Fill out the form below and we'll unlock the ${documentLabel} for download.`
                      : "Fill out the form below and our sales team will get back to you with pricing and availability."}
                  </p>
                </div>

                <InquiryForm product={product} onSuccess={() => setSubmitted(true)} />
              </>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-destructive" />
                <h2 className="mt-4 text-2xl font-bold text-foreground">Thank you!</h2>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {pendingDownload
                    ? 'Your request has been received. You can now download the file(s) below.'
                    : "We've received your inquiry and our sales team will get back to you shortly."}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {showDatasheet && (
                    <button
                      type="button"
                      onClick={() => handleDownload(datasheetUrl!, 'datasheet.pdf')}
                      className="inline-flex items-center gap-2 rounded-md bg-destructive px-5 py-3 text-sm font-semibold text-white hover:bg-destructive/90"
                    >
                      <Download className="h-4 w-4" />
                      Download Datasheet
                    </button>
                  )}
                  {showUserManual && (
                    <button
                      type="button"
                      onClick={() => handleDownload(userManualUrl!, 'user-manual.pdf')}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground hover:bg-accent"
                    >
                      <FileText className="h-4 w-4" />
                      Download User Manual
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}