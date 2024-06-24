import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { AddressesHeader } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface AddressesLayoutProps {
  children: ReactNode;
}

export default async function AddressesLayout({ children }: AddressesLayoutProps) {
  return (
    <div className={cn('page')}>
      <AddressesHeader />
      {children}
    </div>
  );
}
