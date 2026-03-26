import type { Metadata } from 'next';

export function createMetadata(override: Metadata): Metadata {
  const metadataBase =
    override.metadataBase instanceof URL ? override.metadataBase : baseUrl;

  return {
    ...override,
    metadataBase,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/assets/logo.png',
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: metadataBase.origin,
      images: '/assets/logo.png',
      siteName: 'New API',
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/assets/logo.png',
      ...override.twitter,
    },
  };
}

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000');

export const baseUrl = new URL(configuredSiteUrl);
