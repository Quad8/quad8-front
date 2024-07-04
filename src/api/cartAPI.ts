import type { CartProductType } from '@/types/ProductTypes';
import type { CartAPIDataType, OptionChageAPIType } from '@/types/CartTypes';
import type { CustomKeyboardAPITypes } from '@/types/CustomKeyboardTypes';
import { baseAPI } from './interceptor/interceptor';

export const postCart = async (data: CartProductType) => {
  try {
    await baseAPI.post('/api/v1/cart/add', {
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};

export const getCartData = async () => {
  try {
    const { data } = await baseAPI.get<CartAPIDataType>('/api/v1/cart/get', {
      cache: 'no-store',
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartData = async (idList: string[]) => {
  try {
    await baseAPI.delete('/api/v1/cart/delete', {
      body: JSON.stringify({ deletedProducts: idList }),
    });
  } catch (error) {
    throw error;
  }
};

export const putChangeCartData = async (id: number, data: OptionChageAPIType) => {
  try {
    await baseAPI.put(`/api/v1/cart/update/product/${id}`, {
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};

export const putUpdateCustomKeyboardData = async (id: number, data: Omit<CustomKeyboardAPITypes, 'option'>) => {
  try {
    await baseAPI.put(`/api/v1/cart/update/custom/${id}`, {
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw error;
  }
};
