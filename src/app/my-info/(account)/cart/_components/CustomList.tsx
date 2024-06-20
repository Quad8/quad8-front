'use client';

import classNames from 'classnames/bind';

import { useContext } from 'react';
import { CartDataContext } from '@/context/CartDataContext';
import styles from './CustomList.module.scss';
import CartCard from './CartCard';

const cn = classNames.bind(styles);

export default function CustomList() {
  const { customData } = useContext(CartDataContext);
  return (
    <div className={cn('wrapper')}>
      {customData.map((custom) => (
        <CartCard key={custom.id} cardData={custom} type='custom' />
      ))}
    </div>
  );
}
