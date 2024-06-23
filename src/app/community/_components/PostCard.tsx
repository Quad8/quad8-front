'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import { calculateTimeDifference } from '@/libs/calculateDate';
import { Modal } from '@/components';
import type { CommunityPostCardDataType } from '@/types/CommunityTypes';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';
import PostCardDetailModal from './PostCardDetailModal';

import styles from './PostCard.module.scss';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityPostCardDataType;
  isMine?: boolean;
}

export default function PostCard({ cardData, isMine }: PostCardProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { id, nickName, updateAt, title, thumbnail, likeCount, commentCount, userImage } = cardData;

  const ApdatedDate = new Date(updateAt);
  const timeToString = calculateTimeDifference(ApdatedDate);

  const handleClickPostModal = () => {
    setIsPostModalOpen(true);
  };
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <div className={cn('container')} onClick={handleClickPostModal}>
      <AuthorCard nickname={nickName} dateText={timeToString} userImage={userImage} />
      <div className={cn('keyboard-image-wrapper')}>
        <Image
          src={Array.isArray(thumbnail) ? thumbnail[0] : thumbnail}
          className={cn('keyboard-image')}
          alt='키보드 이미지'
          fill
          sizes='(max-width: 1200px) 100%'
          priority
        />
        {Array.isArray(thumbnail) && <p className={cn('image-count')}>{thumbnail.length}</p>}
      </div>
      <p className={cn('title')}>{title}</p>
      <PostInteractions likeCount={likeCount} commentCount={commentCount} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <PostCardDetailModal cardId={id} onClose={handleClosePostModal} isMine={isMine} />
      </Modal>
    </div>
  );
}
