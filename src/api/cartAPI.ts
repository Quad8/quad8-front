import { getCookie } from '@/libs/manageCookie';
import type { OptionChageAPIType } from '@/types/CartTypes';
import { CartProductType } from '@/types/ProductTypes';

const BASEURL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

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

export const putChangeCartData = async (id: number, data: OptionChageAPIType) => {
  const accessToken = await getCookie('accessToken');
  try {
    await fetch(`${BASEURL}/api/v1/cart/update/product/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};
