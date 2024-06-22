import { ReactNode } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <section>
      <div className={cn('inner')}>
        <Breadcrumb />
        {children}
      </div>
    </section>
  );
}
