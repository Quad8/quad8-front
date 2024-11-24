import { getCookie } from '@/utils/manageCookie';
import type { Users } from '@/types/userType';
import { baseAPI } from './interceptor/interceptor';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getUserData = async () => {
  const accessToken = await getCookie('accessToken');

  if (!accessToken) {
    return null;
  }
  try {
    const data = await baseAPI.get<Users>('/api/v1/users/me', {
      cache: 'no-cache',
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const putEditProfile = async (formData: FormData) => {
  try {
    await baseAPI.put('/api/v1/users/me', {
      body: formData,
    });
  } catch (error) {
    throw error;
  }
};

export const checkNickname = async (nickname: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/users/check/nickname?nickname=${nickname}`);

    const result = await response.json();

    if (response.ok) {
      return result;
    }

    throw new Error(result.message || '이미 사용중인 닉네임 입니다.');
  } catch (error) {
    throw error;
  }
};

export const getOthersInfo = async (userId: number) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/${userId}`);
    const { data, message } = await res.json();
    if (!res.ok) {
      throw new Error(message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
