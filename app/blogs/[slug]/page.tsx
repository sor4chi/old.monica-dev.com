import Link from 'next/link';
import { use } from 'react';

import { getOriginalBlog, getOriginalBlogBySlug } from '#/lib/blog';
import { parseHTMLToReactJSX, parseMarkdownToHTML } from '#/lib/markdown';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

export async function generateStaticParams() {
  const blogs = await getOriginalBlog();
  return blogs.map((blog) => ({ slug: blog.slug || '' }));
}

async function getData(params: { slug: string }) {
  const res = await getOriginalBlogBySlug(params.slug);
  return {
    ...res,
    md: parseMarkdownToHTML(res.content),
  };
}

export default function Page({ params }: { params?: any }) {
  const blog = use(getData(params));

  return (
    <div className="max-w-3xl p-4 space-y-6 m-auto">
      <article className="flex-1 dark:prose-invert prose prose-cyan prose-neutral max-w-full">
        {blog.md.content ? (
          parseHTMLToReactJSX(blog.md.content)
        ) : (
          <p>
            Markdownが正しく解析できませんでした。
            もし、このページが表示されている場合は、
            <Link href="https://twitter.com/monica18_pr">Twitter</Link>
            にてご連絡ください。
          </p>
        )}
      </article>
    </div>
  );
}
