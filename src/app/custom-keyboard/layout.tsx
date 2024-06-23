import { FocusKeyContextProvider, KeyboardDataContextProvider, StepContextProvider } from '@/context';
import EventProvider from './EventProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
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
