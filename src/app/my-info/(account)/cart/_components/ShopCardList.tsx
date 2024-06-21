'use client';

import classNames from 'classnames/bind';

import { useContext } from 'react';
import { CartDataContext } from '@/context/CartDataContext';
import styles from './ShopCardList.module.scss';
import CartCard from './CartCard';

const cn = classNames.bind(styles);

export default function ShopCardList() {
  const { shopData } = useContext(CartDataContext);
  return (
    <div className={cn('wrapper')}>
      {shopData.map((shop) => (
        <CartCard key={shop.id} cardData={shop} type='shop' />
      ))}
    </div>
  );
}
