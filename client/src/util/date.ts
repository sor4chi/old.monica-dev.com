export const getSafelyDate = (date: Date | string) => {
  if (typeof date === 'string') {
    // for safari safe-date-format
    date = date.replace(/-/g, '/'); // replace - with /
    date = date.replace(/T/, ' '); // replace T with a space, T means time zone
    date = date.replace(/\..+/, ''); // delete the dot and everything after, dot means milliseconds
    date = date.split(' ').slice(0, 2).join(' '); // delete the time zone
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
  const tmp = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const [m, d, y] = tmp.split('/');
  return `${y}.${m}.${d}`;
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

/**
 * Format date to How past from now
 * @param date
 * @returns string
 * @example
 * 2020-01-01 -> 1 year ago
 * 2020-01-01T00:00:00 -> 1 year ago
 */
export const formatDateToHowPastFromNow = (date: Date | string) => {
  const now = new Date();
  date = getSafelyDate(date);
  const diff = now.getTime() - date.getTime();
  const diffMin = diff / (1000 * 60);
  const diffHour = diff / (1000 * 60 * 60);
  const diffDay = diff / (1000 * 60 * 60 * 24);
  const diffMonth = diffDay / 30;
  const diffYear = diffMonth / 12;

  if (diffYear >= 1) {
    return formatDateEn(date);
  }
  if (diffMonth >= 1) {
    return `${Math.floor(diffMonth)} month${Math.floor(diffMonth) > 1 ? 's' : ''} ago`;
  }
  if (diffDay >= 1) {
    return `${Math.floor(diffDay)} day${Math.floor(diffDay) > 1 ? 's' : ''} ago`;
  }
  if (diffHour >= 1) {
    return `${Math.floor(diffHour)} hour${Math.floor(diffHour) > 1 ? 's' : ''} ago`;
  }
  if (diffMin >= 1) {
    return `${Math.floor(diffMin)} minute${Math.floor(diffMin) > 1 ? 's' : ''} ago`;
  }
  return 'just now';
};
