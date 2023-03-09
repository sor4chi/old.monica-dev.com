import { z } from 'zod';

import { customFetch } from '@/util/fetcher';

const allowedOrigins = [process.env.NODE_ENV === 'development' && 'http://localhost:3000', 'https://monica-dev.com'];

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': origin,
      },
    });
  }
  return new Response(null, {
    headers: {
      Allow: 'GET, POST, OPTIONS',
    },
  });
}

const postContactScheme = z.object({
  email: z.string().email(),
  message: z.string().min(1),
  name: z.string().min(1),
});

const statusMessage = {
  Error: 'Error',
  InternalServerError: 'Internal server error',
  InvalidParams: 'Invalid params',
  OK: 'OK',
} as const;

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response(statusMessage.InternalServerError, { status: 500 });
  }

  const body = await request.json();
  const params = postContactScheme.safeParse(body);

  if (!params.success) {
    return new Response(statusMessage.InvalidParams, { status: 400 });
  }

  const { email, message, name } = params.data;

  const response = await fetch(webhookUrl, {
    body: JSON.stringify({
      content: [`**Name:** ${name}`, `**Email:** ${email}`, `**Message:** ${message}`].join('\n'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.ok) {
    return new Response(statusMessage.OK, { status: 200 });
  }

  return new Response(statusMessage.Error, { status: 500 });
}

interface PostContactResponse {
  status: (typeof statusMessage)[keyof typeof statusMessage];
}

export const postContact = async (params: z.infer<typeof postContactScheme>) => {
  return customFetch<PostContactResponse>('/api/contact', {
    body: JSON.stringify(params),
    method: 'POST',
  });
};
