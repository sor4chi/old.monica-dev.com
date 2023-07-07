import { createContext, useContext } from 'react';

export function createCtx<T>() {
  const ctx = createContext<T | undefined>(undefined);
  const useCtx = () => {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtxはProviderの中で使用しようね');
    return c as T;
  };
  return [useCtx, ctx.Provider] as const;
}
