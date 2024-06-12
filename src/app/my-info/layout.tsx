import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import SNB from './_components/SNB/SNB';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

interface MyInfoLayoutProps {
  children: ReactNode;
}

export default function MyInfoLayout({ children }: MyInfoLayoutProps) {
  return (
    <section className={cn('layout')}>
      <SNB />
      {children}
    </section>
  );
}
