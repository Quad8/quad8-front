import { CreditCardIcon, CubeIcon } from '@/public/index';
import classNames from 'classnames/bind';

import styles from './CheckoutNavigation.module.scss';

const cn = classNames.bind(styles);

interface CheckoutNavigationProps {
  isSuccess?: boolean;
}

export default function CheckoutNavigation({ isSuccess }: CheckoutNavigationProps) {
  return (
    <article className={cn('nav')}>
      <div className={cn('status-box')}>
        <CreditCardIcon className={cn('card-icon')} />
        <h2>결제하기</h2>
        <div className={cn('chain', { success: isSuccess })} />
      </div>
      <div className={cn('status-box')}>
        <CubeIcon className={cn('cube-icon', { success: isSuccess })} />
        <h2>결제완료</h2>
      </div>
    </article>
  );
}
