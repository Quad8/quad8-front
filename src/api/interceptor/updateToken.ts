'use client';

import { deleteCookie, getCookie, setCookie } from '@/libs/manageCookie';
import { toast } from 'react-toastify';

export const updateToken = async (baseURL: string) => {
  const prevAccessToken = await getCookie('accessToken');
  const prevRefreshToken = await getCookie('refreshToken');

  try {
    const response = await fetch(`${baseURL}/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken: prevAccessToken, refreshToken: prevRefreshToken }),
    });

    const {
      data: { accessToken, refreshToken },
    } = await response.json();

    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    toast.error('로그아웃 되었습니다. 다시 로그인 해주세요');
    throw error;
  }
};
