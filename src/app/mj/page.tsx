'use client';

import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { WriteEditModalType } from '@/constants/writeEditModalType';
import { useState } from 'react';
import styles from './page.module.scss';

export default function Page() {
  const [selectedModal, setSelectedModal] = useState<WriteEditModalType | null>(null);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  const handleWritePostModal = () => {
    setSelectedModal(WriteEditModalType.writePost);
    // setIsOpenModal(true);
  };

  const handleWriteCustomReivewModal = () => {
    setSelectedModal(WriteEditModalType.writeCustomReview);
    // setIsOpenModal(true);
  };

  const handleEditMyPostModal = () => {
    setSelectedModal(WriteEditModalType.editMyPost);
    // setIsOpenModal(true);
  };
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 20 }}>
        <button type='button' onClick={handleWritePostModal}>
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
