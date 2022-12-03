import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const scheme = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') return handleFormPost(req, res);
  res.status(405).end();
}

const handleFormPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const formReq = scheme.safeParse(req.body);
  if (!formReq.success) {
    res.status(400).send('Invalid request');
    return;
  }

  const { name, email, message } = formReq.data;

  if (!process.env.DISCORD_WEBHOOK_URL)
    throw new Error('Missing DISCORD_WEBHOOK_URL');
  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: `**${name}** (${email})\n${message}`,
    }),
  });

  res.status(200).end();
};

export const postContact = async ({
  name,
  email,
  message,
}: z.infer<typeof scheme>) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });

  if (!res.ok) throw new Error('Failed to send contact form');
  return res;
};
