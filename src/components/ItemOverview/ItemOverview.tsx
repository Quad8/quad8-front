'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getProductDetail } from '@/api/productAPI';
import type { ProductType } from '@/types/productType';
import type { OrderItem, SwitchOptionType } from '@/types/orderType';
import { convertCategory } from '@/utils/convertProductCategory';
import { IMAGE_BLUR } from '@/constants/blurImage';
import { CustomImage, CustomOption, Skeleton } from '@/components';
import ItemWrapper from './ItemWrapper';
import ShopOption from './ShopOption';

import styles from './ItemOverview.module.scss';

const cn = classNames.bind(styles);

type OptionalSwitchOptionOrderItem = Omit<OrderItem, 'switchOption' | 'quantity' | 'viewCount' | 'price'> & {
  switchOption?: string | SwitchOptionType;
  quantity?: number;
  price?: number;
};

interface ItemOverviewProps {
  item: OptionalSwitchOptionOrderItem;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  isRouteDetailPage?: boolean;
}

const CATEGORY_NAME = {
  keyboard: '키보드',
  keycap: '키캡',
  switch: '스위치',
  etc: '기타 용품',
};

export default function ItemOverview({
  item,
  imageWidth = 104,
  imageHeight = 104,
  className,
  isRouteDetailPage,
}: ItemOverviewProps) {
  const { productImgUrl, productName, switchOption, quantity, price } = item;

  const { data: productData, isPending } = useQuery<ProductType>({
    queryKey: ['product', item.productId],
    queryFn: () => getProductDetail(item.productId),
    enabled: productName !== '커스텀 키보드' && !item.category,
  });
  const category = item.category ?? convertCategory(productData?.categoryName ?? '');

  return (
    <ItemWrapper
      className={className}
      productName={productName}
      category={category}
      isRouteDetailPage={isRouteDetailPage}
      productId={item.productId}
    >
      <Skeleton
        isPending={isPending}
        width={imageWidth}
        height={imageHeight}
        condition={productName !== '커스텀 키보드' && !item.category}
        isImage
        radius={10}
      >
        <CustomImage
          src={productImgUrl}
          alt={productName}
          width={imageWidth}
          height={imageHeight}
          placeholder={IMAGE_BLUR.placeholder}
          blurDataURL={IMAGE_BLUR.blurDataURL}
          className={cn('product-image')}
        />
      </Skeleton>
      {typeof switchOption === 'object' ? (
        <div style={{ width: `calc(100% - ${imageWidth + 20}px)` }}>
          <p className={cn('title')}>키득 커스텀 키보드</p>
          <CustomOption
            customData={{
              texture: switchOption.customOption.appearanceTexture,
              type: switchOption.customOption.layout,
              boardColor: switchOption.customOption.appearanceColor,
              switchType: switchOption.customOption.keyboardSwitch,
              baseKeyColor: switchOption.customOption.baseKeyColor,
              hasPointKeyCap: switchOption.customOption.hasPointKey,
              pointKeyType: switchOption.customOption.pointKeyType,
              pointSetColor: switchOption.customOption.pointSetColor,
              individualColor: switchOption.individualColor,
            }}
          />
        </div>
      ) : (
        <div className={cn('item-text')}>
          <Skeleton isPending={isPending} width={60} height={18} condition={!item.category}>
            <p className={cn('title')}>{category ? CATEGORY_NAME[category] : ''}</p>
          </Skeleton>
          <Skeleton isPending={isPending} width='70%' height={16} condition={!item.category}>
            <p className={cn('item-name')}>{productName}</p>
          </Skeleton>
          {typeof switchOption === 'string' && switchOption && (
            <Skeleton isPending={isPending} width={80} height={20} condition={!item.category}>
              <ShopOption optionName={switchOption} />
            </Skeleton>
          )}
          {typeof quantity === 'number' && (
            <Skeleton isPending={isPending} width={60} height={20} condition={!item.category}>
              <div className={cn('count')}>{quantity}개</div>
            </Skeleton>
          )}

          {typeof price === 'number' && (
            <Skeleton isPending={isPending} width={80} height={16} condition={!item.category}>
              <p className={cn('price')}>{price.toLocaleString()}원</p>
            </Skeleton>
          )}
        </div>
      )}
    </ItemWrapper>
  );
}
