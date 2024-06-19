import type { GetCategoryListParams, ProductListResponse, ProductParams } from '@/types/ProductItem';

const baseURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export async function getAllProductList({ sort, page, size }: ProductParams): Promise<ProductListResponse> {
  const response = await fetch(`${baseURL}/api/v1/product/get/all-list?&sort=${sort}&page=${page}&size=${size}`);

  if (!response.ok) {
    throw new Error('전체데이터를 불러오는데 실패함!');
  }

  const rawData: ProductListResponse = await response.json();

  return rawData;
}

export async function getCategoryProductList({
  keyword,
  sort,
  page,
  size,
  company,
  switchType,
  minPrice,
  maxPrice,
}: GetCategoryListParams): Promise<ProductListResponse> {
  try {
    const queryParams = new URLSearchParams({
      keyword: encodeURIComponent(keyword),
      sort: encodeURIComponent(sort as string),
      page: encodeURIComponent(page as string),
      size: encodeURIComponent(size),
      ...(company && { company: encodeURIComponent(company as string) }),
      ...(switchType && { switchType: encodeURIComponent(switchType as string) }),
      ...(minPrice && { minPrice: encodeURIComponent(minPrice as string) }),
      ...(maxPrice && { maxPrice: encodeURIComponent(maxPrice as string) }),
    }).toString();

    const response = await fetch(`${baseURL}/api/v1/product/get/category-list?${queryParams}`);

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`${keyword} 카테고리 : ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    const rawData: ProductListResponse = await response.json();

    return rawData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return {
      data: {
        totalPages: 0,
        totalElements: 0,
        size: 0,
        content: [],
        number: 0,
        first: false,
        last: false,
      },
    };
  }
}
