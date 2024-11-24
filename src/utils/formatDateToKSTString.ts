export const formatDateToKSTString = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getFullYear();
  const month = (kstDate.getMonth() + 1).toString().padStart(2, '0');
  const day = kstDate.getDate().toString().padStart(2, '0');
  const hours = kstDate.getHours().toString().padStart(2, '0');
  const minutes = kstDate.getMinutes().toString().padStart(2, '0');

  const dateString = `${year}.${month}.${day} ${hours}:${minutes}`;
  return dateString;
};
