import type { AlarmDataType } from '@/types/alarmType';

type AlarmCategory = '상품' | '이벤트' | '커뮤니티';
type AlarmCategoryData = Record<AlarmCategory, AlarmDataType[]>;
type UnreadAlarmType = Record<AlarmCategory, number>;

const getAlarmList = (currentCategory: AlarmCategory | '전체', alarmData: AlarmCategoryData) => {
  if (currentCategory === '전체') {
    return [...alarmData['상품'], ...alarmData['이벤트'], ...alarmData['커뮤니티']];
  }
  return alarmData[currentCategory];
};

const getUnreadCount = (currentCategory: AlarmCategory | '전체', unreadCount: UnreadAlarmType) => {
  if (currentCategory === '전체') {
    return Object.values(unreadCount).reduce((acc, value) => acc + value, 0);
  }
  return unreadCount[currentCategory];
};

export const getCurrentAlarm = (
  currentCategory: AlarmCategory | '전체',
  alarmData: AlarmCategoryData,
  unreadCount: UnreadAlarmType,
) => {
  const alarmList = getAlarmList(currentCategory, alarmData).sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );
  const count = getUnreadCount(currentCategory, unreadCount);
  return { alarmList, count };
};
