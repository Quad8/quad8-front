import { cookies } from 'next/headers';
import classNames from 'classnames/bind';
import LogoIcon from '@/public/svgs/logo.svg';
import UserIcon from '@/public/svgs/user.svg';
import Link from 'next/link';
import styles from './Header.module.scss';
import SearchBox from './SearchBox';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import ShopButton from './ShopButton';
import CartButton from './CartButton';

const cn = classNames.bind(styles);
const URL_LIST = {
  main: '/',
  customKeyboard: '/',
  community: '/',
};

export default function Header() {
  const accessToken = cookies().get('accessToken')?.value ?? null;
  /* 장바구니 수량 개수 가져오기 */

  return (
    <header className={cn('wrapper')}>
      <div className={cn('right-wrapper')}>
        <Link href={URL_LIST.main}>
          <LogoIcon width={131} height={24} />
        </Link>
        <div className={cn('button-wrapper')}>
          <Link href={URL_LIST.customKeyboard}>커스텀 키보드 만들기</Link>
          <ShopButton />
          <Link href={URL_LIST.community}>커뮤니티</Link>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <LoginButton /> : <LogoutButton />}
          <Link href="/mypage">
            <UserIcon width={31} height={31} />
          </Link>
          <CartButton cartCount={13} />
        </div>
      </div>
    </header>
  );
}
