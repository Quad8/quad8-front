'use client';

import LikeButton from '@/components/buttons/LikeButton/LikeButton';
import { useState } from 'react';

export default function Page() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div>
      <LikeButton onClick={handleClick} isChecked={isChecked} />
      <LikeButton forDetail onClick={handleClick} isChecked={isChecked} />
      <LikeButton forReview onClick={handleClick} isChecked={isChecked} count={8} />
    </div>
  );
}
