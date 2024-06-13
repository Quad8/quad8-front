'use client';

import StarIcon from '@/public/svgs/star.svg';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Rating.module.scss';

interface StarProps {
  checked: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
  usage?: 'edit' | 'show';
}
interface RatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  usage?: 'edit' | 'show';
}

const cn = classNames.bind(styles);

function Star({ checked, onClick, onMouseOver, onMouseOut, usage }: StarProps) {
  return (
    <StarIcon
      className={cn('star', checked ? 'checked' : 'not-checked', { edit: usage === 'edit', big: usage })}
      onClick={() => usage === 'edit' && onClick()}
      onMouseOver={() => usage === 'edit' && onMouseOver()}
      onMouseOut={() => usage === 'edit' && onMouseOut()}
    />
  );
}

export default function Rating({ rating, onRatingChange, usage }: RatingProps) {
  const STARS = [1, 2, 3, 4, 5];
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  return (
    <div className={cn('stars', { 'big-stars': usage })}>
      {STARS.map((star) => (
        <Star
          key={star}
          checked={star <= (hoverRating || rating)}
          onClick={() => handleRating(star)}
          onMouseOver={() => star > rating && setHoverRating(star)}
          onMouseOut={() => setHoverRating(0)}
          usage={usage}
        />
      ))}
    </div>
  );
}
