/**
 * Date 형태로 들어오는 값을 yyyy.mm.dd 형태의 문자열로 변환해주는 함수입니다.
 * @param date - Date 타입의 값을 넣어주세요.
 * @returns yyyy.mm.dd 형태의 문자열
 */

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const dateString = `${year}.${month}.${day}`;
  return dateString;
};
