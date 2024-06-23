import type { Product } from './ProductItem';

export enum OrderStatus {
  READY = 'READY',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PREPARING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface Order {
  orderId: number;
  orderItems: Product[];
  orderStatus: OrderStatus;
  purchaseDate: string;
  confirmationDate: string;
}
