'use client';

import classNames from 'classnames/bind';
import { forwardRef, useState, MouseEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { calculateTimeDifference } from '@/utils/calculateDate';
import type { UserDataResponseType } from '@/types/userType';
import { PopOver } from '@/components';
import { deleteComment } from '@/api/communityAPI';
import { communityPopOverOption } from '@/utils/communityPopOverOption';

import styles from './Comment.module.scss';
import UserProfileCard from './UserProfileCard';

const cn = classNames.bind(styles);

interface CommentDataType {
  id: number;
  userId: number;
  nickName: string;
  imgUrl: string | null;
  content: string;
  createdAt: string;
}

interface CommentProps {
  cardId: number;
  onOpenPopOver: (commentId: number) => void;
  onClosePopOver: () => void;
  commentData: CommentDataType;
  isOpenedPopOver: boolean;
  onOpenProfileCard: () => void;
}

export default forwardRef<HTMLDivElement, CommentProps>(function Comment(
  { cardId, commentData, onOpenPopOver, onClosePopOver, isOpenedPopOver, onOpenProfileCard },
  ref,
) {
  const queryClient = useQueryClient();

  const {
    id: commentId,
    userId: commentUserId,
    nickName: nickname,
    imgUrl: profile,
    content: comment,
    createdAt: createdTime,
  } = commentData;

  const createdTimeToDate = new Date(createdTime);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isOpenProfileCard, setIsOpenProfileCard] = useState(false);
  const [commentPositionTop, setCommentPositionTop] = useState(0);
  const [openedTimeoutId, setIsOpenedTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const userData = queryClient.getQueryData<UserDataResponseType>(['userData']);

  const userID = userData?.data?.id;
  const timeAgo = calculateTimeDifference(createdTimeToDate);

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['postData', cardId],
      });
      queryClient.invalidateQueries({ queryKey: ['postCardsList'] });
    },
    onError: () => {
      toast.error('댓글 삭제 중 오류가 발생하였습니다.');
    },
  });

  const handleOpenProfile = (e: MouseEvent<HTMLDivElement>) => {
    const { top } = e.currentTarget.getBoundingClientRect();
    setCommentPositionTop(top);
    const timeoutId = setTimeout(() => {
      onOpenProfileCard();
      setIsOpenProfileCard(true);
    }, 300);
    setIsOpenedTimeoutId(timeoutId);
  };

  const handleCloseProfile = () => {
    if (openedTimeoutId) {
      clearTimeout(openedTimeoutId);
      setIsOpenedTimeoutId(null);
    }
    setIsOpenProfileCard(false);
  };

  const handleClickPopOver = () => {
    if (isOpenPopOver) {
      onClosePopOver();
      setIsOpenPopOver(false);
    } else {
      onOpenPopOver(commentId);
      setIsOpenPopOver(true);
    }
  };

  const handleClickDelete = () => {
    deleteCommentMutation(commentId);
  };

  const handleMouseEnter = () => {
    setShowIcon(true);
  };

  const handleMouseLeave = () => {
    setShowIcon(!!isOpenedPopOver);
  };

  const commentHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return (
    <div className={cn('container')} ref={ref} {...commentHandlers}>
      <div onMouseEnter={handleOpenProfile} onMouseLeave={handleCloseProfile}>
        <ProfileImage profileImage={profile && profile} />
        <UserProfileCard
          isOpenProfileCard={isOpenProfileCard}
          userId={commentUserId}
          positionTop={commentPositionTop}
        />
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('user-info-wrapper')}>
          <div className={cn('user-info')} onMouseEnter={handleOpenProfile} onMouseLeave={handleCloseProfile}>
            <p className={cn('nickname')}>{nickname}</p>
            <p className={cn('time-ago')}>{timeAgo}</p>
          </div>
          {showIcon && (
            <PopOver
              optionsData={communityPopOverOption({
                isMine: userID === commentUserId,
                onClickDelete: handleClickDelete,
              })}
              isOpenPopOver={isOpenPopOver && isOpenedPopOver}
              onHandleOpen={handleClickPopOver}
              onHandleClose={onClosePopOver}
              position={{ left: 415, top: 15 }}
            />
          )}
        </div>
        <div className={cn('content')}>{comment}</div>
      </div>
    </div>
  );
});
