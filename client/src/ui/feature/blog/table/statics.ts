export const TABLE_ROW = ['title', 'createdAt', 'updatedAt', 'publishedAt', 'tags'] as const;
export type TableRowKeys = (typeof TABLE_ROW)[number];
