'use client';

import { MutableRefObject } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { deleteCookie } from '@/utils/manageCookie';
import { ROUTER } from '@/constants/route';

import styles from './AuthButton.module.scss';

const cn = classNames.bind(styles);

interface LogoutButtonProps {
  eventSource: MutableRefObject<EventSource | null>;
}

export default function LogoutButton({ eventSource }: LogoutButtonProps) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const handleClickButton = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    queryClient.removeQueries();
    localStorage.clear();

    if (eventSource.current) {
      eventSource.current.close();
      Object.assign(eventSource, { current: null });
    }

    if (pathname.startsWith(ROUTER.MY_PAGE.MY_INFO)) {
      router.push(ROUTER.MAIN);
    }

    if (pathname.startsWith(ROUTER.SHOP.ALL) || pathname.startsWith(ROUTER.SEARCH)) {
      router.refresh();
    }
  };

  return (
    <button className={cn('button', { black: pathname === ROUTER.MAIN })} type='button' onClick={handleClickButton}>
      로그아웃
    </button>
  );
}
