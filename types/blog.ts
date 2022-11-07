export interface Blog {
  type: 'zenn' | 'qiita' | 'original';
  title: string;
  url?: string;
  slug?: string;
  date: string;
  tags: string[];
  description: string;
  published: boolean;
}

export interface ZennFeed {
  rss: {
    channel: {
      item: {
        title: string;
        link: string;
        pubDate: string;
        category: string[];
        description: string;
      }[];
    };
  };
}

export type QiitaAPI = {
  title: string;
  url: string;
  created_at: string;
  tags: {
    name: string;
  }[];
  body: string;
}[];

export interface OriginalBlogFrontMatter {
  title: string;
  date: string;
  tags: string;
  description: string;
  published: boolean;
}

export interface BlogDetail extends Blog {
  content: string;
}
