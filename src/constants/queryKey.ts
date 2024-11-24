import { LIKE_PARAMS, POST_PARAMS } from './initialParams';

export const QUERY_KEYS = {
  PRODUCT: {
    ALL: ['all'],
    LISTS: () => [...QUERY_KEYS.PRODUCT.ALL, 'lists'],
    LIST: (filter: string) => [...QUERY_KEYS.PRODUCT.LISTS(), filter],
    DETAIL: (productId: number) => ['product', productId],
  },
  LIKE: {
    ALL: ['likes'],
    LISTS: (params = LIKE_PARAMS) => [...QUERY_KEYS.LIKE.ALL, 'lists', params], // 좋아요 목록
  },
  USER: {
    DATA: ['userData'],
    PRODUCT_REVIEWS: ['userProductReviews'], // 사용자 상품 리뷰
  },
  COMMUNITY: {
    ALARM: ['communityAlarm'],
    POSTS: (params = POST_PARAMS) => ['myCustomReview', params], // 커뮤니티 포스트
  },
  CART: {
    DATA: ['cartData'],
  },
  COUPON: {
    ALL: ['coupons'],
  },
  ADDRESS: {
    ALL: ['addressesData'],
  },
  ORDER: {
    ALL: ['ordersResponse'],
    DETAIL: (orderId: string) => ['orderResponse', orderId],
  },
  PAYMENT: {
    DETAIL: (orderId: string) => ['paymentResponse', orderId],
  },
};
