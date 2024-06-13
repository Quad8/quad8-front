'use client';

import { checkNickname, putEditProfile } from '@/api/profileAPI';
import { Button, InputField, RadioField } from '@/components';
import defaultIamge from '@/public/images/defaultProfile.png';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal() {
  const [isImageError, setIsImageError] = useState(false);
  // const { data: userData } = useQuery({ queryKey: ['userData'] });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      nickname: '',
      phoneNumber: '',
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

  const { mutate: editProfileMutation } = useMutation({
    mutationFn: putEditProfile,
  });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    editProfileMutation(payload, {
      onSuccess: (res) => {
        console.log('onSubmit 성공', payload, res);
      },
      onError: () => {},
    });
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cn('modal-title')}>회원 정보 변경</h1>
      <Image
        src={isImageError ? defaultIamge : defaultIamge}
        alt='user-iamge'
        width={140}
        onError={() => {
          setIsImageError(true);
        }}
      />

      {/* <input /> 이미지 수정 인풋 */}

      <div className={cn('modal-inputs')}>
        <InputField
          label='닉네임'
          placeholder='기존 유저 이름'
          {...register('nickname', {
            onBlur: (e) => {
              checkNicknameMutation(e.target.value);
            },
          })}
        />
        <InputField label='생년월일' disabled placeholder='기존 유저 생년월일' />
        <RadioField label='성별' options={GENDER_OPTION} value='남자' />
        <InputField label='휴대폰 번호' placeholder='기존 유저 폰번호' {...register('phoneNumber')} />
      </div>
      <Button type='submit'>저장</Button>
    </form>
  );
}
