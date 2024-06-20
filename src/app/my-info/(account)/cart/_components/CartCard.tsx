import classNames from 'classnames/bind';
import Image from 'next/image';
import { CustomDataType, ShopDataType } from '@/types/CartTypes';
import { Button } from '@/components';
import CustomOption from '@/components/CustomOption/CustomOption';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import CardCheckBox from './CardCheckBox';
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
export default function CartCard({ cardData, type }: CustomCardProps | ShopCardProps) {
  const imageURL = type === 'custom' ? (cardData as CustomDataType).imgUrl : (cardData as ShopDataType).thumbsnail;

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div>
          <CardCheckBox id={cardData.id} type={type} />
        </div>
        <div className={cn('keyboard-wrapper')}>
          <Image src={imageURL} width={104} height={104} alt='이미지' className={cn('image')} />
          <div className={cn('information-wrapper')}>
            <div className={cn('title')}>키득 커스텀 키보드</div>
            {type === 'custom' && (
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
            )}
          </div>
        </div>
      </div>
      <div className={cn('price')}>{cardData.price.toLocaleString()}원</div>
      <div className={cn('button-wrapper')}>
        <Button fontSize={14} width={90} radius={4} className={cn('button')}>
          주문수정
        </Button>
        <Button fontSize={14} width={90} radius={4} className={cn('button')}>
          바로구매
        </Button>
      </div>
    </div>
  );
}
