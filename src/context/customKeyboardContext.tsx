'use client';

import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

interface StepStatusType {
  board: boolean;
  switch: boolean;
  keyCap: boolean;
}

interface StepContextType {
  stepStatus: StepStatusType;
  currentStep: 'board' | 'switch' | 'keyCap';
  updateStepStatus: (step: 'board' | 'switch' | 'keyCap', status: boolean) => void;
  updateCurrentStep: (data: 'board' | 'switch' | 'keyCap') => void;
}

export const StepContext = createContext<StepContextType>({
  stepStatus: {
    board: false,
    switch: false,
    keyCap: false,
  },
  currentStep: 'board',
  updateStepStatus: () => {},
  updateCurrentStep: () => {},
});

export function StepContextProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState<'board' | 'switch' | 'keyCap'>('board');
  const [stepStatus, setStepStatus] = useState<StepStatusType>({
    board: false,
    switch: false,
    keyCap: false,
  });

  const updateStepStatus = useCallback((step: 'board' | 'switch' | 'keyCap', status: boolean) => {
    setStepStatus((prev) => ({ ...prev, [step]: status }));
  }, []);
  const updateCurrentStep = useCallback((step: 'board' | 'switch' | 'keyCap') => {
    setCurrentStep(step);
  }, []);

  const contextValue = useMemo(
    () => ({ stepStatus, currentStep, updateStepStatus, updateCurrentStep }),
    [stepStatus, currentStep, updateStepStatus, updateCurrentStep],
  );
  return <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>;
}
