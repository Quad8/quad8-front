'use client';

import { useRef } from 'react';
import ScrollUpButton from '@/components/buttons/ScrollUpButton';
import classNames from 'classnames/bind';
import styles from './page.module.scss';

export default function Page() {
  const cn = classNames.bind(styles);
  const headerRef = useRef(null);
  return (
    <div className={cn('container')}>
      <header className={cn('header')} ref={headerRef}>
        헤더
      </header>
      <div className={cn('content')}>내용</div>
      <div className={cn('footer')}>푸터</div>
      <ScrollUpButton headerRef={headerRef} />
    </div>
  );
}
