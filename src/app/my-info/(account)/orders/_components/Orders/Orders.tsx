'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrdersData } from '@/api/orderAPI';
import { MyInfoEmptyCase } from '@/app/my-info/_components';
import DatePicker from '@/components/DatePicker/DatePicker';
import type { Order } from '@/types/orderType';
import { OrderHeader, OrderItemList } from './index';

export default function Orders() {
  const { data: ordersData } = useQuery<{ data: Order[] }>({ queryKey: ['ordersData'], queryFn: getOrdersData });

  const orders = ordersData?.data ?? null;

  return (
    <>
      <DatePicker onDateChange={() => {}} />
      {orders ? (
        <>
          <OrderHeader />
          {orders.map((order: Order) => (
            <OrderItemList key={order.orderId} order={order} />
          ))}
        </>
      ) : (
        <MyInfoEmptyCase message='구매내역이 없습니다.' />
      )}
    </>
  );
}
