import classNames from 'classnames/bind';
import Link from 'next/link';

import { ROUTER } from '@/constants/route';
import { ChevronIcon } from '@/public/index';

import OrderItem from './OrderItem/OrderItem';
import styles from './OrderItemList.module.scss';

const cn = classNames.bind(styles);

export default function OrderItemList() {
  return (
    <article className={cn('order')}>
      <div className={cn('order-header')}>
        <h2>purchaseDate</h2>
        <Link className={cn('header-button')} href={ROUTER.MY_PAGE.ORDER_INFO}>
          주문 상세보기
          <ChevronIcon className={cn('header-link-icon')} />
        </Link>
      </div>
      <div className={cn('order-item-list')}>
        <OrderItem />
      </div>
    </article>
  );
}
