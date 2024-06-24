import { getCookie } from '@/libs/manageCookie';

import type { CreateOrderAPIType } from '@/types/OrderTypes';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

export const postCreateOrder = async (orderData: CreateOrderAPIType) => {
  const token = await getCookie('accessToken');
  try {
    const res = await fetch(`${BASE_URL}/api/v1/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrdersData = async () => {
  const token = await getCookie('accessToken');

  if (!token) {
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/v1/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data.status === 'FAIL') {
      return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
