'use client';

import classNames from 'classnames/bind';
import { useForm, FieldValues } from 'react-hook-form';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// import type { SignupInfoTypes } from '@/types';
import { getCheckEmailDuplication, getCheckNicknameDuplication, postSignup } from '@/api/authAPI';
import { changePhoneNumber, unFormatPhoneNumber } from '@/libs';

import { Button, RadioField, InputField } from '@/components';
import AgreementCheckbox from './AgreementCheckbox';

import styles from './SignupForm.module.scss';

const cn = classNames.bind(styles);

const PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '숫자, 영어 포함 8~20자 이내',
  CONFIRM_PASSWORD: '비밀번호를 한번 더 입력해주세요',
  NICKNAME: '닉네임을 입력해주세요',
  PHONE_NUMBER: '휴대폰 번호 (-없이)를 입력해주세요',
  BIRTHDAY: 'YYYY / MM / DD',
};

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
  const formRef = useRef<{ submit: () => void } & HTMLFormElement>(null);

  const handleSubmitButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleCheckEmailInput = async () => {
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

    const emailValue = getValues('email');
    const isEmpty = !!emailValue === undefined;
    const isNotValid = !emailPattern.test(emailValue);
    const isDuplicated = await getCheckEmailDuplication(emailValue);

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
  };

  const handleCheckNicknameInput = async () => {
    const nicknameValue = getValues('nickname');
    const isEmpty = !!nicknameValue === undefined;
    const isDuplicated = await getCheckNicknameDuplication(nicknameValue);

    if (isEmpty) {
      setError('nickname', {
        message: '닉네임을 입력해주세요.',
      });
      return;
    }
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
        trigger('passwordConfirm');
      },
    }),
    passwordConfirm: register('passwordConfirm', {
      required: '비밀번호를 한번 더 입력해주세요.',
      validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
    }),
    nickname: register('nickname', {
      required: '닉네임을 입력해주세요.',
      minLength: { value: 2, message: '닉네임은 최소 2글자 이상이어야 합니다.' },
      maxLength: { value: 16, message: '닉네임은 최대 16글자까지 입력할 수 있습니다.' },
      onBlur: () => handleCheckNicknameInput(),
    }),
    phone: register('phone', {
      required: '휴대폰 번호를 입력해주세요.',
      pattern: {
        value: /^[0-9]{7,8}/i,
        message: '휴대폰 번호를 확인해주세요.',
      },
      setValueAs: (value) => unFormatPhoneNumber(value),
      onChange: (e) => handlePhoneChange(e),
    }),
    birth: register('birth', {
      required: '생년원일을 입력해주세요.',
      pattern: {
        value: /^(19[0-9][0-9]|20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
        message: '유효한 생년월일을 입력해주세요. 예: YYYYMMDD',
      },
    }),
    gender: register('gender', {}),
  };

  const handleFormSubmit = async (formData: FieldValues) => {
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
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            <RadioField label='성별' options={['남자', '여자']} {...registers.gender} />
          </div>
          <AgreementCheckbox setIsAllChecked={setIsAgreementAllChecked} />
        </div>
      </div>
      <Button
        type='submit'
        className={cn('button')}
        fontSize={24}
        onClick={handleSubmitButtonClick}
        backgroundColor={isValid ? 'background-primary' : 'background-gray-40'}
      >
        회원가입
      </Button>
    </form>
  );
}
