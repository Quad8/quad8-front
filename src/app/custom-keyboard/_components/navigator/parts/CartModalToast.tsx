'use client';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { ROUTER } from '@/constants/route';
import styles from './CartModalToast.module.scss';

const cn = classNames.bind(styles);

export default function CartModalToast() {
  const router = useRouter();
  const handleEnimationEnd = () => {
    router.push(ROUTER.MY_PAGE.CART, { scroll: false });
  };
  return (
    <div className={cn('wrapper')} onAnimationEnd={handleEnimationEnd}>
      장바구니에 상품을 담았습니다
    </div>
  );
}
