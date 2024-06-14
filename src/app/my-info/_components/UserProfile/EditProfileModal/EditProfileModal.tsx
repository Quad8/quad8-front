'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, FocusEvent } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { checkNickname, getUserData, putEditProfile } from '@/api/profileAPI';
import { changePhoneNumber, formatPhoneNumber, unFormatPhoneNumber } from '@/libs';
import type { Users } from '@/types/profileType';

import { Button, Dropdown, InputField, RadioField } from '@/components';

import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal() {
  const token = localStorage.getItem('accessToken') || null;

  const { data: userData } = useQuery<{ data: Users }>({ queryKey: ['userData'], queryFn: () => getUserData(token) });

  const users = userData?.data ?? { nickname: '', email: '', phone: '', gender: 'MALE', birth: '' };

  const {
    register,
    handleSubmit,
    // setError
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickname: users.nickname,
      phone: formatPhoneNumber(users.phone),
      gender: users.gender,
      드롭다운: '',
    },
  });

  const { mutate: checkNicknameMutation } = useMutation({
    mutationFn: checkNickname,
    onSuccess: () => {},
    /** 피드백 메세지 수정 필요 */
    // onSuccess: (res) => {
    //   if (!res.ok && !errors.nickname) {
    //     setError('nickname', { message: res.message });
    //   }
    // },
  });

  const { mutate: putProfileMutation } = useMutation({
    mutationFn: putEditProfile,
  });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    console.log(payload);
    putProfileMutation(
      { payload, token },
      // {
      //   /** 피드백에 따른 토스트 모달 추가 필요 */
      //   onSuccess: (res) => {
      //     console.log('회원정보가 변경되었습니다', res.message);
      //   },
      //   onError: () => {},
      // },
    );
  };

  const handleNicknameBlur = (e: FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    if (nickname !== users.nickname) {
      checkNicknameMutation(nickname);
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    if (/^[\d-]*$/.test(phoneValue)) {
      const formattedValue = changePhoneNumber(phoneValue);
      setValue('phone', formattedValue, { shouldValidate: true });
    }
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cn('modal-title')}>회원 정보 변경</h1>

      {/* <input /> 이미지 수정 인풋 */}

      <div className={cn('modal-inputs')}>
        <InputField
          id='nickname'
          label='닉네임'
          errorMessage={errors.nickname?.message}
          {...register('nickname', {
            maxLength: { value: 16, message: '닉네임 초과' },
            onBlur: handleNicknameBlur,
          })}
        />
        <InputField label='생년월일' disabled value={users.birth} />
        <RadioField
          label='성별'
          options={GENDER_OPTION}
          // disabled
          value={users.gender === 'MALE' ? '남자' : '여자'}
          {...register('gender')}
        />
        <InputField
          label='휴대폰 번호'
          placeholder='0000-0000'
          {...register('phone', {
            setValueAs: (value) => unFormatPhoneNumber(value),
            onChange: handlePhoneChange,
          })}
        />
      </div>

      <Dropdown
        options={GENDER_OPTION}
        onClick={(e) => console.log('Selected option:', e.currentTarget.value)}
        {...register('드롭다운')}
      />
      <Button type='submit'>저장</Button>
    </form>
  );
}
