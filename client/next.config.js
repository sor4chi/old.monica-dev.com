const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const { serverEnv: _ } = require('./src/env/server');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  redirects: async () => [
    {
      destination: '/blog',
      permanent: true,
      source: '/blog/page',
    },
  ],
};

module.exports = withVanillaExtract(nextConfig);
