'use client';

import classNames from 'classnames/bind';
import { useForm, FieldValues } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { getCheckEmailDuplication, getCheckNicknameDuplication, postSignup } from '@/api/authAPI';
import { changePhoneNumber, unFormatPhoneNumber } from '@/libs';
import { Button, RadioField, InputField } from '@/components';
import { REGEX, ERROR_MESSAGE, PLACEHOLDER } from '@/constants/signUpConstants';
import AgreementCheckbox from './AgreementCheckbox';

import styles from './SignupForm.module.scss';

const cn = classNames.bind(styles);

const defaultInputValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  birth: '',
  phone: '',
  gender: '',
  nickname: '',
  imgUrl: '',
};

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    trigger,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: defaultInputValues,
  });

  const [isAgreementAllChecked, setIsAgreementAllChecked] = useState(false);

  const handleCheckDuplicatedEmail = async () => {
    const emailValue = getValues('email');
    const isDuplicated = await getCheckEmailDuplication(emailValue);

    if (isDuplicated.data === true) {
      setError('email', {
        message: '중복된 이메일입니다.',
      });
    }
  };

  const handleCheckDuplicatedNickname = async () => {
    const nicknameValue = getValues('nickname');
    const isDuplicated = await getCheckNicknameDuplication(nicknameValue);

    if (isDuplicated.data === true) {
      setError('nickname', {
        message: '중복된 닉네임입니다.',
      });
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  const registers = {
    email: register('email', {
      required: ERROR_MESSAGE.EMAIL.required,
      pattern: {
        value: REGEX.EMAIL,
        message: ERROR_MESSAGE.EMAIL.invalid,
      },
      onBlur: () => handleCheckDuplicatedEmail(),
    }),

    password: register('password', {
      required: ERROR_MESSAGE.PASSWORD.required,
      pattern: {
        value: REGEX.PASSWORD,
        message: ERROR_MESSAGE.PASSWORD.invalid,
      },
      onBlur: () => {
        trigger('passwordConfirm');
      },
    }),

    passwordConfirm: register('passwordConfirm', {
      required: ERROR_MESSAGE.PASSWORD_CONFIRM.required,
      validate: (value) => value === getValues('password') || ERROR_MESSAGE.PASSWORD_CONFIRM.invalid,
    }),

    nickname: register('nickname', {
      required: ERROR_MESSAGE.NICKNAME.required,
      minLength: { value: 2, message: ERROR_MESSAGE.NICKNAME.invalid },
      maxLength: { value: 16, message: ERROR_MESSAGE.NICKNAME.invalid },
      onBlur: () => handleCheckDuplicatedNickname(),
    }),

    phone: register('phone', {
      required: ERROR_MESSAGE.PHONE.required,
      setValueAs: (value) => unFormatPhoneNumber(value),
      onChange: (e) => handlePhoneChange(e),
    }),

    birth: register('birth', {
      required: ERROR_MESSAGE.BIRTH.required,
      pattern: {
        value: REGEX.BIRTH,
        message: ERROR_MESSAGE.BIRTH.invalid,
      },
    }),
    gender: register('gender', {
      required: ERROR_MESSAGE.GENDER.required,
      setValueAs: (value) => (value === '여자' ? 'FEMALE' : 'MALE'),
    }),
  };

  const onSubmit = async (payload: FieldValues) => {
    const fetchFormData = new FormData();

    if (isAgreementAllChecked) {
      fetchFormData.append('joinRequest', JSON.stringify(payload));
      const response = await postSignup(fetchFormData);
      if (response.status === 'SUCCESS') {
        toast.success('회원가입이 성공적으로 완료되었습니다.');
        setTimeout(() => {
          router.back();
        }, 2000);
      } else if (response.status === 'FAIL') {
        toast.error(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('container')}>
        <h1 className={cn('title')}>회원가입</h1>
        <div className={cn('content-wrapper')}>
          <div className={cn('input-wrapper')}>
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
              label='닉네임'
              placeholder={PLACEHOLDER.NICKNAME}
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
            <RadioField
              label='성별'
              options={['남자', '여자']}
              errorMessage={errors.gender?.message}
              {...registers.gender}
            />
          </div>
          <AgreementCheckbox setIsAllChecked={setIsAgreementAllChecked} />
        </div>
      </div>
      <Button
        type='submit'
        disabled={!isValid}
        className={cn('button')}
        fontSize={24}
        backgroundColor={isValid ? 'background-primary' : 'background-gray-40'}
      >
        회원가입
      </Button>
    </form>
  );
}
