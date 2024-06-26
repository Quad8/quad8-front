import classNames from 'classnames/bind';

import { getOrderStatusDescription } from '@/libs/getOrderStatusDescriptions';
import type { OrderItem as OrderItemT, OrderStatus } from '@/types/OrderTypes';
import ItemOverview from '../../../../../../../../components/ItemOverview/ItemOverview';
import OrderItemButton from './OrderItemButton/OrderItemButton';

import styles from './OrderItem.module.scss';

const cn = classNames.bind(styles);

interface OrderItemProps {
  orderItem: OrderItemT;
  confirmationDate: string;
  orderStatus: OrderStatus;
}

export default function OrderItem({ orderItem, confirmationDate, orderStatus }: OrderItemProps) {
  const status = getOrderStatusDescription(orderStatus);

  return (
    <div className={cn('order-item')}>
      <div className={cn('item')}>
        <ItemOverview item={orderItem} />
      </div>
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
