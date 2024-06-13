'use client';

import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useRef } from 'react';

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
  if (isServer) {
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
      <div ref={scrollRef} />
      {children}
      <ScrollUpButton headerRef={scrollRef} />
      <div id='modal' />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
