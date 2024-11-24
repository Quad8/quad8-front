'use client';

import classNames from 'classnames/bind';
import { ChangeEvent, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, InputField, ProfileImage, RadioField } from '@/components';
import { Label } from '@/components/parts';
import { GENDER_OPTION } from '@/constants/dropdownOptions';
import { useCheckNickname } from '@/hooks/useCheckNickname';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { changePhoneNumber } from '@/utils/changePhoneNumber';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { unFormatPhoneNumber } from '@/utils/unFormatPhoneNumber';
import type { Users } from '@/types/userType';

import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

interface EditProfileModalProps {
  userData: Users;
  onComplete: () => void;
}

export default function EditProfileModal({ userData, onComplete }: EditProfileModalProps) {
  const { birth, gender, nickname, phone, imgUrl } = userData;

  const [changedNickname, setChangedNickname] = useState(nickname);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      nickname,
      phone: formatPhoneNumber(phone),
      gender,
      imgUrl: imgUrl as string | File,
    },
  });

  const { mutate: checkNicknameMutation } = useCheckNickname();
  const { mutate: putProfileMutation } = useUpdateProfile();

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    const formData = new FormData();
    formData.append(
      'updateProfileRequest',
      JSON.stringify({
        nickname: payload.nickname,
        phone: payload.phone,
        gender,
        imgUrl: imageFile ? undefined : payload.imgUrl,
      }),
    );

    if (payload.imgUrl instanceof File) {
      formData.append('imgFile', payload.imgUrl);
    }

    putProfileMutation(formData, {
      onSuccess: () => {
        toast('회원정보가 변경되었습니다');
        onComplete();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChangedNickname(e.target.value);
  };

  const handleNicknameCheck = () => {
    checkNicknameMutation(nickname, {
      onSuccess: () => {
        toast.success('사용 가능한 닉네임 입니다.');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    setImageFile(file);
    setValue('imgUrl', file);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cn('modal-title')}>회원 정보 변경</h1>
      <ProfileImage profileImage={imgUrl} width={140} height={140} isEditable onChange={handleChangeImage} />
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
        <RadioField label='성별' name='성별' options={GENDER_OPTION} readOnly disabled defaultValue={gender} />
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
