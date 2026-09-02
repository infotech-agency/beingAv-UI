import { useState } from 'react';
import { api } from '@/lib/api';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await api.submitContact({
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      message: String(data.get('message') || ''),
      recaptchaToken: 'placeholder-token',
    });

    setLoading(false);

    if (res === null) {
      setError('Unable to send your message right now. Please try again or email us directly.');
      return;
    }
    setSuccess(true);
    form.reset();
  };

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h3 className="mt-4 text-lg font-bold text-foreground">Message Sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for reaching out. We will get back to you shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
        >
          Send another message
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

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Name <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          Message <span className="text-destructive">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-input bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-destructive focus:ring-1 focus:ring-destructive"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-destructive px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-destructive/90 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
