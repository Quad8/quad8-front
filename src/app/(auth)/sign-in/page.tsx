'use client';

// 테스트 페이지 입니다.
import { Button } from '@/components';
import classNames from 'classnames/bind';
import { useState } from 'react';
import SignInModal from '../../../components/SignInModal/SignInModal';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleSignin = () => {
    setIsOpenModal(true);
  };

  return (
    <div className={cn('container')}>
      <Button onClick={handleSignin}> 로그인 모달창</Button>
      <a href='/sign-up'> 회원가입 하러가기</a>
      <SignInModal isOpen={isOpenModal} onClose={handleCloseModal} />
    </div>
  );
}
