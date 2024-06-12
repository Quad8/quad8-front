'use client';

import RightArrow from '@/public/svgs/arrow.svg';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './Breadcrumb.module.scss';

const cn = classNames.bind(styles);

const CATEGORY_MAP = {
  keyboard: '키보드',
  keycap: '키캡',
  switch: '스위치',
  etc: '기타용품',
} as const;

type CategoryKey = keyof typeof CATEGORY_MAP;

export default function Breadcrumb() {
  const { category }: { category: CategoryKey } = useParams();

  return (
    <ul className={cn('breadcrumb-list')}>
      <li className={cn('breadcrumb-item')}>
        <Link href='/'>HOME</Link>
      </li>
      <RightArrow />
      <li className={cn('breadcrumb-item', { 'current-category': !category })}>
        <Link href='/shop'>SHOP</Link>
      </li>
      {category && (
        <>
          <RightArrow />
          <li className={cn('current-category')}>
            <Link href={`/shop/${category}`}>{CATEGORY_MAP[category]}</Link>
          </li>
        </>
      )}
    </ul>
  );
}
