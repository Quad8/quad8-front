import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { getQueryClient } from '@/libs/client';
import { prefetchAddressQuery, prefetchPaymentQuery } from '@/libs/prefetchers';
import CheckoutForm from './_components/CheckoutForm/CheckoutForm';
import CheckoutNavigation from './_components/CheckoutNavigation/CheckoutNavigation';

interface PaymentPageProps {
  searchParams: { [key: string]: string };
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const queryClient = getQueryClient();
  const { orderId } = searchParams;

  if (!orderId) {
    redirect('/not-found');
  }

  await prefetchPaymentQuery(queryClient, orderId);
  await prefetchAddressQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CheckoutNavigation />
      <CheckoutForm />
    </HydrationBoundary>
  );
}
