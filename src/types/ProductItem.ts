export interface Product {
  id: number;
  name: string;
  price: number;
  reviewscount: number;
  views: number;
  thumbnail: string;
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
  sort: string | string[];
  page?: string | string[];
  size?: string | string[];
}

export interface GetCategoryListParams {
  keyword: string;
  sort: string | string[];
  page: string | string[];
  size: string;
  company?: string | string[];
  switchType?: string | string[];
  minPrice?: string | string[];
  maxPrice?: string | string[];
}

export type TabType = '저소음' | '가성비' | '청축';

export interface TabKeyword {
  [key: string]: string;
}
