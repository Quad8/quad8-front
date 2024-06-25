import { CommentIcon } from '@/public/index';
import classNames from 'classnames/bind';

import { HeartButton } from '@/components';
import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

interface PostInteractionsProps {
  cardId: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

const MAX_COUNT = 99;

export function PostInteractions({ cardId, likeCount, commentCount, isLiked }: PostInteractionsProps) {
  // const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  // };

  return (
    <div className={cn('container')}>
      <div className={cn('icon-and-count')}>
        <HeartButton id={cardId} isLiked={isLiked} usage='community' likeCount={likeCount} />
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon fill='#4968f6' />
        <p className={cn('count')}>{commentCount > MAX_COUNT ? '99+' : commentCount}</p>
      </div>
    </div>
  );
}
