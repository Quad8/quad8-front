import { GoogleTagManager } from '@next/third-parties/google';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

import { getAlarm } from '@/api/alarmAPI';
import { getCartData } from '@/api/cartAPI';
import { getUserData } from '@/api/usersAPI';
import { Footer, Header } from '@/components';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { getCookie } from '@/utils/manageCookie';
import { pretendard } from '@/public/fonts/pretendard';
import { Providers } from './providers';

import '@/styles/reset.css';
import styles from './layout.module.scss';

const cn = classNames.bind(styles);

export const metadata: Metadata = {
  title: '키보드 득템 :: KeyDeuk',
  description: '원하는 컬러, 소리, 타건감, 내 취향을 담은 커스텀 키보드 초보도 쉽게 만들 수 있어요',

  openGraph: {
    title: '키보드 득템 :: KeyDeuk',
    description: '원하는 컬러, 소리, 타건감, 내 취향을 담은 커스텀 키보드 초보도 쉽게 만들 수 있어요',
    images: 'https://keydeuk.com/opengraph-image.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const queryClient = new QueryClient();
  const entireQueryClient = new QueryClient();
  const accessToken = await getCookie('accessToken');

  if (accessToken) {
    const userData = await fetchQueryBonding(queryClient, {
      queryKey: ['userData'],
      queryFn: getUserData,
    });
    if (!userData?.data) {
      await queryClient.prefetchQuery({ queryKey: ['communityAlarm'], queryFn: getAlarm, retry: false });
      await entireQueryClient.prefetchQuery({ queryKey: ['cartData'], queryFn: getCartData, retry: false });
    }
  }

  return (
    <html lang='ko' className={pretendard.className}>
      <GoogleTagManager gtmId='GTM-T3C6DZC6' />
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(entireQueryClient)}>
            <div className={cn('wrapper')}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <Header />
              </HydrationBoundary>
              <div className={cn('content-wrapper')}> {children}</div>
              <Footer />
            </div>
          </HydrationBoundary>
        </Providers>
      </body>
      <Script src='https://developers.kakao.com/sdk/js/kakao.js' strategy='afterInteractive' />
    </html>
  );
}
