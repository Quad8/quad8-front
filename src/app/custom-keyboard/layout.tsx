import { FocusKeyContextProvider, KeyboardDataContextProvider, StepContextProvider } from '@/context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StepContextProvider>
      <KeyboardDataContextProvider>
        <FocusKeyContextProvider>{children}</FocusKeyContextProvider>
      </KeyboardDataContextProvider>
    </StepContextProvider>
  );
}
