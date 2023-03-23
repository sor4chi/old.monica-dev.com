import { clientEnv } from '@/env/client';

export const SITE_CONFIG = {
  AUTHOR: 'Monica',
  BLOG_LENGTH_PER_PAGE: 5,
  DESCRIPTION:
    'MonicaやSor4chiといったハンドルネームで活動しているWebエンジニアのポートフォリオサイトです。プロフィールと制作物、アウトプット用のブログを公開しています。',
  SOCIAL: {
    GITHUB_ID: 'sor4chi',
    TWITTER_ID: 'monica18_pr',
  },
  TITLE: clientEnv.NEXT_PUBLIC_SITE_NAME,
  URL: clientEnv.NEXT_PUBLIC_SITE_URL,
} as const;
