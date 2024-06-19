import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ChangeEvent, useEffect } from 'react';
import type { Address } from 'react-daum-postcode';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { postAddresses } from '@/api/shipping';
import { Button, InputField } from '@/components';
import { Input, Label } from '@/components/parts';

import { changePhoneNumber, unFormatPhoneNumber } from '@/libs';
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
  isDefault: false,
};

interface AddAddressModalProps {
  onClick: () => void;
  addressData: Address | null;
}

export default function AddAddressModal({ onClick, addressData }: AddAddressModalProps) {
  const { handleSubmit, register, setValue } = useForm({
    mode: 'all',
    defaultValues: DEFAULT_VALUES,
  });

  const { mutate: postAddressesMutate } = useMutation({ mutationFn: postAddresses });

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    console.log('Submitting payload:', JSON.stringify(payload));
    postAddressesMutate(
      { payload },
      {
        onSuccess: (res) => {
          console.log(res);
        },
      },
    );
  };

  useEffect(() => {
    if (addressData) {
      setValue('address', addressData.address || '');
      setValue('zoneCode', addressData.zonecode || '');
    }
  }, [addressData, setValue]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    const formattedValue = changePhoneNumber(phoneValue);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  return (
    <form className={cn('modal')} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={cn('title')}>배송지 등록 / 수정</h1>
      <div className={cn('inputs')}>
        <InputField label='이름' placeholder={PLACEHOLDERS.NAME} {...register('name')} />

        <Label className={cn('inputs-address')} sizeVariant='md' htmlFor='address'>
          배송지
          <div className={cn('inputs-search')}>
            <InputField placeholder={PLACEHOLDERS.ADDRESS1} readOnly {...register('address')} />
            <Button className={cn('inputs-button')} type='button' radius={8} paddingVertical={8} onClick={onClick}>
              주소검색
            </Button>
          </div>
          <InputField placeholder={PLACEHOLDERS.POSTAL_CODE} readOnly {...register('zoneCode')} />
          <InputField placeholder={PLACEHOLDERS.ADDRESS2} {...register('detailAddress')} />
        </Label>
        <InputField
          label='연락처'
          placeholder={PLACEHOLDERS.PHONE}
          {...register('phone', {
            setValueAs: (value) => unFormatPhoneNumber(value),
            onChange: handlePhoneChange,
          })}
        />
      </div>
      <Input className={cn('checkbox')} type='checkbox' {...register('isDefault')} />
      <Button className={cn('button')} type='submit' radius={8} paddingVertical={20}>
        저장
      </Button>
    </form>
  );
}
