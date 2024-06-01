'use client';

import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { WriteEditModalType } from '@/constants/writeEditModalType';
import { useState } from 'react';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  const [selectedModal, setSelectedModal] = useState<WriteEditModalType | null>(null);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const handleWritePostModal = () => {
    setSelectedModal(WRITE_EIDT_MODAL_TYPE.writePost);
    // setIsOpenModal(true);
  };

  const handleWriteCustomReivewModal = () => {
    setSelectedModal(WRITE_EIDT_MODAL_TYPE.writeCustomReview);
    // setIsOpenModal(true);
  };

  const handleEditMyPostModal = () => {
    setSelectedModal(WRITE_EIDT_MODAL_TYPE.editMyPost);
    // setIsOpenModal(true);
  };
  return (
    <div className={cn('container')}>
      <div className={cn('buttons')}>
        <button type="button" onClick={handleWritePostModal}>
          1. 커뮤니티 페이지에서 글 작성
        </button>
        <button type='button' onClick={handleWriteCustomReivewModal}>
          2. 커스텀 키보드 상품 리뷰 작성
        </button>
        <button type='button' onClick={handleEditMyPostModal}>
          3. 내 게시글 수정
        </button>
      </div>
      {selectedModal && <WriteEditModal type={selectedModal} />}
    </div>
  );
}
