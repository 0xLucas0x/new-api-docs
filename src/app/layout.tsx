import type { Viewport, Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Manrope, Noto_Sans_SC } from 'next/font/google';
import './global.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-doc-sans',
  display: 'swap',
});

const headline = Manrope({
  subsets: ['latin'],
  variable: '--font-doc-headline',
  display: 'swap',
});

const cjk = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-doc-cjk',
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.newapi.ai'),
  other: {
    charset: 'utf-8',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${sans.variable} ${headline.variable} ${cjk.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
