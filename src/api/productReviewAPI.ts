import type { ProductReviewParams, ProductReviewType } from '@/types/ProductReviewTypes';
import { baseAPI } from './interceptor/interceptor';

export const getProductReviews = async (params: ProductReviewParams): Promise<ProductReviewType> => {
  const { productId, sort = 'likes', page = 0, size = 10 } = params;

  try {
    const { data } = await baseAPI.get(
      `/api/v1/reviews?productId=${productId}&sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};
