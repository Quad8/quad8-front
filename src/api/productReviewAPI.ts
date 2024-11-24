import { formatDateToQueryString } from '@/utils/formatDateToQueryString';
import type { ProductReviewParams, ProductReviewType, ReviewResponse } from '@/types/productReviewType';
import { baseAPI } from './interceptor/interceptor';

export const getProductReviews = async (params: ProductReviewParams) => {
  const { productId, sort = 'createdAt', page = 0, size = 10 } = params;

  try {
    const { data } = await baseAPI.get<ProductReviewType>(
      `/api/v1/reviews?productId=${productId}&sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-store',
      },
      true,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const postProductReviews = async ({ productId, formData }: { productId: number; formData: FormData }) => {
  try {
    await baseAPI.post(`/api/v1/reviews?productId=${productId}`, {
      body: formData,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserProductReviews = async (params: ProductReviewParams) => {
  const {
    sort = 'createdAt',
    page = '0',
    size = '10',
    startDate = '2024-01-01T00:00:00',
    endDate = formatDateToQueryString('end', new Date()),
  } = params;

  try {
    const { data } = await baseAPI.get<ReviewResponse>(
      `/api/v1/reviews/user?sort=${sort}&page=${page}&size=${size}&startDate=${startDate}&endDate=${endDate}`,
      {
        cache: 'no-store',
      },
      true,
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUserProductReview = async (reviewId: number) => {
  try {
    await baseAPI.delete(`/api/v1/reviews/${reviewId}`);
  } catch (error) {
    throw error;
  }
};

export const putUserProductReview = async ({ reviewId, formData }: { reviewId: number; formData: FormData }) => {
  try {
    await baseAPI.put(`/api/v1/reviews/${reviewId}`, {
      body: formData,
    });
  } catch (error) {
    throw error;
  }
};
