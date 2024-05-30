import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import UpArrow from '@/public/svgs/upArrow.svg';
import styles from './ScrollUpButton.module.scss';

interface ScrollUpButtonProps {
  headerRef: React.RefObject<HTMLDivElement>;
}

export default function ScrollUpButton({ headerRef }: ScrollUpButtonProps) {
  const cn = classNames.bind(styles);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const handleScrollUpButtonClick = () => {
    headerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  return (
    <button
      type="button"
      className={cn('button-div', `${isHeaderVisible && 'no-button-visible'}`)}
      onClick={handleScrollUpButtonClick}
    >
      {' '}
      <UpArrow />
    </button>
  );
}
