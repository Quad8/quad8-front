'use client';

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

interface ShopButtonProps {
  pathname: string;
}

export default function ShopButton({ pathname }: ShopButtonProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={cn('wrapper')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <a href='/' className={cn('button', { 'current-page': pathname === 'shop' })}>
        SHOP
      </a>
      {isHover && (
        <div className={cn('sub-menu-wrapper')}>
          {MENU_BUTTON.map((element) => (
            <div key={element.name} className={cn('menu-button')}>
              <a href={element.href} className={cn('button-text')}>
                {element.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
