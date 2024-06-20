import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import { Button } from '@/components';
import styles from './DeleteButton.module.scss';

const cn = classNames.bind(styles);

interface DeleteButtonProps {
  children: ReactNode;
}

export default function DeleteButton({ children }: DeleteButtonProps) {
  return (
    <Button backgroundColor='outline-primary' width={90} radius={4} className={cn('button')}>
      {children}
    </Button>
  );
}
