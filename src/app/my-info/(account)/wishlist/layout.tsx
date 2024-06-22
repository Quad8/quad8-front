import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface WishlistPageLayoutProps {
  children: ReactNode;
}

export default function WishlistPageLayout({ children }: WishlistPageLayoutProps) {
  return (
    <section className={cn('layout')}>
      <div className={cn('page')}>{children}</div>
    </section>
  );
}
