export const useViewTransition = <T extends (...args: any[]) => void>(callback: T) => {
  const startViewTransition = (...args: Parameters<T>) => {
    if (!(document as any).startViewTransition) {
      callback(...args);
      alert('updated with no transition');
      return;
    }

    (document as any).startViewTransition(async () => {
      await Promise.resolve(callback(...args));
    });
  };
  return { startViewTransition };
};
