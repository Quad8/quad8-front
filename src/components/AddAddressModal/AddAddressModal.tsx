'use client';

import classNames from 'classnames/bind';
import { ChangeEvent, useEffect, useState } from 'react';
import type { Address } from 'react-daum-postcode';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Button, InputField } from '@/components';
import { Input, Label } from '@/components/parts';
import { changePhoneNumber } from '@/utils/changePhoneNumber';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { unFormatPhoneNumber } from '@/utils/unFormatPhoneNumber';
import { CheckboxCircleIcon } from '@/public/index';
import type { UserAddress } from '@/types/shippingType';

import styles from './AddAddressModal.module.scss';

const cn = classNames.bind(styles);

const PLACEHOLDERS = {
  NAME: '최대 10자로 작성해주세요',
  ADDRESS1: '주소',
  POSTAL_CODE: '우편번호',
  ADDRESS2: '상세주소 입력',
  PHONE: '휴대폰 번호 (-없이)를 입력해 주세요',
};

const DEFAULT_VALUES = {
  name: '',
  address: '',
  zoneCode: '',
  detailAddress: '',
  phone: '',
  isDefault: true,
  id: 0,
};

interface AddAddressModalProps {
  onClick: () => void;
  onSubmit: SubmitHandler<FieldValues>;
  newAddressData: Address | null;
  userAddressData?: UserAddress;
}

export default function AddAddressModal({ onClick, newAddressData, userAddressData, onSubmit }: AddAddressModalProps) {
  const [isChecked, setIsChecked] = useState(true);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (newAddressData) {
      setValue('address', newAddressData.address || '');
      setValue('zoneCode', newAddressData.zonecode || '');
    }
  }, [newAddressData, setValue]);

  useEffect(() => {
    if (userAddressData) {
      setValue('address', userAddressData.address || '');
      setValue('zoneCode', userAddressData.zoneCode || '');
      setValue('detailAddress', userAddressData.detailAddress || '');
      setValue('isDefault', userAddressData.isDefault || true);
      setValue('name', userAddressData.name || '');
      setValue('phone', formatPhoneNumber(userAddressData.phone) || '');
      setValue('id', userAddressData.id ?? 0);
    }
  }, [setValue, userAddressData]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  const handleCheckboxClick = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (payload) => {
    const checkId = getValues('id');
    if (!checkId) {
      const { id, ...rest } = payload;
      onSubmit(rest);
      return;
    }

    onSubmit(payload);
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className={cn('title')}>배송지 등록 / 수정</h1>
      <div className={cn('inputs')}>
        <InputField
          label='이름'
          placeholder={PLACEHOLDERS.NAME}
          maxLength={10}
          {...register('name', {
            required: true,
          })}
        />

        <Label className={cn('inputs-address')} sizeVariant='md' htmlFor='address'>
          배송지
          <div className={cn('inputs-search')}>
            <InputField
              placeholder={PLACEHOLDERS.ADDRESS1}
              readOnly
              {...register('address', {
                required: true,
              })}
            />
            <Button className={cn('inputs-button')} type='button' radius={8} paddingVertical={8} onClick={onClick}>
              주소검색
            </Button>
          </div>
          <InputField placeholder={PLACEHOLDERS.POSTAL_CODE} readOnly {...register('zoneCode', { required: true })} />
          <InputField placeholder={PLACEHOLDERS.ADDRESS2} {...register('detailAddress', { required: true })} />
        </Label>
        <InputField
          label='연락처'
          placeholder={PLACEHOLDERS.PHONE}
          {...register('phone', {
            required: true,
            minLength: 11,
            setValueAs: (value) => unFormatPhoneNumber(value),
            onChange: handlePhoneChange,
          })}
        />
      </div>
      <Label className={cn('checkbox')}>
        <CheckboxCircleIcon className={cn('checkbox-icon', { checked: isChecked })} stroke='#A5A5A5' />
        기본 배송지로 설정
        <Input
          className={cn('checkbox-input')}
          type='checkbox'
          onClick={handleCheckboxClick}
          {...register('isDefault')}
        />
      </Label>

      <Button className={cn('button')} type='submit' radius={8} paddingVertical={20} disabled={!isValid}>
        저장
      </Button>
    </form>
  );
}
