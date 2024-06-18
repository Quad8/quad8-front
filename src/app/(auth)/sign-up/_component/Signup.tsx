'use client';

import classNames from 'classnames/bind';
import { Button } from '@/components';
import { useRef, useState } from 'react';
import styles from './Signup.module.scss';
import { AgreementForm } from './AgreementForm';
import SignupInputs from './SignupInputs';

const cn = classNames.bind(styles);

export default function Signup() {
  const [isAgreementAllChecked, setIsAgreementAllChecked] = useState(false);
  const [isAllValid, setIsAllValid] = useState(false);
  const formRef = useRef<{ submit: () => void } & HTMLFormElement>(null);

  const handleSubmitButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <div className={cn('container')}>
        <h1 className={cn('title')}>회원가입</h1>
        <div className={cn('content-wrapper')}>
          <SignupInputs isAgreementAllChecked={isAgreementAllChecked} setIsAllValid={setIsAllValid} ref={formRef} />
          <AgreementForm setIsAllChecked={setIsAgreementAllChecked} />
        </div>
      </div>
      <Button
        className={cn('button')}
        fontSize={24}
        onClick={handleSubmitButtonClick}
        backgroundColor={isAllValid ? 'background-primary' : 'background-gray-40'}
      >
        회원가입
      </Button>
    </>
  );
}
