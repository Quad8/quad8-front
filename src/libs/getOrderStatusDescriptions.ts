import { OrderStatus } from '@/types/orderType';

const OrderStatusDescriptions: { [key in string]: string } = {
  [OrderStatus.CANCELED]: '주문 취소',
  [OrderStatus.DELIVERED]: '배송 완료',
  [OrderStatus.PAYMENT_COMPLETED]: '결제 완료',
  [OrderStatus.PREPARING]: '배송 준비중',
  [OrderStatus.READY]: '상품 준비중',
  [OrderStatus.SHIPPING]: '배송 중',
};

export const getOrderStatusDescription = (status: string): string => {
  return OrderStatusDescriptions[status];
};
