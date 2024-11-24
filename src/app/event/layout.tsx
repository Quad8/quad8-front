import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { getQueryClient } from '@/libs/client';
import { prefetchCouponsQuery } from '@/libs/prefetchers';

interface EventLayoutProps {
  children: ReactNode;
}

export default async function EventPageLayout({ children }: EventLayoutProps) {
  const queryClient = getQueryClient();
  await prefetchCouponsQuery(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>{children}</div>
    </HydrationBoundary>
  );
}
