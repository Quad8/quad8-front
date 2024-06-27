import { OrderItem } from './OrderTypes';

export interface ShippingAddressResponse {
  address: string;
  detailAddress: string;
  id: number;
  isDefault: boolean;
  name: string;
  phone: string;
  zoneCode: string;
}

export interface OrderDetailData {
  orderId: number;
  orderItemResponses: OrderItem[];
  paymentOrderId: string;
  shippingAddressResponse: ShippingAddressResponse;
  totalPrice: number;
}
