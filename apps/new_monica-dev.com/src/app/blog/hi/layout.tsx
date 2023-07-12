import { BlogWrapper } from '@/app/blog/_components/BlogWrapper';
import { generateMetaData } from '@/app/blog/_utils/blogMeta';

const TITLE = 'This is a CodeBlock';
const DESCRIPTION = 'CodeBlock component';
const PUBLISHED_AT = new Date('2021-10-10');

export const metadata = generateMetaData({
  description: DESCRIPTION,
  publishedAt: PUBLISHED_AT,
  title: TITLE,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogWrapper title={TITLE} description={DESCRIPTION} date={PUBLISHED_AT.toLocaleDateString('ja-JP')}>
      {children}
    </BlogWrapper>
  );
}
