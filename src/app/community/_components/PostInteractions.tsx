import { useState, MouseEvent } from 'react';
import classNames from 'classnames/bind';
import CommentIcon from '@/public/svgs/comment.svg';
import LikeButton from '@/components/buttons/LikeButton/LikeButton';
import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

interface PostInteractionsProps {
  goodCount: number;
  commentCount: number;
}

const MAX_COUNT = 99;

export function PostInteractions({ goodCount, commentCount }: PostInteractionsProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleLikeButtonClick = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className={cn('container')} onClick={handleContainerClick}>
      <div className={cn('icon-and-count')}>
        <LikeButton isChecked={isChecked} onClick={handleLikeButtonClick} />
        <p id={cn('count')}>{goodCount > MAX_COUNT ? '99+' : goodCount}</p>
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p id={cn('count')}>{commentCount > MAX_COUNT ? '99+' : commentCount}</p>
      </div>
    </div>
  );
}
