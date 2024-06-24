import { getCookie } from '@/libs/manageCookie';
import type {
  GetCategoryListParams,
  KeydeukPickResponse,
  ProductListResponse,
  ProductParams,
  TabType,
} from '@/types/ProductItem';

import type { ProductType } from '@/types/ProductTypes';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getProductDetail = async (productId: string): Promise<ProductType> => {
  const token = await getCookie('accessToken');

  try {
    const res = await fetch(`${BASE_URL}/api/v1/product/${productId}`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    const result = await res.json();

    return result.data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};

export async function getAllProductList({ sort, page, size }: ProductParams): Promise<ProductListResponse> {
  const token = await getCookie('accessToken');

  try {
    const response = await fetch(`${BASE_URL}/api/v1/product/all?&sort=${sort}&page=${page}&size=${size}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    const rawData: ProductListResponse = await response.json();

    return rawData;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryProductList({
  keyword,
  sort,
  page,
  size,
  companies,
  switchTypes,
  minPrice,
  maxPrice,
}: GetCategoryListParams): Promise<ProductListResponse> {
  const token = await getCookie('accessToken');

  try {
    const queryParams: Record<string, string> = {
      keyword,
      sort,
      page,
      size,
    };

    if (companies) queryParams.companies = companies;
    if (switchTypes) queryParams.switchTypes = switchTypes;
    if (minPrice) queryParams.minPrice = minPrice;
    if (maxPrice) queryParams.maxPrice = maxPrice;

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/api/v1/product/category/${keyword}?${queryString}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`${keyword} 카테고리 : ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    const rawData: ProductListResponse = await response.json();
    return rawData;
  } catch (error) {
    throw new Error('에러');
  }
}

export async function getKeydeukPick(param: TabType) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/product/keydeuk-pick?&param=${param}`);
    const rawData: KeydeukPickResponse = await response.json();

    return rawData.data;
  } catch (error) {
    throw error;
  }
}

export async function getKeydeukBest() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/product/keydeuk-best`);
    const rawData: KeydeukPickResponse = await response.json();

    return rawData.data;
  } catch (error) {
    throw error;
  }
}
