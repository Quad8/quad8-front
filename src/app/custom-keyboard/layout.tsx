import { FocusKeyContextProvider, KeyboardDataContextProvider, StepContextProvider } from '@/context';
import EventProvider from './EventProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log('render');
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
