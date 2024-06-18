import { getCookie } from '@/libs/manageCookie';
import type { FieldValues } from 'react-hook-form';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const postAddresses = async (payload: FieldValues) => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/shipping/address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log('postAddresses 성공', result);

    return result;
  } catch (error) {
    console.error('끼얏호우 실패~', error);
    throw error;
  }
};
