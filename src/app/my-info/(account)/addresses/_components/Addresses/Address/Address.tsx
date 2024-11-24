import classNames from 'classnames/bind';
import { useState } from 'react';
import { Address as AddressT, DaumPostcodeEmbed } from 'react-daum-postcode';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AddAddressModal, Dialog, Modal } from '@/components';
import { useDeleteAddress } from '@/hooks/useDeleteAddress';
import { useUpdateAddress } from '@/hooks/useUpdateAddress';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import type { UserAddress } from '@/types/shippingType';

import styles from './Address.module.scss';

const cn = classNames.bind(styles);

interface AddressProps {
  item: UserAddress;
  isDisplayOnModal?: boolean;
  onClick?: (item: UserAddress) => void;
}

export default function Address({ item, isDisplayOnModal = false, onClick }: AddressProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostcodeEmbedOpen, setIsPostcodeEmbedOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressData, setAddressData] = useState<AddressT | null>(null);

  const { phone, address, zoneCode, name, detailAddress, isDefault, id } = item;

  const { mutate: putAddressMutate } = useUpdateAddress();
  const { mutate: deleteAddressMutate } = useDeleteAddress();

  const handleModifyButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteButtonClick = () => {
    setIsDialogOpen((prevOpen) => !prevOpen);
  };

  const handleDelete = () => {
    deleteAddressMutate(id, {
      onSuccess: () => {
        toast('삭제되었습니다.');
      },
      onError: (error) => {
        toast(error.message);
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
      onSuccess: () => {
        toast('수정되었습니다.');
        onSuccessClose();
      },
      onError: (error) => {
        toast(error.message);
      },
    });
  };

  return (
    <>
      <article
        className={cn('address', { 'address-default': isDefault, 'display-on-modal': isDisplayOnModal })}
        onClick={() => onClick && onClick(item)}
      >
        <div className={cn('address-textbox')}>
          <div className={cn('address-namebox')}>
            <h1 className={cn('address-name')}>{name}</h1>
            {isDefault && <span className={cn('address-default-badge')}>기본 배송지</span>}
          </div>
          <p>010-{formatPhoneNumber(phone)}</p>
          <p>
            ({zoneCode}) {address} {detailAddress}
          </p>
        </div>

        {isDisplayOnModal || (
          <div className={cn('button-box')}>
            <button className={cn('button')} type='button' onClick={handleModifyButtonClick}>
              수정
            </button>
            <div className={cn('hr')} />
            <button className={cn('button')} type='button' onClick={handleDeleteButtonClick}>
              삭제
            </button>
          </div>
        )}
      </article>

      <Dialog
        isOpen={isDialogOpen}
        buttonText={{ left: '취소', right: '삭제' }}
        message='정말로 삭제 하시겠습니까?'
        onClick={{ left: () => setIsDialogOpen(false), right: handleDelete }}
        type='confirm'
        iconType='warn'
      />
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
