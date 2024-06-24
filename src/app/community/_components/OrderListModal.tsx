import classNames from 'classnames/bind';

import { Button } from '@/components';
import type { PostCardDetailModalCustomKeyboardType } from '@/types/CommunityTypes';
import Image from 'next/image';
import { keydeukImg } from '@/public/index';
import { IMAGE_BLUR } from '@/constants/blurImage';

// import { CustomKeyboardAPITypes } from '@/types/CustomKeyboardTypes';
import styles from './OrderListModal.module.scss';

const cn = classNames.bind(styles);

interface OrderListModalProps {
  orderList: PostCardDetailModalCustomKeyboardType[];
  onOpenReviewModal: () => void;
  onSelectProduct: (i: number) => void;
  selectedOrder: PostCardDetailModalCustomKeyboardType | null;
}

export default function OrderListModal({
  orderList,
  onOpenReviewModal,
  onSelectProduct,
  selectedOrder,
}: OrderListModalProps) {
  const handleClickWriteButton = () => {
    onOpenReviewModal();
  };

  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>작성할 후기 제품을 선택해주세요.</h1>
      <div className={cn('keyboard-list-wrapper')}>
        {orderList.map((order, i) => (
          <div
            className={cn('keyboard-list', { 'selected-list': order === selectedOrder })}
            key={order.productId}
            onClick={() => onSelectProduct(i)}
          >
            <div className={cn('keyboard-image')}>
              <Image
                src={order.imgUrl || keydeukImg}
                alt='커스텀 키보드 이미지'
                width={104}
                height={104}
                priority
                placeholder={IMAGE_BLUR.placeholder}
                blurDataURL={IMAGE_BLUR.blurDataURL}
              />
            </div>
            <div className={cn('keyboard-info-wrapper')}>
              <p className={cn('keyboard-info-title')}>키득 커스텀 키보드</p>
              <div>키보드 옵션 들어간다</div>
            </div>
          </div>
          // <ItemOverview
          //   key={order.productId}
          //   item={{
          //     productId: order.productId,
          //     productImgUrl: order.imgUrl,
          //     productName: '키득 커스텀 키보드',
          //     switchOption: {
          //       type: order.type,
          //       texture: order.texture,
          //       pointKeyType: order.pointKeyType,
          //       pointSetColor: order.pointSetColor,
          //       imgBase64: IMAGE_BLUR.blurDataURL,
          //     } as CustomKeyboardAPITypes,
          //   }}
          //   imegeWidth={104}
          //   imageHeight={104}
          //   className='keyboard-image'
          // />
        ))}
      </div>
      <div className={cn('button-wrapper')}>
        <Button
          fontSize={20}
          onClick={handleClickWriteButton}
          backgroundColor={selectedOrder ? 'background-primary' : 'background-gray-40'}
        >
          후기 작성하기
        </Button>
      </div>
    </div>
  );
}
