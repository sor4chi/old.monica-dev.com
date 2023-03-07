import { customFetch } from '@/util/fetcher';

interface AboutGetResponse {
  /** 自己紹介 */
  introduction: string;
  /** プロフィール画像のURLs */
  profileImages: {
    /** 画像のURL */
    url: string;
    /** 画像の説明 */
    title: string;
  }[];
  /** Social Links */
  socialLinks: {
    /** Twitter */
    twitter: string;
    /** GitHub */
    github: string;
    /** Qiita */
    qiita: string;
    /** Zenn */
    zenn: string;

    /** その他のSNS */
    other: {
      /** SNS名 */
      name: string;
      /** SNSのURL */
      url: string;
    }[];
  };
  /** Timeline */
  timeline: {
    /** タイトル */
    title: string;
    /** 詳細:Mardown形式 */
    detail: string;
    /** タグ */
    tags: string[];
    /** 開始日 */
    start: string;
    /** 終了日 */
    end?: string;
  }[];
}

const MockAboutResponse = {
  introduction: 'MonicaやSor4chiというハンドルネームで活動しているWebエンジニアです。',
  profileImages: [
    {
      title: '上京したての特に訪れたスカイツリーでの一枚',
      url: '/icon.webp',
    },
  ],
  socialLinks: {
    github: 'https://github.com/sor4chi',
    other: [
      {
        name: 'Portfolio',
        url: 'https://monica-dev.com',
      },
      {
        name: 'Wantedly',
        url: 'https://www.wantedly.com/id/monica18_pr',
      },
    ],
    qiita: 'https://qiita.com/monica_sor4chi',
    twitter: 'https://twitter.com/monica18_pr',
    zenn: 'https://zenn.dev/sor4chi',
  },
  timeline: [
    {
      detail: '- [x] ポートフォリオサイトの作成\n- [x] ポートフォリオサイトのデプロイ',
      end: '2021/04/30',
      start: '2021/04/01',
      tags: ['development'],
      title: 'ポートフォリオサイトの作成',
    },
    {
      detail: '#〇〇部\n部長を務めていた。部員とともに**数学オリンピックなどに出場**（結果は残せませんでした...）',
      end: '2021/03/31',
      start: '2018/04/01',
      tags: ['academic'],
      title: '〇〇高校へ進学',
    },
    {
      detail:
        '## 〇〇サークル\n△△や□□を担当し**HogeHoge**や**FugaFuga**というプロダクトを作成。また、**AAAHackathon**や**BBBCon**といったイベントに参加し、***AAAHackathon***では一般/学生総合で**3位**を獲得。',
      start: '2021/04/01',
      tags: ['academic'],
      title: '〇〇大学へ進学',
    },
  ],
} satisfies AboutGetResponse;

export async function GET(_request: Request) {
  return new Response(JSON.stringify(MockAboutResponse), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const fetchGetAbout = () => customFetch<AboutGetResponse>('/api/about');
