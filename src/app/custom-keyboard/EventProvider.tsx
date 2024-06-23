'use client';

import { ReactNode, useEffect } from 'react';

interface EventProviderProps {
  children: ReactNode;
}

export default function EventProvider({ children }: EventProviderProps) {
  useEffect(() => {
    const handleOnBeforUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleOnBeforUnload);
    return () => {
      window.removeEventListener('beforeunload', handleOnBeforUnload);
    };
  }, []);

  return <div>{children}</div>;
}
