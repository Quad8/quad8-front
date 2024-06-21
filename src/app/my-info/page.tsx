import { ROUTER } from '@/constants/route';
import classNames from 'classnames/bind';
import { redirect } from 'next/navigation';

import { getCookie } from '@/libs/manageCookie';
import { DeliveryStatus, RecentProducts, UserProfile } from './_components';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default async function MyInfoPage() {
  const token = await getCookie('accessToken');

  if (!token) {
    redirect(ROUTER.MAIN);
  }

  return (
    <section className={cn('my-page')}>
      <UserProfile />
      <DeliveryStatus />
      <RecentProducts />
    </section>
  );
}
