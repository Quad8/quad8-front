import { getCookie } from '@/libs/manageCookie';
import { CommunityParamsType } from '@/types/CommunityTypes';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getAllCommunityPost = async ({ sort, page, size }: CommunityParamsType) => {
  const token = await getCookie('accessToken');

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/all?sort=${sort}&page=${page}&size=${size}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMyPosts = async ({ sort, page, size }: CommunityParamsType) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/user?sort=${sort}&page=${page}&size=${size}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostDetail = async (id: number) => {
  const token = await getCookie('accessToken');

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/${id}`, {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: token ? `Bearer ${token}` : '',
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
    const res = await fetch(`${BASE_URL}/api/v1/community/comment/${id}`, {
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

export const deleteComment = async (id: number) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/comment/${id}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
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

export const getCustomOrderList = async () => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/purchase-history`, {
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

export const postCreateCustomReview = async (formData: FormData) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const putEditCustomReview = async ({ id, formData }: { id: number; formData: FormData }) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/update/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePostCard = async (postId: number) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/community/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
