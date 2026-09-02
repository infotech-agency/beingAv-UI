export interface Metadata {
  title?: string | { default?: string; template?: string };
  description?: string;
  metadataBase?: URL;
  openGraph?: Record<string, unknown>;
}
