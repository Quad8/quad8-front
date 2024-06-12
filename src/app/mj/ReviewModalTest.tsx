'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import { Modal, Button } from '@/components';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
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
        <WriteEditModal isCustomReview />
      </Modal>
    </div>
  );
}
