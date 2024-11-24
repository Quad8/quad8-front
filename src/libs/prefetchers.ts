import { getAlarm } from '@/api/alarmAPI';
import { getCartData } from '@/api/cartAPI';
import { getMyPosts } from '@/api/communityAPI';
import { getCoupon } from '@/api/couponAPI';
import { getProductLikes } from '@/api/likesAPI';
import { getOrder, getOrdersData, getPayment } from '@/api/orderAPI';
import { getUserProductReviews } from '@/api/productReviewAPI';
import { getAddresses } from '@/api/shippingAPI';
import { getUserData } from '@/api/usersAPI';
import { LIKE_PARAMS, MY_REVIEW_PARAMS, POST_PARAMS } from '@/constants/initialParams';
import { QUERY_KEYS } from '@/constants/queryKey';
import { formatDateToQueryString } from '@/utils/formatDateToQueryString';
import { QueryClient } from '@tanstack/react-query';

export const prefetchUserQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.USER.DATA, queryFn: getUserData });
};

export const prefetchCommunityAlarmQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.COMMUNITY.ALARM, queryFn: getAlarm, retry: false });
};

export const prefetchCartDataQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.CART.DATA, queryFn: getCartData, retry: false });
};

export const prefetchCouponsQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.COUPON.ALL, queryFn: getCoupon });
};

export const prefetchAddressQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.ADDRESS.ALL, queryFn: getAddresses });
};

export const prefetchOrdersQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.ORDER.ALL,
    queryFn: () => getOrdersData({ page: 0, size: 100, startDate: null, endDate: null }),
  });
};

export const prefetchOrderQuery = async (queryClient: QueryClient, orderId: string) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.ORDER.DETAIL(orderId), queryFn: () => getOrder(orderId) });
};

export const prefetchReviewQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.COMMUNITY.POSTS(),
    queryFn: () => getMyPosts(POST_PARAMS),
  });
};

export const prefetchLikelistsQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.LIKE.LISTS(),
    queryFn: () => getProductLikes(LIKE_PARAMS),
  });
};

export const prefetchProductReviewsQuery = async (queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.USER.PRODUCT_REVIEWS,
    queryFn: () =>
      getUserProductReviews({
        startDate: formatDateToQueryString('start', new Date()),
        endDate: formatDateToQueryString('end', new Date()),
        ...MY_REVIEW_PARAMS,
      }),
  });
};

export const prefetchPaymentQuery = async (queryClient: QueryClient, orderId: string) => {
  await queryClient.prefetchQuery({ queryKey: QUERY_KEYS.PAYMENT.DETAIL(orderId), queryFn: () => getPayment(orderId) });
};
