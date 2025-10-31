/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "hotel-demetra.com",
      "imagedelivery.net",
      "images.unsplash.com",
      "flagcdn.com",
    ],
  },
  // Basic optimizations
  swcMinify: true,
  reactStrictMode: false, // Disable strict mode to avoid double renders in dev
  poweredByHeader: false,
};

module.exports = nextConfig;
