export const formatYMD = (date: Date | string) => {
  const d = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return d;
};

/**
 * Format date to YYYY.MM.DD
 * @param date
 * @returns YYYY.MM.DD(string)
 */
export const formatYYYYMMDD = (date: Date | string) => {
  const d = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return d.split('/').reverse().join('.');
};

export const formatYYYYMMDDHHMM = (date: Date | string) => {
  const d = new Date(date).toLocaleDateString('ja-JP', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return d;
};
