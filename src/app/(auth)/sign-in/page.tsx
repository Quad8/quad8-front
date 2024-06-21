'use client';

// 테스트 페이지 입니다.
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Modal, Button } from '@/components';
import styles from './page.module.scss';
import SignInModal from './_component/SignInModal';

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
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <SignInModal />
      </Modal>
    </div>
  );
}
