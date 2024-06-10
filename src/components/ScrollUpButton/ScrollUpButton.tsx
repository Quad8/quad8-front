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
    const headerNode = headerRef.current;
    if (!headerNode) {
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeaderVisible(entry.isIntersecting);
    });

    observer.observe(headerNode);

    return () => {
      if (headerNode) {
        observer.unobserve(headerNode);
        observer.disconnect();
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
