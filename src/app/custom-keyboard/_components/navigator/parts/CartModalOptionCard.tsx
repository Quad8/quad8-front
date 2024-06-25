'use client';

import classNames from 'classnames/bind';
import Image, { StaticImageData } from 'next/image';
import { MouseEvent, RefObject, useContext } from 'react';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import { Button } from '@/components';
import { KeyboardDataContext } from '@/context';
import SecondOption from '@/components/CustomOption/SecondOption';

import { IMAGE_BLUR } from '@/constants/blurImage';
import styles from './CartModalOptionCard.module.scss';

const cn = classNames.bind(styles);

interface CartModalOptionCardProps {
  name: string;
  option1: string;
  option2?: boolean;
  buttonType: 'edit' | 'delete';
  count?: number;
  price: number;
  imageSrc: string | StaticImageData;
  buttonOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
  wrapperRef?: RefObject<HTMLDivElement>;
}

export default function CartModalOptionCard({
  name,
  option1,
  option2,
  buttonType,
  count,
  price,
  imageSrc,
  buttonOnClick,
  wrapperRef,
}: CartModalOptionCardProps) {
  const BUTTON_TYPE = {
    edit: '주문 수정',
    delete: '주문 삭제',
  };

  const {
    keyboardData: { pointKeyType, individualColor, pointKeySetColor },
  } = useContext(KeyboardDataContext);

  return (
    <div className={cn('wrapper')}>
      <Image
        src={imageSrc}
        width={104}
        height={104}
        alt='장바구니 이미지'
        className={cn('image')}
        placeholder={IMAGE_BLUR.placeholder}
        blurDataURL={IMAGE_BLUR.blurDataURL}
      />
      <div className={cn('content-wrapper')}>
        <div className={cn('title-option-wrapper')}>
          <div className={cn('title-wrapper')}>
            <p className={cn('title')}>{name}</p>
            <Button
              width={72}
              fontSize={14}
              paddingVertical={2}
              backgroundColor='outline-gray-40'
              className={cn('button')}
              onClick={(e: MouseEvent<HTMLButtonElement>) => buttonOnClick(e)}
              hoverColor='outline-primary'
            >
              {BUTTON_TYPE[buttonType]}
            </Button>
          </div>
          <div className={cn('option-wrapper')}>
            <div className={cn('option')}>{option1}</div>
            {option2 && wrapperRef && (
              <SecondOption
                wrapperRef={wrapperRef}
                pointKeyType={pointKeyType}
                pointSetColor={pointKeySetColor as string | undefined}
                individualColor={individualColor as Partial<Record<CustomKeyboardKeyTypes, string>>}
              />
            )}
          </div>
        </div>
        <div className={cn('count-price-wrapper')}>
          {count ? <div className={cn('count')}>{count}개</div> : <div />}
          <div className={cn('price')}>{price.toLocaleString()}원</div>
        </div>
      </div>
    </div>
  );
}
