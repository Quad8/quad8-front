import classNames from 'classnames/bind';
import Image from 'next/image';

import { IMAGE_BLUR } from '@/constants/blurImage';
import type { OrderItem } from '@/types/orderType';
import CustomOption from '../CustomOption/CustomOption';

import styles from './ItemOverview.module.scss';

const cn = classNames.bind(styles);

interface ItemOverviewProps {
  item: OrderItem;
  imegeWidth?: number;
  imageHeight?: number;
  className?: string;
}

export default function ItemOverview({ item, imegeWidth = 107, imageHeight = 107, className }: ItemOverviewProps) {
  const { productImgUrl, productName, switchOption, quantity } = item;

  return (
    <div className={cn('item', className)}>
      <Image
        src={productImgUrl}
        alt={productName}
        width={imegeWidth}
        height={imageHeight}
        placeholder={IMAGE_BLUR.placeholder}
        blurDataURL={IMAGE_BLUR.blurDataURL}
      />
      {productName === '키득 커스텀 키보드' ? (
        <div className={cn('item-option')}>
          <CustomOption customData={switchOption} />
        </div>
      ) : (
        <div className={cn('item-text')}>
          <p>{productName}</p>
          <p className={cn('item-quantity')}>{quantity}개</p>
        </div>
      )}
    </div>
  );
}
