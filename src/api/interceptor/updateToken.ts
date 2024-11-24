'use client';

import { getCookie, setCookie } from '@/utils/manageCookie';
import { emitCookieChange } from './event';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const updateToken = async (): Promise<null | string> => {
  const accessToken = await getCookie('accessToken');
  const refreshToken = await getCookie('refreshToken');

  if (!accessToken || !refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v1/reissue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const { data: token, message } = await response.json();

    if (!response.ok) {
      throw new Error(message);
    }

    setCookie('accessToken', token);
    return token;
  } catch (error) {
    emitCookieChange();
    throw error;
  }
};
