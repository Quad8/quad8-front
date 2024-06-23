export enum OrderStatus {
  READY = 'READY',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PREPARING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface OrderItem {
  productId: number;
  productImgUrl: string;
  productName: string;
  switchOption: string;
  viewCount: number;
}

export interface Order {
  orderId: number;
  orderItems: OrderItem[];
  orderStatus: OrderStatus;
  purchaseDate: string;
  confirmationDate: string;
}

export interface OrderData {
  data: Order[];
}
