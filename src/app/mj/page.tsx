'use client';

import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { useState } from 'react';
import { BUTTON_COLOR } from '@/constants/buttonTypes';
import classNames from 'classnames/bind';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleButtonClick = () => {
    /** 버튼 누를 때 실행되는 함수 */
    console.log('버튼 누름');
  };
  return (
    <div className={cn('container')}>
      <div className={cn('buttons')}>
        <button type='button' onClick={handleOpenModal}>
          커스텀 리뷰 모달창 열기
        </button>
      </div>
      <Button
        backgroundColor={BUTTON_COLOR.OUTLINE_PRIMARY_60}
        radius={8}
        width={90}
        paddingVertical={20}
        hoverColor={BUTTON_COLOR.OUTLINE_PRIMARY_60}
        onClick={handleButtonClick}
      >
        button
      </Button>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <WriteEditModal isCustomReview />
      </Modal>
    </div>
  );
}
