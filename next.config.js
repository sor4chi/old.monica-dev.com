/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    domains:
      process.env.NODE_ENV === 'development'
        ? [
            'zenn.dev',
            'cdn.qiita.com',
            'note.com',
            'loremflickr.com',
            'pbs.twimg.com',
            'avatars.githubusercontent.com',
          ]
        : ['pbs.twimg.com'],
  },
};

module.exports = nextConfig;
