const createBundleAnalyzerPlugin = require('@next/bundle-analyzer');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const { serverEnv: _ } = require('./src/env/server');

const withVanillaExtract = createVanillaExtractPlugin();
const withBundleAnalyzer = createBundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true',
});

const withMdx = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx'],
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = withBundleAnalyzer(withVanillaExtract(withMdx(nextConfig)));
