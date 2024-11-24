'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Button, Dropdown, ItemOverview, LogoLoading } from '@/components';
import { Input, Label } from '@/components/parts';
import { usePaymentQuery } from '@/hooks/usePaymentQuery';
import { useSelectedAddress } from '@/hooks/useSelectedAddress';
import { useUpdatePaymentInfo } from '@/hooks/useUpdatePaymentInfo';
import { formatNumber } from '@/utils/formatNumber';
import type { OrderItem } from '@/types/orderType';
import type { UserAddress } from '@/types/shippingType';
import CheckoutAddress from './parts/CheckoutAddress';
import PaymentContainer from './parts/PaymentContainer';

import styles from './CheckoutForm.module.scss';

const cn = classNames.bind(styles);

export default function CheckoutForm() {
  const [isPutPaymentSucceed, setIsPutPaymentSucceed] = useState(false);

  const { data: paymentResponse, isPending: isPaymentResponsePending } = usePaymentQuery();
  const { mutate: putPaymentMutation } = useUpdatePaymentInfo();
  const { selectedAddress, onSelectAddress } = useSelectedAddress({ paymentResponse });

  const { handleSubmit, control, setValue } = useForm<FieldValues>({
    mode: 'onTouched',
    defaultValues: {
      shippingAddressId: paymentResponse?.data.shippingAddressResponse.id,
      deliveryMessage: '',
    },
  });

  const { totalPrice = 0, orderItemResponses } = paymentResponse?.data ?? {};

  const formattedTotalPrice = totalPrice > 0 ? formatNumber(totalPrice) : 0;

  const handleAddressClick = (selectItem: UserAddress) => {
    onSelectAddress(selectItem);
    setValue('shippingAddressId', selectItem.id);
  };

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    if (!payload.shippingAddressId) {
      return;
    }

    putPaymentMutation(payload, {
      onSuccess: () => {
        setIsPutPaymentSucceed(true);
      },
    });
  };

  if (isPaymentResponsePending) {
    return <LogoLoading />;
  }

  return (
    <form className={cn('checkout-form')} onSubmit={handleSubmit(onSubmit)}>
      <article className={cn('form')}>
        <div className={cn('item-box')}>
          <h1>주문 상품</h1>
          {orderItemResponses &&
            orderItemResponses.map((item: OrderItem) => <ItemOverview key={item.productId} item={item} />)}
        </div>

        <div className={cn('price-box')}>
          <p>총 주문금액</p>
          <p className={cn('price')}>{formattedTotalPrice} 원</p>
        </div>

        {selectedAddress && (
          <CheckoutAddress item={selectedAddress} onClick={handleAddressClick} control={control} isForm />
        )}

        <div className={cn('discount-box')}>
          <h1>할인 혜택</h1>
          <div className={cn('discount-field-box')}>
            <Label className={cn('discount-field')} sizeVariant='sm'>
              쿠폰
              <div className={cn('discount-input')}>
                <Dropdown
                  className={cn('discount-coupon')}
                  sizeVariant='sm'
                  options={['사용 가능한 쿠폰이 없습니다.']}
                  disabled
                />
                <Button className={cn('discount-button')} type='button'>
                  최대 사용
                </Button>
              </div>
            </Label>
            <Label className={cn('discount-field')} sizeVariant='sm'>
              포인트
              <div className={cn('discount-input')}>
                <Input sizeVariant='sm' readOnly value={0} />
                <Button className={cn('discount-button')} type='button'>
                  최대 사용
                </Button>
              </div>
            </Label>
          </div>
          <p className={cn('discount-point')}>
            <span className={cn('point-title')}>보유 포인트</span>
            0P
          </p>
        </div>

        <div className={cn('checkout-detail')}>
          <h1>결제 상세</h1>
          <p className={cn('checkout-method')}>
            <span className={cn('method-title')}>신용카드</span>
            {formattedTotalPrice} 원
          </p>
        </div>

        <PaymentContainer
          amountValue={Number(totalPrice)}
          paymentData={paymentResponse?.data}
          isPutPaymentSucceed={isPutPaymentSucceed}
          hasAddressData={!!selectedAddress?.id}
        />
      </article>
    </form>
  );
}
