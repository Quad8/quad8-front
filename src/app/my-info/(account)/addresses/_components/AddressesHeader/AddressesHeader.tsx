'use client';

import { Button, Modal } from '@/components';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Address, DaumPostcodeEmbed } from 'react-daum-postcode';

import { postAddress } from '@/api/shippingAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import AddAddressModal from './AddAddresseModal/AddAddressModal';
import styles from './AddressesHeader.module.scss';

const cn = classNames.bind(styles);

export default function AddressesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostcodeEmbedOpen, setIsPostcodeEmbedOpen] = useState(false);
  const [addressData, setAddressData] = useState<Address | null>(null);

  const queryClient = useQueryClient();

  const { mutate: postAddressesMutate } = useMutation({
    mutationFn: postAddress,
  });

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

  const handleSuccessClose = () => {
    setIsModalOpen(false);
    setAddressData(null);
  };

  const handleAddressPostSubmit: SubmitHandler<FieldValues> = (payload) => {
    postAddressesMutate(payload, {
      onSuccess: (res) => {
        if (res.status === 'SUCCESS') {
          queryClient.invalidateQueries({ queryKey: ['addressesData'] });
          handleSuccessClose();
        }
      },
    });
  };

  return (
    <>
      <div className={cn('header')}>
        <h1 className={cn('title')}>주소록</h1>
        <Button className={cn('button')} radius={4} paddingVertical={8} onClick={handleButtonClick}>
          <span className={cn('cross-icon')}>+</span>배송지 추가
        </Button>
      </div>

      <Modal isOpen={isPostcodeEmbedOpen} onClose={() => setIsPostcodeEmbedOpen(false)}>
        <DaumPostcodeEmbed
          className={cn('postcode-embed')}
          style={{ width: '530px', height: '600px' }}
          onComplete={handleComplete}
        />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={handleAddAddressModalClose}>
        <AddAddressModal
          onClick={handleSearchPostClick}
          onSubmit={handleAddressPostSubmit}
          newAddressData={addressData}
        />
      </Modal>
    </>
  );
}
