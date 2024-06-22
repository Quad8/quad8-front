'use client';

import { PlusIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { Button, Modal } from '@/components';
import Dialog from '@/components/Dialog/Dialog';
import { ROUTER } from '@/constants/route';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { PostCardDetailModalCustomKeyboardType } from '@/types/CommunityTypes';
import styles from './WritePostButton.module.scss';
import OrderListModal from './OrderListModal';

const cn = classNames.bind(styles);

interface WritePostButtonProps {
  orderListData: PostCardDetailModalCustomKeyboardType[];
}

export default function WritePostButton({ orderListData }: WritePostButtonProps) {
  const [isOpenOrderListModal, setIsOpenOrderListModal] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PostCardDetailModalCustomKeyboardType | null>(null);

  const handleClickProductList = (i: number) => {
    setSelectedOrder(orderListData[i]);
  };

  const openOrderListModal = () => {
    setIsOpenOrderListModal(true);
  };

  const closeOrderListModal = () => {
    setIsOpenOrderListModal(false);
  };

  const openReviewModal = () => {
    setIsOpenOrderListModal(false);
    setIsOpenReviewModal(true);
  };

  const closeReviewModal = () => {
    setIsOpenReviewModal(false);
    setIsOpenOrderListModal(true);
  };

  const handleSuccessPost = () => {
    setIsOpenReviewModal(false);
    setIsOpenOrderListModal(false);
  };

  return (
    <div>
      <Button width={120} fontSize={14} paddingVertical={8} radius={4} onClick={openOrderListModal}>
        <div className={cn('write-button-content')}>
          <PlusIcon /> 글 작성하기
        </div>
      </Button>
      {orderListData ? (
        <>
          <Modal isOpen={isOpenOrderListModal} onClose={closeOrderListModal}>
            <OrderListModal
              orderList={orderListData}
              onOpenReviewModal={openReviewModal}
              onSelectProduct={handleClickProductList}
              selectedOrder={selectedOrder}
            />
          </Modal>
          {selectedOrder && (
            <Modal isOpen={isOpenReviewModal} onClose={closeReviewModal}>
              <WriteEditModal keyboardInfo={selectedOrder} isCustomReview onSuccessReview={handleSuccessPost} />
            </Modal>
          )}
        </>
      ) : (
        <Dialog
          type='confirm'
          message='커스텀 키보드 구매내역이 없습니다.'
          isOpen={isOpenOrderListModal}
          iconType='warn'
          buttonText={{ left: '댣기', right: '커스텀 만들러 가기' }}
          onClick={{
            left: () => setIsOpenOrderListModal(false),
            right: () => {
              window.location.href = ROUTER.CUSTOM_KEYBOARD;
            },
          }}
        />
      )}
    </div>
  );
}
