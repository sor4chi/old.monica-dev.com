import { load } from 'js-yaml';
import { compileMDX } from 'next-mdx-remote/rsc';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';

const frontmatterSchema = z.object({
  description: z.string(),
  publishedAt: z.string(),
  title: z.string(),
});

export const mdxCompiler = async (source: string) => {
  const { content, frontmatter } = await compileMDX({
    components: {
      Button,
    },
    options: {
      parseFrontmatter: true,
    },
    source,
  });

  const validatedFrontmatter = frontmatterSchema.parse(frontmatter);

  return { content, frontmatter: validatedFrontmatter };
};

const ymlFrontmatterSchema = z.object({
  href: z.string(),
  publishedAt: z.string(),
  title: z.string(),
});

export const ymlCompiler = async (source: string) => {
  const frontmatter = load(source);

  const validatedFrontmatter = ymlFrontmatterSchema.parse(frontmatter);

  return { frontmatter: validatedFrontmatter };
};
