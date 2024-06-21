'use client';

import classNames from 'classnames/bind';

import { useContext } from 'react';
import { CartDataContext } from '@/context/CartDataContext';
import styles from './CustomCardList.module.scss';
import CartCard from './CartCard';

const cn = classNames.bind(styles);

export default function CustomCardList() {
  const { customData } = useContext(CartDataContext);
  return (
    <div className={cn('wrapper')}>
      {customData.map((custom) => (
        <CartCard key={custom.id} cardData={custom} type='custom' />
      ))}
    </div>
  );
}
