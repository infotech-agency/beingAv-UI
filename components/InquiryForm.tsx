// // import { useState, useRef } from 'react';
// // import type { Product } from '@/types';
// // import { api } from '@/lib/api';
// // import { Loader2, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';

// // interface InquiryFormProps {
// //   product: Product;
// // }

// // export function InquiryForm({ product }: InquiryFormProps) {
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [files, setFiles] = useState<File[]>([]);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError(null);

// //     const form = e.currentTarget;
// //     const formData = new FormData();
// //     const data = new FormData(form);

// //     formData.append('fullName', String(data.get('fullName') || ''));
// //     formData.append('companyName', String(data.get('companyName') || ''));
// //     formData.append('businessEmail', String(data.get('businessEmail') || ''));
// //     formData.append('phone', String(data.get('phone') || ''));
// //     formData.append('countryCode', String(data.get('countryCode') || ''));
// //     formData.append('country', String(data.get('country') || ''));
// //     formData.append('city', String(data.get('city') || ''));
// //     formData.append('jobTitle', String(data.get('jobTitle') || ''));
// //     formData.append(product._id, product._id);
// //     formData.append('productName', product.name);
// //     formData.append('productModelNumber', product.sku);
// //     formData.append('quantity', String(data.get('quantity') || '1'));
// //     formData.append('message', String(data.get('message') || ''));
// //     formData.append('consent', String(data.get('consent') === 'on'));
// //     formData.append('source', 'Product Page');
// //     formData.append('recaptchaToken', 'placeholder-token');

// //     files.forEach((file) => {
// //       formData.append('attachments', file);
// //     });

// //     const res = await api.submitInquiry(formData);
// //     setLoading(false);

// //     if (res === null) {
// //       setError('Unable to submit your inquiry right now. Please try again or contact us directly.');
// //       return;
// //     }
// //     setSuccess(true);
// //     form.reset();
// //     setFiles([]);
// //   };

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files) {
// //       setFiles(Array.from(e.target.files));
// //     }
// //   };

// //   if (success) {
// //     return (
// //       <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
// //         <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
// //         <h3 className="mt-4 text-lg font-bold text-foreground">Inquiry Received</h3>
// //         <p className="mt-2 text-sm text-muted-foreground">
// //           Your inquiry has been received. Our sales team will contact you soon.
// //         </p>
// //         <button
// //           onClick={() => setSuccess(false)}
// //           className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
// //         >
// //           Submit another inquiry
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-5">
// //       {error && (
// //         <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
// //           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
// //           <p className="text-sm text-red-700">{error}</p>
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
// //         <Field label="Full Name" name="fullName" required />
// //         <Field label="Company Name" name="companyName" required />
// //         <Field label="Business Email" name="businessEmail" type="email" required />
// //         <Field label="Phone" name="phone" type="tel" required />
// //         <Field label="Country Code" name="countryCode" placeholder="+91" required />
// //         <Field label="Country" name="country" required />
// //         <Field label="City" name="city" required />
// //         <Field label="Job Title" name="jobTitle" />
// //       </div>

// //       <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
// //         <div className="sm:col-span-1">
// //           <Field label="Quantity" name="quantity" type="number" defaultValue="1" />
// //         </div>
// //       </div>

// //       <div>
// //         <label className="mb-1.5 block text-sm font-medium text-foreground">
// //           Message
// //         </label>
// //         <textarea
// //           name="message"
// //           rows={4}
// //           className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
// //           placeholder="Tell us about your project requirements..."
// //         />
// //       </div>

// //       <div>
// //         <label className="mb-1.5 block text-sm font-medium text-foreground">
// //           Attachments (optional)
// //         </label>
// //         <div className="flex items-center gap-3">
// //           <input
// //             ref={fileInputRef}
// //             type="file"
// //             multiple
// //             onChange={handleFileChange}
// //             className="hidden"
// //           />
// //           <button
// //             type="button"
// //             onClick={() => fileInputRef.current?.click()}
// //             className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
// //           >
// //             <Upload className="h-4 w-4" />
// //             Choose files
// //           </button>
// //           {files.length > 0 && (
// //             <div className="flex flex-wrap gap-2">
// //               {files.map((file, i) => (
// //                 <span
// //                   key={i}
// //                   className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground"
// //                 >
// //                   {file.name}
// //                   <button
// //                     type="button"
// //                     onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
// //                     className="text-muted-foreground hover:text-destructive"
// //                   >
// //                     <X className="h-3 w-3" />
// //                   </button>
// //                 </span>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <div className="flex items-start gap-3">
// //         <input
// //           type="checkbox"
// //           name="consent"
// //           id="consent"
// //           required
// //           className="mt-1 h-4 w-4 rounded border-border text-destructive focus:ring-destructive"
// //         />
// //         <label htmlFor="consent" className="text-sm text-muted-foreground">
// //           I agree to be contacted by BeingAV regarding my inquiry and accept the privacy policy.
// //         </label>
// //       </div>

// //       <button
// //         type="submit"
// //         disabled={loading}
// //         className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 disabled:opacity-60"
// //       >
// //         {loading ? (
// //           <>
// //             <Loader2 className="h-4 w-4 animate-spin" />
// //             Submitting...
// //           </>
// //         ) : (
// //           'Submit Inquiry'
// //         )}
// //       </button>
// //     </form>
// //   );
// // }

// // function Field({
// //   label,
// //   name,
// //   type = 'text',
// //   required = false,
// //   placeholder,
// //   defaultValue,
// // }: {
// //   label: string;
// //   name: string;
// //   type?: string;
// //   required?: boolean;
// //   placeholder?: string;
// //   defaultValue?: string;
// // }) {
// //   return (
// //     <div>
// //       <label className="mb-1.5 block text-sm font-medium text-foreground">
// //         {label} {required && <span className="text-destructive">*</span>}
// //       </label>
// //       <input
// //         type={type}
// //         name={name}
// //         required={required}
// //         placeholder={placeholder}
// //         defaultValue={defaultValue}
// //         className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
// //       />
// //     </div>
// //   );
// // }

// import { useState, useRef } from 'react';
// import type { Product } from '@/types';
// import { api } from '@/lib/api';
// import { Loader2, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';

// interface InquiryFormProps {
//   product: Product;
//   /** Called after a successful submission — lets a parent (e.g. modal) react, such as showing a custom thank-you/download screen. */
//   onSuccess?: () => void;
// }

// export function InquiryForm({ product, onSuccess }: InquiryFormProps) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [files, setFiles] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const form = e.currentTarget;
//     const formData = new FormData();
//     const data = new FormData(form);

//     formData.append('fullName', String(data.get('fullName') || ''));
//     formData.append('companyName', String(data.get('companyName') || ''));
//     formData.append('businessEmail', String(data.get('businessEmail') || ''));
//     formData.append('phone', String(data.get('phone') || ''));
//     formData.append('countryCode', String(data.get('countryCode') || ''));
//     formData.append('country', String(data.get('country') || ''));
//     formData.append('city', String(data.get('city') || ''));
//     formData.append('jobTitle', String(data.get('jobTitle') || ''));
//     formData.append(product._id, product._id);
//     formData.append('productName', product.name);
//     formData.append('productModelNumber', product.sku);
//     formData.append('quantity', String(data.get('quantity') || '1'));
//     formData.append('message', String(data.get('message') || ''));
//     formData.append('consent', String(data.get('consent') === 'on'));
//     formData.append('source', 'Product Page');
//     formData.append('recaptchaToken', 'placeholder-token');

//     files.forEach((file) => {
//       formData.append('attachments', file);
//     });

//     const res = await api.submitInquiry(formData);
//     setLoading(false);

//     if (res === null) {
//       setError('Unable to submit your inquiry right now. Please try again or contact us directly.');
//       return;
//     }
//     setSuccess(true);
//     form.reset();
//     setFiles([]);
//     onSuccess?.();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   // If a parent handles the success state (via onSuccess), skip this component's
//   // own success screen — the parent will unmount/replace this form instead.
//   if (success && !onSuccess) {
//     return (
//       <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
//         <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
//         <h3 className="mt-4 text-lg font-bold text-foreground">Inquiry Received</h3>
//         <p className="mt-2 text-sm text-muted-foreground">
//           Your inquiry has been received. Our sales team will contact you soon.
//         </p>
//         <button
//           onClick={() => setSuccess(false)}
//           className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
//         >
//           Submit another inquiry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       {error && (
//         <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
//           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
//           <p className="text-sm text-red-700">{error}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//         <Field label="Full Name" name="fullName" required />
//         <Field label="Company Name" name="companyName" required />
//         <Field label="Business Email" name="businessEmail" type="email" required />
//         <Field label="Phone" name="phone" type="tel" required />
//         <Field label="Country Code" name="countryCode" placeholder="+91" required />
//         <Field label="Country" name="country" required />
//         <Field label="City" name="city" required />
//         <Field label="Job Title" name="jobTitle" />
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
//         <div className="sm:col-span-1">
//           <Field label="Quantity" name="quantity" type="number" defaultValue="1" />
//         </div>
//       </div>

//       <div>
//         <label className="mb-1.5 block text-sm font-medium text-foreground">
//           Message
//         </label>
//         <textarea
//           name="message"
//           rows={4}
//           className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
//           placeholder="Tell us about your project requirements..."
//         />
//       </div>

//       <div>
//         <label className="mb-1.5 block text-sm font-medium text-foreground">
//           Attachments (optional)
//         </label>
//         <div className="flex items-center gap-3">
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
//           >
//             <Upload className="h-4 w-4" />
//             Choose files
//           </button>
//           {files.length > 0 && (
//             <div className="flex flex-wrap gap-2">
//               {files.map((file, i) => (
//                 <span
//                   key={i}
//                   className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs text-foreground"
//                 >
//                   {file.name}
//                   <button
//                     type="button"
//                     onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
//                     className="text-muted-foreground hover:text-destructive"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="flex items-start gap-3">
//         <input
//           type="checkbox"
//           name="consent"
//           id="consent"
//           required
//           className="mt-1 h-4 w-4 rounded border-border text-destructive focus:ring-destructive"
//         />
//         <label htmlFor="consent" className="text-sm text-muted-foreground">
//           I agree to be contacted by BeingAV regarding my inquiry and accept the privacy policy.
//         </label>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 disabled:opacity-60"
//       >
//         {loading ? (
//           <>
//             <Loader2 className="h-4 w-4 animate-spin" />
//             Submitting...
//           </>
//         ) : (
//           'Submit Inquiry'
//         )}
//       </button>
//     </form>
//   );
// }

// function Field({
//   label,
//   name,
//   type = 'text',
//   required = false,
//   placeholder,
//   defaultValue,
// }: {
//   label: string;
//   name: string;
//   type?: string;
//   required?: boolean;
//   placeholder?: string;
//   defaultValue?: string;
// }) {
//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-foreground">
//         {label} {required && <span className="text-destructive">*</span>}
//       </label>
//       <input
//         type={type}
//         name={name}
//         required={required}
//         placeholder={placeholder}
//         defaultValue={defaultValue}
//         className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
//       />
//     </div>
//   );
// }

import { useState } from 'react';
import type { Product } from '@/types';
import { api } from '@/lib/api';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface InquiryFormProps {
  product: Product;
  /** Called after a successful submission — lets a parent (e.g. modal) react, such as showing a custom thank-you/download screen. */
  onSuccess?: () => void;
}

export function InquiryForm({ product, onSuccess }: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData();
    const data = new FormData(form);

    formData.append('fullName', String(data.get('fullName') || ''));
    formData.append('companyName', String(data.get('companyName') || ''));
    formData.append('businessEmail', String(data.get('businessEmail') || ''));
    formData.append('phone', String(data.get('phone') || ''));
    formData.append('countryCode', String(data.get('countryCode') || ''));
    formData.append('country', String(data.get('country') || ''));
    formData.append('city', String(data.get('city') || ''));
    formData.append('jobTitle', String(data.get('jobTitle') || ''));
    formData.append(product._id, product._id);
    formData.append('productName', product.name);
    formData.append('productModelNumber', product.sku);
    formData.append('quantity', String(data.get('quantity') || '1'));
    formData.append('message', String(data.get('message') || ''));
    formData.append('consent', String(data.get('consent') === 'on'));
    formData.append('source', 'Product Page');
    formData.append('recaptchaToken', 'placeholder-token');

    const res = await api.submitInquiry(formData);
    setLoading(false);

    if (res === null) {
      setError('Unable to submit your inquiry right now. Please try again or contact us directly.');
      return;
    }
    setSuccess(true);
    form.reset();
    onSuccess?.();
  };

  // If a parent handles the success state (via onSuccess), skip this component's
  // own success screen — the parent will unmount/replace this form instead.
  if (success && !onSuccess) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-lg font-bold text-foreground">Inquiry Received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your inquiry has been received. Our sales team will contact you soon.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="fullName" required />
        <Field label="Company Name" name="companyName" required />
        <Field label="Business Email" name="businessEmail" type="email" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Country Code" name="countryCode" placeholder="+91" required />
        <Field label="Country" name="country" required />
        <Field label="City" name="city" required />
        <Field label="Job Title" name="jobTitle" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Field label="Quantity" name="quantity" type="number" defaultValue="1" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
          placeholder="Tell us about your project requirements..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border text-destructive focus:ring-destructive"
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          I agree to be contacted by BeingAV regarding my inquiry and accept the privacy policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
      />
    </div>
  );
}