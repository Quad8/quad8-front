'use client';

import { checkNickname, putEditProfile } from '@/api/profileAPI';
import { Button, InputField, RadioField } from '@/components';
import { changePhoneNumber, formatPhoneNumber, unFormatPhoneNumber } from '@/libs';
import type { Users } from '@/types/profileType';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, FocusEvent } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal() {
  const { data: userData } = useQuery<{ data: Users }>({ queryKey: ['userData'] });
  const users = userData?.data ?? { nickname: '', email: '', phone: '', gender: 'MALE', birth: '' };
  const token = localStorage.getItem('accessToken') || null;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickname: users.nickname,
      phone: formatPhoneNumber(users.phone),
    },
  });

  const { mutate: checkNicknameMutation } = useMutation({
    mutationFn: checkNickname,
    onSuccess: (res) => {
      if (!res.ok && !errors.nickname) {
        setError('nickname', { message: res.message });
      }
    },
  });

  const { mutate: putProfileMutation } = useMutation({
    mutationFn: putEditProfile,
  });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    putProfileMutation(
      { payload, token },
      {
        // onSuccess: (res) => {
        //   console.log('onSubmit 성공', payload, res);
        // },
        onError: () => {},
      },
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
            onBlur: handleNicknameBlur,
          })}
        />
        <InputField label='생년월일' disabled value={users.birth} />
        <RadioField label='성별' options={GENDER_OPTION} disabled value={users.gender === 'MALE' ? '남자' : '여자'} />
        <InputField
          label='휴대폰 번호'
          placeholder='0000-0000'
          {...register('phone', {
            setValueAs: (value) => unFormatPhoneNumber(value),
            onChange: handlePhoneChange,
          })}
        />
      </div>
      <Button type='submit'>저장</Button>
    </form>
  );
}
