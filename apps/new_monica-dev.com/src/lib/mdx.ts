import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGFM from 'remark-gfm';
import remarkSlug from 'remark-slug';
import type { PluginTuple } from 'unified';
import { z } from 'zod';

import type { Toc } from './remarkExtractToc';
import { remarkExtractToc } from './remarkExtractToc';

import { replacingMDXComponents } from '@/components/mdx';

const frontmatterSchema = z.object({
  description: z.string(),
  publishedAt: z.string(),
  title: z.string(),
});

const withOptions = <T extends (...args: any[]) => any>(fn: T, ...options: Parameters<T>): PluginTuple => [
  fn,
  ...options,
];

export const mdxCompiler = async (source: string) => {
  const toc: Toc = [];

  const { content, frontmatter } = await compileMDX({
    components: replacingMDXComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [
          withOptions(rehypePrettyCode, {
            grid: true,
            keepBackground: false,
            onVisitTitle: (element) => {
              element.children.unshift({
                children: [],
                properties: {
                  'data-icon': 'file',
                },
                tagName: 'i',
                type: 'element',
              });
            },
            theme: {
              dark: 'github-dark-dimmed',
              light: 'github-light',
            },
          }),
        ],
        remarkPlugins: [
          remarkGFM,
          remarkSlug,
          withOptions(remarkExtractToc, {
            cb: (_toc) => toc.push(..._toc),
            maxDepth: 4,
            minDepth: 2,
          }),
        ],
      },
      parseFrontmatter: true,
    },
    source,
  });

  const validatedFrontmatter = frontmatterSchema.parse(frontmatter);

  return { content, frontmatter: validatedFrontmatter, toc };
};
