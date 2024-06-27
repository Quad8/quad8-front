import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { getPaymentItemData } from '@/api/orderAPI';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import CheckoutNavigation from './_components/CheckoutNavigation/CheckoutNavigation';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default async function PaymentPageLayout({ children }: CheckoutLayoutProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['orderId'] });

  const orderId = queryClient.getQueryData<string>(['orderId']);

  if (orderId) {
    await queryClient.prefetchQuery({ queryKey: ['paymentItemData'], queryFn: () => getPaymentItemData(orderId) });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={cn('layout')}>
        <CheckoutNavigation />
        <div className={cn('page')}>{children}</div>
      </section>
    </HydrationBoundary>
  );
}
