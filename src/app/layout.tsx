import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { getUserData } from '@/api/usersAPI';
import { Footer, Header } from '@/components';
import { Providers } from './providers';

import '@/styles/reset.css';

export const metadata: Metadata = {
  title: '키보드 득템 :: KeyDeuk',
  description: '원하는 컬러, 소리, 타건감, 내 취향을 담은 커스텀 키보드 초보도 쉽게 만들 수 있어요',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['userData'], queryFn: getUserData });

  return (
    <html lang='ko'>
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            {children}
            <Footer />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
