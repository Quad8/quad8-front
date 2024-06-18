'use client';

import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { checkNickname, putEditProfile } from '@/api/usersAPI';
import { Button, InputField, RadioField } from '@/components';
import { Label } from '@/components/parts';
import { changePhoneNumber, formatPhoneNumber, unFormatPhoneNumber } from '@/libs';
import type { Users } from '@/types/profileType';

import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

interface EditProfileModalProps {
  userData: Users;
}

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal({ userData }: EditProfileModalProps) {
  const [changedNickname, setChangedNickname] = useState('');

  const { birth, gender, nickname, phone } = userData;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickname,
      phone: formatPhoneNumber(phone),
      gender,
    },
  });

  const { mutate: checkNicknameMutation } = useMutation({
    mutationFn: checkNickname,
    /** 피드백 메세지 수정 필요 */
    onSuccess: (res) => {
      // console.log(res);
      if (!res.ok && !errors.nickname) {
        setError('nickname', { message: res.message });
      }
    },
  });

  const { mutate: putProfileMutation } = useMutation({
    mutationFn: putEditProfile,
  });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    // console.log(payload);
    putProfileMutation(
      { payload },
      // {
      //   /** 피드백에 따른 토스트 모달 추가 필요 */
      //   onSuccess: (res) => {
      //     console.log('회원정보가 변경되었습니다', res.message);
      //   },
      //   onError: () => {},
      // },
    );
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedNickname(e.target.value);
  };

  const handleNicknameCheck = () => {
    if (changedNickname !== nickname) {
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
        <Label htmlFor='nickname' sizeVariant='sm' className={cn('modal-inputs-nickname')}>
          닉네임
          <div className={cn('input-wrapper')}>
            <InputField
              id='nickname'
              errorMessage={errors.nickname?.message}
              {...register('nickname', {
                maxLength: { value: 16, message: '닉네임 초과' },
                onChange: handleNicknameChange,
              })}
            />
            <Button
              type='button'
              onClick={handleNicknameCheck}
              radius={4}
              paddingVertical={8}
              className={cn('nickname-button')}
            >
              중복 확인
            </Button>
          </div>
        </Label>
        <InputField label='생년월일' disabled value={birth} />
        <RadioField
          label='성별'
          options={GENDER_OPTION}
          disabled
          defaultValue={gender === 'FEMALE' ? '여자' : '남자'}
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
      <Button type='submit'>저장</Button>
    </form>
  );
}
