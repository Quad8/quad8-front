'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { ReactNode, useRef } from 'react';
import ScrollUpButton from '@/components/buttons/ScrollUpButton/ScrollUpButton';

interface ProvidersProps {
  children: ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();
  const scrollRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <div ref={scrollRef} />
        {children}
        <ScrollUpButton headerRef={scrollRef} />
        <div id='modal' />
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
