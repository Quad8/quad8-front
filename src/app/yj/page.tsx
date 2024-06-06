'use client';

import LikeButton from '@/components/buttons/LikeButton/LikeButton';
import { useState } from 'react';

export default function Page() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div style={{ padding: '10rem' }}>
      <LikeButton onClick={handleClick} isChecked={isChecked} />
      <LikeButton variant='detail' onClick={handleClick} isChecked={isChecked} />
      <LikeButton variant='review' onClick={handleClick} isChecked={isChecked} count={8} />
      <LikeButton variant='share' onClick={handleClick} isChecked={isChecked} />
    </div>
  );
}
