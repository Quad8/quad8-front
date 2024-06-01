'use client';

import Rating from '@/components/Rating/Rating';
import { useState } from 'react';

export default function Page() {
  const [userRating, setUserRating] = useState(1);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div>
      <Rating rating={userRating} onRatingChange={handleRatingChange} isEditable />
    </div>
  );
}
