'use client';

import { Button, Modal } from '@/components';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import classNames from 'classnames/bind';
import { useState } from 'react';

import productImage from '@/public/images/blueSwitch.jpg';
import styles from './ReviewModalTest.module.scss';

const cn = classNames.bind(styles);

export default function ReviewModalTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    /** 버튼 누를 때 실행되는 함수 */
    // console.log('버튼 누름');
  };

  const handleSuccessReview = () => {
    console.log('리뷰 작성');
  };

  const PRODUCT_DATA = {
    orderId: 12345,
    option: '옵션입니다',
    productImgUrl: productImage,
    productName: '상품 이름',
  };

  return (
    <div className={cn('container')}>
      <div className={cn('buttons')}>
        <button type='button' onClick={handleOpenModal}>
          커스텀 리뷰 모달창 열기
        </button>
      </div>
      <Button
        as='a'
        href='/'
        radius={8}
        width={90}
        paddingVertical={20}
        onClick={handleButtonClick}
        className={cn('test')}
      >
        button
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <WriteEditModal reviewType='productReview' onSuccessReview={handleSuccessReview} productData={PRODUCT_DATA} />
      </Modal>
    </div>
  );
}
