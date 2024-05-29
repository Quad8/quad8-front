import { cookies } from 'next/headers';
import classNames from 'classnames/bind';
import Logo from '@/public/svgs/logo.svg';
import User from '@/public/svgs/user.svg';
import Cart from '@/public/svgs/cart.svg';
import Link from 'next/link';
import styles from './Header.module.scss';
import SearchBox from './SearchBox';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import ShopButton from './ShopButton';

const cn = classNames.bind(styles);

export default function Header() {
  const accessToken = cookies().get('accessToken')?.value ?? null;

  return (
    <div className={cn('wrapper')}>
      <div className={cn('right-wrapper')}>
        <Link href="/" className={cn('logo')}>
          <Logo width={130.65} height={23.89} />
        </Link>
        <div className={cn('button-wrapper')}>
          <Link href="/" className={cn('button')}>
            커스텀 키보드 만들기
          </Link>
          <ShopButton />
          <Link href="/" className={cn('button')}>
            커뮤니티
          </Link>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <LoginButton /> : <LogoutButton />}
          <Link href="/mypage" className={cn('icon')}>
            <User width={48.08} height={48.08} />
          </Link>
          <Link href="/cart" className={cn('icon')}>
            <Cart width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
