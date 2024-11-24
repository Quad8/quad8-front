import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ItemOverview, Modal, WriteEditModal } from '@/components';
import { ROUTER } from '@/constants/route';
import { getOrderStatusDescription } from '@/utils/getOrderStatusDescriptions';
import type { OrderItem as OrderItemT, OrderStatus } from '@/types/orderType';
import OrderItemButton from './OrderItemButton/OrderItemButton';

import styles from './OrderItem.module.scss';

const cn = classNames.bind(styles);

interface OrderItemProps {
  orderItem: OrderItemT;
  confirmationDate: string;
  orderStatus: OrderStatus;
  orderId: number | string;
}

export default function OrderItem({ orderItem, confirmationDate, orderStatus, orderId }: OrderItemProps) {
  const router = useRouter();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const status = getOrderStatusDescription(orderStatus);
  const isItemType = !(orderItem.productId > 99999);
  const switchOptionToStirng = orderItem.switchOption.toString();

  const productData = { orderId, ...orderItem, switchOption: switchOptionToStirng };

  const handleEditReviewClick = () => {
    if (isItemType) {
      setIsReviewModalOpen((prevOpen) => !prevOpen);
      return;
    }
    router.push(ROUTER.COMMUNITY);
  };

  const handleSuccessReview = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <div className={cn('order-item')}>
        <div className={cn('item')}>
          <ItemOverview item={orderItem} />
        </div>
        <div className={cn('order-status')}>
          <p>{confirmationDate}</p>
          <p className={cn('status')}>{status}</p>
        </div>
        <div className={cn('button-box')}>
          <OrderItemButton orderStatus={orderStatus} onEditReviewClick={handleEditReviewClick} />
        </div>
      </div>

      {isItemType && (
        <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
          <WriteEditModal reviewType='productReview' onSuccessReview={handleSuccessReview} productData={productData} />
        </Modal>
      )}
    </>
  );
}
