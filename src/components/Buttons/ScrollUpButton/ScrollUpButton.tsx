'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { UpArrowIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { RefObject, useEffect, useState } from 'react';
import styles from './ScrollUpButton.module.scss';

const cn = classNames.bind(styles);

interface ScrollUpButtonProps {
  headerRef: RefObject<HTMLDivElement>;
}

export default function ScrollUpButton({ headerRef }: ScrollUpButtonProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isIntersecting = useIntersectionObserver(headerRef, {
    threshold: 0.1,
  });
  useEffect(() => {
    setIsHeaderVisible(isIntersecting);
  }, [isIntersecting]);

  const handleScrollUpButtonClick = () => {
    headerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <button
      type='button'
      className={cn('button-div', `${isHeaderVisible && 'no-button-visible'}`)}
      onClick={handleScrollUpButtonClick}
    >
      <UpArrowIcon />
    </button>
  );
}
