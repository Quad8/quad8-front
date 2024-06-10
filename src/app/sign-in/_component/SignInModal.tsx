import classNames from 'classnames/bind';
import { InputField } from '@/components';
import styles from './SigninModal.module.scss';

const cn = classNames.bind(styles);

export default function SignInModal() {
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>로그인</h1>
      <div className={cn('input-div')}>
        <InputField label='이메일' placeholder='이메일을 입력해주세요' sizeVariant='lg' />
        <InputField
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          sizeVariant='lg'
          type='password'
          suffixIcon='eye'
        />
      </div>
      <div className={cn('auth-section')}>
        <p>아이디 찾기</p>
        <p>비밀번호 찾기</p>
        <p>회원가입</p>
      </div>
    </div>
  );
}
