import LogoIcon from '@/public/svgs/logo.svg';
import UserIcon from '@/public/svgs/user.svg';
import classNames from 'classnames/bind';
import { cookies, headers } from 'next/headers';
import CartButton from './CartButton';
import styles from './Header.module.scss';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SearchBox from './SearchBox';
import ShopButton from './ShopButton';

const cn = classNames.bind(styles);
const URL_LIST = {
  main: '/',
  customKeyboard: '/custom-keyboard',
  community: '/',
};

export default function Header() {
  const accessToken = cookies().get('accessToken')?.value ?? null;
  const pathname = headers().get('pathname');
  const white = pathname === '/custom-keyboard';
  const cartCount = 0; /* api로 가져오기 */

  return (
    <header className={cn('wrapper', white && 'white')}>
      <div className={cn('right-wrapper')}>
        <a href={URL_LIST.main}>
          <LogoIcon width={131} height={24} />
        </a>
        <div className={cn('button-wrapper')}>
          <a href={URL_LIST.customKeyboard}>커스텀 키보드 만들기</a>
          <ShopButton />
          <a href={URL_LIST.community}>커뮤니티</a>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <LoginButton /> : <LogoutButton />}
          <a href='/mypage' className={cn('user-icon')}>
            <UserIcon width={31} height={31} className={cn(white ? 'user-white' : 'user-black')} />
          </a>
          <CartButton cartCount={cartCount} white={white} />
        </div>
      </div>
    </header>
  );
}
