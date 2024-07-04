import type { FieldValues } from 'react-hook-form';
import type { UserAddress } from '@/types/shippingType';
import { baseAPI } from './interceptor/interceptor';

export const postAddress = async (payload: FieldValues) => {
  try {
    const result = await baseAPI.post('/api/v1/shipping/address', {
      body: JSON.stringify(payload),
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAddresses = async () => {
  try {
    const data = await baseAPI.get<UserAddress[]>('/api/v1/shipping/address');
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAddress = async (addressId: number) => {
  try {
    const result = await baseAPI.delete(`/api/v1/shipping/address/${addressId}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const putAddress = async (payload: FieldValues) => {
  try {
    const result = await baseAPI.put(`/api/v1/shipping/address/${payload.id}`, {
      body: JSON.stringify(payload),
    });
    return result;
  } catch (error) {
    throw error;
  }
};
