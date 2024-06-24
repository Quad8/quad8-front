'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import classNames from 'classnames/bind';

import { PropsWithChildren, useRef } from 'react';
import styles from './AnimatedSection.module.scss';

const cn = classNames.bind(styles);

export default function AnimatedSection({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.2 });
  return (
    <div ref={ref} className={cn('fade-zoom-in', { visible: isIntersecting })}>
      {children}
    </div>
  );
}
