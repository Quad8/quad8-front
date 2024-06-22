import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { putChangeCartData } from '@/api/cartAPI';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import type { CustomDataType, OptionChageAPIType, ShopDataType } from '@/types/CartTypes';
import { ROUTER } from '@/constants/route';
import { Button, Modal, CustomOption } from '@/components';
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
  etc: '기타 용품',
};

export default function CartCard({ cardData, type }: CustomCardProps | ShopCardProps) {
  const router = useRouter();
  const imageURL = type === 'custom' ? cardData.imgUrl : cardData.thumbsnail;
  const title = type === 'custom' ? '키득 커스텀 키보드' : cardData.productTitle;
  const queryClient = useQueryClient();
  const [isOpenModal, setIsOpenMoal] = useState(false);
  const price = type === 'custom' ? cardData.price : Number(cardData.count * cardData.price);
  const category = type === 'shop' ? CATEGORY[cardData.category] : '';

  const updateOption = useMutation<void, Error, { id: number; data: OptionChageAPIType }>({
    mutationFn: ({ id, data }) => putChangeCartData(id, data),
  });

  const handleClickEdit = (id: number, data: OptionChageAPIType) => {
    updateOption.mutate(
      { id, data },
      {
        onSuccess: () => {
          setIsOpenMoal(false);
          queryClient.invalidateQueries({ queryKey: ['cartData'] });
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
    const custom = JSON.stringify(cardData);
    localStorage.setItem('customData', custom);
    router.push(ROUTER.CUSTOM_KEYBOARD, { scroll: false });
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div>
          <CardCheckBox id={cardData.id} type={type} />
        </div>
        <div className={cn('product-wrapper')}>
          <Image src={imageURL} width={104} height={104} alt='이미지' className={cn('image')} priority />
          <div className={cn('information-wrapper')}>
            {type === 'shop' && <div className={cn('type')}>{category}</div>}
            <div className={cn('title')}> {title}</div>
            {type === 'custom' ? (
              <CustomOption
                boardType={cardData.type === 'full' ? '풀 배열' : '텐키리스'}
                texture={cardData.texture === 'metal' ? '금속' : '플라스틱'}
                boardColor={cardData.boardColor as string}
                customSwitch={cardData.switchType}
                baseKeyColor={cardData.baseKeyColor as string}
                hasPointKeyCap={cardData.hasPointKeyCap}
                pointKeyType={cardData.pointKeyType}
                pointSetColor={cardData.pointSetColor as string | null}
                individualColor={cardData.individualColor as Partial<Record<CustomKeyboardKeyTypes, string>>}
              />
            ) : (
              <ShopOption optionName={cardData.optionName} count={cardData.count} />
            )}
          </div>
        </div>
      </div>
      <div className={cn('price')}>{price.toLocaleString()}원</div>
      <div className={cn('button-wrapper')}>
        <Button fontSize={14} width={90} radius={4} className={cn('button')} onClick={handleOpenModal}>
          주문수정
        </Button>
        <Button fontSize={14} width={90} radius={4} className={cn('button')}>
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
