'use client';

import { useState } from 'react';
import Rating from '@/components/Stars/Rating';

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
