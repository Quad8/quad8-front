export interface Product {
  id: number;
  name: string;
  price: number;
  reviewscount: number;
  views: number;
  thumbnail: string;
}

interface ProductListResponse {
  data: {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Product[];
  };
}

export async function getProductList(
  keyword: 'all' | 'keyboard' | 'keycap' | 'switch' | 'others',
  sort: 'createdAt_desc' | 'views_desc' | 'price_asc' | 'price_desc',
  page: number,
  size: number,
): Promise<ProductListResponse> {
  const baseURL = process.env.KEYDEUK_API_BASE_URL;
  const res = await fetch(`${baseURL}/product/get-list?keyword=${keyword}&sort=${sort}&page=${page}&size=${size}`);
  const data: ProductListResponse = await res.json();
  return data;
}
