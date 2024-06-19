import { ProductListResponse, ProductParams } from '@/types/ProductItem';

const baseURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export async function getAllProductList({ sort, page, size }: ProductParams): Promise<ProductListResponse> {
  const response = await fetch(`${baseURL}/api/v1/product/get/all-list?&sort=${sort}&page=${page}&size=${size}`);

  if (!response.ok) {
    throw new Error('전체데이터를 불러오는데 실패함!');
  }

  const rawData: ProductListResponse = await response.json();

  return rawData;
}
export async function getCategoryProductList({ keyword, sort, page, size, company, switchType, minPrice, maxPrice }) {
  const queryParams = new URLSearchParams({
    keyword: encodeURIComponent(keyword),
    sort: encodeURIComponent(sort),
    page: encodeURIComponent(page),
    size: encodeURIComponent(size),
    ...(company && { company: encodeURIComponent(company) }),
    ...(switchType && { switchType: encodeURIComponent(switchType) }),
    ...(minPrice && { minPrice: encodeURIComponent(minPrice) }),
    ...(maxPrice && { maxPrice: encodeURIComponent(maxPrice) }),
  }).toString();

  const response = await fetch(`${baseURL}/api/v1/product/get/category-list?${queryParams}`);

  if (!response.ok) {
    throw new Error(`Failed to load data for ${keyword}: ${response.status} ${response.statusText}`);
  }

  const rawData = await response.json();

  return rawData;
}
