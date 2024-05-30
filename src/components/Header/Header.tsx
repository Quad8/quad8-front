import { cookies } from 'next/headers';
import classNames from 'classnames/bind';
import Ic_Logo from '@/public/svgs/logo.svg';
import Ic_User from '@/public/svgs/user.svg';

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
    <div className={cn('wrapper')}>
      <div className={cn('right-wrapper')}>
        <Link href={URL_LIST.main} className={cn('logo')}>
          <Ic_Logo width={130.65} height={23.89} />
        </Link>
        <div className={cn('button-wrapper')}>
          <Link href={URL_LIST.customKeyboard} className={cn('button')}>
            커스텀 키보드 만들기
          </Link>
          <ShopButton />
          <Link href={URL_LIST.community} className={cn('button')}>
            커뮤니티
          </Link>
        </div>
      </div>
      <div className={cn('left-wrapper')}>
        <SearchBox />
        <div className={cn('status-wrapper')}>
          {!accessToken ? <LoginButton /> : <LogoutButton />}
          <Link href="/mypage" className={cn('icon')}>
            <Ic_User width={42} height={42} />
          </Link>
          <CartButton cartCount={13} />
        </div>
      </div>
    </div>
  );
}
