const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
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
