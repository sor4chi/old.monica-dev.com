/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    domains: ['zenn.dev', 'cdn.qiita.com', 'note.com'],
  },
};

module.exports = nextConfig;
