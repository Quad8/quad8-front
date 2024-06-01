import classNames from 'classnames/bind';
import CommentIcon from '@/public/svgs/comment.svg';
import styles from './PostInteractions.module.scss';

const cn = classNames.bind(styles);

export function PostInteractions() {
  return (
    <div className={cn('container')}>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p id={cn('count')}>999+</p>
      </div>
      <div className={cn('icon-and-count')}>
        <CommentIcon />
        <p id={cn('count')}>999+</p>
      </div>
    </div>
  );
}
