export const escapeEdgeQuotes = (str: string) =>
  str.replace(/^["' ](.*)["' ]$/, '$1');

export const strArrToArr = (str: string) =>
  str.replace(/[\[ \]]/g, '').split(',');
