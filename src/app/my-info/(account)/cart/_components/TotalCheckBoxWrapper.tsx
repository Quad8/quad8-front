'use client';

import CheckBox from '@/components/CheckBox/CheckBox';
import { CartDataContext } from '@/context/CartDataContext';
import { useContext } from 'react';

interface TotalCheckBoxWrapperProps {
  type: 'total' | 'shop' | 'custom';
}

export default function TotalCheckBoxWrapper({ type }: TotalCheckBoxWrapperProps) {
  const { checkedCustomList, checkedShopList, updateAllCheckedCustom, updateAllCheckedShop } =
    useContext(CartDataContext);

  const totalCustom = Object.values(checkedCustomList).length;
  const totalCheckedCustom = Object.values(checkedCustomList).filter((value) => value === true).length;

  const totalShop = Object.values(checkedShopList).length;
  const totalCheckedShop = Object.values(checkedShopList).filter((value) => value === true).length;

  const isCheckedAllCustom = totalCustom === totalCheckedCustom;
  const isCheckedAllShop = totalShop === totalCheckedShop;

  const isCheckedAllEntire = isCheckedAllCustom && isCheckedAllShop;

  const handleCheck = () => {
    if (type === 'total') {
      if (isCheckedAllEntire) {
        updateAllCheckedCustom(false);
        updateAllCheckedShop(false);
        return;
      }
      updateAllCheckedCustom(true);
      updateAllCheckedShop(true);
      return;
    }

    if (type === 'custom') {
      if (isCheckedAllCustom) {
        updateAllCheckedCustom(false);
        return;
      }
      updateAllCheckedCustom(true);
      return;
    }

    if (type === 'shop') {
      if (isCheckedAllShop) {
        updateAllCheckedShop(false);
        return;
      }
      updateAllCheckedShop(true);
    }
  };
  return <CheckBox isChecked={isCheckedAllEntire} onCheck={handleCheck} />;
}
