import classNames from 'classnames/bind';
import CommentIcon from '@/public/svgs/comment.svg';
import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

interface PostInteractionsProps {
  goodCount: number;
  commentCount: number;
}

export function PostInteractions({ goodCount, commentCount }: PostInteractionsProps) {
  return (
    <div className={cn('container')}>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p id={cn('count')}>{goodCount > 99 ? '99+' : goodCount}</p>
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p id={cn('count')}>{commentCount > 99 ? '99+' : commentCount}</p>
      </div>
    </div>
  );
}
