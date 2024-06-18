export interface Product {
  id: number;
  name: string;
  price: number;
  reviewscount: number;
  views: number;
  thumbnail: string;
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
  sort: string | string[] | undefined;
  page?: string | string[] | undefined;
  size?: string | string[] | undefined;
}
