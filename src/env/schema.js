// @ts-check
const { z } = require('zod');

/**
 * サーバー側で使う環境変数のスキーマを定義
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

/**
 * クライアント側で使う環境変数のスキーマを定義
 * クライアント側に公開するには、`NEXT_PUBLIC_` プレフィックスをつける
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SITE_NAME: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

/**
 * クライアント側で使う環境変数を定義
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
const clientEnv = {
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
};

// エクスポート
module.exports = {
  clientEnv,
  clientSchema,
  serverSchema,
};
