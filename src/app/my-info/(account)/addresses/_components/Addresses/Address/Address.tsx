import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Address as AddressT, DaumPostcodeEmbed } from 'react-daum-postcode';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { deleteAddress, putAddress } from '@/api/shippingAPI';
import { Modal } from '@/components';
import type { UserAddress } from '@/types/shippingType';
import AddAddressModal from '../../AddAddresseModal/AddAddressModal';

import styles from './Address.module.scss';

const cn = classNames.bind(styles);

interface AddressProps {
  item: UserAddress;
}

export default function Address({ item }: AddressProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostcodeEmbedOpen, setIsPostcodeEmbedOpen] = useState(false);
  const [addressData, setAddressData] = useState<AddressT | null>(null);

  const { phone, address, zoneCode, name, detailAddress, isDefault, id } = item;

  const queryClient = useQueryClient();

  const { mutate: putAddressMutate } = useMutation({ mutationFn: putAddress });

  const { mutate: deleteAddressMutate } = useMutation({
    mutationFn: deleteAddress,
  });

  const handleModifyButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteButtonClick = () => {
    deleteAddressMutate(id, {
      onSuccess: (res) => {
        if (res.status === 'SUCCESS') {
          toast('삭제되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['addressesData'] });
        }
      },
    });
  };

  const handleSearchPostClick = () => {
    setIsPostcodeEmbedOpen(true);
  };

  const handleComplete = (data: AddressT) => {
    setIsPostcodeEmbedOpen(false);
    setAddressData(data);
  };

  const onSuccessClose = () => {
    setIsModalOpen(false);
    setAddressData(null);
  };

  const handleAddressPutSubmit: SubmitHandler<FieldValues> = (payload) => {
    putAddressMutate(payload, {
      onSuccess: (res) => {
        if (res.status === 'SUCCESS') {
          toast('수정되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['addressesData'] });
          onSuccessClose();
        }
      },
    });
  };

  return (
    <>
      <article className={cn('address', { 'address-default': isDefault })}>
        <div className={cn('address-textbox')}>
          <div className={cn('address-namebox')}>
            <h1 className={cn('address-name')}>{name}</h1>
            {isDefault && <span className={cn('address-default-badge')}>기본 배송지</span>}
          </div>
          <p>{phone}</p>
          <p>
            ({zoneCode}) {address} {detailAddress}
          </p>
        </div>
        <div className={cn('button-box')}>
          <button className={cn('button')} type='button' onClick={handleModifyButtonClick}>
            수정
          </button>
          <div className={cn('hr')} />
          <button className={cn('button')} type='button' onClick={handleDeleteButtonClick}>
            삭제
          </button>
        </div>
      </article>

      <Modal isOpen={isPostcodeEmbedOpen} onClose={() => setIsPostcodeEmbedOpen(false)}>
        <DaumPostcodeEmbed
          className={cn('postcode-embed')}
          style={{ width: '530px', height: '600px' }}
          onComplete={handleComplete}
        />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAddressModal
          onClick={handleSearchPostClick}
          onSubmit={handleAddressPutSubmit}
          userAddressData={item}
          newAddressData={addressData}
        />
      </Modal>
    </>
  );
}
