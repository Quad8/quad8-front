import { getUserData } from '@/api/usersAPI';
import { ROUTER } from '@/constants/route';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { QUERY_KEYS } from '@/constants/queryKey';
import { getQueryClient } from '@/libs/client';
import CheckoutNavigation from '../../_components/CheckoutNavigation/CheckoutNavigation';
import CheckoutCompleted from './_components/CheckoutCompleted';

interface SuccessPageProps {
  searchParams: { [key: string]: string };
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const queryClient = getQueryClient();
  const { orderId } = searchParams;

  const userData = await fetchQueryBonding(queryClient, { queryKey: QUERY_KEYS.USER.DATA, queryFn: getUserData });

  if (!userData) {
    redirect(ROUTER.MAIN);
  }

  if (!orderId) {
    redirect('/not-found');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutNavigation isSucceed />
      <CheckoutCompleted />
    </HydrationBoundary>
  );
}
