import { ReactNode } from 'react';
import { CartDataContextProvider } from '@/context/CartDataContext';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getCartData } from '@/api/cartAPI';

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['cartData'], queryFn: getCartData });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <CartDataContextProvider>{children}</CartDataContextProvider>
    </HydrationBoundary>
  );
}
