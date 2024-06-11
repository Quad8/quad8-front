import classNames from 'classnames/bind';
import { InputField } from '@/components';
import Button from '@/components/Button/Button';
import GitIcon from '@/public/svgs/GitHub.svg';
import GoogleIcon from '@/public/svgs/Google.svg';
import KakaoIcon from '@/public/svgs/kakaotalk.svg';
import styles from './SigninModal.module.scss';

const cn = classNames.bind(styles);

const AUTH_SECTION = ['아이디 찾기', '비밀번호 찾기', '회원가입'];

export default function SignInModal() {
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>로그인</h1>
      <div className={cn('input-wrapper')}>
        <InputField label='이메일' placeholder='이메일을 입력해주세요' sizeVariant='md' labelSize='sm' />
        <InputField
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          sizeVariant='md'
          labelSize='sm'
          type='password'
          suffixIcon='eye'
        />
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
