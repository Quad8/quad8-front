'use client';

import { useContext } from 'react';
import { CheckBox } from '@/components';
import { CartDataContext } from '@/context/CartDataContext';

interface CardCheckBoxProps {
  id: number;
  type: 'custom' | 'shop';
}

export default function CardCheckBox({ id, type }: CardCheckBoxProps) {
  const { checkedCustomList, checkedShopList, updateCheckedCustom, updateCheckedShop } = useContext(CartDataContext);
  const isChecked = type === 'custom' ? checkedCustomList[id] : checkedShopList[id];

  const handleClickCheckBox = () => {
    if (type === 'custom') {
      updateCheckedCustom(id);
      return;
    }
    updateCheckedShop(id);
  };
  return <CheckBox isChecked={isChecked} onClick={handleClickCheckBox} />;
}
