'use client';

import { useQuery } from '@tanstack/react-query';

import { getOrdersData } from '@/api/orderAPI';
import { MyInfoEmptyCase } from '@/app/my-info/_components';
import DatePicker from '@/components/DatePicker/DatePicker';
import type { OrderData } from '@/types/orderType';
import { OrderHeader, OrderItemList } from './index';

export default function Orders() {
  const { data: ordersData } = useQuery<{ data: OrderData }>({ queryKey: ['ordersData'], queryFn: getOrdersData });

  console.log(ordersData);

  return (
    <>
      <DatePicker onDateChange={() => {}} />
      {ordersData ? (
        <>
          <OrderHeader />
          <OrderItemList />
        </>
      ) : (
        <MyInfoEmptyCase message='구매내역이 없습니다.' />
      )}
    </>
  );
}
