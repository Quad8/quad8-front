import { ProductReviewType } from '@/types/ProductReviewTypes';

export const getProductReviews = async (productId: string): Promise<ProductReviewType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/reviews?productId=${productId}&sort=createdAt&page=0&size=10`,
      {
        cache: 'no-store',
      },
    );
    const result = await res.json();

    return result.data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};
