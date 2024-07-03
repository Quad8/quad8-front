import type { CustomKeyboardAPITypes } from '@/types/CustomKeyboardTypes';
import { baseAPI } from './interceptor/interceptor';

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
  try {
    await baseAPI.post('/api/v1/custom/create', {
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};
