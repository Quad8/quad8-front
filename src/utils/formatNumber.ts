export const formatNumber = (value: string | number) => {
  const targetValue = value.toString();
  return targetValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
