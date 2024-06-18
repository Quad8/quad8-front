import { ROUTER } from '@/constants/route';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './CategoryMenu.module.scss';

const cn = classNames.bind(styles);

const categoryItems = [
  { href: ROUTER.SHOP.ALL, label: '전체' },
  { href: ROUTER.SHOP.KEYBOARD, label: '키보드' },
  { href: ROUTER.SHOP.KEYCAP, label: '키캡' },
  { href: ROUTER.SHOP.SWITCH, label: '스위치' },
  { href: ROUTER.SHOP.ETC, label: '기타 용품' },
];
interface CategoryMenuItemProp {
  href: string;
  label: string;
}
function CategoryMenuItem({ href, label }: CategoryMenuItemProp) {
  return (
    <li className={cn('menu-item')}>
      <Link href={href}>{label}</Link>
    </li>
  );
}

export default function CategoryMenu() {
  return (
    <nav>
      <ul className={cn('category-list')}>
        {categoryItems.map((item) => (
          <CategoryMenuItem key={item.href} href={item.href} label={item.label} />
        ))}
      </ul>
    </nav>
  );
}
