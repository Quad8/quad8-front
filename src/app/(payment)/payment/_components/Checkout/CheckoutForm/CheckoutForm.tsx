'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import { getPaymentItemData } from '@/api/orderAPI';
import { Button, Dropdown, ItemOverview } from '@/components';
import { Input, Label } from '@/components/parts';
import { ROUTER } from '@/constants/route';
import type { OrderItem } from '@/types/OrderTypes';
import type { OrderDetailData } from '@/types/paymentTypes';

import styles from './CheckoutForm.module.scss';

const cn = classNames.bind(styles);

const DELIVERY_OPTIONS = ['부재시 문앞에 놓아주세요.', '경비실에 맡겨 주세요', '직접 입력'];

export default function CheckoutForm() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const orderId = queryClient.getQueryData<string>(['orderId']);
  const { data: paymentItemData } = useQuery<{ data: OrderDetailData | null }>({
    queryKey: ['paymentItemData'],
    queryFn: () => getPaymentItemData(orderId),
  });

  const orderDetailData = paymentItemData?.data ?? null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(ROUTER.MY_PAGE.CHECKOUT_SUCCESS);
  };

  return (
    <form className={cn('checkout-form')} onSubmit={onSubmit}>
      <article className={cn('form')}>
        <div className={cn('item-box')}>
          <h1>주문 상품</h1>
          {orderDetailData?.orderItemResponses &&
            orderDetailData.orderItemResponses.map((item: OrderItem) => (
              <ItemOverview key={item.productId} imegeWidth={104} imageHeight={104} item={item} />
            ))}
        </div>

        <div className={cn('price-box')}>
          <p>총 주문금액</p>
          <p className={cn('price')}>{orderDetailData?.totalPrice}원</p>
        </div>

        <div className={cn('address-section')}>
          <h1>배송 주소</h1>
          <div className={cn('address-box')}>
            <div className={cn('address-wrap')}>
              <div className={cn('address-key')}>
                <p>받는분</p>
                <p>연락처</p>
                <p>배송 주소</p>
              </div>
              <div className={cn('address-value')}>
                <p>{orderDetailData?.shippingAddressResponse.name}</p>
                <p>{orderDetailData?.shippingAddressResponse.phone}</p>
                <p>
                  {orderDetailData?.shippingAddressResponse.address}{' '}
                  {orderDetailData?.shippingAddressResponse.detailAddress}
                </p>
              </div>
            </div>
            <Button type='button' paddingVertical={8} width={72} radius={4}>
              변경
            </Button>
          </div>
          <Dropdown options={DELIVERY_OPTIONS} sizeVariant='sm' placeholder='배송 요청 사항을 선택해 주세요.' />
        </div>

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

        <div className={cn('method-box')}>
          <h1>결제 수단</h1>
          <h2 className={cn('method-default')}>일반 결제</h2>
          <div className={cn('method-wrap')}>
            <Button type='button'>결제수단들</Button>
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
            {orderDetailData?.totalPrice}원
          </p>
        </div>
      </article>

      <div className={cn('submit-box')}>
        <p>주문 내역을 확인하였으며, 정보 제공등에 동의합니다.</p>
        <Button className={cn('submit-button')} type='submit'>
          결제하기
        </Button>
      </div>
    </form>
  );
}
