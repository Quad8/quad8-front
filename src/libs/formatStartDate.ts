export const formatStartDate = (date: Date): string => {
  const KST_OFF_SET = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + KST_OFF_SET);
  return kstDate.toISOString().replace('Z', '+09:00');
};
