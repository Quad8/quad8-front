import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { getAddresses } from '@/api/shippingAPI';
import { AddressesHeader } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface AddressesLayoutProps {
  children: ReactNode;
}

export default async function AddressesLayout({ children }: AddressesLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['addressesData'], queryFn: getAddresses });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={cn('page')}>
        <AddressesHeader />
        {children}
      </div>
    </HydrationBoundary>
  );
}
