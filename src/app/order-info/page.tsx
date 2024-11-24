import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getUserData } from '@/api/usersAPI';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { UserRouteProvider } from '@/components';
import { QUERY_KEYS } from '@/constants/queryKey';
import { getQueryClient } from '@/libs/client';
import { prefetchOrderQuery } from '@/libs/prefetchers';
import OrderDetail from './_components/OrderDetail';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

interface OrderInfoPageProps {
  searchParams: { [key: string]: string };
}

export default async function OrderInfoPage({ searchParams }: OrderInfoPageProps) {
  const { orderId } = searchParams;
  const queryClient = getQueryClient();

  const userData = await fetchQueryBonding(queryClient, { queryKey: QUERY_KEYS.USER.DATA, queryFn: getUserData });

  if (userData?.data) await prefetchOrderQuery(queryClient, orderId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserRouteProvider>
        <section className={cn('page')}>
          <OrderDetail />
        </section>
      </UserRouteProvider>
    </HydrationBoundary>
  );
}
