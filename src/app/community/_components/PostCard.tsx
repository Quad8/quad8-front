'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';

import { Modal } from '@/components';
import { calculateTimeDifference } from '@/libs/calculateDate';
import type { CommunityPostCardDataType } from '@/types/CommunityTypes';
import { IMAGE_BLUR } from '@/constants/blurImage';
import AuthorCard from './AuthorCard';
import PostCardDetailModal from './PostCardDetailModal';
import { PostInteractions } from './PostInteractions';

import styles from './PostCard.module.scss';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityPostCardDataType;
  isMine?: boolean;
}

export default function PostCard({ cardData, isMine }: PostCardProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const { id, nickName, updateAt, title, thumbnail, likeCount, commentCount, userImage, isLiked } = cardData;

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
      <AuthorCard id={id} isMine={isMine} nickname={nickName} dateText={timeToString} userImage={userImage} />
      <div className={cn('keyboard-image-wrapper')}>
        <Image
          src={Array.isArray(thumbnail) ? thumbnail[0] : thumbnail}
          className={cn('keyboard-image')}
          alt='키보드 이미지'
          fill
          sizes='(max-width: 1200px) 100%'
          priority
          placeholder={IMAGE_BLUR.placeholder}
          blurDataURL={IMAGE_BLUR.blurDataURL}
        />
        {Array.isArray(thumbnail) && <p className={cn('image-count')}>{thumbnail.length}</p>}
      </div>
      <p className={cn('title')}>{title}</p>
      <PostInteractions cardId={id} likeCount={likeCount} commentCount={commentCount} isLiked={isLiked} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <PostCardDetailModal cardId={id} onClose={handleClosePostModal} isMine={isMine} />
      </Modal>
    </div>
  );
}
