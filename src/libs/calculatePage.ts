const calculateStartPageNum = (currentPage: number, maxPageLength: number): number => {
  return Math.floor((currentPage - 1) / maxPageLength) * maxPageLength + 1;
};

export default calculateStartPageNum;
