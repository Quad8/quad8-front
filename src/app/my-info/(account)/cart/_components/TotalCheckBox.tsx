'use client';

import { useContext } from 'react';
import classNames from 'classnames/bind';

import { CheckBox } from '@/components';
import { CartDataContext } from '@/context/CartDataContext';

import styles from './TotalCheckBox.module.scss';

const cn = classNames.bind(styles);

interface TotalCheckBoxProps {
  type: 'total' | 'shop' | 'custom';
}

const TITLE = {
  total: '전체선택',
  custom: '커스텀 키보드 만들기',
  shop: 'SHOP',
};

export default function TotalCheckBox({ type }: TotalCheckBoxProps) {
  const { checkedCustomList, checkedShopList, updateCheckedAllCustom, updateCheckedAllShop } =
    useContext(CartDataContext);

  const totalCustom = Object.values(checkedCustomList).length;
  const totalCheckedCustom = Object.values(checkedCustomList).filter((value) => value === true).length;

  const totalShop = Object.values(checkedShopList).length;
  const totalCheckedShop = Object.values(checkedShopList).filter((value) => value === true).length;

  const isCheckedAllCustom = totalCustom === totalCheckedCustom;
  const isCheckedAllShop = totalShop === totalCheckedShop;

  const isCheckedAllEntire = isCheckedAllCustom && isCheckedAllShop;

  const getCheckedValue = () => {
    if (type === 'total') {
      return isCheckedAllEntire && totalCustom + totalShop !== 0;
    }

    if (type === 'custom') {
      return isCheckedAllCustom && totalCustom !== 0;
    }

    return isCheckedAllShop && totalShop !== 0;
  };

  const getTotalCount = () => {
    if (type === 'total') {
      return `${totalCheckedCustom + totalCheckedShop}/${totalCustom + totalShop}`;
    }
    if (type === 'custom') {
      return `${totalCheckedCustom}/${totalCustom}`;
    }
    return `${totalCheckedShop}/${totalShop}`;
  };

  const handleClickCheckBox = () => {
    if (type === 'total') {
      if (isCheckedAllEntire) {
        updateCheckedAllCustom(false);
        updateCheckedAllShop(false);
        return;
      }
      updateCheckedAllCustom(true);
      updateCheckedAllShop(true);
      return;
    }

    if (type === 'custom') {
      if (isCheckedAllCustom) {
        updateCheckedAllCustom(false);
        return;
      }
      updateCheckedAllCustom(true);
      return;
    }

    if (type === 'shop') {
      if (isCheckedAllShop) {
        updateCheckedAllShop(false);
        return;
      }
      updateCheckedAllShop(true);
    }
  };
  return (
    <div className={cn('select-wrapper')}>
      <CheckBox isChecked={getCheckedValue()} onClick={handleClickCheckBox} />
      <div className={cn('count-wrapper')}>
        <div className={cn('box-text')}>{TITLE[type]}</div>
        <div className={cn('count-text', { 'selected-all': getCheckedValue() })}>{getTotalCount()}</div>
      </div>
    </div>
  );
}
