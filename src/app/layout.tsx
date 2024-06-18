import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

import { getUserData } from '@/api/usersAPI';
import { Header } from '@/components';
import { Providers } from './providers';

import '@/styles/reset.css';
import '@/styles/toast/toastAnimation.scss';
import '@/styles/toast/toastContainer.scss';

export const metadata: Metadata = {
  title: '키보드 득템 :: KeyDuek',
  description: 'Generated by create next app',
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
            <ToastContainer autoClose={2000} theme='dark' position='top-center' transition={Zoom} />
            <Header />
            {children}
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
