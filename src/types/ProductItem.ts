import { CategoryKey } from './Category';

export interface Product {
  id: number;
  name: string;
  price: number;
  reviewscount: number;
  views: number;
  thumbnail: string;
  category: CategoryKey;
}

export interface KeydeukPickResponse {
  data: Product[];
}

export interface ProductDataResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Product[];
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProductListResponse {
  data: ProductDataResponse;
}

export interface ProductParams {
  sort: string;
  page?: string;
  size?: string;
}

export interface GetCategoryListParams extends Record<string, string | string[] | undefined> {
  keyword: string;
  sort: string;
  page: string;
  size: string;
  companies?: string;
  switchTypes?: string;
  minPrice?: string;
  maxPrice?: string;
}

export type TabType = '저소음' | '가성비' | '청축';

export type TabKeyword = {
  [key in TabType]: string;
};
