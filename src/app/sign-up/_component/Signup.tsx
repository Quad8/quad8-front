'use client';

import classNames from 'classnames/bind';
import { RadioField, InputField } from '@/components';
import styles from './Signup.module.scss';
import { AgreementForm } from './AgreementForm';

const cn = classNames.bind(styles);

const PLACEHOLDER = {
  EMAIL: '이메일을 입력해주세요',
  PASSWORD: '비밀번호를 입력해주세요',
  CONFIRM_PASSWORD: '비밀번호를 한번 더 입력해주세요',
  NAME: '이름을 입력해주세요',
  PHONE_NUMBER: '휴대폰 번호 (-없이)를 입력해주세요',
  BIRTHDAY: 'YYYY / MM / DD',
};

export default function SignupModal() {
  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>회원가입</h1>
      <div className={cn('content-wrapper')}>
        <div className={cn('input-wrapper')}>
          <InputField label='이메일' placeholder={PLACEHOLDER.EMAIL} sizeVariant='md' labelSize='sm' />
          <InputField
            label='비밀번호'
            placeholder={PLACEHOLDER.PASSWORD}
            sizeVariant='md'
            labelSize='sm'
            type='password'
            suffixIcon='eye'
          />
          <InputField
            label='비밀번호 확인'
            placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
            sizeVariant='md'
            labelSize='sm'
            type='password'
            suffixIcon='eye'
          />
          <InputField label='이름' placeholder={PLACEHOLDER.NAME} sizeVariant='md' labelSize='sm' />
          <div className={cn('phone-number-input')}>
            <InputField
              disabled
              value='010'
              placeholder={PLACEHOLDER.NAME}
              sizeVariant='md'
              className={cn('phone-number')}
            />
            <InputField placeholder={PLACEHOLDER.PHONE_NUMBER} sizeVariant='md' labelSize='sm' />
          </div>
          <InputField label='생년월일' placeholder={PLACEHOLDER.BIRTHDAY} sizeVariant='md' labelSize='sm' />
          <RadioField label='성별' options={['남자', '여자']} />
        </div>
        <AgreementForm />
      </div>
    </div>
  );
}
