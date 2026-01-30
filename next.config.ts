
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
// @ts-ignore
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: false, // Always enable PWA
  register: true,
  skipWaiting: true,
  // fallbacks: {
  //   document: '/offline', // Fallback for document requests
  // },
  // runtimeCaching is handled by the default workbox config
});

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'mini-market';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}` : '',
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withPWA(withNextIntl(nextConfig));
