import classNames from 'classnames/bind';
import { PropsWithChildren } from 'react';
import styles from './CategoryTitle.module.scss';

const cn = classNames.bind(styles);

interface CategoryTitleProps {
  totalCount: number;
}

export default function CategoryTitle({ children, totalCount }: PropsWithChildren<CategoryTitleProps>) {
  return (
    <h1 className={cn('title')}>
      {children}
      <span>({totalCount})</span>
    </h1>
  );
}
