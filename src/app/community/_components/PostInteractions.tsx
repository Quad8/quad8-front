import { CommentIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { MouseEvent } from 'react';
// import { LikeButton } from '@/components';

import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

interface PostInteractionsProps {
  likeCount: number;
  commentCount: number;
}

const MAX_COUNT = 99;

export function PostInteractions({ likeCount, commentCount }: PostInteractionsProps) {
  // const [isChecked, setIsChecked] = useState(false);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // const handleLikeButtonClick = () => {
  //   setIsChecked((prev) => !prev);
  // };
  return (
    <div className={cn('container')} onClick={handleContainerClick}>
      <div className={cn('icon-and-count')}>
        {/* <LikeButton isChecked={isChecked} onClick={handleLikeButtonClick} /> */}
        <p id={cn('count')}>{likeCount > MAX_COUNT ? '99+' : likeCount}</p>
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p className={cn('count')}>{commentCount > MAX_COUNT ? '99+' : commentCount}</p>
      </div>
    </div>
  );
}
