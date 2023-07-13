// new Date('2023-01-01T00:00:00.000Z') -> 'Jan 1'
export const getEnMonthDay = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
};

// new Date('2023-01-01T00:00:00.000Z') -> '2023 Jan 1'
export const getEnYearMonthDay = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};
