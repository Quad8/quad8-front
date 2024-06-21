import { getCookie } from '@/libs/manageCookie';

const BASEURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const getCartData = async () => {
  const accessToken = await getCookie('accessToken');
  try {
    const res = await fetch(`${BASEURL}/api/v1/cart/get`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartData = async (idList: string[]) => {
  const accessToken = await getCookie('accessToken');
  try {
    await fetch(`${BASEURL}/api/v1/cart/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ deletedProducts: idList }),
    });
  } catch (error) {
    throw error;
  }
};
