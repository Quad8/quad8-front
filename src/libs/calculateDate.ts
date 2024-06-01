export const calculateTimeDifference = (createdTime: Date) => {
  const nowTime = new Date();

  const differenceTime = nowTime.getTime() - createdTime.getTime();
  console.log(nowTime, createdTime);
  return differenceTime;
};
