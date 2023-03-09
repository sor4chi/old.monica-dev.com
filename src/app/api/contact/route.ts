import { z } from 'zod';

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

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response('No webhook URL', { status: 500 });
  }

  const body = await request.json();
  const params = postContactScheme.safeParse(body);

  if (!params.success) {
    return new Response('Invalid params', { status: 400 });
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
    return new Response('OK');
  }

  return new Response('Error', { status: 500 });
}
