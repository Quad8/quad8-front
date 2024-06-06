import HeartIcon from '@/public/svgs/heart.svg';
import ShareIcon from '@/public/svgs/share.svg';
import ThumbIcon from '@/public/svgs/thumb.svg';
import classNames from 'classnames/bind';
import styles from './LikeButton.module.scss';

const cn = classNames.bind(styles);

interface LikeButtonProps {
  variant?: 'detail' | 'review' | 'share';
  isChecked: boolean;
  count?: number;
  onClick: () => void;
}

export default function LikeButton({ variant, isChecked, count, onClick }: LikeButtonProps) {
  const getIcon = () => {
    switch (variant) {
      case 'review':
        return (
          <>
            <ThumbIcon className={cn('thumb', { 'white-thumb': isChecked })} />
            <span className={cn('count')}>{count}</span>
          </>
        );
      case 'share':
        return <ShareIcon />;
      default:
        return <HeartIcon className={cn('heart', { 'white-stroke': variant === 'detail', 'red-heart': isChecked })} />;
    }
  };

  const buttonClass = cn({
    circle: variant === 'detail' || variant === 'share',
    'like-circle': variant === 'review',
    'red-circle': (variant === 'review' && isChecked) || (variant === 'detail' && isChecked),
    'blue-circle': variant === 'share' && isChecked,
    'hover-red': variant === 'detail' && !isChecked,
    'hover-blue': variant === 'share' && !isChecked,
  });

  return (
    <button type='button' className={buttonClass} onClick={onClick}>
      {getIcon()}
    </button>
  );
}
