'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import classNames from 'classnames/bind';
import { PropsWithChildren, useRef } from 'react';

import { getQueryClient } from '@/libs/client';
import { ScrollUpButton } from '@/components';
import { ToastContainer, Zoom } from 'react-toastify';
import AOSWrapper from './_components/Aos/AOSWrapper';
import AdvertisePanel from './event/_components/AdvertisePanel';

import '@/styles/toast/toastContainer.scss';
import 'react-toastify/ReactToastify.min.css';
import styles from './providers.module.scss';

const cn = classNames.bind(styles);

export function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  const scrollRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={scrollRef} className={cn('target')} />
      {children}
      <div id='modal' />
      <div className={cn('floating-area')}>
        <AdvertisePanel />
        <ScrollUpButton headerRef={scrollRef} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        autoClose={2000}
        theme='dark'
        position='top-center'
        transition={Zoom}
        limit={2}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick
        hideProgressBar
        closeButton={false}
      />
      <AOSWrapper />
    </QueryClientProvider>
  );
}
