'use client';

import { MyInfoEmptyCase } from '@/app/my-info/_components';
import DatePicker from '@/components/DatePicker/DatePicker';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderItemList from './OrderItemList/OrderItemList';

export default function Orders() {
  return (
    <>
      <DatePicker onDateChange={() => {}} />
      <OrderHeader />
      <OrderItemList />

      <MyInfoEmptyCase message='구매내역이 없습니다.' />
    </>
  );
}
