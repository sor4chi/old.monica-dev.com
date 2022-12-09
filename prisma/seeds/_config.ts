export const SEEDER_CONFIG = {
  BLOG_LENGTH: 20,
  BLOG_TAG_LENGTH: 3,
  BLOG_PROVIDER_LIST: [
    {
      name: 'Note',
      slug: 'note',
      favicon: 'https://note.com/favicon.ico',
    },
    {
      name: 'Zenn',
      slug: 'zenn',
      favicon: 'https://zenn.dev/favicon.ico',
    },
    {
      name: 'Qiita',
      slug: 'qiita',
      favicon:
        'https://cdn.qiita.com/assets/favicons/public/production-c620d3e403342b1022967ba5e3db1aaa.ico',
    },
  ],
  ROLE_LIST: ['ADMIN', 'USER'],
  TIMELINE_TYPE_LIST: ['TEXT', 'LINK', 'IMAGE', 'TWEET'],
} as const;
