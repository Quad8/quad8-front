import { CommunityParamsType } from '@/types/CommunityTypes';

export const getAllCommunityPost = async ({ sort, page, size }: CommunityParamsType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/all?sort=${sort}&page=${page}&size=${size}`,
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostDetail = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/${id}`);
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
