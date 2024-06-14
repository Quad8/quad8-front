'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import ContentImage from '@/public/images/myProfile.jpeg';
import { CommunityCardDataType } from '@/app/(test)/mj/communityData';
import { calculateTimeDifference } from '@/libs/calculateDate';

import { Modal } from '@/components';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';
import PostCardDetailModal from './PostCardDetailModal';

import styles from './PostCard.module.scss';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityCardDataType;
}

const MIN_IMAGE_COUNT = 1;

export default function PostCard({ cardData }: PostCardProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const {
    user_nickname: nickname,
    created_at: createdAt,
    title,
    image,
    good_count: goodCount,
    comment_count: commentCount,
  } = cardData;

  const nowDate = new Date();
  const createdDate = new Date(createdAt);
  const timeToString = calculateTimeDifference(createdDate, nowDate);

  const handleClickPostModal = () => {
    setIsPostModalOpen(true);
  };
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <div className={cn('container')} onClick={handleClickPostModal}>
      <AuthorCard nickname={nickname} timeAgo={timeToString} />
      <div className={cn('keyboard-image-wrapper')}>
        <Image src={ContentImage} className={cn('keyboard-image')} alt='키보드 이미지' />
        {image.length > MIN_IMAGE_COUNT && <p className={cn('image-count')}>{image.length}</p>}
      </div>
      <p className={cn('title')}>{title}</p>
      <PostInteractions goodCount={goodCount} commentCount={commentCount} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <PostCardDetailModal />
      </Modal>
    </div>
  );
}
