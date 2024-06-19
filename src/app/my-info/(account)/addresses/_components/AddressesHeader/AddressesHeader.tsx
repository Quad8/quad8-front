'use client';

import { Button, Modal } from '@/components';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Address, DaumPostcodeEmbed } from 'react-daum-postcode';
import AddAddressModal from './AddAddresseModal/AddAddressModal';

import styles from './AddressesHeader.module.scss';

const cn = classNames.bind(styles);

export default function AddressesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostcodeEmbedOpen, setIsPostcodeEmbedOpen] = useState(false);
  const [addressData, setAddressData] = useState<Address | null>(null);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleSearchPostClick = () => {
    setIsPostcodeEmbedOpen(true);
  };

  const handleComplete = (data: Address) => {
    setIsPostcodeEmbedOpen(false);
    setAddressData(data);
  };

  const handleAddAddressModalClose = () => {
    setIsModalOpen(false);
    setAddressData(null);
  };

  return (
    <>
      <div className={cn('header')}>
        <h1 className={cn('title')}>주소록</h1>
        <Button className={cn('button')} radius={4} paddingVertical={8} onClick={handleButtonClick}>
          <span className={cn('cross-icon')}>+</span>배송지 추가
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleAddAddressModalClose}>
        <AddAddressModal onClick={handleSearchPostClick} addressData={addressData} />
        <Modal isOpen={isPostcodeEmbedOpen} onClose={() => setIsPostcodeEmbedOpen(false)}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      </Modal>
    </>
  );
}
