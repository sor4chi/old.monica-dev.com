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
import { BlogDetailWrapper } from '@/app/blog/_components/BlogDetailWrapper';
import { generateBlogMetadata } from '@/app/blog/_utils/blogMeta';

const TITLE = '{{ inputs.title }}';
const DESCRIPTION = '{{ inputs.description }}';
const PUBLISHED_AT = '{{ date }}';
const THUMBNAIL = '';

export const metadata = generateBlogMetadata({
  description: DESCRIPTION,
  publishedAt: PUBLISHED_AT,
  thumbnail: THUMBNAIL,
  title: TITLE,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BlogDetailWrapper
      title={TITLE}
      description={DESCRIPTION}
      date={PUBLISHED_AT}
      thumbnail={THUMBNAIL}
    >
      {children}
    </BlogDetailWrapper>
  );
}

```

# `{{ inputs.slug | lower }}/page.{{ inputs.type }}`

```mdx
```