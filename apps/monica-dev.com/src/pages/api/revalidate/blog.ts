import type { NextApiRequest, NextApiResponse } from 'next';

import { serverEnv } from '@/env/server';

const PATH = (slug: string) => `/blog/${slug}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== serverEnv.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const slug = req.query.slug as string;

  try {
    console.log(`Revalidating: ${PATH(slug)}`);
    await res.revalidate(PATH(slug));
    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}
