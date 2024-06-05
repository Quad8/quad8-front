import LogoIcon from '@/public/svgs/logo.svg';
import UserIcon from '@/public/svgs/user.svg';
import classNames from 'classnames/bind';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import CartButton from './CartButton';
import styles from './Header.module.scss';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SearchBox from './SearchBox';
import ShopButton from './ShopButton';

const cn = classNames.bind(styles);
const URL_LIST = {
  MAIN: '/',
  CUSTOM_KEYBOARD: '/custom-keyboard',
  COMMUNITY: '/community',
};

export default function Header() {
  const accessToken = cookies().get('accessToken')?.value ?? null;
  const pathname = headers().get('pathname') as string;
  const BLACK = pathname === '/' || pathname === 'sign-up';
  const cartCount = 0; /* api로 가져오기 */

  return (
    <header className={cn('wrapper', { black: BLACK })}>
      <div className={cn('right-wrapper')}>
        <Link href={URL_LIST.MAIN}>
          <LogoIcon width={131} height={24} />
        </Link>
        <div className={cn('button-wrapper')}>
          <Link href={URL_LIST.CUSTOM_KEYBOARD} className={cn({ 'current-page': pathname === '/custom-keyboard' })}>
            커스텀 키보드 만들기
          </Link>
          <ShopButton pathname={pathname} />
          <Link href={URL_LIST.COMMUNITY} className={cn({ 'current-page': pathname === '/community' })}>
            커뮤니티
          </Link>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <LoginButton /> : <LogoutButton />}
          <Link href='/mypage' className={cn('user-icon')}>
            <UserIcon width={31} height={31} className={cn(BLACK ? 'user-black' : 'user-white')} />
          </Link>
          <CartButton cartCount={cartCount} black={BLACK} />
        </div>
      </div>
    </header>
  );
}
