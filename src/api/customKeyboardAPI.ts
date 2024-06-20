import { getCookie } from '@/libs/manageCookie';
import type { CustomKeyboardAPITypes } from '@/types/CustomKeyboardTypes';

export const getRandomOptionProduct = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/custom/get/random-option-products`,
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
export const postCustomKeyboardOrder = async (data: CustomKeyboardAPITypes) => {
  const token = await getCookie('accessToken');
  try {
    await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/custom/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};
