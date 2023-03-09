export const formatYMD = (date: string) => {
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
export const formatYYYYMMDD = (date: string) => {
  const d = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return d.split('/').reverse().join('.');
};
