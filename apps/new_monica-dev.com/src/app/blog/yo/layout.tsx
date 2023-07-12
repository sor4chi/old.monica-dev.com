import { BlogWrapper } from '@/app/blog/_components/BlogWrapper';
import { generateMetaData } from '@/app/blog/_utils/blogMeta';

const TITLE = 'This is a Yo Blog';
const DESCRIPTION = 'Yo Blog component! Do you like it?';
const PUBLISHED_AT = new Date('2021-10-10');
const THUMBNAIL = '/thumbnails/glass.avif';

export const metadata = generateMetaData({
  description: DESCRIPTION,
  publishedAt: PUBLISHED_AT,
  title: TITLE,
  thumbnail: THUMBNAIL,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogWrapper title={TITLE} description={DESCRIPTION} date={PUBLISHED_AT.toLocaleDateString('ja-JP')} thumbnail={THUMBNAIL}>
      {children}
    </BlogWrapper>
  );
}
