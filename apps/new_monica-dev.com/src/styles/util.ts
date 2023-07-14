export const staticallySumRems = (...rems: `${number}rem`[]) => {
  const sum = rems.reduce((acc, rem) => {
    const value = parseFloat(rem.replace('rem', ''));
    return acc + value;
  }, 0);
  return `${sum}rem`;
};
