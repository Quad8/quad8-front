export const REGEX = {
  EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  PASSWORD: /^[a-zA-ZZ0-9]{8,20}/i,
  BIRTH: /^(19[0-9][0-9]|20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
};

export const ERROR_MESSAGE = {
  EMAIL: {
    required: '이메일을 입력해주세요.',
    invalid: '유효한 이메일을 입력해주세요',
    isDuplicated: '중복된 이메일입니다.',
  },
  PASSWORD: {
    required: '비밀번호를 입력해주세요',
    invalid: '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.',
  },
  PASSWORD_CONFIRM: {
    required: '비밀번호를 한번 더 입력해주세요.',
    invalid: '비밀번호가 일치하지 않습니다',
  },
  NICKNAME: {
    required: '닉네임을 입력해주세요.',
    invalid: '닉네임은 최소 2글자 이상, 최대 16글자까지 입력할 수 있습니다.',
    isDuplicated: '중복된 닉네임입니다.',
  },
  PHONE: {
    required: '휴대폰 번호를 입력해주세요.',
  },
  BIRTH: {
    required: '생년원일을 입력해주세요.',
    invalid: '유효한 생년월일을 입력해주세요. 예: YYYYMMDD',
  },
  GENDER: {
    required: '성별을 선택해주세요.',
  },
};

export const PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '숫자, 영어 포함 8~20자 이내',
  CONFIRM_PASSWORD: '비밀번호를 한번 더 입력해주세요',
  NICKNAME: '닉네임을 입력해주세요',
  PHONE_NUMBER: '휴대폰 번호 (-없이)를 입력해주세요',
  BIRTHDAY: 'YYYY / MM / DD',
};
