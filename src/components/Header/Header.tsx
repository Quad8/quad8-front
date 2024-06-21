'use client';

import { ROUTER } from '@/constants/route';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogoIcon, UserIcon } from '@/public/index';
import type { Users } from '@/types/userType';
import { CartButton, LoginButton, LogoutButton, SearchBox, ShopButton } from './HeaderParts';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

export default function Header() {
  const pathname = usePathname();
  const isBlack = pathname === '/' || pathname === 'sign-up';

  const { data: userData } = useQuery<{ data: Users }>({
    queryKey: ['userData'],
  });

  const cartCount = 0;

  const users = userData?.data ?? null;

  return (
    <header className={cn('header', { 'bg-black': isBlack })}>
      <div className={cn('wrapper', { black: isBlack })}>
        <div className={cn('right-wrapper')}>
          <Link className={cn('logo')} href={ROUTER.MAIN}>
            <LogoIcon width={131} height={24} />
          </Link>
          <div className={cn('button-wrapper')}>
            <Link
              href={ROUTER.CUSTOM_KEYBOARD}
              className={cn('button', { 'current-page': pathname === ROUTER.CUSTOM_KEYBOARD })}
            >
              커스텀 키보드 만들기
            </Link>
            <ShopButton pathname={pathname} />
            <Link href={ROUTER.COMMUNITY} className={cn('button', { 'current-page': pathname === ROUTER.COMMUNITY })}>
              커뮤니티
            </Link>
          </div>
        </div>
        <div className={cn('left-wrapper')}>
          <SearchBox isBlack={isBlack} />
          <div className={cn('status-wrapper')}>
            {!users ? <LoginButton /> : <LogoutButton />}
            <Link href={ROUTER.MY_PAGE.MY_INFO} className={cn('user-icon')}>
              <UserIcon width={31} height={31} className={cn(isBlack ? 'user-black' : 'user-white')} />
            </Link>
            <CartButton cartCount={cartCount} isBlack={isBlack} />
          </div>
        </div>
      </div>
    </header>
  );
}
