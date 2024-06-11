import { HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from './providers';

import '@/styles/reset.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({ queryKey: ['token'], queryFn: getToken });

  return (
    <html lang='ko'>
      <body>
        <HydrationBoundary state={queryClient}>
          {/* <Header /> */}
          <Providers>{children}</Providers>
        </HydrationBoundary>
      </body>
    </html>
  );
}
