'use client';

import { ROUTER } from '@/constants/route';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { LogoIcon, UserIcon } from '@/public/index';
import type { Users } from '@/types/userType';
import SignInModal from '../SignInModal/SignInModal';
import { CartButton, LoginButton, LogoutButton, SearchBox, ShopButton } from './HeaderParts';

import styles from './Header.module.scss';

const cn = classNames.bind(styles);

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isBlack = pathname === '/' || pathname === 'sign-up';

  const { data: userData } = useQuery<{ data: Users }>({
    queryKey: ['userData'],
  });

  const cartCount = 0;

  const users = userData?.data ?? null;

  const handleLoginButtonClick = () => {
    setIsModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleUserIconClick = () => {
    if (users) {
      router.push(ROUTER.MY_PAGE.MY_INFO);
      return;
    }

    setIsModalOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCartIconClick = () => {
    if (users) {
      router.push(ROUTER.MY_PAGE.CART);
      return;
    }

    setIsModalOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <header className={cn('header', { 'bg-black': isBlack })}>
        <div className={cn('wrapper', { black: isBlack })}>
          <div className={cn('right-wrapper')}>
            <Link className={cn('logo')} href={ROUTER.MAIN}>
              <LogoIcon width={131} height={24} className={cn('logo-icon')} />
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
              {!users ? <LoginButton onClick={handleLoginButtonClick} /> : <LogoutButton />}
              <button className={cn('user-icon')} type='button' onClick={handleUserIconClick}>
                <UserIcon className={cn(isBlack ? 'user-black' : 'user-white')} width={31} height={31} />
              </button>
              <CartButton cartCount={cartCount} isBlack={isBlack} onClick={handleCartIconClick} />
            </div>
          </div>
        </div>
      </header>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
