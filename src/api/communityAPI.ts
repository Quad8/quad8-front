import type {
  CommunityParamsType,
  CommunityAllDataAPITypes,
  CommunityPostCardDetailDataType,
  PostCardDetailModalCustomKeyboardType,
} from '@/types/CommunityTypes';
import { baseAPI } from './interceptor/interceptor';

export const getAllCommunityPost = async ({ sort, page, size }: CommunityParamsType) => {
  try {
    const { data } = await baseAPI.get<CommunityAllDataAPITypes>(
      `/api/v1/community/all?sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMyPosts = async ({ sort, page, size }: CommunityParamsType) => {
  try {
    const { data } = await baseAPI.get<CommunityAllDataAPITypes>(
      `/api/v1/community/user?sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostDetail = async (id: number) => {
  try {
    const data = baseAPI.get<CommunityPostCardDetailDataType>(`/api/v1/community/${id}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return await data;
  } catch (error) {
    throw error;
  }
};

export const postComment = async ({ id, content }: { id: number; content: string }) => {
  try {
    const data = await baseAPI.post(`/api/v1/community/comment/${id}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ content }),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (id: number) => {
  try {
    const data = await baseAPI.delete(`/api/v1/community/comment/${id}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCustomOrderList = async () => {
  try {
    const data = await baseAPI.get<PostCardDetailModalCustomKeyboardType[]>('/api/v1/community/purchase-history', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const postCreateCustomReview = async (formData: FormData) => {
  try {
    const data = await baseAPI.post('/api/v1/community/create', {
      body: formData,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const putEditCustomReview = async ({ id, formData }: { id: number; formData: FormData }) => {
  try {
    const data = await baseAPI.put(`/api/v1/community/update/${id}`, {
      body: formData,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePostCard = async (postId: number) => {
  try {
    const data = await baseAPI.delete(`/api/v1/community/delete/${postId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
