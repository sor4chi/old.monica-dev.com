import { load } from 'js-yaml';
import { z } from 'zod';

const ymlSchema = z.object({
  href: z.string(),
  publishedAt: z.string(),
  title: z.string(),
});

export const ymlCompiler = async (source: string) => {
  const frontmatter = load(source);

  const validatedMeta = ymlSchema.parse(frontmatter);

  return { meta: validatedMeta };
};
