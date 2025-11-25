
import type { NextConfig } from 'next';
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

const nextConfig: NextConfig = {
  output: 'export',
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

export default withPWA(nextConfig);
