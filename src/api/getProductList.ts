import { ProductListResponse, ProductParams } from '@/types/ProductItem';

const baseURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export async function getProductList({ sort, page, size }: ProductParams): Promise<ProductListResponse> {
  const response = await fetch(`${baseURL}/api/v1/product/get/all-list?&sort=${sort}&page=${page}&size=${size}`);

  if (!response.ok) {
    throw new Error('전체데이터를 불러오는데 실패함!');
  }

  const rawData: ProductListResponse = await response.json();

  return rawData;
}
