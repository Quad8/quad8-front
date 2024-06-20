'use client';

import { useContext } from 'react';
import classNames from 'classnames/bind';
import { CartDataContext } from '@/context/CartDataContext';
import styles from './TotalCheckBoxCounter.module.scss';

const cn = classNames.bind(styles);

interface TotalCheckBoxCounterProps {
  type: 'total' | 'shop' | 'custom';
}

export default function TotalCheckBoxCounter({ type }: TotalCheckBoxCounterProps) {
  const { checkedCustomList, checkedShopList } = useContext(CartDataContext);

  const totalCustom = Object.values(checkedCustomList).length;
  const totalCheckedCustom = Object.values(checkedCustomList).filter((value) => value === true).length;

  const totalShop = Object.values(checkedShopList).length;
  const totalCheckedShop = Object.values(checkedShopList).filter((value) => value === true).length;

  const getTotalCount = () => {
    if (type === 'total') {
      return `${totalCheckedCustom + totalCheckedShop} / ${totalCustom + totalShop}`;
    }
    if (type === 'custom') {
      return `${totalCheckedCustom} / ${totalCustom}`;
    }
    return `${totalCheckedShop} / ${totalShop}`;
  };

  return <div className={cn('count-text')}>{getTotalCount()}</div>;
}
