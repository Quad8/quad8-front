'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Link from 'next/link';

import { getOrdersData } from '@/api/orderAPI';
import { ROUTER } from '@/constants/route';
import { ChevronIcon } from '@/public/index';
import { Order, OrderStatus } from '@/types/OrderTypes';

import { Fragment, useEffect, useMemo, useState } from 'react';
import styles from './DeliveryStatus.module.scss';

const cn = classNames.bind(styles);

const DELIVERY_STATUS_LIST = [
  { label: '결제 완료', status: OrderStatus.PAYMENT_COMPLETED, count: 0 },
  { label: '배송 준비중', status: OrderStatus.PREPARING, count: 0 },
  { label: '배송 중', status: OrderStatus.SHIPPING, count: 0 },
  { label: '배송 완료', status: OrderStatus.DELIVERED, count: 0 },
  { label: '구매 확정', status: OrderStatus.CONFIRMED, count: 0 },
];

export default function DeliveryStatus() {
  const [deliveryStatusList, setDeliveryStatusList] = useState(DELIVERY_STATUS_LIST);

  const { data: ordersData } = useQuery<{ data: Order[] }>({ queryKey: ['ordersData'], queryFn: getOrdersData });

  const orders = useMemo(() => ordersData?.data ?? [], [ordersData]);

  useEffect(() => {
    const updatedStatusList = DELIVERY_STATUS_LIST.map((statusItem) => ({
      ...statusItem,
      count: orders.filter((order) => order.orderStatus === statusItem.status).length,
    }));
    setDeliveryStatusList(updatedStatusList);
  }, [orders]);

  return (
    <article className={cn('delivery-status')}>
      <div className={cn('status-header')}>
        <h1 className={cn('status-title')}>주문 / 배송 조회</h1>
        <Link className={cn('status-button')} href={ROUTER.MY_PAGE.ORDERS}>
          더보기 <ChevronIcon className={cn('button-icon')} />
        </Link>
      </div>
      <ul className={cn('status-list')}>
        {deliveryStatusList.map((status, i) => (
          <Fragment key={status.label}>
            <li className={cn('status-item')}>
              <span className={cn('status-count', { active: status.count > 0 })}>{status.count}</span>
              <span className={cn('status-label', { active: status.count > 0 })}>{status.label}</span>
            </li>
            {i < deliveryStatusList.length - 1 && (
              <ChevronIcon className={cn('status-icon', { 'active-icon': status.count > 0 })} />
            )}
          </Fragment>
        ))}
      </ul>
    </article>
  );
}
