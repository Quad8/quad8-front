import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

import { getOrdersData } from '@/api/orderAPI';
import { getAddresses } from '@/api/shippingAPI';
import { ROUTER } from '@/constants/route';
import { getCookie } from '@/libs/manageCookie';
import { SNB } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface MyInfoLayoutProps {
  children: ReactNode;
}

export default async function MyInfoLayout({ children }: MyInfoLayoutProps) {
  const queryClient = new QueryClient();
  const token = await getCookie('accessToken');

  if (!token) {
    redirect(ROUTER.MAIN);
  }

  await queryClient.prefetchQuery({ queryKey: ['addressesData'], queryFn: getAddresses });

  await queryClient.prefetchQuery({ queryKey: ['ordersData'], queryFn: getOrdersData });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={cn('layout')}>
        <SNB />
        <div className={cn('page')}>{children}</div>
      </section>
    </HydrationBoundary>
  );
}
