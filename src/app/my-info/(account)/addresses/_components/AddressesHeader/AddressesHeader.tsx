'use client';

import { Button, Modal } from '@/components';
import classNames from 'classnames/bind';
import { useState } from 'react';

import AddAddressModal from './AddAddresseModal/AddAddressModal';
import styles from './AddressesHeader.module.scss';

const cn = classNames.bind(styles);

export default function AddressesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={cn('header')}>
        <h1 className={cn('title')}>주소록</h1>
        <Button className={cn('button')} radius={4} paddingVertical={8} onClick={handleButtonClick}>
          <span className={cn('cross-icon')}>+</span>배송지 추가
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAddressModal />
      </Modal>
    </>
  );
}
