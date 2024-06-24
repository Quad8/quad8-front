import { getCookie } from '@/libs/manageCookie';
import type { ProductReviewParams, ProductReviewType } from '@/types/ProductReviewTypes';

export const getProductReviews = async (params: ProductReviewParams): Promise<ProductReviewType> => {
  const { productId, sort = 'createdAt', page = 0, size = 10 } = params;
  const token = await getCookie('accessToken');

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/reviews?productId=${productId}&sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    );
    const { data } = await res.json();

    return data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};
