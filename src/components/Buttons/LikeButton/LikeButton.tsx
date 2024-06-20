import classNames from 'classnames/bind';
import { HeartIcon, ThumbIcon } from '@/public/index';
import styles from './LikeButton.module.scss';

const cn = classNames.bind(styles);

interface LikeButtonProps {
  forDetail?: boolean;
  forReview?: boolean;
  isChecked: boolean;
  count?: number;
  onClick: () => void;
}

export default function LikeButton({ forDetail, forReview, isChecked, count, onClick }: LikeButtonProps) {
  return (
    <button
      type='button'
      className={cn(forDetail && 'circle', forReview && 'like-circle', isChecked && 'red-circle')}
      onClick={onClick}
    >
      {forReview ? (
        <ThumbIcon className={cn('thumb', isChecked && 'white-thumb')} />
      ) : (
        <HeartIcon className={cn('heart', forDetail && 'white-stroke', isChecked && 'red-heart')} />
      )}
      {forReview && <span>{count}</span>}
    </button>
  );
}
