import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface MyPostLayoutProps {
  children: ReactNode;
}

export default function MyPostsLayout({ children }: MyPostLayoutProps) {
  return (
    <div className={cn('container')}>
      <header className={cn('title')}>내 게시글</header>
      {children}
    </div>
  );
}
