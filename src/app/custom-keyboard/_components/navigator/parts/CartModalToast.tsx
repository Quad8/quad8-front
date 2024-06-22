'use client';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { ROUTER } from '@/constants/route';
import { useContext } from 'react';
import { KeyboardDataContext } from '@/context';

import styles from './CartModalToast.module.scss';

const cn = classNames.bind(styles);

export default function CartModalToast() {
  const { orderId } = useContext(KeyboardDataContext);
  const router = useRouter();
  const handleanimationEnd = () => {
    router.push(orderId ? ROUTER.MY_PAGE.CART : ROUTER.MY_PAGE.CART, { scroll: false });
  };
  return (
    <div className={cn('wrapper')} onAnimationEnd={handleanimationEnd}>
      {orderId ? '장바구니 수정이 완료되었습니다' : '장바구니에 상품을 담았습니다'}
    </div>
  );
}
