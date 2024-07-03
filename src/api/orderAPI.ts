import type { CreateOrderAPIType } from '@/types/OrderTypes';
import { baseAPI } from './interceptor/interceptor';

export const postCreateOrder = async (orderData: CreateOrderAPIType) => {
  try {
    const data = await baseAPI.post('/api/v1/order', {
      body: JSON.stringify(orderData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrdersData = async () => {
  try {
    const data = await baseAPI.get('/api/v1/order');
    if (data.status === 'FAIL') {
      return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentItemData = async (orderId: string | undefined) => {
  try {
    const data = await baseAPI.get(`/api/v1/order/${orderId}/payment`);

    if (data.status === 'FAIL') {
      return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
