export const formatKSTSDate = (date: Date) => {
  const KST_OFF_SET = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + KST_OFF_SET);
  return kstDate.toISOString().split('.')[0];
};
