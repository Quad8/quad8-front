import { FocusKeyContextProvider, KeyboardDataContextProvider, StepContextProvider } from '@/context';
import { PropsWithChildren } from 'react';
import EventProvider from './EventProvider';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <StepContextProvider>
      <KeyboardDataContextProvider>
        <FocusKeyContextProvider>
          <EventProvider>{children}</EventProvider>
        </FocusKeyContextProvider>
      </KeyboardDataContextProvider>
    </StepContextProvider>
  );
}
