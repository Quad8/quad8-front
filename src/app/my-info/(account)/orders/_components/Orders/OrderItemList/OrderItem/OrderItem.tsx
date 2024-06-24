import classNames from 'classnames/bind';

import { getOrderStatusDescription } from '@/libs/getOrderStatusDescriptions';
import type { OrderItem as OrderItemT, OrderStatus } from '@/types/orderType';
import ItemOverview from './ItemOverview/ItemOverview';
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
        {/* <Image
          src={orderItem.productImgUrl}
          alt={orderItem.productName}
          width={107}
          height={107}
          placeholder={IMAGE_BLUR.placeholder}
          blurDataURL={IMAGE_BLUR.blurDataURL}
        />
        <div className={cn('item-image')}>
          <p>{orderItem.productName}</p>
          <p>{orderItem.switchOption}</p>
          <CustomOption customData={orderItem.switchOption} />
        </div> */}
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
