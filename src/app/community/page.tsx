'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { Modal } from '@/components';
import PostCard from './_components/PostCard';
import styles from './page.module.scss';
import { COMMUNITY_DATA } from '../mj/CommunityData';

const cn = classNames.bind(styles);

export default function Page() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };
  const handleCustomPostModal = () => {
    setIsPostModalOpen(true);
  };
  return (
    <div className={cn('container')}>
      <PostCard cardData={COMMUNITY_DATA} onClick={handleCustomPostModal} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        modal
      </Modal>
    </div>
  );
}
