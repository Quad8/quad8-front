import { OrderItem } from '@/types/orderType';

interface RenderPaymentProductNameProps {
  orderItemResponses: OrderItem[] | null;
}

export const renderPaymentProductName = ({ orderItemResponses }: RenderPaymentProductNameProps) => {
  if (!orderItemResponses || orderItemResponses.length === 0) {
    return '';
  }

  if (orderItemResponses.length === 1) {
    return `${orderItemResponses[0].productName}`;
  }

  return `${orderItemResponses[0].productName} 외 ${orderItemResponses.length - 1}건`;
};
