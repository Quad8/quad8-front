'use client';

import classNames from 'classnames/bind';
import { MouseEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { calculateTimeDifference } from '@/libs/calculateDate';
import { VerticalTripleDotIcon } from '@/public/index';
import type { Users } from '@/types/userType';
import { PopOver } from '@/components';

import { deleteComment } from '@/api/communityAPI';
import { toast } from 'react-toastify';
import styles from './Comment.module.scss';

const cn = classNames.bind(styles);

interface CommentProps {
  cardId: number;
  commentUserId: number;
  commentId: number;
  nickname: string;
  profile: string | null;
  createdTime: string;
  comment: string;
}

interface UserDataType {
  data: Users;
  status: string;
  message: string;
}

export default function Comment({
  cardId,
  commentUserId,
  commentId,
  nickname,
  profile,
  createdTime,
  comment,
}: CommentProps) {
  const queryClient = useQueryClient();
  const createdTimeToDate = new Date(createdTime);
  const [isOpenPopOver, setIsOpenPopOver] = useState(false);

  const userData = queryClient.getQueryData<UserDataType>(['userData']);

  const userID = userData?.data?.id;

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['postData', cardId],
      });
    },
    onError: () => {
      toast.error('댓글 삭제 중 오류가 발생하였습니다.');
    },
  });

  const handleClickPopOver = (e: MouseEvent<HTMLDivElement>) => {
    setIsOpenPopOver(!isOpenPopOver);
    e.stopPropagation();
  };

  const handleClosePopOver = () => {
    setIsOpenPopOver(false);
  };

  const handleClickDelete = (e: MouseEvent<HTMLDivElement>) => {
    deleteCommentMutation(commentId);
    e.stopPropagation();
  };

  const handleClickReport = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const MY_POPOVER_OPTION = [
    {
      label: '삭제하기',
      onClick: handleClickDelete,
    },
    {
      label: '신고하기',
      onClick: handleClickReport,
    },
  ];

  const OTHERS_POPOVER_OPTION = [
    {
      label: '신고하기',
      onClick: handleClickReport,
    },
  ];

  const timeAgo = calculateTimeDifference(createdTimeToDate);
  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={profile || null} />
      <div className={cn('content-wrapper')}>
        <div className={cn('user-info-wrapper')}>
          <div className={cn('user-info')}>
            <p className={cn('nickname')}>{nickname}</p>
            <p className={cn('time-ago')}>{timeAgo}</p>
          </div>
          <div className={cn('dot-icon')} onClick={(e) => handleClickPopOver(e)}>
            <VerticalTripleDotIcon />
            {isOpenPopOver && (
              <PopOver
                optionsData={userID === commentUserId ? MY_POPOVER_OPTION : OTHERS_POPOVER_OPTION}
                onHandleClose={handleClosePopOver}
              />
            )}
          </div>
        </div>
        <div className={cn('content')}>{comment}</div>
      </div>
    </div>
  );
}
