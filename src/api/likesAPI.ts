import { baseAPI } from './interceptor/interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const postProductLikes = async (productId: number) => {
  try {
    await baseAPI.post(`/api/v1/likes/${productId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteProductLikes = async (productId: number) => {
  try {
    await baseAPI.delete(`/api/v1/likes/${productId}`);
  } catch (error) {
    throw error;
  }
};

export const postCommunityLikes = async (communityId: number) => {
  try {
    await baseAPI.post(`${BASE_URL}/api/v1/community/likes/${communityId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteCommunityLikes = async (communityId: number) => {
  try {
    await baseAPI.delete(`/api/v1/community/likes/${communityId}`);
  } catch (error) {
    throw error;
  }
};

export const postReviewLikes = async (reviewId: number) => {
  try {
    await baseAPI.post(`api/v1/reviews/likes/${reviewId}`);
  } catch (error) {
    throw error;
  }
};

export const deleteReviewLikes = async (reviewId: number) => {
  try {
    await baseAPI.delete(`/api/v1/reviews/likes/${reviewId}`);
  } catch (error) {
    throw error;
  }
};
