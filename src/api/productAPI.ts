import type { ProductType } from '@/types/ProductTypes';

export const getProductDetail = async (productId: string): Promise<ProductType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/product/get-detail-info/${productId}`,
    );
    const result = await res.json();

    return result.data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};
