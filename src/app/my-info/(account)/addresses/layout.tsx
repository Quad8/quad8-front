import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getAddresses } from '@/api/shippingAPI';
import { ROUTER } from '@/constants/route';
import { getCookie } from '@/libs/manageCookie';
import { AddressesHeader } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface AddressesLayoutProps {
  children: ReactNode;
}

export default async function AddressesLayout({ children }: AddressesLayoutProps) {
  const token = await getCookie('accessToken');

  if (!token) {
    redirect(ROUTER.MAIN);
  }

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
