import classNames from 'classnames/bind';

import { Button } from '@/components';
import { getOrderStatusDescription } from '@/libs/getOrderStatusDescriptions';
import type { OrderStatus } from '@/types/orderType';
import type { Product } from '@/types/ProductItem';

import styles from './OrderItem.module.scss';

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
        <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
          구매 확정
        </Button>
        <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
          교환/반품
        </Button>
      </div>
    </div>
  );
}
