'use client';

import { Button, InputField, RadioField } from '@/components';
import defaultIamge from '@/public/images/defaultProfile.png';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import styles from './EditProfileModal.module.scss';

const cn = classNames.bind(styles);

const GENDER_OPTION = ['남자', '여자'];

export default function EditProfileModal() {
  const [isImageError, setIsImageError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const payload = Object.fromEntries(formData.entries());
    // console.log(payload);
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit}>
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
        <InputField label='닉네임' placeholder='기존 유저 이름' />
        <InputField label='생년월일' disabled placeholder='기존 유저 생년월일' />
        <RadioField label='성별' options={GENDER_OPTION} value='남자' />
        <InputField label='휴대폰 번호' name='휴대폰 번호' placeholder='기존 유저 폰번호' />
      </div>
      <Button type='submit'>저장</Button>
    </form>
  );
}
