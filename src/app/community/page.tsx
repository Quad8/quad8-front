'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Modal } from '@/components';
import Button from '@/components/Button/Button';
import Plus from '@/public/svgs/plus.svg';
import PostCard from './_components/PostCard';
import styles from './page.module.scss';
import { COMMUNITY_DATA } from '../mj/CommunityData';
import OrderListModal from './_components/OrderListModal';

const cn = classNames.bind(styles);

export default function Page() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isOrderListModalOpen, setIsOrderListModalOpen] = useState(false);
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };
  const handleCustomPostModal = () => {
    setIsPostModalOpen(true);
  };

  const handleWritePostButton = () => {
    /** 글 작성하기 버튼 */
    setIsOrderListModalOpen(true);
  };
  const handleCloseWritePostModal = () => {
    setIsOrderListModalOpen(false);
  };
  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <div className={cn('filter-write-button-wrapper')}>
        <div>최신글</div>
        <Button onClick={handleWritePostButton} width={120} fontSize={14} paddingVertical={8} radius={4}>
          <div className={cn('write-button-content')}>
            <Plus /> 글 작성하기
          </div>
        </Button>
      </div>
      <div className={cn('post-wrapper')}>
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
        <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
      </div>

      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        modal
      </Modal>
      <Modal isOpen={isOrderListModalOpen} onClose={handleCloseWritePostModal}>
        <OrderListModal />
      </Modal>
    </div>
  );
}
