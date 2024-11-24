import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getOrder } from '@/api/orderAPI';
import { getUserData } from '@/api/usersAPI';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { UserRouteProvider } from '@/components';
import OrderDetail from './_components/OrderDetail';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

interface OrderInfoPageProps {
  searchParams: { [key: string]: string };
}

export default async function OrderInfoPage({ searchParams }: OrderInfoPageProps) {
  const { orderId } = searchParams;
  const queryClient = new QueryClient();

  const userData = await fetchQueryBonding(queryClient, { queryKey: ['userData'], queryFn: getUserData });

  if (userData?.data) {
    await queryClient.prefetchQuery({ queryKey: ['orderResponse', orderId], queryFn: () => getOrder(orderId) });
  }

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
