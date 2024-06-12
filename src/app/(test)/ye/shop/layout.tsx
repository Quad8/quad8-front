import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { ReactNode } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Breadcrumb />
      {children}
    </>
  );
}
