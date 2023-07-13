import { BlogDetailWrapper } from '@/app/blog/_components/BlogDetailWrapper';
import { generateBlogMetadata } from '@/app/blog/_utils/blogMeta';

const TITLE = 'This is a Yo Blog';
const DESCRIPTION = 'Yo Blog component! Do you like it?';
const PUBLISHED_AT = '2021/10/10';
const THUMBNAIL = '/thumbnails/glass.avif';

export const metadata = generateBlogMetadata({
  description: DESCRIPTION,
  publishedAt: PUBLISHED_AT,
  thumbnail: THUMBNAIL,
  title: TITLE,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogDetailWrapper title={TITLE} description={DESCRIPTION} date={PUBLISHED_AT} thumbnail={THUMBNAIL}>
      {children}
    </BlogDetailWrapper>
  );
}
