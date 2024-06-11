'use client';

import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import { Modal } from '@/components';
import styles from './page.module.scss';
import SignInModal from './_component/SignInModal';
import SignupModal from './_component/SignupModal';

const cn = classNames.bind(styles);

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setOpenModalType] = useState('');

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleSignin = () => {
    setIsOpenModal(true);
    setOpenModalType('signin');
  };

  const handleSignup = () => {
    setIsOpenModal(true);
    setOpenModalType('signup');
  };

  return (
    <div className={cn('container')}>
      <Button onClick={handleSignin}> 로그인 모달창</Button>
      <Button onClick={handleSignup}> 회원가입 모달창</Button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        {modalType === 'signin' ? <SignInModal /> : <SignupModal />}
      </Modal>
    </div>
  );
}
