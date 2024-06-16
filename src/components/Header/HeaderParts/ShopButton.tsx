'use client';

import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState } from 'react';
import styles from './ShopButton.module.scss';

const cn = classNames.bind(styles);

const MENU_BUTTON = [
  { NAME: '키보드', HREF: '/keyboard' },
  { NAME: '키캡', HREF: '/keycap' },
  { NAME: '스위치', HREF: '/switch' },
  { NAME: '기타 용품', HREF: '/etc' },
];

interface ShopButtonProps {
  pathname: string;
}

export default function ShopButton({ pathname }: ShopButtonProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={cn('wrapper')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Link href='/shop' className={cn('button', { 'current-page': pathname === 'shop' })}>
        SHOP
      </Link>
      {isHover && (
        <div className={cn('sub-menu-layout')}>
          <div className={cn('sub-menu-wrapper', { black: pathname === '/' || pathname === 'sign-up' })}>
            {MENU_BUTTON.map((element) => (
              <div key={element.NAME} className={cn('menu-button')}>
                <Link href={element.HREF} className={cn('button-text')}>
                  {element.NAME}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
