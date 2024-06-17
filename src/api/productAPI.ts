import { ProductType } from '@/types/ProductTypes';

const getProductDetail = async (productId: string): Promise<ProductType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/product/get-detail-info/${productId}`,
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

export { getProductDetail };
