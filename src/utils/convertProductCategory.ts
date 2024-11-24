export const convertCategory = (category: string) => {
  if (category === 'keyboard' || category === 'keycap' || category === 'switch') {
    return category;
  }
  return 'etc';
};
