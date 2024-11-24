import { formatKSTSDate } from '@/utils/formatKSTSDate';
import type { CreateOrderAPIType, Order, OrderDetailData, OrderResponse, OrdersRequest } from '@/types/orderType';
import { FieldValues } from 'react-hook-form';
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

export const getOrdersData = async ({ page = 0, size = 10, startDate, endDate }: OrdersRequest) => {
  const initialDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setMonth(initialStartDate.getMonth() - 1);

  const formattedStartDate = startDate || initialStartDate;
  const formattedEndDate = endDate || initialDate;

  try {
    const data = await baseAPI.get<Order[]>(
      `/api/v1/order?page=${page}&size=${size}&startDate=${formatKSTSDate(formattedStartDate)}&endDate=${formatKSTSDate(formattedEndDate)}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (orderId: string) => {
  try {
    const data = await baseAPI.get<OrderResponse>(`/api/v1/order/${orderId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getPayment = async (orderId?: string) => {
  try {
    const data = await baseAPI.get<OrderDetailData>(`/api/v1/order/${orderId}/payment`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const putPayment = async (orderId?: string, payload?: FieldValues) => {
  try {
    const data = await baseAPI.put<Order>(`/api/v1/order/${orderId}/payment`, {
      body: JSON.stringify(payload),
    });
    return data;
  } catch (error) {
    throw error;
  }
};
