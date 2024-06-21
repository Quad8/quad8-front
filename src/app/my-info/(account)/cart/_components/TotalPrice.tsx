'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';
import { CartDataContext } from '@/context/CartDataContext';
import styles from './TotalPrice.module.scss';

const cn = classNames.bind(styles);

export default function TotalPrice() {
  const { customData, shopData, checkedCustomList, checkedShopList } = useContext(CartDataContext);
  const selectedCustomPrice = customData.reduce((total, custom) => {
    if (checkedCustomList[custom.id]) {
      return total + custom.price;
    }
    return total;
  }, 0);

  const selectedShopPrice = shopData.reduce((total, shop) => {
    if (checkedShopList[shop.id]) {
      return total + shop.price;
    }
    return total;
  }, 0);
  const totalSelectedPrice = selectedCustomPrice + selectedShopPrice;
  const discountPrice = 0;
  const totalPrice = totalSelectedPrice - discountPrice;
  return (
    <div className={cn('wrapper')}>
      <div className={cn('price-wrapper')}>
        <div className={cn('selected-wrapper')}>선택 상품 금액</div>
        <div className={cn('selected-price')}>{totalSelectedPrice.toLocaleString()}원</div>
      </div>
      <div className={cn('price-wrapper')}>
        <div className={cn('discount-wrapper')}>할인 금액</div>
        <div className={cn('discount-price')}>-{discountPrice.toLocaleString()}원</div>
      </div>
      <div className={cn('price-wrapper')}>
        <div className={cn('total-wrapper')}>총 결제 금액</div>
        <div className={cn('total-price')}>{totalPrice.toLocaleString()}원</div>
      </div>
    </div>
  );
}
