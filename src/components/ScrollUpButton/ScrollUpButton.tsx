import { useState, useEffect, RefObject } from 'react';
import classNames from 'classnames/bind';
import UpArrowIcon from '@/public/svgs/upArrow.svg';
import useObserver from '@/hooks/useObserver';
import styles from './ScrollUpButton.module.scss';

const cn = classNames.bind(styles);

interface ScrollUpButtonProps {
  headerRef: RefObject<HTMLDivElement>;
}

export default function ScrollUpButton({ headerRef }: ScrollUpButtonProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const handleScrollUpButtonClick = () => {
    headerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [observerRef, isIntersecting] = useObserver({
    threshold: 0.1,
  });

  useEffect(() => {
    if (headerRef.current) {
      observerRef.current = headerRef.current;
    }
  }, [headerRef, observerRef]);

  useEffect(() => {
    setIsHeaderVisible(isIntersecting);
  }, [isIntersecting]);

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
