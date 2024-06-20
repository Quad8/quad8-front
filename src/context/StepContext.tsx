'use client';

import type { CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes } from '@/types/CustomKeyboardTypes';
import { RefObject, PropsWithChildren, createContext, useRef, useCallback, useMemo, useState } from 'react';
import { OrbitControls } from 'three-stdlib';

interface StepContextType {
  currentStep: CustomKeyboardStepTypes;
  stepStatus: Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  controlRef: RefObject<OrbitControls> | null;
  keyboardImage: Record<Exclude<CustomKeyboardStepTypes, 'switch'>, string>;
  updateStepStatus: (value: Partial<Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>>) => void;
  updateCurrentStep: (data: CustomKeyboardStepTypes) => void;
  updateKeyboardImage: (type: Exclude<CustomKeyboardStepTypes, 'switch'>, value: string | null) => void;
}

export const StepContext = createContext<StepContextType>({
  currentStep: 'board',
  stepStatus: {
    board: 'current',
    switch: 'pending',
    keyCap: 'pending',
  },
  canvasRef: null,
  controlRef: null,
  keyboardImage: { board: '', keyCap: '' },
  updateCurrentStep: () => {},
  updateStepStatus: () => {},
  updateKeyboardImage: () => {},
});

export function StepContextProvider({ children }: PropsWithChildren) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlRef = useRef<OrbitControls>(null);
  const [keyboardImage, setKeyboardImage] = useState({ board: '', keyCap: '' });
  const [currentStep, setCurrentStep] = useState<CustomKeyboardStepTypes>('board');
  const [stepStatus, setStapStatus] = useState<Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>>({
    board: 'current',
    switch: 'pending',
    keyCap: 'pending',
  });
  const updateCurrentStep = useCallback((value: CustomKeyboardStepTypes) => {
    setCurrentStep(value);
  }, []);

  const updateStepStatus = useCallback(
    (value: Partial<Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>>) => {
      setStapStatus((prev) => ({ ...prev, ...value }));
    },
    [],
  );

  const updateKeyboardImage = useCallback((type: Exclude<CustomKeyboardStepTypes, 'switch'>, value: string | null) => {
    setKeyboardImage((prev) => ({ ...prev, [type]: value }));
  }, []);

  const contextValue = useMemo(
    () => ({
      currentStep,
      stepStatus,
      canvasRef,
      controlRef,
      keyboardImage,
      updateCurrentStep,
      updateStepStatus,
      updateKeyboardImage,
    }),
    [currentStep, stepStatus, keyboardImage, updateCurrentStep, updateStepStatus, updateKeyboardImage],
  );

  return <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>;
}
