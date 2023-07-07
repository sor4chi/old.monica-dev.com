import type { NextApiRequest, NextApiResponse } from 'next';

import { serverEnv } from '@/env/server';

const PATH = `/about`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== serverEnv.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    console.log(`Revalidating: ${PATH}`);
    await res.revalidate(PATH);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}
