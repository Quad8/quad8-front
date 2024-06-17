export const formatBirthDate = (value: string): string => {
  const [year, month, day] = value.split('-');
  return `${year} / ${month} / ${day}`;
};
