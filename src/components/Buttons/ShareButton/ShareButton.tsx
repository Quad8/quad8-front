'use client';

import { ShareIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ShareBox from './ShareBox';
import styles from './ShareButton.module.scss';

const cn = classNames.bind(styles);

export default function ShareButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickButton = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <button type='button' className={cn('circle', { 'blue-circle': isClicked })} onClick={handleClickButton}>
      <ShareIcon />
      {isClicked && <ShareBox handleClick={handleClickButton} />}
    </button>
  );
}
