export const ROUTER = {
  MAIN: '/',
  CUSTOM_KEYBOARD: '/custom-keyboard',
  COMMUNITY: '/community',

  AHTH: {
    SIGN_UP: '/sign-up',
  },

  MY_PAGE: {
    MY_INFO: '/my-info',
    ADDRESSES: '/my-info/addresses', // 배송지 관리
    REVIEWS: '/my-info/reviews', // 구매후기
    WISHLIST: '/my-info/wishlist', // 찜 목록
    CART: '/my-info/cart', // 장바구니
    MY_POSTS: '/my-info/my-posts', // 내 게시글

    ORDERS: '/my-info/orders', // 주문 / 배송조회
    ORDER_INFO: '/my-info/order-info',

    CHECKOUT: '/payment', // 주문 / 결제
    CHECKOUT_SUCCESS: '/payment-success',
  },

  SHOP: {
    ALL: '/shop',
    KEYBOARD: '/shop/keyboard',
    KEYCAP: '/shop/keycap',
    SWITCH: '/shop/switch',
    ETC: '/shop/etc',
  },
  GITHUB: {
    FRONT: 'https://github.com/Quad8/quad8-front',
    BACK: 'https://github.com/Quad8/quad8-backend',
  },
} as const;
