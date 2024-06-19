'use client';

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import { Button } from '@/components';
import AgreementCheckbox from './AgreementCheckbox';
import SignupInputs from './SignupInputs';

import styles from './SignupForm.module.scss';

const cn = classNames.bind(styles);

export default function SignupForm() {
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
          <AgreementCheckbox setIsAllChecked={setIsAgreementAllChecked} />
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
