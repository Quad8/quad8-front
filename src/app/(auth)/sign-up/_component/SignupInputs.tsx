import { RadioField, InputField } from '@/components';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { SignupInfoTypes } from '@/types';
import styles from './SignupInputs.module.scss';

const cn = classNames.bind(styles);

interface Inputs extends SignupInfoTypes {
  passwordConfirm: string;
}

const PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '비밀번호를 입력해주세요',
  CONFIRM_PASSWORD: '비밀번호를 한번 더 입력해주세요',
  NAME: '이름을 입력해주세요',
  PHONE_NUMBER: '휴대폰 번호 (-없이)를 입력해주세요',
  BIRTHDAY: 'YYYY / MM / DD',
};

function SignupInputs() {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur' });

  const registers = {
    email: register('email', { required: '이메일을 입력해주세요.' }),
    password: register('password', { required: '비밀번호를 입력해주세요.' }),
    passwordConfirm: register('passwordConfirm', { required: '비밀번호를 한번 더 입력해주세요.' }),
    nickname: register('nickname', { required: '이름을 입력해주세요.' }),
    phone: register('phone', { required: '휴대폰 번호를 입력해주세요.' }),
    birth: register('birth', { required: '생년원일을 입력해주세요.' }),
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
      <div className={cn('phone-number-input')}>
        <InputField
          disabled
          value='010'
          placeholder={PLACEHOLDER.NAME}
          sizeVariant='md'
          className={cn('phone-number')}
        />
        <InputField
          placeholder={PLACEHOLDER.PHONE_NUMBER}
          sizeVariant='md'
          labelSize='sm'
          errorMessage={errors.phone?.message}
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
