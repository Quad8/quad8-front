import { Button } from '@/components';
import { ROUTER } from '@/constants/route';
import { AlertIcon } from '@/public/index';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './MyInfoEmptyCase.module.scss';

const cn = classNames.bind(styles);

interface MyInfoEmptyCaseProps {
  children: string;
  isBackgroundColor?: boolean;
}

export default function MyInfoEmptyCase({ children, isBackgroundColor }: MyInfoEmptyCaseProps) {
  return (
    <div className={cn('empty-case', { 'background-color': isBackgroundColor })}>
      <AlertIcon />
      <p className={cn('empty-case-text')}>{children}</p>
      <Button
        as={Link}
        href={ROUTER.SHOP.ALL}
        backgroundColor='background-gray-40'
        className={cn('empty-case-button')}
        paddingVertical={8}
        radius={4}
      >
        키득 둘러보기
      </Button>
    </div>
  );
}
