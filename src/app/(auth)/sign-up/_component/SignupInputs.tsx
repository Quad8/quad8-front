import { RadioField, InputField } from '@/components';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import type { SignupInfoTypes } from '@/types';
import { forwardRef, Dispatch, SetStateAction, ChangeEvent, useEffect } from 'react';
import { checkEmailDuplication, checkNicknameDuplication, postSignup } from '@/api/authAPI';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { changePhoneNumber, unFormatPhoneNumber } from '@/libs';
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
  passwordConfirm: '',
  birth: '',
  phone: '',
  gender: '',
  nickname: '',
  imgUrl: '',
};

interface SignupInputProps {
  isAgreementAllChecked: boolean;
  setIsAllValid: Dispatch<SetStateAction<boolean>>;
}
export default forwardRef<HTMLFormElement, SignupInputProps>(function SignupInputs(
  { isAgreementAllChecked, setIsAllValid },
  ref,
) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    getFieldState,
    setError,
    trigger,
    setValue,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: initalInputValues,
  });

  const checkFormValidity = async () => {
    const values = getValues();
    const hasError = !!(
      (await getFieldState('email').error) ||
      (await getFieldState('password').error) ||
      (await getFieldState('passwordConfirm').error) ||
      (await getFieldState('nickname').error) ||
      (await getFieldState('phone').error) ||
      (await getFieldState('birth').error) ||
      (await getFieldState('gender').error)
    );

    const isEmpty = Object.entries(values).some(
      ([key, value]) => key !== 'imgUrl' && key !== 'passwordConfirm' && value === '',
    );
    const isValidCheck = !hasError && !isEmpty && isAgreementAllChecked;

    setIsAllValid(isValidCheck);
  };

  useEffect(() => {
    checkFormValidity();
  }, [isAgreementAllChecked]);

  const handleCheckEmailInput = async () => {
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

    const emailValue = getValues('email');
    const isEmpty = !!emailValue === undefined;
    const isNotValid = !emailPattern.test(emailValue);
    const isDuplicated = await checkEmailDuplication(emailValue);

    if (isEmpty) {
      setError('email', {
        message: '이메일을 입력해주세요.',
      });
    }
    if (isNotValid) {
      setError('email', {
        message: '유효한 이메일을 입력해주세요.',
      });
    }
    if (isDuplicated.data === true) {
      setError('email', {
        message: '중복된 이메일입니다.',
      });
    }

    await checkFormValidity();
  };

  const handleCheckNicknameInput = async () => {
    const nicknameValue = getValues('nickname');
    const isEmpty = !!nicknameValue === undefined;
    const isDuplicated = await checkNicknameDuplication(nicknameValue);

    if (isEmpty) {
      setError('nickname', {
        message: '이름을 입력해주세요.',
      });
      return;
    }
    if (isDuplicated.data === true) {
      setError('nickname', {
        message: '중복된 닉네임입니다.',
      });
    }
    await checkFormValidity();
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    if (/^[\d-]*$/.test(phoneValue)) {
      const formattedValue = changePhoneNumber(phoneValue);
      setValue('phone', formattedValue, { shouldValidate: true });
    }
  };

  const registers = {
    email: register('email', {
      required: '이메일을 입력해주세요.',
      pattern: {
        value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        message: '유효한 이메일을 입력해주세요',
      },
      onBlur: () => handleCheckEmailInput(),
    }),
    password: register('password', {
      required: '비밀번호를 입력해주세요.',
      pattern: {
        value: /^[a-zA-ZZ0-9]{8,20}/i,
        message: '비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다.',
      },
      onBlur: () => {
        checkFormValidity();
        trigger('passwordConfirm');
      },
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '비밀번호를 한번 더 입력해주세요.',
      validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
      onBlur: () => checkFormValidity(),
    }),
    nickname: register('nickname', {
      required: '이름을 입력해주세요.',
      onBlur: () => handleCheckNicknameInput(),
    }),
    phone: register('phone', {
      required: '휴대폰 번호를 입력해주세요.',
      pattern: {
        value: /^[0-9]{7,8}/i,
        message: '휴대폰 번호를 확인해주세요.',
      },
      onBlur: () => checkFormValidity(),
      setValueAs: (value) => unFormatPhoneNumber(value),
      onChange: (e) => handlePhoneChange(e),
    }),
    birth: register('birth', {
      required: '생년원일을 입력해주세요.',
      pattern: {
        value: /^(19[0-9][0-9]|20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
        message: '유효한 생년월일을 입력해주세요. 예: YYYYMMDD',
      },
      onBlur: () => checkFormValidity(),
    }),
    gender: register('gender', {
      onBlur: () => checkFormValidity(),
    }),
  };

  const handleFormSubmit = async (formData: Inputs) => {
    const fetchFormData = new FormData();

    const joinRequest = {
      gender: `${formData.gender === '여자' ? 'FEMALE' : 'MALE'}`,
      nickname: formData.nickname,
      phone: formData.phone,
      password: formData.password,
      email: formData.email,
      birth: '1990-01-01',
    };

    if (isAgreementAllChecked) {
      fetchFormData.append('joinRequest', JSON.stringify(joinRequest));
      const responseData = await postSignup(fetchFormData);
      if (responseData.status === 'SUCCESS') {
        toast.success('회원가입이 성공적으로 완료되었습니다.');
        setTimeout(() => {
          router.back();
        }, 2000);
      } else if (responseData.status === 'FAIL') {
        toast.error(responseData.message);
      }
    }
  };

  return (
    <form className={cn('input-wrapper')} onSubmit={handleSubmit(handleFormSubmit)} ref={ref}>
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
          placeholder={PLACEHOLDER.PHONE_NUMBER}
          label='휴대폰 번호'
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
      <RadioField label='성별' options={['남자', '여자']} {...registers.gender} />
    </form>
  );
});
