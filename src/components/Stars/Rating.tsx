import { useState } from 'react';
import StarIcon from '@/public/svgs/star.svg';

interface StarProps {
  checked: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isEditable?: boolean;
}

interface RatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  isEditable?: boolean;
}

function Star({ checked, onClick, onMouseOver, onMouseOut, isEditable }: StarProps) {
  return (
    <StarIcon
      style={{
        color: checked ? '#F15252' : '#E4E4E4',
        cursor: isEditable ? 'pointer' : 'default',
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
}

export default function Rating({ rating, onRatingChange, isEditable }: RatingProps) {
  const STARS = [1, 2, 3, 4, 5];
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    if (onRatingChange) {
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
              onMouseOver={() => star > rating && setHoverRating(star)}
              onMouseOut={() => setHoverRating(0)}
              isEditable={isEditable}
            />
          ))
        : STARS.map((star) => <Star key={star} checked={star <= (hoverRating || rating)} />)}
    </div>
  );
}
