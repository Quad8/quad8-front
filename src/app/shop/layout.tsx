import { ReactNode } from 'react';

import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <section>
      <div>
        <Breadcrumb />
        {children}
      </div>
    </section>
  );
}
