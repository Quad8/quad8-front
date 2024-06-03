'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ShopButton.module.scss';

const cn = classNames.bind(styles);

const MENU_BUTTON = [
  { NAME: '키보드', HREF: '/' },
  { NAME: '키캡', HREF: '/' },
  { NAME: '스위치', HREF: '/' },
  { NAME: '기타 용품', HREF: '/' },
];

interface ShopButtonProps {
  pathname: string;
}

export default function ShopButton({ pathname }: ShopButtonProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={cn('wrapper')} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <a href='/' className={cn('button', { 'current-page': pathname.includes('/shop') })}>
        SHOP
      </a>
      {isHover && (
        <div className={cn('sub-menu-wrapper')}>
          {MENU_BUTTON.map((element) => (
            <div key={element.NAME} className={cn('menu-button')}>
              <a href={element.HREF} className={cn('button-text')}>
                {element.NAME}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
