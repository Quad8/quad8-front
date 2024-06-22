'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getCartData } from '@/api/cartAPI';
import type { CartAPIDataType } from '@/types/CartTypes';
import CartCard from './CartCard';

import styles from './CustomCardList.module.scss';

const cn = classNames.bind(styles);

export default function CustomCardList() {
  const { data, isSuccess } = useQuery({ queryKey: ['cartData'], queryFn: getCartData }) as {
    data: CartAPIDataType;
    isSuccess: boolean;
  };
  const customData = isSuccess ? data.CUSTOM : [];

  return (
    <div className={cn('wrapper')}>
      {customData.map((custom) => (
        <CartCard key={custom.id} cardData={custom} type='custom' />
      ))}
    </div>
  );
}
