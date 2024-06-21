export const ROUTER = {
  MAIN: '/',
  CUSTOM_KEYBOARD: '/custom-keyboard',
  COMMUNITY: '/community',

  AHTH: {
    SIGN_UP: '/sign-up',
  },

  MY_PAGE: {
    MY_INFO: '/my-info',
    ORDERS: '/my-info/orders', // 주문 / 배송조회
    ADDRESSES: '/my-info/addresses', // 배송지 관리
    REVIEWS: '/my-info/reviews', // 구매후기
    WISHLIST: '/my-info/wishlist', // 찜 목록
    CART: '/my-info/cart', // 장바구니
    CHECKOUT: '/checkout', // 주문 / 결제
    MY_POSTS: '/my-info/my-posts', // 내 게시글
  },

  SHOP: {
    ALL: '/shop',
    KEYBOARD: '/shop/keyboard',
    KEYCAP: '/shop/keycap',
    SWITCH: '/shop/switch',
    ETC: '/shop/etc',
  },
} as const;
