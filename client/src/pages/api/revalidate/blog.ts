import type { NextApiRequest, NextApiResponse } from 'next';

import { serverEnv } from '@/env/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== serverEnv.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const slug = req.query.slug as string;

  try {
    console.log(`Revalidating: ${slug}`);
    await res.revalidate(`/blog/${slug}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
