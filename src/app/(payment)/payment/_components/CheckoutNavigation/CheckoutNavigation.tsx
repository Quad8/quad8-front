import { CreditCard, Cube } from '@/public/index';
import classNames from 'classnames/bind';

import styles from './CheckoutNavigation.module.scss';

const cn = classNames.bind(styles);

export default function CheckoutNavigation() {
  return (
    <article className={cn('nav')}>
      <div className={cn('status-box')}>
        <CreditCard className={cn('card-icon')} />
        <h2>결제하기</h2>
        <div className={cn('chain')} />
      </div>
      <div className={cn('status-box')}>
        <Cube className={cn('cube-icon')} />
        <h2>결제완료</h2>
      </div>
    </article>
  );
}
