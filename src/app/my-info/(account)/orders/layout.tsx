import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface OrdersPageLayoutProps {
  children: ReactNode;
}

export default function OrdersPageLayout({ children }: OrdersPageLayoutProps) {
  return (
    <section className={cn('page')}>
      <h1 className={cn('title')}>주문 / 배송 조회</h1>
      {children}
    </section>
  );
}
