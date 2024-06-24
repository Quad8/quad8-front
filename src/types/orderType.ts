import { CustomKeyboardAPITypes } from './CustomKeyboardTypes';

export enum OrderStatus {
  READY = 'READY',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PREPARING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  CONFIRMED = 'CONFIRMED',
}

export interface OrderItem {
  productId: number;
  productImgUrl: string;
  productName: string;
  quantity: number;
  switchOption: CustomKeyboardAPITypes;
  viewCount: number;
  price: number;
}

export interface Order {
  orderId: number;
  orderItems: OrderItem[];
  orderStatus: OrderStatus;
  purchaseDate: string;
  confirmationDate: string;
}
