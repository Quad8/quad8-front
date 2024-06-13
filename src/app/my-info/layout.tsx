import { ReactNode } from 'react';
import SNB from './_components/SNB/SNB';

interface MyInfoLayoutProps {
  children: ReactNode;
}

export default function MyInfoLayout({ children }: MyInfoLayoutProps) {
  return (
    <section>
      <SNB />
      {children}
    </section>
  );
}
