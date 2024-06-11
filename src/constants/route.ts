export const ROUTER = {
  MAIN: '/',
  CUSTOM_KEYBOARD: '/custom-keyboard',
  COMMUNITY: '/community',

  AHTH: {
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
  },

  MY_PAGE: {
    MY_INFO: 'my-info',
    ORDERS: '/orders', // 주문 / 배송조회
    ADDRESSES: '/addresses', // 배송지 관리
    REVIEWS: '/reviews', // 구매후기
    WISHLIST: '/wishlist', // 찜 목록
    CART: '/cart', // 장바구니
    CHECKOUT: '/checkout', // 주문 / 결제
    MY_POSTS: '/my-posts', // 내 게시글
  },
} as const;
