import classNames from 'classnames/bind';
import { InputField, Button } from '@/components';
import { GitIcon, GoogleIcon, KakaoIcon } from '@/public/index';
import { useForm } from 'react-hook-form';
import { postSignin } from '@/api/authAPI';
import { getCookie, setCookie } from '@/libs/manageCookie';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './SigninModal.module.scss';

const cn = classNames.bind(styles);

interface Inputs {
  email: string;
  password: string;
}

const AUTH_SECTION = ['아이디 찾기', '비밀번호 찾기', '회원가입'];

export default function SignInModal() {
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const response = await getCookie('accessToken');
        if (response) {
          toast.warning('이미 로그인 되어있습니다');
        }
      } catch (error) {
        console.error('토큰 가져오기 실패');
      }
    };

    checkAccessToken();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const registers = {
    email: register('email', {
      required: '이메일을 입력해주세요.',
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요.',
    }),
  };

  const handleLogin = async (formData: Inputs) => {
    try {
      const responseData = await postSignin(formData);

      if (responseData.status === 'SUCCESS') {
        setCookie('accessToken', responseData.data.accessToken);
        setCookie('refreshToken', responseData.data.refreshToken); // 리프레시 토큰 저장

        window.location.reload();
      } else if (responseData.status === 'FAIL') {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('로그인 요청 실패', error);
    }
  };

  const handleKakaoOauth = async (provider: string) => {
    window.location.href = `http://43.201.71.50:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>로그인</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className={cn('input-wrapper')}>
          <InputField
            label='이메일'
            placeholder='이메일을 입력해주세요'
            sizeVariant='md'
            labelSize='sm'
            errorMessage={errors.email?.message}
            {...registers.email}
          />
          <InputField
            label='비밀번호'
            placeholder='비밀번호를 입력해주세요'
            sizeVariant='md'
            labelSize='sm'
            type='password'
            suffixIcon='eye'
            errorMessage={errors.password?.message}
            {...registers.password}
          />
        </div>
        <div className={cn('auth-section-wrapper')}>
          {AUTH_SECTION.map((text, i) => (
            <div key={text} className={cn('auth-section')}>
              <p>{text}</p>
              {i === 2 || <div className={cn('bar')}>|</div>}
            </div>
          ))}
        </div>
        <Button className={cn('button')} fontSize={24} type='submit'>
          로그인
        </Button>
      </form>

      <div className={cn('o-auth-wrapper')}>
        <p>간편 로그인 하기</p>
        <div className={cn('icons')}>
          <GitIcon onClick={() => handleKakaoOauth('github')} />
          <GoogleIcon onClick={() => handleKakaoOauth('google')} />
          <KakaoIcon onClick={() => handleKakaoOauth('kakao')} />
        </div>
      </div>
    </div>
  );
}
