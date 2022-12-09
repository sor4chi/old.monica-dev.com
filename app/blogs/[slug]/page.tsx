import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { parseHTMLToReactJSX, parseMarkdownToHTML } from '#/lib/markdown';
import { prisma } from '#/lib/prisma';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

async function getData(params: { slug: string }) {
  const res = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { tags: true, provider: true },
  });

  if (!res) return notFound();

  return {
    ...res,
    md: parseMarkdownToHTML(res.content),
  };
}

export default function Page({ params }: { params?: any }) {
  const blog = use(getData(params));

  return (
    <div className="m-auto max-w-3xl space-y-6 p-4">
      <article className="prose prose-neutral prose-cyan max-w-full flex-1 dark:prose-invert">
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
