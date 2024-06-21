import classNames from 'classnames/bind';
import Image from 'next/image';
import { CustomDataType, ShopDataType } from '@/types/CartTypes';
import { Button, Modal } from '@/components';
import CustomOption from '@/components/CustomOption/CustomOption';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import { useState } from 'react';
import CardCheckBox from './CardCheckBox';
import styles from './CartCard.module.scss';
import ShopOption from './ShopOption';
import OptionEditModal from './OptionEditModal';

const cn = classNames.bind(styles);

interface CustomCardProps {
  type: 'custom';
  cardData: CustomDataType;
}

interface ShopCardProps {
  type: 'shop';
  cardData: ShopDataType;
}
export default function CartCard({ cardData, type }: CustomCardProps | ShopCardProps) {
  const imageURL = type === 'custom' ? cardData.imgUrl : cardData.thumbsnail;
  const title = type === 'custom' ? '키득 커스텀 키보드' : cardData.productTitle;
  const [isOpenModal, setIsOpenMoal] = useState(false);

  const handleClickEdit = () => {
    if (type === 'custom') {
      return;
    }
    setIsOpenMoal(true);
  };

  const handleCloseModal = () => {
    setIsOpenMoal(false);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div>
          <CardCheckBox id={cardData.id} type={type} />
        </div>
        <div className={cn('product-wrapper')}>
          <Image src={imageURL} width={104} height={104} alt='이미지' className={cn('image')} />
          <div className={cn('information-wrapper')}>
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
      <div className={cn('price')}>{cardData.price.toLocaleString()}원</div>
      <div className={cn('button-wrapper')}>
        <Button fontSize={14} width={90} radius={4} className={cn('button')} onClick={handleClickEdit}>
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
