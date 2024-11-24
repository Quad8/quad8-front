import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { PropsWithChildren } from 'react';

import { getUserData } from '@/api/usersAPI';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import type { UserDataResponseType } from '@/types/userType';
import { UserRouteProvider } from '@/components';
import { getQueryClient } from '@/libs/client';
import {
  prefetchAddressQuery,
  prefetchCartDataQuery,
  prefetchCouponsQuery,
  prefetchLikelistsQuery,
  prefetchOrdersQuery,
  prefetchProductReviewsQuery,
  prefetchReviewQuery,
} from '@/libs/prefetchers';
import { QUERY_KEYS } from '@/constants/queryKey';
import { SNB } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

export default async function MyInfoLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  const userData = await fetchQueryBonding<UserDataResponseType | null>(queryClient, {
    queryKey: QUERY_KEYS.USER.DATA,
    queryFn: getUserData,
  });

  if (userData?.data) {
    await Promise.all([
      prefetchAddressQuery(queryClient),
      prefetchOrdersQuery(queryClient),
      prefetchCartDataQuery(queryClient),
      prefetchCouponsQuery(queryClient),
      prefetchReviewQuery(queryClient),
      prefetchLikelistsQuery(queryClient),
      prefetchProductReviewsQuery(queryClient),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserRouteProvider>
        <section className={cn('layout')}>
          <SNB />
          <div className={cn('page')}>{children}</div>
        </section>
      </UserRouteProvider>
    </HydrationBoundary>
  );
}
