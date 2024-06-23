import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface ReviewsPageLayoutProps {
  children: ReactNode;
}

export default function ReviewsPageLayout({ children }: ReviewsPageLayoutProps) {
  return (
    <section className={cn('page')}>
      <h1 className={cn('title')}>구매 후기</h1>
      {children}
    </section>
  );
}
