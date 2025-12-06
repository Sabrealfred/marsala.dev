/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  optimizeFonts: false,
  // Optimize for production
  swcMinify: true,
  compress: true,

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },

  // Configure headers for better caching in Netlify
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/(.*).(jpg|jpeg|png|gif|ico|svg|webp|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
