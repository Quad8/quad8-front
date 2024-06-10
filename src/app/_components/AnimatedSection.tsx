'use client';

import useObserver from '@/hooks/useIntersectionObserver';
import classNames from 'classnames/bind';

import { PropsWithChildren, RefObject } from 'react';
import styles from './AnimatedSection.module.scss';

const cn = classNames.bind(styles);

export default function AnimatedSection({ children }: PropsWithChildren) {
  const [ref, isIntersecting] = useObserver({ threshold: 0.3 });
  const divRef = ref as RefObject<HTMLDivElement>;
  return (
    <div ref={divRef} className={cn('fade-zoom-in', { visible: isIntersecting })}>
      {children}
    </div>
  );
}
