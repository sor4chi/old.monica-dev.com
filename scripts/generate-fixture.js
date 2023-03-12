const fs = require('fs');

const injectionText = `
この情報を元に、技術ブログの記事を書いてください。
ブログはMarkdownで書いてください。
内容には必要に応じてTableやCodeBlock、画像やリンク、引用にリストなどを使いバリエーションを持たせてください。
titleと全く同じ内容のテキストは含めないでください。
Headingはlevel2からlevel4まで使ってください。
`;

const dynamicData = [
  {
    createdAt: '2022-01-10T15:30:00Z',
    description:
      'コードレビューの効果的な方法と、ツールについて解説します。コードレビューを行うことで、開発者のスキルアップや品質の向上が期待できます。',
    id: '10',
    slug: 'code-review',
    tags: ['コードレビュー', '開発者向け'],
    title: 'コードレビューの効果的な方法とツール',
    updatedAt: '2022-02-10T15:30:00Z',
  },
  {
    createdAt: '2022-01-11T17:45:00Z',
    description:
      '機械学習は、人工知能の分野の一部であり、コンピュータが人間と同じように学習することができるようにするための技術です。',
    id: '11',
    slug: 'introduction-to-machine-learning',
    tags: ['機械学習', '人工知能'],
    title: '機械学習の概要',
    updatedAt: '2022-02-11T17:45:00Z',
  },
  {
    createdAt: '2022-01-12T19:00:00Z',
    description:
      'Reactは、Facebookが開発したJavaScriptのライブラリであり、Webアプリケーションを構築するための人気の高いツールです。',
    id: '12',
    slug: 'getting-started-with-react',
    tags: ['React', 'JavaScript', 'Web開発'],
    title: 'Reactのはじめかた',
    updatedAt: '2022-02-12T19:00:00Z',
  },
  {
    createdAt: '2022-01-13T21:15:00Z',
    description: 'データ構造は、データを効率的に処理するための方法を提供する重要なコンピュータサイエンスの分野です。',
    id: '13',
    slug: 'the-basics-of-data-structures',
    tags: ['データ構造', 'アルゴリズム', 'コンピュータサイエンス'],
    title: 'データ構造の基本',
    updatedAt: '2022-02-13T21:15:00Z',
  },
  {
    createdAt: '2022-01-14T23:30:00Z',
    description:
      'Dockerは、コンテナ仮想化技術を使用してアプリケーションを実行するためのプラットフォームであり、今日のソフトウェア開発において不可欠なツールの1つです。',
    id: '14',
    slug: 'beginners-guide-to-docker',
    tags: ['Docker', 'コンテナ仮想化', 'DevOps'],
    title: 'Docker入門ガイド',
    updatedAt: '2022-02-14T23:30:00Z',
  },
  {
    createdAt: '2022-01-15T01:45:00Z',
    description:
      '人工知能は、ますます重要性を増し、私たちの生活のあらゆる側面に影響を与えるようになっています。この記事では、人工知能の将来について考察しています。',
    id: '15',
    slug: 'the-future-of-artificial-intelligence',
    tags: ['人工知能', '技術の未来'],
    title: '人工知能の未来',
    updatedAt: '2022-02-15T01:45:00Z',
  },
  {
    createdAt: '2022-01-16T04:00:00Z',
    description: 'プログラミングは芸術であるという見方がある。しかし、その芸術はどのようにして生まれるのか？',
    id: '16',
    slug: 'the-art-of-programming',
    tags: ['プログラミング', '芸術', '哲学'],
    title: 'プログラミングの芸術',
    updatedAt: '2022-02-16T04:00:00Z',
  },
  {
    createdAt: '2022-01-17T06:15:00Z',
    description: 'AIは人類の最大の発明の一つと言われる。その力を知れば、未来を切り開くことができる。',
    id: '17',
    slug: 'the-power-of-ai',
    tags: ['AI', '未来', '革命'],
    title: 'AIの力',
    updatedAt: '2022-02-17T06:15:00Z',
  },
  {
    createdAt: '2022-01-18T08:30:00Z',
    description: 'ReactはWeb開発において最も人気のあるフレームワークの一つだ。その本質とは何か？',
    id: '18',
    slug: 'the-essence-of-react',
    tags: ['React', 'フロントエンド', 'Web開発'],
    title: 'Reactの本質',
    updatedAt: '2022-02-18T08:30:00Z',
  },
  {
    createdAt: '2022-01-19T10:45:00Z',
    description: 'ブロックチェーンは今やビジネスの現場で欠かせない技術となっている。その理由を探る。',
    id: '19',
    slug: 'the-rise-of-blockchain',
    tags: ['ブロックチェーン', 'ビジネス', 'テクノロジー'],
    title: 'ブロックチェーンの台頭',
    updatedAt: '2022-02-19T10:45:00Z',
  },
  {
    createdAt: '2022-01-20T13:00:00Z',
    description: 'プログラミングにおいて、デザインパターンは美しく有用なものだ。その魅力を探る。',
    id: '20',
    slug: 'the-beauty-of-design-patterns',
    tags: ['デザインパターン', 'プログラミング', '美学'],
    title: 'デザインパターンの美',
    updatedAt: '2022-02-20T13:00:00Z',
  },
  {
    createdAt: '2022-01-21T15:15:00Z',
    description: 'JavaScriptはWeb開発の世界で最も重要なプログラミング言語の一つだ。その未来にはどんな約束があるのか？',
    id: '21',
    slug: 'the-promise-of-javascript',
    tags: ['JavaScript', 'フロントエンド', 'Web開発'],
    title: 'JavaScriptの約束',
    updatedAt: '2022-02-21T15:15:00Z',
  },
];

const data = [];

const genData = async (dynamicText) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    body: JSON.stringify({
      frequency_penalty: 0,
      messages: [
        {
          content: `
${dynamicText}
${injectionText}
`,
          role: 'user',
        },
      ],
      model: 'gpt-3.5-turbo',
      n: 1,
      presence_penalty: 0,
      temperature: 0.9,
      top_p: 1,
    }),
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  const json = await response.json();
  data.push({
    content: json.choices[0].message.content,
  });
};

(async () => {
  await Promise.all(
    dynamicData.map(async (dynamicText) => {
      await genData(dynamicText);
    }),
  );

  fs.writeFileSync('./data.json', JSON.stringify(data));
})();
