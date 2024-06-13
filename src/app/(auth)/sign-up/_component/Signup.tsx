'use client';

import classNames from 'classnames/bind';
import { Button } from '@/components';
import { useState } from 'react';
import styles from './Signup.module.scss';
import { AgreementForm } from './AgreementForm';
import SignupInputs from './SignupInputs';

const cn = classNames.bind(styles);

export default function Signup() {
  const [isAgreementAllChecked, setIsAgreementAllChecked] = useState(false);

  const handleSubmitButtonClick = () => {};

  return (
    <>
      <div className={cn('container')}>
        <h1 className={cn('title')}>회원가입</h1>
        <div className={cn('content-wrapper')}>
          <SignupInputs />
          <AgreementForm setIsAllChecked={setIsAgreementAllChecked} />
        </div>
      </div>
      <div className={cn({ 'not-checked': !isAgreementAllChecked })}>약관 동의 다 했니</div>
      <Button className={cn('button')} fontSize={24} type='submit' onClick={handleSubmitButtonClick}>
        회원가입
      </Button>
    </>
  );
}
