import type {
  GetCategoryListParams,
  KeydeukPickResponse,
  ProductListResponse,
  ProductParams,
  TabType,
} from '@/types/ProductItem';
import type { ProductType } from '@/types/ProductTypes';

const baseURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

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

export async function getAllProductList({ sort, page, size }: ProductParams): Promise<ProductListResponse> {
  try {
    const response = await fetch(`${baseURL}/api/v1/product/get/all-list?&sort=${sort}&page=${page}&size=${size}`);
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
    throw error;
  }
}

export async function getKeydeukPick(param: TabType) {
  try {
    const response = await fetch(`${baseURL}/api/v1/product/get/keydeuk-pick?&param=${param}`);
    const rawData: KeydeukPickResponse = await response.json();

    return rawData.data;
  } catch (error) {
    throw error;
  }
}

export async function getKeydeukBest() {
  try {
    const response = await fetch(`${baseURL}/api/v1/product/get/keyduek-best`);
    const rawData: KeydeukPickResponse = await response.json();

    return rawData.data;
  } catch (error) {
    throw error;
  }
}
