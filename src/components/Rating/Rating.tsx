'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import { StarIcon } from '@/public/index';
import styles from './Rating.module.scss';

const cn = classNames.bind(styles);
interface StarProps {
  isChecked: boolean;
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

function Star({ isChecked, onClick, onMouseOver, onMouseOut, usage }: StarProps) {
  const isEditable = usage === 'edit';

  return (
    <StarIcon
      className={cn('star', {
        checked: isChecked,
        'not-checked': !isChecked,
        edit: isEditable,
        big: usage,
      })}
      onClick={() => isEditable && onClick()}
      onMouseOver={() => isEditable && onMouseOver()}
      onMouseOut={() => isEditable && onMouseOut()}
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
          isChecked={star <= (hoverRating || rating)}
          onClick={() => handleRating(star)}
          onMouseOver={() => star > rating && setHoverRating(star)}
          onMouseOut={() => setHoverRating(0)}
          usage={usage}
        />
      ))}
    </div>
  );
}
