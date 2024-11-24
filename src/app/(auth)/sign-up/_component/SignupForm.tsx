'use client';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getCheckEmailDuplication, getCheckNicknameDuplication, postSignup } from '@/api/authAPI';
import { Button, InputField, RadioField } from '@/components';
import { GENDER_OPTION } from '@/constants/dropdownOptions';
import { ERROR_MESSAGE, PLACEHOLDER, REGEX } from '@/constants/signUpConstants';
import { changePhoneNumber } from '@/utils/changePhoneNumber';
import { formatOnInputBirthChange, unFormatBirthDate } from '@/utils/formatBirthDate';
import { unFormatPhoneNumber } from '@/utils/unFormatPhoneNumber';
import { CaretRightIcon, CheckboxCircleIcon } from '@/public/index';
import { QueryObserver, useQueryClient } from '@tanstack/react-query';
import { TermsAgreement } from './TermsAgreement';

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
  checkAll: false,
  check1: false,
  check2: false,
};

const NOT_CHECKED = '#A5A5A5';
const CHECKED = '#4968f6';

export default function SignupForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const observer = new QueryObserver(queryClient, { queryKey: ['userData'] });

    const unsubscribe = observer.subscribe((userData) => {
      if (userData?.data) {
        router.back();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, router]);

  const [isAgreementOpen, setIsAgreementOpen] = useState({
    first: false,
    second: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    setValue,
    watch,
  } = useForm({
    mode: 'onTouched',
    defaultValues: defaultInputValues,
  });

  const handleCheckDuplicatedEmail = async (email: string) => {
    const isDuplicated = await getCheckEmailDuplication(email);

    if (isDuplicated) {
      setError('email', {
        message: ERROR_MESSAGE.EMAIL.isDuplicated,
      });
    }
  };

  const handleCheckDuplicatedNickname = async (nickname: string) => {
    const isDuplicated = await getCheckNicknameDuplication(nickname);

    if (isDuplicated) {
      setError('nickname', {
        message: ERROR_MESSAGE.NICKNAME.isDuplicated,
      });
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatOnInputBirthChange(inputValue);
    setValue('birth', formattedValue, { shouldValidate: true });
  };

  const handleClickAgreement = (key: 'first' | 'second') => {
    setIsAgreementOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const registers = {
    email: register('email', {
      required: ERROR_MESSAGE.EMAIL.required,
      pattern: {
        value: REGEX.EMAIL,
        message: ERROR_MESSAGE.EMAIL.invalid,
      },
      onBlur: (e) => handleCheckDuplicatedEmail(e.target.value),
    }),

    password: register('password', {
      required: ERROR_MESSAGE.PASSWORD.required,
      minLength: { value: 8, message: ERROR_MESSAGE.PASSWORD.invalid },
      pattern: {
        value: REGEX.PASSWORD,
        message: ERROR_MESSAGE.PASSWORD.invalid,
      },
    }),

    passwordConfirm: register('passwordConfirm', {
      required: ERROR_MESSAGE.PASSWORD_CONFIRM.required,
      validate: (value) => {
        if (watch('password') !== value) {
          return ERROR_MESSAGE.PASSWORD_CONFIRM.invalid;
        }
        return true;
      },
    }),

    nickname: register('nickname', {
      required: ERROR_MESSAGE.NICKNAME.required,
      minLength: { value: 2, message: ERROR_MESSAGE.NICKNAME.invalid },
      maxLength: { value: 16, message: ERROR_MESSAGE.NICKNAME.invalid },
      onBlur: (e) => handleCheckDuplicatedNickname(e.target.value),
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
      onChange: (e) => handleBirthChange(e),
      setValueAs: (value) => unFormatBirthDate(value),
    }),

    gender: register('gender', {
      required: ERROR_MESSAGE.GENDER.required,
    }),

    checkAll: register('checkAll', {
      required: true,
      onChange: () => {
        setValue('check1', watch('checkAll'));
        setValue('check2', watch('checkAll'));
      },
    }),

    check1: register('check1', {
      required: true,
      onChange: () => {
        setValue('checkAll', watch('check1') && watch('check2'));
      },
    }),

    check2: register('check2', {
      required: true,
      onChange: () => {
        setValue('checkAll', watch('check1') && watch('check2'));
      },
    }),
  };

  const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
    const { email, password, nickname, phone, birth, gender } = payload;

    const joinRequest = {
      email,
      password,
      nickname,
      phone,
      birth,
      gender,
    };

    try {
      const fetchFormData = new FormData();
      fetchFormData.append('joinRequest', JSON.stringify(joinRequest));
      const response = await postSignup(fetchFormData);
      if (response.status === 'SUCCESS') {
        toast.success('회원가입이 성공적으로 완료되었습니다.');
        setTimeout(() => {
          router.back();
        }, 2000);
      } else if (response.status === 'FAIL') {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
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
              maxLength={20}
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
              options={GENDER_OPTION}
              errorMessage={errors.gender?.message}
              {...registers.gender}
            />
          </div>
          <div className={cn('agreement-checkbox')}>
            <div className={cn('agreement-title')}>
              <label htmlFor='checkAll' className={cn('checkbox-label')}>
                <input {...registers.checkAll} type='checkbox' className={cn('checkbox-input')} id='checkAll' />
                <CheckboxCircleIcon fill={watch('checkAll') ? CHECKED : NOT_CHECKED} width={15} height={15} />
                <h2>아래 약관에 모두 동의합니다.</h2>
              </label>
            </div>
            <div className={cn('content-wrapper')}>
              <div className={cn('content')}>
                <label htmlFor='check1' className={cn('checkbox-label')}>
                  <input {...registers.check1} type='checkbox' className={cn('checkbox-input')} id='check1' />
                  <CheckboxCircleIcon fill={watch('check1') ? CHECKED : NOT_CHECKED} width={15} height={15} />
                  <h3>서비스 이용 약관 동의</h3>
                </label>
                <CaretRightIcon
                  className={cn('arrow', { down: isAgreementOpen.first })}
                  stroke='black'
                  onClick={() => handleClickAgreement('first')}
                />
              </div>
              {isAgreementOpen.first && <TermsAgreement type='service' />}
              <div className={cn('content')}>
                <label htmlFor='check2' className={cn('checkbox-label')}>
                  <input {...registers.check2} type='checkbox' className={cn('checkbox-input')} id='check2' />
                  <CheckboxCircleIcon fill={watch('check2') ? CHECKED : NOT_CHECKED} width={15} height={15} />
                  <h3>개인정보 처리 방침 동의</h3>
                </label>
                <CaretRightIcon
                  className={cn('arrow', { down: isAgreementOpen.second })}
                  stroke='black'
                  onClick={() => handleClickAgreement('second')}
                />
              </div>
              {isAgreementOpen.second && <TermsAgreement type='privacyPolicy' />}
            </div>
          </div>
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
