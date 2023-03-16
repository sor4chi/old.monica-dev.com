import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

/**
 * このファイルは、VercelのEdge Functionsを使用しているため、serverEnvを使用できません。
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    let title = '';
    if (hasTitle) {
      // 100文字以上の場合は切り捨てる
      title = searchParams.get('title')?.slice(0, 100) || process.env.NEXT_PUBLIC_SITE_NAME || '';
    } else {
      title = process.env.NEXT_PUBLIC_SITE_NAME || '';
    }

    return new ImageResponse(
      (
        <div
          style={{
            alignItems: 'center',
            backgroundImage: `url(${process.env.NEXT_PUBLIC_SITE_URL}/ogp.png)`,
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'NotoSansJP',
            height: '100%',
            justifyContent: 'center',
            padding: 16 * 7,
            position: 'relative',
            width: '100%',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: 16 * 4,
              fontStyle: 'normal',
              fontWeight: 'bold',
              lineHeight: 1.3,
              wordWrap: 'break-word',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        height: 630,
        width: 1200,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

export const getOgUrl = (title: string) => {
  return `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${title}`;
};
