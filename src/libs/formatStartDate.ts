export const formatStartDate = (date: Date): string => {
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffset);
  return kstDate.toISOString().replace('Z', '+09:00');
};
