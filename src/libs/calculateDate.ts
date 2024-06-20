/**
 * 해당 날짜로 부터 얼마나 지났는지를 문자열로 반환하는 함수입니다.
 * @param pastTime 원하는 날짜를 Date 타입으로 넣어주세요.
 * @returns 방금 전, 몇 일 전, 몇 시간 전 형태의 데이터 형식으로 반환돼요.
 */

export const calculateTimeDifference = (pastTime: Date) => {
  const currentTime = new Date();
  const difference = Math.abs(currentTime.getTime() - pastTime.getTime());
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  if (minutes > 0) {
    return `${minutes}분 전`;
  }
  return '방금 전';
};
