import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { UserRouteProvider } from '@/components';
import { getQueryClient } from '@/libs/client';

import { prefetchUserQuery } from '@/libs/prefetchers';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default async function PaymentPageLayout({ children }: CheckoutLayoutProps) {
  const queryClient = getQueryClient();
  await prefetchUserQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserRouteProvider>
        <section className={cn('layout')}>
          <div className={cn('page')}>{children}</div>
        </section>
      </UserRouteProvider>
    </HydrationBoundary>
  );
}
