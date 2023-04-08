export const TABLE_ROWS = ['title', 'tags', 'createdAt', 'updatedAt', 'publishedAt'] as const;
export type TableRowKeys = (typeof TABLE_ROWS)[number];

export const TABLE_ROW_WITH_RATIO = {
  createdAt: 1,
  publishedAt: 1,
  tags: 3,
  title: 3,
  updatedAt: 1,
} satisfies Record<TableRowKeys, number>;

export const TOTAL_RATIO = Object.values(TABLE_ROW_WITH_RATIO).reduce((acc, cur) => acc + cur, 0);
