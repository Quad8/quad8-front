import Header from '@/components/Header/Header';
import { ReactNode } from 'react';
import SNB from './_component/SNB/SNB';

interface MyInfoLayoutProps {
  children: ReactNode;
}

export default function MyInfoLayout({ children }: MyInfoLayoutProps) {
  return (
    <section>
      <Header />
      <SNB />
      {children}
    </section>
  );
}
