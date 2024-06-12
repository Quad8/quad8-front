'use client';

import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import ContentImage from '@/public/images/myProfile.jpeg';
import { CommunityCardDataType } from '@/app/mj/CommunityData';
import { calculateTimeDifference } from '@/libs/calculateDate';

import { Modal } from '@/components';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

import styles from './PostCard.module.scss';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityCardDataType;
}

export default function PostCard({ cardData }: PostCardProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const handleClickPostModal = () => {
    setIsPostModalOpen(true);
  };
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };
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

  return (
    <div className={cn('container')} onClick={handleClickPostModal}>
      <AuthorCard nickname={nickname} timeAgo={timeToString} />
      <div className={cn('keyboard-image-wrapper')}>
        <Image src={ContentImage} className={cn('keyboard-image')} alt='키보드 이미지' />
        {image.length > 1 && <p id={cn('image-count')}>{image.length}</p>}
      </div>
      <p className={cn('title')}>{title}</p>
      <PostInteractions goodCount={goodCount} commentCount={commentCount} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        modal
      </Modal>
    </div>
  );
}
