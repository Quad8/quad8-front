import { ReactNode } from 'react';
import { CheckoutNavigation } from './_components';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
  return (
    <section>
      <CheckoutNavigation />
      <div>{children}</div>
    </section>
  );
}
