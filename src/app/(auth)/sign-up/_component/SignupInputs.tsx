import { RadioField, InputField } from '@/components';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import type { SignupInfoTypes } from '@/types';
import { checkEmailDuplication, checkNicknameDuplication } from '@/api';
import styles from './SignupInputs.module.scss';

const cn = classNames.bind(styles);

interface Inputs extends SignupInfoTypes {
  passwordConfirm: string;
}

const PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '숫자, 영어 포함 8~20자 이내',
  CONFIRM_PASSWORD: '비밀번호를 한번 더 입력해주세요',
  NAME: '이름을 입력해주세요',
  PHONE_NUMBER: '휴대폰 번호 (-없이)를 입력해주세요',
  BIRTHDAY: 'YYYY / MM / DD',
};

const initalInputValues = {
  email: '',
  password: '',
  passwordConfirem: '',
  birth: '',
  phone: '',
  gender: 'MALE',
  nickname: '',
  imgUrl: '',
};

function SignupInputs() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: initalInputValues,
  });

  const handleCheckEmailInput = async () => {
    const emailValue = getValues('email');
    await checkEmailDuplication(emailValue);
  };

  const handleCheckNicknameInput = async () => {
    const nicknameValue = getValues('nickname');
    await checkNicknameDuplication(nicknameValue);
  };

  const registers = {
    email: register('email', {
      required: '이메일을 입력해주세요.',
      pattern: {
        value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        message: '유효한 이메일을 입력해주세요',
      },
      onBlur: () => errors.email || handleCheckEmailInput(),
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요.',
      pattern: {
        value: /^[a-zA-ZZ0-9]{8,20}/i,
        message: '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.',
      },
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '비밀번호를 한번 더 입력해주세요.',
      validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
    }),
    nickname: register('nickname', {
      required: '이름을 입력해주세요.',
      onBlur: () => errors.nickname || handleCheckNicknameInput(),
    }),
    phone: register('phone', {
      required: '휴대폰 번호를 입력해주세요.',
      pattern: {
        value: /^[0-9]{7,8}/i,
        message: '휴대폰 번호를 확인해주세요.',
      },
    }),
    birth: register('birth', {
      required: '생년원일을 입력해주세요.',
      pattern: {
        value: /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/i,
        message: '생년원일을 확인해주세요.',
      },
    }),
    gender: register('gender'),
  };

  return (
    <form className={cn('input-wrapper')}>
      <InputField
        label='이메일'
        placeholder={PLACEHOLDER.EMAIL}
        sizeVariant='md'
        labelSize='sm'
        errorMessage={errors.email?.message}
        {...registers.email}
      />
      <InputField
        label='비밀번호'
        placeholder={PLACEHOLDER.PASSWORD}
        sizeVariant='md'
        labelSize='sm'
        type='password'
        suffixIcon='eye'
        errorMessage={errors.password?.message}
        {...registers.password}
      />
      <InputField
        label='비밀번호 확인'
        placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
        sizeVariant='md'
        labelSize='sm'
        type='password'
        suffixIcon='eye'
        errorMessage={errors?.passwordConfirm?.message}
        {...registers.passwordConfirm}
      />
      <InputField
        label='이름'
        placeholder={PLACEHOLDER.NAME}
        sizeVariant='md'
        labelSize='sm'
        errorMessage={errors.nickname?.message}
        {...registers.nickname}
      />
      <div className={cn('phone-number-wrapper')}>
        <InputField
          disabled
          value='010'
          placeholder={PLACEHOLDER.NAME}
          sizeVariant='md'
          className={cn('phone-number-010')}
        />
        <InputField
          placeholder={PLACEHOLDER.PHONE_NUMBER}
          sizeVariant='md'
          labelSize='sm'
          errorMessage={errors.phone?.message}
          className={cn('phone-number-input')}
          {...registers.phone}
        />
      </div>
      <InputField
        label='생년월일'
        placeholder={PLACEHOLDER.BIRTHDAY}
        sizeVariant='md'
        labelSize='sm'
        errorMessage={errors.birth?.message}
        {...registers.birth}
      />
      <RadioField label='성별' options={['남자', '여자']} errorMessage={errors.gender?.message} {...registers.gender} />
    </form>
  );
}
export default SignupInputs;
