import type {
  GetCategoryListParams,
  KeydeukPickResponse,
  ProductDataResponse,
  ProductParams,
  TabType,
} from '@/types/ProductItem';

import type { ProductType } from '@/types/ProductTypes';
import { baseAPI } from './interceptor/interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getProductDetail = async (productId: string) => {
  try {
    const { data } = await baseAPI.get<ProductType>(`/api/v1/product/${productId}`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch {
    throw new Error(`상품을 조회할 수 없습니다. `);
  }
};

export async function getAllProductList({ sort, page, size }: ProductParams) {
  try {
    const rawData = await baseAPI.get<ProductDataResponse>(
      `/api/v1/product/all?&sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );

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
}: GetCategoryListParams) {
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
    const rawData = await baseAPI.get<ProductDataResponse>(`/api/v1/product/category/${keyword}?${queryString}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return rawData;
  } catch (error) {
    throw error;
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
