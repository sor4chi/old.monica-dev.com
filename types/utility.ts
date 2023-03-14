export type StringDate<T extends Record<string, any>> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};