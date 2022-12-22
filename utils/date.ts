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
