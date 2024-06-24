import { CommentIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { MouseEvent } from 'react';

import { HeartButton } from '@/components';
import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

interface PostInteractionsProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

const MAX_COUNT = 99;

export function PostInteractions({ postId, likeCount, commentCount, isLiked }: PostInteractionsProps) {
  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={cn('container')} onClick={handleContainerClick}>
      <div className={cn('icon-and-count')}>
        <HeartButton id={postId} isLiked={isLiked} usage='community' likeCount={likeCount} />
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p className={cn('count')}>{commentCount > MAX_COUNT ? '99+' : commentCount}</p>
      </div>
    </div>
  );
}
