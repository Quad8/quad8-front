import { ReactNode } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div className={cn('inner')}>
        <Breadcrumb />
        {children}
      </div>
    </section>
  );
}
