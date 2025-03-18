/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
};

module.exports = nextConfig;
