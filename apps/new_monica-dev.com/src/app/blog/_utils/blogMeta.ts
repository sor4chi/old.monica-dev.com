import type { Metadata } from 'next';

export const generateMetaData = ({
  description,
  publishedAt,
  title,
}: {
  title: string;
  description: string;
  publishedAt: Date;
  thumbnail: string;
}): Metadata => {
  return {
    description,
    openGraph: {
      description,
      publishedTime: publishedAt.toISOString(),
      title,
      type: 'article',
    },
    title,
  };
};
