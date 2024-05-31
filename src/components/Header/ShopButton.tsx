'use client';

import Link from 'next/link';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ShopButton.module.scss';

const cn = classNames.bind(styles);

const MENU_BUTTON = [
  { name: '키보드', href: '/' },
  { name: '키캡', href: '/' },
  { name: '스위치', href: '/' },
  { name: '기타 용품', href: '/' },
];

export default function ShopButton() {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={cn('wrapper')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Link href="/" className={cn('button')}>
        SHOP
      </Link>
      {isHover && (
        <div className={cn('sub-menu-wrapper')}>
          {MENU_BUTTON.map((element) => (
            <div key={element.name} className={cn('menu-button')}>
              <Link href={element.href} className={cn('button-text')}>
                {element.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
