const FIRST_CONSTANT = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

const OFFSET = '가'.charCodeAt(0);

const FIRST_OFFSET_RANGE = Math.floor('까'.charCodeAt(0) - '가'.charCodeAt(0));
const MIDDLE_OFFSET_RANGE = Math.floor('개'.charCodeAt(0) - '가'.charCodeAt(0));

const charCode = (first: number, middle: number, last: number) => {
  return String.fromCharCode(OFFSET + first * FIRST_OFFSET_RANGE + middle * MIDDLE_OFFSET_RANGE + last);
};

export const charMatcher = (search = '') => {
  const regex = FIRST_CONSTANT.reduce(
    (acc, first, index) =>
      acc.replace(new RegExp(first, 'g'), `[${charCode(index, 0, 0)}-${charCode(index + 1, 0, -1)}]`),
    search,
  );

  return new RegExp(`(${regex})`, 'g');
};
