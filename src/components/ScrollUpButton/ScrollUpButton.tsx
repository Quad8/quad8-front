import { useState, useEffect, RefObject } from 'react';
import classNames from 'classnames/bind';
import UpArrowIcon from '@/public/svgs/upArrow.svg';
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
  useEffect(() => {
    const currentHeaderRef = headerRef.current;
    if (!currentHeaderRef) {
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeaderVisible(entry.isIntersecting);
    });

    observer.observe(currentHeaderRef);

    return () => {
      if (currentHeaderRef) {
        observer.unobserve(currentHeaderRef);
      }
    };
  }, [headerRef]);
  return (
    <button
      type='button'
      className={cn('button-div', `${isHeaderVisible && 'no-button-visible'}`)}
      onClick={handleScrollUpButtonClick}
    >
      {' '}
      <UpArrowIcon />
    </button>
  );
}
