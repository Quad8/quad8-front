import classNames from 'classnames/bind';
import { Button } from '@/components';
import styles from './PurchaseButton.module.scss';

const cn = classNames.bind(styles);

export default function PurchaseButton() {
  return (
    <div className={cn('button-wrapper')}>
      <Button backgroundColor='outline-primary' fontSize={14} radius={4} className={cn('button')}>
        선택 상품 구매
      </Button>
      <Button backgroundColor='outline-primary' fontSize={14} radius={4} className={cn('button')}>
        전체 상품 구매
      </Button>
    </div>
  );
}
