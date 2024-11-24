import classNames from 'classnames/bind';
import { BaseSyntheticEvent, useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { Control, Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AddAddressModal, Button, Dropdown, Modal } from '@/components';
import { useCreateAddress } from '@/hooks/useCreateAddress';
import { useUpdatePaymentInfo } from '@/hooks/useUpdatePaymentInfo';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import type { ShippingAddressResponse } from '@/types/orderType';
import type { UserAddress } from '@/types/shippingType';
import CheckoutAddressEmptyCase from './CheckoutAddressEmptyCase';
import CheckoutAddressModal from './CheckoutAddressModal';

import styles from './CheckoutAddress.module.scss';

const cn = classNames.bind(styles);

const DELIVERY_OPTIONS = ['부재시 문앞에 놓아주세요.', '경비실에 맡겨 주세요', '직접 입력'];

interface CheckoutAddressProps {
  item: ShippingAddressResponse;
  onClick?: (selectItem: UserAddress) => void;
  control?: Control<FieldValues>;
  isForm?: boolean;
  deliveryMessage?: string;
}

export default function CheckoutAddress({ item, onClick, control, isForm, deliveryMessage }: CheckoutAddressProps) {
  const [isAddressChangeModalOpen, setIsAddressChangeModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isPostcodeEmbedOpen, setIsPostcodeEmbedOpen] = useState(false);
  const [addressData, setAddressData] = useState<Address | null>(null);

  const { address, detailAddress, name, phone, zoneCode, id: addressId } = item;

  const { mutate: postAddressMutate } = useCreateAddress();
  const { mutate: putPaymentAddressMutate } = useUpdatePaymentInfo();

  const handleAddressButtonClick = () => {
    setIsAddressChangeModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleAddAddressButtonClick = () => {
    setIsAddAddressModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleAddressClick = (selectItem: UserAddress) => {
    onClick?.(selectItem);
    setIsAddressChangeModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSuccessClose = () => {
    setIsAddAddressModalOpen((prevIsOpen) => !prevIsOpen);
    setAddressData(null);
  };

  const handleComplete = (data: Address) => {
    setIsPostcodeEmbedOpen(false);
    setAddressData(data);
  };

  const handleAddAddressModalClose = () => {
    setIsAddAddressModalOpen(false);
    setAddressData(null);
  };

  const handleSearchPostClick = () => {
    setIsPostcodeEmbedOpen(true);
  };

  const handleAddressPostSubmit: SubmitHandler<FieldValues> = (payload, e?: BaseSyntheticEvent) => {
    e?.stopPropagation();

    postAddressMutate(payload, {
      onSuccess: (res) => {
        toast('배송지를 추가하였습니다.');
        handleSuccessClose();

        putPaymentAddressMutate(
          { shippingAddressId: res.data.id, deliveryMessage: '' },
          {
            onError: (err) => {
              toast(err.message);
            },
          },
        );
      },
      onError: (error) => {
        toast(error.message);
      },
    });
  };

  return (
    <>
      {addressId ? (
        <div className={cn('address-section')}>
          <div className={cn('address-title-box')}>
            <h1>배송 주소</h1>
            {isForm && (
              <button className={cn('address-title-button')} type='button' onClick={handleAddAddressButtonClick}>
                + 새 주소 추가
              </button>
            )}
          </div>
          <div className={cn('address-box')}>
            <div className={cn('address-wrap')}>
              <div className={cn('address-key')}>
                <p>받는분</p>
                <p>연락처</p>
                <p>배송 주소</p>
                {deliveryMessage && <p>배송 메세지</p>}
              </div>
              <div className={cn('address-value')}>
                <p>{name}</p>
                <p>010-{formatPhoneNumber(phone)}</p>
                <p>
                  ({zoneCode}){address} {detailAddress}
                </p>
                {deliveryMessage && <p>{deliveryMessage}</p>}
              </div>
            </div>
            {isForm && (
              <Button type='button' paddingVertical={8} width={72} radius={4} onClick={handleAddressButtonClick}>
                변경
              </Button>
            )}
          </div>
          {isForm && (
            <Controller
              name='deliveryMessage'
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Dropdown
                  key='deliveryOption'
                  options={DELIVERY_OPTIONS}
                  sizeVariant='sm'
                  placeholder='배송 요청 사항을 선택해 주세요.'
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          )}
        </div>
      ) : (
        <CheckoutAddressEmptyCase onClick={handleAddAddressButtonClick} />
      )}

      <Modal isOpen={isAddressChangeModalOpen} onClose={() => setIsAddressChangeModalOpen(false)}>
        <CheckoutAddressModal onClick={handleAddressClick} />
      </Modal>

      <Modal isOpen={isPostcodeEmbedOpen} onClose={() => setIsPostcodeEmbedOpen(false)}>
        <DaumPostcodeEmbed
          className={cn('postcode-embed')}
          style={{ width: '530px', height: '600px' }}
          onComplete={handleComplete}
        />
      </Modal>
      <Modal isOpen={isAddAddressModalOpen} onClose={handleAddAddressModalClose}>
        <AddAddressModal
          newAddressData={addressData}
          onClick={handleSearchPostClick}
          onSubmit={handleAddressPostSubmit}
        />
      </Modal>
    </>
  );
}
