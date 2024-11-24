'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { deleteUserProductReview } from '@/api/productReviewAPI';
import type { ReviewDto } from '@/types/productReviewType';
import type { ProductType } from '@/types/productType';
import { Dialog, Modal } from '@/components';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { formatDateWithDot } from '@/utils/formatDateToString';

import styles from './MyReviewProduct.module.scss';

const cn = classNames.bind(styles);

interface MyReviewProductProps {
  reviewData: ReviewDto;
  productData?: ProductType;
}

const defaultProductData = {
  name: '상품 정보 없음',
  thubmnailList: [{ id: 0, imgUrl: '/public/images/kedeukProfile.png' }],
  categoryName: 'keyboard',
};

export default function MyReviewProduct({ reviewData, productData }: MyReviewProductProps) {
  const { name: productName, thubmnailList, categoryName } = productData || defaultProductData;
  const { orderId, productId, id: reviewId, updatedAt, switchOption } = reviewData;
  const productImgUrl = thubmnailList[0].imgUrl;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: reviewDeleteMutation } = useMutation({
    mutationFn: async () => {
      deleteUserProductReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProductReviews'] });
      toast.success('리뷰가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('리뷰 삭제에 실패했습니다');
    },
  });

  const handleClickEditButton = () => {
    setIsEditModalOpen(true);
  };

  const handleClickDeleteButton = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteReview = () => {
    reviewDeleteMutation();
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className={cn('container')}>
        <div className={cn('top-section')}>
          <h3 className={cn('write-date')}>작성일 : {formatDateWithDot(new Date(updatedAt))}</h3>
          <div className={cn('button-section')}>
            <button className={cn('edit-button')} type='button' onClick={handleClickEditButton}>
              수정
            </button>
            <span className={cn('line')}>|</span>
            <button className={cn('delete-button')} type='button' onClick={handleClickDeleteButton}>
              삭제
            </button>
          </div>
        </div>
        <Link href={`/shop/${categoryName}/${productId}`}>
          <div className={cn('product-section')}>
            <Image
              className={cn('image')}
              src={thubmnailList[0].imgUrl}
              width={104}
              height={104}
              alt='리뷰 상품 이미지'
            />
            <div className={cn('product-detail')}>
              <h1 className={cn('name')}>{productName}</h1>
              <h2 className={cn('option')}>{switchOption}</h2>
            </div>
          </div>
        </Link>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <WriteEditModal
            reviewType='productReviewEdit'
            reviewData={reviewData}
            productData={{
              productId,
              productImgUrl,
              productName,
              switchOption,
              orderId,
            }}
            onSuccessReview={handleCloseEditModal}
          />
        </div>
      </Modal>
      <Dialog
        type='confirm'
        iconType='warn'
        message='리뷰 삭제 시 복구 및 재작성 할 수 없습니다.\n삭제하시겠습니까?'
        isOpen={isDeleteModalOpen}
        onClick={{ left: () => setIsDeleteModalOpen(false), right: handleDeleteReview }}
        buttonText={{ left: '취소', right: '확인' }}
      />
    </>
  );
}
