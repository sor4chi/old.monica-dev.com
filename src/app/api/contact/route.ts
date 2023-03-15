import { z } from 'zod';

import { serverEnv } from '@/env/server';
import { formatYYYYMMDDHHMM } from '@/util/date';

const allowedOrigins = [serverEnv.NODE_ENV === 'development' && 'http://localhost:3000', 'https://monica-dev.com'];

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

interface contentTemplateParams {
  time: string;
  email: string;
  message: string;
  name: string;
}

const contentTemplate = ({ email, message, name, time }: contentTemplateParams) => `
--------------------------------
**お問い合わせ通知**
${time} に ${serverEnv.NEXT_PUBLIC_SITE_URL} から新たなお問い合わせがありました。

> Name: ${name}様
> Email: ${email}
> Message: ${message}
--------------------------------
`;

export async function POST(request: Request) {
  const webhookUrl = serverEnv.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response(JSON.stringify({ status: statusMessage.InternalServerError }), { status: 500 });
  }

  const body = await request.json();
  const params = postContactScheme.safeParse(body);

  if (!params.success) {
    return new Response(JSON.stringify({ status: statusMessage.InvalidParams }), { status: 400 });
  }

  const { email, message, name } = params.data;

  const response = await fetch(webhookUrl, {
    body: JSON.stringify({
      content: contentTemplate({
        email,
        message,
        name,
        time: formatYYYYMMDDHHMM(new Date().toString()),
      }),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response.ok) {
    return new Response(JSON.stringify({ status: statusMessage.OK }), { status: 200 });
  }

  return new Response(JSON.stringify({ status: statusMessage.Error }), { status: 500 });
}

export interface PostContactResponse {
  status: keyof typeof statusMessage;
}
