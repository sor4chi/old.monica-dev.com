export const dateToYMD = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const dateToPassedTimeByNow = (date: string | Date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const diffHour = Math.floor(diff / (1000 * 60 * 60));
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonth = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const diffYear = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  if (diffHour < 24) return `${diffHour} hours ago`;
  if (diffDay < 30) return `${diffDay} days ago`;
  if (diffMonth < 12) return `${diffMonth} months ago`;
  return `${diffYear} years ago`;
};

/**
 * 日付をリッチな表示にして返す
 * @param date
 *
 * ex)
 * ```typescript
 * const date = new Date(2023, 0, 1, 2, 3, 4);
 *
 * const richText = dateToRichDisplay(date);
 * console.log(richText); // Jan 1, 2023
 */
export const dateToRichDisplay = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  return `${month} ${day}, ${year}`;
};

/**
 * 日時をリッチな表示にして返す
 * @param date
 *
 * ex)
 * ```typescript
 * const date = new Date(2023, 0, 1, 2, 3, 4);
 *
 * const richText = dateToRichDisplayWithTime(date);
 * console.log(richText); // Jan 1, 2023 2:03 AM
 * ```
 */
export const dateTimeToRichDisplay = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const day = d.getDate();
  const hour = d.getHours();
  const minute = ('0' + d.getMinutes()).slice(-2);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${ampm} · ${month} ${day}, ${year}`;
}


