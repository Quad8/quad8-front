import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import { POST_PARAMS, LIKE_PARAMS, MY_REVIEW_PARAMS } from '@/constants/initialParams';
import { getOrdersData } from '@/api/orderAPI';
import { getAddresses } from '@/api/shippingAPI';
import { getUserData } from '@/api/usersAPI';
import { getCartData } from '@/api/cartAPI';
import { getCoupon } from '@/api/couponAPI';
import { getMyPosts } from '@/api/communityAPI';
import { getProductLikes } from '@/api/likesAPI';
import { getUserProductReviews } from '@/api/productReviewAPI';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { formatDateToQueryString } from '@/utils/formatDateToQueryString';
import type { UserDataResponseType } from '@/types/userType';
import { UserRouteProvider } from '@/components';
import { SNB } from './_components';

import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface MyInfoLayoutProps {
  children: ReactNode;
}

export default async function MyInfoLayout({ children }: MyInfoLayoutProps) {
  const queryClient = new QueryClient();
  const userData = await fetchQueryBonding<UserDataResponseType | null>(queryClient, {
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  if (userData?.data) {
    await queryClient.prefetchQuery({ queryKey: ['addressesData'], queryFn: getAddresses });
    await queryClient.prefetchQuery({
      queryKey: ['ordersResponse'],
      queryFn: () => getOrdersData({ page: 0, size: 100, startDate: null, endDate: null }),
    });
    await queryClient.prefetchQuery({ queryKey: ['cartData'], queryFn: getCartData });
    await queryClient.prefetchQuery({ queryKey: ['coupons'], queryFn: getCoupon });
    await queryClient.prefetchQuery({
      queryKey: ['myCustomReview', POST_PARAMS],
      queryFn: () => getMyPosts(POST_PARAMS),
    });
    await queryClient.prefetchQuery({
      queryKey: ['like', 'lists', LIKE_PARAMS],
      queryFn: () => getProductLikes(LIKE_PARAMS),
    });
    await queryClient.prefetchQuery({
      queryKey: ['userProductReviews'],
      queryFn: () =>
        getUserProductReviews({
          startDate: formatDateToQueryString('start', new Date()),
          endDate: formatDateToQueryString('end', new Date()),
          ...MY_REVIEW_PARAMS,
        }),
    });
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
