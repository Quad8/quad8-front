import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Link from 'next/link';

import { putChangeCartData } from '@/api/cartAPI';
import { postCreateOrder } from '@/api/orderAPI';
import type { CustomDataType, OptionChageAPIType, ShopDataType } from '@/types/CartTypes';
import type { CreateOrderResponseType } from '@/types/OrderTypes';
import { ROUTER } from '@/constants/route';
import { Button, Modal, CustomOption } from '@/components';
import { toast } from 'react-toastify';
import CardCheckBox from './CardCheckBox';
import ShopOption from './ShopOption';
import OptionEditModal from './OptionEditModal';

import styles from './CartCard.module.scss';

const cn = classNames.bind(styles);

interface CustomCardProps {
  type: 'custom';
  cardData: CustomDataType;
}

interface ShopCardProps {
  type: 'shop';
  cardData: ShopDataType;
}

const CATEGORY = {
  keyboard: '키보드',
  keycap: '키캡',
  switch: '스위치',
  etc: '기타 용품',
};

export default function CartCard({ cardData, type }: CustomCardProps | ShopCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenMoal] = useState(false);

  const imageURL = type === 'custom' ? cardData.imgUrl : cardData.thumbsnail;
  const title = type === 'custom' ? '키득 커스텀 키보드' : cardData.productTitle;
  const price = type === 'custom' ? cardData.price : Number(cardData.count * cardData.price);
  const category = type === 'shop' ? CATEGORY[cardData.category] : '';
  const { mutate: createOrder } = useMutation({
    mutationFn: postCreateOrder,
    onSuccess: (response: CreateOrderResponseType) => {
      queryClient.setQueryData(['orderId'], response.data);
      router.push(ROUTER.MY_PAGE.CHECKOUT);
    },
    onError: () => {
      toast.error('주문 정보 생성에 실팽하였습니다');
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
          setIsOpenMoal(false);
          queryClient.invalidateQueries({ queryKey: ['cartData'] });
        },
        onError: () => {
          toast.error('주문 변경에 실패하였습니다');
        },
      },
    );
  };

  const handleCloseModal = () => {
    setIsOpenMoal(false);
  };

  const handleOpenModal = () => {
    if (type === 'shop') {
      setIsOpenMoal(true);
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
            productId: cardData.prductId,
            switchOptionId: cardData.optionId,
            quantity: cardData.count,
          };
    createOrder([orderData], {
      onSuccess: () => {
        router.push(ROUTER.MY_PAGE.CHECKOUT);
      },
      onError: () => {
        toast.error('주문 정보 생성에 실패하였습니다');
      },
    });
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div>
          <CardCheckBox id={cardData.id} type={type} />
        </div>
        {type === 'shop' ? (
          <Link className={cn('product-wrapper')} href={`/shop/${cardData.category}/${cardData.prductId}`}>
            <Image src={imageURL} width={104} height={104} alt='이미지' className={cn('image')} priority />
            <div className={cn('information-wrapper')}>
              {type === 'shop' && <div className={cn('type')}>{category}</div>}
              <div className={cn('title')}> {title}</div>
              <ShopOption optionName={cardData.optionName} count={cardData.count} />
            </div>
          </Link>
        ) : (
          <div className={cn('product-wrapper')}>
            <Image src={imageURL} width={104} height={104} alt='이미지' className={cn('image')} priority />
            <div className={cn('information-wrapper')}>
              <div className={cn('title')}> {title}</div>
              <CustomOption customData={cardData} />
            </div>
          </div>
        )}
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
            productId={cardData.prductId}
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
