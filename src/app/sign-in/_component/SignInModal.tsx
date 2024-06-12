import classNames from 'classnames/bind';
import { InputField, Button } from '@/components';
import { GitIcon, GoogleIcon, KakaoIcon } from '@/public/index';
import { useState, ChangeEvent } from 'react';
import styles from './SigninModal.module.scss';

const cn = classNames.bind(styles);

const AUTH_SECTION = ['아이디 찾기', '비밀번호 찾기', '회원가입'];

export default function SignInModal() {
  const [isError, setIsError] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordlInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const handleError = () => {
    setIsError(!isError);
  };
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>로그인</h1>
      <div className={cn('input-wrapper')}>
        <InputField
          label='이메일'
          placeholder='이메일을 입력해주세요'
          sizeVariant='md'
          labelSize='sm'
          errorMessage={isError ? ' ' : undefined}
          onChange={handleEmailInput}
        />
        <InputField
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          sizeVariant='md'
          labelSize='sm'
          type='password'
          suffixIcon='eye'
          errorMessage={isError ? '이메일 또는 비밀번호를 잘못 입력하였습니다.' : undefined}
          onChange={handlePasswordlInput}
        />
        <Button onClick={handleError} paddingVertical={8} fontSize={14}>
          에러 내기
        </Button>
        email: {emailValue} Password {passwordValue}
      </div>
      <div className={cn('auth-section')}>
        {AUTH_SECTION.map((text, i) => (
          <>
            <p key={text}>{text}</p>
            {i === 2 || <div className={cn('bar')}>|</div>}
          </>
        ))}
      </div>
      <Button className={cn('button')} fontSize={24}>
        로그인
      </Button>
      <div className={cn('o-auth-wrapper')}>
        <p>간편 로그인 하기</p>
        <div className={cn('icons')}>
          <GitIcon />
          <GoogleIcon />
          <KakaoIcon />
        </div>
      </div>
    </div>
  );
}
