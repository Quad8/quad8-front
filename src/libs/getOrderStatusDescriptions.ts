import { OrderStatus } from '@/types/orderType';

const OrderStatusDescriptions: { [key in string]: string } = {
  [OrderStatus.READY]: '결제 준비중',
  [OrderStatus.PAYMENT_COMPLETED]: '결제 완료',
  [OrderStatus.PREPARING]: '배송 준비중',
  [OrderStatus.DELIVERED]: '배송 완료',
  [OrderStatus.SHIPPING]: '배송 중',
  [OrderStatus.CONFIRMED]: '구매 확정',
  [OrderStatus.CANCELED]: '주문 취소',
};

export const getOrderStatusDescription = (status: string): string => {
  return OrderStatusDescriptions[status];
};
