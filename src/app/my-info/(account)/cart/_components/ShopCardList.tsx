'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getCartData } from '@/api/cartAPI';
import type { CartAPIDataType } from '@/types/CartTypes';
import CartCard from './CartCard';

import styles from './ShopCardList.module.scss';

const cn = classNames.bind(styles);

export default function ShopCardList() {
  const { data: cartData } = useQuery<CartAPIDataType>({ queryKey: ['cartData'], queryFn: getCartData });
  const shopData = cartData?.SHOP ?? [];

  return (
    <div className={cn('wrapper')}>
      {shopData.map((shop) => (
        <CartCard key={shop.id} cardData={shop} type='shop' />
      ))}
    </div>
  );
}
