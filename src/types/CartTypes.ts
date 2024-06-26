import type { CustomKeyboardAPITypes } from './CustomKeyboardTypes';

export interface CustomDataType extends Omit<CustomKeyboardAPITypes, 'imgBase64' | 'option'> {
  id: number;
  productId: number;
  imgUrl: string;
  classification: 'CUSTOM';
}

export interface ShopDataType {
  id: number;
  prductId: number;
  optionId: number | null;
  optionName: string | null;
  price: number;
  productTitle: string;
  thumbsnail: string;
  count: number;
  classification: 'SHOP';
  category: 'keyboard' | 'keycap' | 'etc';
}

export interface CartAPIDataType {
  CUSTOM: CustomDataType[];
  SHOP: ShopDataType[];
  totalCount: number;
}

export interface OptionChageAPIType {
  count: number;
  switchOptionId: number | null;
}
