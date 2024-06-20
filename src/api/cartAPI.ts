import { getCookie } from '@/libs/manageCookie';
import { CartProductType } from '@/types/ProductTypes';

export const postCart = async (data: CartProductType) => {
  const token = await getCookie('accessToken');

  try {
    await fetch(`${process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL}/api/v1/cart/add`, {
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
