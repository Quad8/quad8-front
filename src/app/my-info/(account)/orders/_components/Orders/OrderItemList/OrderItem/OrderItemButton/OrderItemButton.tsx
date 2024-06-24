import classNames from 'classnames/bind';

import { Button } from '@/components';
import type { OrderStatus } from '@/types/orderType';

import styles from './OrderItemButton.module.scss';

const cn = classNames.bind(styles);

interface OrderItemButtonProps {
  orderStatus: OrderStatus;
}

export default function OrderItemButton({ orderStatus }: OrderItemButtonProps) {
  const renderButton = () => {
    switch (orderStatus) {
      case 'PREPARING' || 'DELIVERED':
        return (
          <>
            <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
              구매 확정
            </Button>
            <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
              교환/반품
            </Button>
          </>
        );
      case 'READY':
        return (
          <>
            <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
              구매 하기
            </Button>
            <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
              더 둘러보기
            </Button>
          </>
        );
      case 'CONFIRMED':
        return (
          <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
            후기 작성
          </Button>
        );
      case 'PAYMENT_COMPLETED' || 'SHIPPING':
        return (
          <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
            배송 조회
          </Button>
        );
      case 'CANCELED':
        return (
          <Button className={cn('button')} type='button' radioGroup='4' paddingVertical={8}>
            더 둘러보기
          </Button>
        );

      default:
        return null;
    }
  };

  return renderButton();
}
