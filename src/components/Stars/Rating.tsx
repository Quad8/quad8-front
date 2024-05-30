'use client';

import { useState } from 'react';
import Star from './Star';

interface RatingProps {
  initialRating: number;
  onRatingChange?: (rating: number) => void;
  isEditable?: boolean;
}

export default function Rating({ initialRating, onRatingChange, isEditable }: RatingProps) {
  const STARS = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    if (isEditable && onRatingChange) {
      setRating(rate);
      onRatingChange(rate);
    }
  };

  return (
    <div>
      {isEditable
        ? STARS.map((star) => (
            <Star
              key={star}
              checked={star <= (hoverRating || rating)}
              onClick={() => handleRating(star)}
              onMouseOver={() => (star > rating ? setHoverRating(star) : undefined)}
              onMouseOut={() => setHoverRating(0)}
              isEditable={isEditable}
            />
          ))
        : STARS.map((star) => <Star key={star} checked={star <= (hoverRating || rating)} />)}
    </div>
  );
}
