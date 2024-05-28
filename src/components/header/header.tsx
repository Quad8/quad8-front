import classNames from 'classnames/bind';
import Logo from '@/public/svgs/logo.svg';
import User from '@/public/svgs/user.svg';
import Cart from '@/public/svgs/cart.svg';
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './header.module.scss';
import SearchBox from './searchBox';
import LogoutButton from './logoutButton';

const PAGE_BUTTON = [
  { name: '커스텀 키보드 만들기', href: '/' },
  { name: 'SHOP', href: '/' },
  { name: '커뮤니티', href: '/' },
];

export default function Header() {
  const cn = classNames.bind(styles);
  const accessToken = cookies().get('accessToken')?.value ?? null;
  return (
    <div className={cn('wrapper')}>
      <div className={cn('right-wrapper')}>
        <Link href="/" className={cn('logo')}>
          <Logo width={71.44} height={32} />
        </Link>
        <div className={cn('button-wrapper')}>
          {PAGE_BUTTON.map((element) => (
            <Link key={element.name} href={element.href}>
              {element.name}
            </Link>
          ))}
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <Link href="/signin">로그인</Link> : <LogoutButton />}
          <Link href="/mypage" className={cn('icon')}>
            <User width={24} height={24} />
          </Link>
          <Link href="/cart" className={cn('icon')}>
            <Cart width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
