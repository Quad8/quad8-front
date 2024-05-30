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

interface KeyboardDataType {
  keyboardType: 'tkl' | 'full' | null;
  texture: 'metal' | 'plastic' | null;
  boardColor: string | null /* color */;
  switchType: 'blue' | 'red' | 'brown' | 'black' | null;
  baseKeyColor: string | null;
  hasPointKeyCap: boolean;
  pointKeyType: string | null;
  pointKeyColor: string | null;
  price: number;
  option: string[];
  individualColor: { [key: string]: string } | null;
}

interface KeyboardDataContextType {
  keyboardData: KeyboardDataType;
  updateIndividualKey: (key: string, value: string) => void;
  updateOption: (optionId: string) => void;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
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

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  keyboardData: {
    keyboardType: null,
    texture: null,
    boardColor: null,
    switchType: null,
    baseKeyColor: null,
    hasPointKeyCap: false,
    pointKeyType: null,
    pointKeyColor: null,
    price: 0,
    option: [],
    individualColor: null,
  },
  updateIndividualKey: () => {},
  updateOption: () => {},
  updateData: () => {},
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

export function KeyboardDataContextProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<KeyboardDataType>({
    keyboardType: null,
    texture: null,
    boardColor: null,
    switchType: null,
    baseKeyColor: null,
    hasPointKeyCap: false,
    pointKeyType: null,
    pointKeyColor: null,
    price: 0,
    option: [],
    individualColor: null,
  });

  const updateIndividualKey = useCallback((key: string, value: string) => {
    setData((prev) => {
      const prevColor = { ...prev.individualColor };
      if (value === prev.baseKeyColor) {
        delete prevColor[key];
      } else {
        Object.assign(prevColor, { [key]: value });
      }
      return { ...prev, individualColor: { ...prevColor } };
    });
  }, []);

  const updateOption = useCallback((optionId: string) => {
    setData((prev) => {
      const filteredList = prev.option.filter((id) => id !== optionId);
      if (filteredList.length !== prev.option.length) {
        return { ...prev, option: filteredList };
      }
      return { ...prev, option: [...prev.option, optionId] };
    });
  }, []);

  const updateData = useCallback((key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => {
    if (key === 'individualColor' || key === 'option') {
      return;
    }
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(
    () => ({ keyboardData: data, updateIndividualKey, updateOption, updateData }),
    [data, updateIndividualKey, updateOption, updateData],
  );

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}
