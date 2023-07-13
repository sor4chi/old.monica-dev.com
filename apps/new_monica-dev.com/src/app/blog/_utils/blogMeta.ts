import type { Metadata } from 'next';

export const generateBlogMetadata = ({
  description,
  publishedAt,
  title,
}: {
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}): Metadata => {
  return {
    description,
    openGraph: {
      description,
      publishedTime: new Date(publishedAt).toISOString(),
      title,
      type: 'article',
    },
    title,
  };
};
