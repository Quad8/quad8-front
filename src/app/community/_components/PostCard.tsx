'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

import { deletePostCard, getPostDetail } from '@/api/communityAPI';
import { calculateTimeDifference } from '@/utils/calculateDate';
import { communityPopOverOption } from '@/utils/communityPopOverOption';
import type { CommunityPostCardDataType } from '@/types/communityType';

import { Modal } from '@/components';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { IMAGE_BLUR } from '@/constants/blurImage';
import DetailModalSkeleton from '../../../components/ModalSkeleton/ModalSkeleton';
import AuthorCard from './AuthorCard';
import ErrorFallbackDetailModal from './PostCardDetailModal/ErrorFallbackDetailModal';
import PostCardDetailModal from './PostCardDetailModal/PostCardDetailModal';
import { PostInteractions } from './PostInteractions';

import styles from './PostCard.module.scss';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityPostCardDataType;
  isMine?: boolean;
}

export default function PostCard({ cardData, isMine }: PostCardProps) {
  const queryClient = useQueryClient();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { userId, id, nickName, updateAt, title, thumbnail, likeCount, commentCount, userImage, isLiked } = cardData;

  const updatedDate = new Date(updateAt);
  const timeToString = calculateTimeDifference(updatedDate);

  const handleClickPopOver = () => {
    setIsPopOverOpen((prevIsOpen) => !prevIsOpen);
  };

  const { refetch, data: detailData } = useQuery({
    queryKey: ['editingPostData', id],
    queryFn: () => getPostDetail(id),
    enabled: false,
  });

  useEffect(() => {
    if (isEditModalOpen) {
      refetch();
    }
  }, [isEditModalOpen, refetch]);

  const handleClosePopOver = () => {
    setIsPopOverOpen(false);
  };

  const handleClickPostModal = () => {
    setIsPostModalOpen(true);
    handleClosePopOver();
  };

  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const { mutate: deletePostCardMutation } = useMutation({
    mutationFn: deletePostCard,
    onSuccess: () => {
      toast.success('게시글을 삭제하였습니다.');
      queryClient.invalidateQueries({
        queryKey: ['myCustomReview'],
      });
    },
    onError: () => {
      toast.error('리뷰 삭제 중 오류가 발생하였습니다.');
    },
  });

  const handleClickEdit = () => {
    setIsEditModalOpen(true);
    handleClosePopOver();
  };

  const handleClickDelete = () => {
    if (id) {
      deletePostCardMutation(id);
    } else {
      toast.error('해당 게시글이 존재하지 않습니다. 다시 확인해주세요.');
    }
  };

  return (
    <div className={cn('container')}>
      <AuthorCard
        userId={userId}
        nickname={nickName}
        dateText={timeToString}
        userImage={userImage}
        onClickPopOver={handleClickPopOver}
        onClosePopOver={handleClosePopOver}
        isOpenPopOver={isPopOverOpen}
        popOverOptions={communityPopOverOption({
          isMine,
          onClickDelete: handleClickDelete,
          onClickEdit: handleClickEdit,
        })}
      />
      <div className={cn('container')} onClick={handleClickPostModal}>
        <div className={cn('keyboard-image-wrapper')}>
          <Image
            fill
            src={Array.isArray(thumbnail) ? thumbnail[0] : thumbnail}
            className={cn('keyboard-image')}
            alt='키보드 이미지'
            sizes='(max-width: 1200px) 100%'
            priority
            placeholder={IMAGE_BLUR.placeholder}
            blurDataURL={IMAGE_BLUR.blurDataURL}
          />
          {Array.isArray(thumbnail) && <p className={cn('image-count')}>{thumbnail.length}</p>}
        </div>
        <p className={cn('title')}>{title}</p>
      </div>
      <PostInteractions cardId={id} likeCount={likeCount} commentCount={commentCount} isLiked={isLiked} />
      <Modal isOpen={isPostModalOpen} onClose={handleClosePostModal}>
        <ErrorBoundary FallbackComponent={ErrorFallbackDetailModal}>
          <Suspense fallback={<DetailModalSkeleton />}>
            <PostCardDetailModal
              cardId={id}
              onClose={handleClosePostModal}
              isMine={isMine}
              commentCount={commentCount}
            />
          </Suspense>
        </ErrorBoundary>
      </Modal>
      {detailData && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <WriteEditModal
              reviewType='customReviewEdit'
              onSuccessReview={handleCloseEditModal}
              editCustomData={detailData?.data}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
