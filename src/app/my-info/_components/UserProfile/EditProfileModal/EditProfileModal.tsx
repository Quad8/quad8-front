'use client';

import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { checkNickname } from '@/api/usersAPI';
import { Button, InputField, RadioField } from '@/components';
import { Label } from '@/components/parts';
import { changePhoneNumber, formatPhoneNumber, unFormatPhoneNumber } from '@/libs';
import type { Users } from '@/types/userType';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

interface EditProfileModalProps {
  userData: Users;
}

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal({ userData }: EditProfileModalProps) {
  const { birth, gender, nickname, phone, imgUrl } = userData;

  const [changedNickname, setChangedNickname] = useState(nickname);

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
      imgUrl,
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

  // const { mutate: putProfileMutation } = useMutation({
  //   mutationFn: putEditProfile,
  // });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    console.log(payload);

    // putProfileMutation(
    //   payload,
    //   {
    //     /** 피드백에 따른 토스트 모달 추가 필요 */
    //     onSuccess: (res) => {
    //       console.log('회원정보가 변경되었습니다', res.message);
    //     },
    //     onError: () => {},
    //   },
    // );
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedNickname(e.target.value);
  };

  const handleNicknameCheck = () => {
    if (changedNickname !== nickname) {
      checkNicknameMutation(nickname);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      return;
    }

    const imageUrl = URL.createObjectURL(files[0]);
    setValue('imgUrl', imageUrl);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cn('modal-title')}>회원 정보 변경</h1>
      <ProfileImage
        profileImage={imgUrl}
        width={140}
        height={140}
        isEditable
        {...register('imgUrl')}
        onChange={handleChangeImage}
      />
      <div className={cn('modal-inputs')}>
        <Label htmlFor='nickname' sizeVariant='sm' className={cn('modal-inputs-nickname')}>
          닉네임
          <div className={cn('input-wrapper')}>
            <InputField
              id='nickname'
              errorMessage={errors.nickname?.message}
              currentLength={changedNickname.length}
              {...register('nickname', {
                maxLength: { value: 16, message: '닉네임 초과' },
                onChange: handleNicknameChange,
              })}
            />
            <Button
              type='button'
              onClick={handleNicknameCheck}
              radius={8}
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
