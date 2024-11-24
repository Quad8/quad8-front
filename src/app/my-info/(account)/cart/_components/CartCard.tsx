import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { putChangeCartData } from '@/api/cartAPI';
import { postCreateOrder } from '@/api/orderAPI';
import { Button, ItemOverview, Modal } from '@/components';
import { ROUTER } from '@/constants/route';
import type { OptionChageAPIType, CustomCardProps, ShopCardProps } from '@/types/cartType';
import type { CreateOrderResponseType } from '@/types/orderType';
import { formatCartDataToItemOverview } from '@/utils/formatCartDataToItemOverview';
import CardCheckBox from './CardCheckBox';
import OptionEditModal from './OptionEditModal';

import styles from './CartCard.module.scss';

const cn = classNames.bind(styles);

export default function CartCard({ cardData, type }: CustomCardProps | ShopCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const price = type === 'custom' ? cardData.price : Number(cardData.count * cardData.price);
  const cardItem = formatCartDataToItemOverview({ cardData, type } as CustomCardProps | ShopCardProps);

  const { mutate: createOrder } = useMutation({
    mutationFn: postCreateOrder,
    onSuccess: (response: CreateOrderResponseType) => {
      router.push(`${ROUTER.MY_PAGE.CHECKOUT}?orderId=${response.data}`);
    },
    onError: () => {
      toast.error('주문 정보 생성에 실패하였습니다');
    },
  });

  const { mutate: updateOption } = useMutation<void, Error, { id: number; data: OptionChageAPIType }>({
    mutationFn: ({ id, data }) => putChangeCartData(id, data),
  });

  const handleClickEdit = (id: number, data: OptionChageAPIType) => {
    updateOption(
      { id, data },
      {
        onSuccess: () => {
          setIsOpenModal(false);
          queryClient.invalidateQueries({ queryKey: ['cartData'] });
        },
        onError: () => {
          toast.error('주문 변경에 실패하였습니다');
        },
      },
    );
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    if (type === 'shop') {
      setIsOpenModal(true);
      return;
    }
    router.push(`${ROUTER.CUSTOM_KEYBOARD}?orderId=${cardData.id}`, { scroll: false });
  };

  const handleClickPurchase = () => {
    const orderData =
      type === 'custom'
        ? {
            productId: cardData.productId,
            switchOptionId: cardData.productId,
            quantity: 1,
          }
        : {
            productId: cardData.productId,
            switchOptionId: cardData.optionId,
            quantity: cardData.count,
          };
    createOrder([orderData]);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div>
          <CardCheckBox id={cardData.id} type={type} />
        </div>
        <ItemOverview item={cardItem} isRouteDetailPage />
      </div>
      <div className={cn('price')}>{price.toLocaleString()}원</div>
      <div className={cn('button-wrapper')}>
        <Button fontSize={14} width={90} radius={4} paddingVertical={8} onClick={handleOpenModal}>
          주문수정
        </Button>
        <Button fontSize={14} width={90} radius={4} paddingVertical={8} onClick={handleClickPurchase}>
          바로구매
        </Button>
      </div>
      {type === 'shop' && (
        <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
          <OptionEditModal
            id={cardData.id}
            productId={cardData.productId}
            currentCount={cardData.count}
            currentOptionId={cardData.optionId}
            onClickCancel={handleCloseModal}
            onClickEdit={handleClickEdit}
          />
        </Modal>
      )}
    </div>
  );
}
