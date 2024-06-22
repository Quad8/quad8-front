'use client';

import { deleteCookie } from '@/libs/manageCookie';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import styles from './AuthButton.module.scss';

const cn = classNames.bind(styles);

export default function LogoutButton() {
  const router = useRouter();

  const handleClickButton = () => {
    deleteCookie('accessToken');
    router.refresh();
  };

  return (
    <button className={cn('button')} type='button' onClick={handleClickButton}>
      로그아웃
    </button>
  );
}
