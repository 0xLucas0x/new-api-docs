import { createMDX } from 'fumadocs-mdx/next';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();
const appRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // newapi.pro domains
        'docs.newapi.pro',
        'newapi.pro',
        'www.newapi.pro',
        // newapi.ai domains
        'docs.newapi.ai',
        'newapi.ai',
        'www.newapi.ai',
        // Vercel preview
        'new-api-docs-v1.vercel.app',
      ],
    },
  },
  async headers() {
    return [
      {
        // Apply charset to HTML pages
        source: '/:lang(zh)/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/:lang/llms.mdx/:path*',
      },
    ];
  },
};

export default withMDX(config);
