import classNames from 'classnames/bind';

import { getOrderStatusDescription } from '@/libs/getOrderStatusDescriptions';
import type { OrderStatus } from '@/types/orderType';
import type { Product } from '@/types/ProductItem';

import styles from './OrderItem.module.scss';
import OrderItemButton from './OrderItemButton/OrderItemButton';

const cn = classNames.bind(styles);

interface OrderItemProps {
  orderItem: Product;
  confirmationDate: string;
  orderStatus: OrderStatus;
}

export default function OrderItem({ orderItem, confirmationDate, orderStatus }: OrderItemProps) {
  const status = getOrderStatusDescription(orderStatus);

  return (
    <div className={cn('order-item')}>
      <div className={cn('item')}>{JSON.stringify(orderItem)}</div>
      <div className={cn('order-status')}>
        <p>{confirmationDate}</p>
        <p className={cn('status')}>{status}</p>
      </div>
      <div className={cn('button-box')}>
        <OrderItemButton orderStatus={orderStatus} />
      </div>
    </div>
  );
}
