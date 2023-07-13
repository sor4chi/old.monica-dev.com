// new Date('2023-01-01T00:00:00.000Z') -> 'Jan 1'
export const getMonthDay = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
};
