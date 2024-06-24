'use client';

import { ROUTER } from '@/constants/route';
import { ErrorIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import styles from './not-found.module.scss';

const cn = classNames.bind(styles);

const BUTTONS = [
  { text: '이전 페이지', path: 'back' },
  { text: '메인으로 가기', path: ROUTER.MAIN },
  { text: '커스텀 하러 가기', path: ROUTER.CUSTOM_KEYBOARD },
  { text: '상품 둘러보기', path: ROUTER.SHOP.ALL },
  { text: '커뮤니티에서 자랑하기', path: ROUTER.COMMUNITY },
];

export default function NotFound() {
  const router = useRouter();

  const handleNavigation = (path: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (path === 'back') {
      router.back();
    } else {
      router.push(path);
    }
  };

  return (
    <div className={cn('container')}>
      <section className={cn('left')}>
        <h1 className={cn('title')}>
          페이지가 없거나
          <br />
          접근할 수 없어요 :(
        </h1>
        <p className={cn('desc')}>대신 이 페이지를 보는건 어때요?</p>
        <ul className={cn('link-list')}>
          {BUTTONS.map((button) => (
            <li key={button.text}>
              <button type='button' onClick={handleNavigation(button.path)} className={cn('button')}>
                {button.text}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={cn('right')}>
        <ErrorIcon />
      </section>
    </div>
  );
}
