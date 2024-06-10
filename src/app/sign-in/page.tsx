'use client';

import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import { Modal } from '@/components';
import styles from './page.module.scss';
import SignInModal from './_component/SignInModal';

const cn = classNames.bind(styles);

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div className={cn('container')}>
      <Button onClick={() => setIsOpenModal(true)}> 로그인 모달창</Button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <SignInModal />
      </Modal>
    </div>
  );
}
