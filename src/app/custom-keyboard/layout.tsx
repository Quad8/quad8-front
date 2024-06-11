import {
  KeyColorContextProvider,
  KeyboardDataContextProvider,
  StepContextProvider,
} from '@/context/customKeyboardContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StepContextProvider>
      <KeyboardDataContextProvider>
        <KeyColorContextProvider>{children}</KeyColorContextProvider>
      </KeyboardDataContextProvider>
    </StepContextProvider>
  );
}
