'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getCartData } from '@/api/cartAPI';
import type { CartAPIDataType } from '@/types/CartTypes';
import { Button } from '@/components';

import { useContext } from 'react';
import { CartDataContext } from '@/context/CartDataContext';
import { postCreateOrder } from '@/api/orderAPI';
import type { CreateOrderResponseType } from '@/types/OrderTypes';
import { useRouter } from 'next/navigation';
import { ROUTER } from '@/constants/route';
import styles from './PurchaseButton.module.scss';

const cn = classNames.bind(styles);

export default function PurchaseButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { checkedCustomList, checkedShopList } = useContext(CartDataContext);
  const { data } = useQuery({ queryKey: ['cartData'], queryFn: getCartData }) as {
    data: CartAPIDataType;
  };
  const createOrder = useMutation({
    mutationFn: postCreateOrder,
    onSuccess: (response: CreateOrderResponseType) => {
      console.log(response.data);
      queryClient.setQueryData(['orderId'], response.data);
      router.push(ROUTER.MY_PAGE.CHECKOUT);
    },
  });

  const handleClickSelectedButton = () => {
    const customSelectedData = data.CUSTOM.filter((custom) => checkedCustomList[custom.id]).map((element) => ({
      productId: element.productId,
      switchOptionId: element.productId,
      quantity: 1,
    }));

    const shopSelectedData = data.SHOP.filter((shop) => checkedShopList[shop.id]).map((element) => ({
      productId: element.prductId,
      switchOptionId: element.optionId,
      quantity: element.count,
    }));

    const orderData = [...customSelectedData, ...shopSelectedData];
    createOrder.mutate(orderData);
  };

  const handleClickAllButton = () => {
    const customData = data.CUSTOM.map((element) => ({
      productId: element.productId,
      switchOptionId: element.productId,
      quantity: 1,
    }));

    const shopData = data.SHOP.map((element) => ({
      productId: element.prductId,
      switchOptionId: element.optionId,
      quantity: element.count,
    }));

    const orderData = [...customData, ...shopData];
    createOrder.mutate(orderData);
  };

  return (
    <div className={cn('button-wrapper')}>
      <Button
        backgroundColor='outline-primary'
        fontSize={14}
        radius={4}
        className={cn('button')}
        onClick={handleClickSelectedButton}
      >
        선택 상품 구매
      </Button>
      <Button
        backgroundColor='outline-primary'
        fontSize={14}
        radius={4}
        className={cn('button')}
        onClick={handleClickAllButton}
      >
        전체 상품 구매
      </Button>
    </div>
  );
}
