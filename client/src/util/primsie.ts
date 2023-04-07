export type RemovePromise<T> = T extends Promise<infer U> ? U : T;
