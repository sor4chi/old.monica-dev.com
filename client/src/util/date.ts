const getSafelyDate = (date: Date | string) => {
  if (typeof date === 'string') {
    // for safari safe-date-format
    date = date.replace(/-/g, '/'); // replace - with /
    date = date.replace(/T/, ' '); // replace T with a space, T means time zone
    date = date.replace(/\..+/, ''); // delete the dot and everything after, dot means milliseconds
  }
  return new Date(date);
};

/**
 * Format date to English format
 * @param date
 * @returns string
 * @example
 * 2020-01-01 -> January 1, 2020
 * 2020-01-01T00:00:00 -> January 1, 2020
 */
export const formatDateEn = (date: Date | string) => {
  date = getSafelyDate(date);
  const d = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return d;
};

/**
 * Format date to Numeric Date
 * @param date
 * @returns YYYY.MM.DD(string)
 * @example
 * 2020-01-01 -> 2020.01.01
 * 2020-01-01T00:00:00 -> 2020.01.01
 */
export const formatDateNumeric = (date: Date | string) => {
  date = getSafelyDate(date);
  const d = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return d.split('/').reverse().join('.');
};

/**
 * Format date to Full Numeric Date
 * @param date
 * @returns YYYY-MM-DD HH:MM(string)
 * @example
 * 2020-01-01 -> 2020-01-01 00:00
 * 2020-01-01T00:00:00 -> 2020-01-01 00:00
 */
export const formatDateFullNumeric = (date: Date | string) => {
  date = getSafelyDate(date);
  const d = new Date(date).toLocaleDateString('ja-JP', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return d;
};
