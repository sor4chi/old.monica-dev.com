const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const { serverEnv: _ } = require('./src/env/server');

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'monica-log-dev.s3.ap-northeast-1.amazonaws.com',
      'monica-log.s3.ap-northeast-1.amazonaws.com',
    ],
  },
  redirects: async () => [
    {
      destination: '/blog',
      permanent: true,
      source: '/blog/page',
    },
  ],
};

module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));
