type Callback<T extends any[]> = (...args: T) => void;

interface DebouncedFunction<T extends any[]> {
  (...args: T): void;
  cancel: () => void;
}

export function debounce<T extends any[]>(callback: Callback<T>, delay = 250): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>;
  const debounced: DebouncedFunction<T> = (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
}
