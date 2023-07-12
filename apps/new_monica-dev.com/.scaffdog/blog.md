---
name: 'blog'
description: 'Generate new blog post'
root: 'src/app/blog'
output: '.'
ignore: []
questions:
  title: 'Enter title'
  slug: 'Enter slug'
  description: 'Enter description'
  type:
    message: 'Select type'
    choices:
      - 'md'
      - 'mdx'
---

# `{{ inputs.slug | lower }}/layout.tsx`

```tsx
import { BlogWrapper } from '@/app/blog/_components/BlogWrapper';
import { generateMetaData } from '@/app/blog/_utils/blogMeta';

const TITLE = '{{ inputs.title }}';
const DESCRIPTION = '{{ inputs.description }}';
const PUBLISHED_AT = new Date('{{ date }}');
const THUMBNAIL = '';

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

```

# `{{ inputs.slug | lower }}/page.{{ inputs.type }}`

```mdx
```
