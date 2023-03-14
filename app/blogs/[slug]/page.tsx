import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

import { parseHTMLToReactJSX, parseMarkdownToHTML } from '#/lib/markdown';
import { prisma } from '#/lib/prisma';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';
import { dateToYMD } from '#/utils/date';

import Image from 'next/image';

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

async function getData(params: { slug: string }) {
  const res = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: {
      tags: {
        include: { tag: true },
      },
      provider: true,
    },
  });

  if (!res) return notFound();
  if (!res.published) return notFound();
  if (res.link) return notFound();

  // if link is not null, content must be not null. But, just in case.
  if (!res.content) return notFound();

  return {
    ...res,
    md: parseMarkdownToHTML(res.content),
  };
}

export default function Page({ params }: { params?: any }) {
  const blog = use(getData(params));

  return (
    <div className="m-auto flex max-w-5xl gap-4 p-4">
      <article className="use-markdown max-w-full flex-1">
        {blog.md.content ? (
          parseHTMLToReactJSX(blog.md.content + blog.md.content)
        ) : (
          <p>
            Markdownが正しく解析できませんでした。
            もし、このページが表示されている場合は、
            <Link href="https://twitter.com/monica18_pr">Twitter</Link>
            にてご連絡ください。
          </p>
        )}
      </article>
      <aside className="common-card sticky top-20 h-min max-w-xs flex-1 p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold">タグ</h3>
            <div className="flex flex-wrap gap-1">
              {blog.tags.map((tag) => (
                <Link href={`/tags/${tag.tag.name}`} key={tag.tag.name}>
                  <a className="text-sm text-neutral-600 dark:text-neutral-400">
                    {tag.tag.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-bold">投稿日</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {dateToYMD(blog.createdAt)}
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-bold">更新日</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {dateToYMD(blog.updatedAt)}
            </p>
          </div>
          <hr />
          <div className="flex items-center justify-between gap-1">
            <h3 className="font-bold">投稿者</h3>
            <div className="flex flex-col gap-1"></div>
            <p className="inline-flex items-center justify-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <Image
                src="https://avatars.githubusercontent.com/u/80559385?v=4"
                width={24}
                height={24}
                alt="sor4chi"
                className="rounded-full"
              />
              @sor4chi
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
