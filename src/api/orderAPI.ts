import type { CreateOrderAPIType, Order } from '@/types/OrderTypes';
import { OrderDetailData } from '@/types/paymentTypes';
import { baseAPI } from './interceptor/interceptor';

export const postCreateOrder = async (orderData: CreateOrderAPIType) => {
  try {
    const data = await baseAPI.post<number>('/api/v1/order', {
      body: JSON.stringify(orderData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrdersData = async () => {
  try {
    const data = await baseAPI.get<Order[]>('/api/v1/order');
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
    const data = await baseAPI.get<OrderDetailData>(`/api/v1/order/${orderId}/payment`);

    if (data.status === 'FAIL') {
      return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
