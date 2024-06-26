'use client';

import classNames from 'classnames/bind';
import { useRef } from 'react';

import { Button, CustomOption } from '@/components';
import type { PostCardDetailModalCustomKeyboardType } from '@/types/CommunityTypes';
import Image from 'next/image';
import { keydeukImg } from '@/public/index';
import { IMAGE_BLUR } from '@/constants/blurImage';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickWriteButton = () => {
    onOpenReviewModal();
  };

  return (
    <div className={cn('container')}>
      <h1 className={cn('title')}>작성할 후기 제품을 선택해주세요.</h1>
      <div className={cn('keyboard-list-wrapper')} ref={containerRef}>
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
              <CustomOption wrapperRef={containerRef} customData={order} />
            </div>
          </div>
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
