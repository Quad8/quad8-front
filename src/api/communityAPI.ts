import { getCookie } from '@/libs/manageCookie';
import { CommunityParamsType } from '@/types/CommunityTypes';

export const getAllCommunityPost = async ({ sort, page, size }: CommunityParamsType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/all?sort=${sort}&page=${page}&size=${size}`,
      {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostDetail = async (id: number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/${id}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const postComment = async ({ id, content }: { id: number; content: string }) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/comment/${id}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCustomOrderList = async () => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/community/purchase-history`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
