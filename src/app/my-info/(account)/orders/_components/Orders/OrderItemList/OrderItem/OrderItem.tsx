import { Button } from '@/components';
import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';

const cn = classNames.bind(styles);

export default function OrderItem() {
  return (
    <div className={cn('order-item')}>
      <div className={cn('item')} style={{ height: '104px' }}>
        상품 컴포넌트
      </div>
      <div className={cn('order-status')}>
        <p>confirmationDate</p>
        <p className={cn('status')}>status</p>
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
