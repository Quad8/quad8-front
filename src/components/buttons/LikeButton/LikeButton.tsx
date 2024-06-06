import { useOutsideClick } from '@/hooks/useOutsideClick';
import { HeartIcon, KakaotalkIcon, LinkCopyIcon, ShareIcon, ThumbIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './LikeButton.module.scss';

const cn = classNames.bind(styles);

interface LikeButtonProps {
  variant?: 'detail' | 'review' | 'share';
  isChecked: boolean;
  count?: number;
  onClick: () => void;
}

interface ShareBoxProps {
  onClick: () => void;
}

function ShareBox({ onClick }: ShareBoxProps) {
  const BoxRef = useRef<HTMLDivElement>(null);

  useOutsideClick(BoxRef, () => {
    onClick();
  });

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={cn('share-box')} ref={BoxRef}>
      <h2 className={cn('share-title')}>공유하기</h2>
      <div className={cn('share-contents')}>
        <div className={cn('share-content')}>
          <KakaotalkIcon className={cn('share-icon')} onClick={handleIconClick} />
          <h2 className={cn('share-text')}>카카오톡</h2>
        </div>
        <div className={cn('share-content')}>
          <LinkCopyIcon className={cn('share-icon')} onClick={handleIconClick} />
          <h2 className={cn('share-text')}>링크복사</h2>
        </div>
      </div>
    </div>
  );
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

  const buttonClass = cn('button', {
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
      {variant === 'share' && isChecked && <ShareBox onClick={onClick} />}
    </button>
  );
}
