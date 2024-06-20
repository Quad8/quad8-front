'use client';

import CheckBox from '@/components/CheckBox/CheckBox';
import { CartDataContext } from '@/context/CartDataContext';
import { useContext } from 'react';

interface CardCheckBoxProps {
  id: number;
  type: 'custom' | 'shop';
}

export default function CardCheckBox({ id, type }: CardCheckBoxProps) {
  const { checkedCustomList, checkedShopList, updateCheckedCustom, updateCheckedShop } = useContext(CartDataContext);
  const isChecked = type === 'custom' ? checkedCustomList[id] : checkedShopList[id];
  const handleCheck = () => {
    if (type === 'custom') {
      updateCheckedCustom(id);
      return;
    }
    updateCheckedShop(id);
  };
  return <CheckBox isChecked={isChecked} onCheck={handleCheck} />;
}
