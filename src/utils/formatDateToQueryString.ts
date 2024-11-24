export const formatDateToQueryString = (type: 'start' | 'end', date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return type === 'start' ? `${year}-${month}-${day}T00:00:00` : `${year}-${month}-${day}T23:59:59`;
};
