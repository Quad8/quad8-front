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
  orderStatus: 'READY' | 'COMPLETED' | 'CANCELLED';
  purchaseDate: string;
  confirmationDate: string;
}

export interface OrderData {
  data: Order[];
}
