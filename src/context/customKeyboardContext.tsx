'use client';

import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

interface StepStatusType {
  board: 'pending' | 'current' | 'completed';
  switch: 'pending' | 'current' | 'completed';
  keyCap: 'pending' | 'current' | 'completed';
}

interface StepContextType {
  currentStep: 'board' | 'switch' | 'keyCap';
  stepStatus: StepStatusType;
  updateStepStatus: (value: { [key: string]: 'pending' | 'current' | 'completed' }) => void;
  updateCurrentStep: (data: 'board' | 'switch' | 'keyCap') => void;
}

interface KeyboardDataType {
  type: 'tkl' | 'full';
  texture: 'metal' | 'plastic';
  boardColor: string /* color */;
  switchType: 'blue' | 'red' | 'brown' | 'black' | null;
  baseKeyColor: string;
  hasPointKeyCap: boolean;
  pointKeyType: '내 맘대로 바꾸기' | '세트 구성';
  pointKeyColor: string;
  price: number;
  option: { [key: string]: boolean };
  individualColor: { [key: string]: string };
}

interface KeyboardDataContextType {
  keyboardData: KeyboardDataType;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
  updateIndividualColor: (value: { [key: string]: string }) => void;
  deleteIndividualColor: (key: string) => void;
}

interface KeyColorContextType {
  focusKey: string | null;
  updateFocusKey: (value: string | null) => void;
}

export const StepContext = createContext<StepContextType>({
  currentStep: 'board',
  stepStatus: {
    board: 'current',
    switch: 'pending',
    keyCap: 'pending',
  },
  updateCurrentStep: () => {},
  updateStepStatus: () => {},
});

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  keyboardData: {
    type: 'tkl',
    texture: 'metal',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeyColor: '#ffffff',
    price: 0,
    option: {},
    individualColor: {},
  },
  updateData: () => {},
  updateIndividualColor: () => {},
  deleteIndividualColor: () => {},
});

export const KeyColorContext = createContext<KeyColorContextType>({
  focusKey: '',
  updateFocusKey: () => {},
});

export function StepContextProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState<'board' | 'switch' | 'keyCap'>('board');
  const [stepStatus, setStapStatus] = useState<StepStatusType>({
    board: 'current',
    switch: 'pending',
    keyCap: 'pending',
  });

  const updateCurrentStep = useCallback((step: 'board' | 'switch' | 'keyCap') => {
    setCurrentStep(step);
  }, []);

  const updateStepStatus = useCallback((value: { [key: string]: 'pending' | 'current' | 'completed' }) => {
    setStapStatus((prev) => ({ ...prev, ...value }));
  }, []);

  const contextValue = useMemo(
    () => ({ currentStep, stepStatus, updateCurrentStep, updateStepStatus }),
    [currentStep, stepStatus, updateCurrentStep, updateStepStatus],
  );

  return <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>;
}

export function KeyboardDataContextProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<KeyboardDataType>({
    type: 'full',
    texture: 'metal',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeyColor: '#ffffff',
    price: 70000,
    option: {},
    individualColor: {},
  });

  const updateData = useCallback((key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateIndividualColor = useCallback((value: { [key: string]: string }) => {
    setData((prev) => {
      const newData = { ...prev.individualColor, ...value };
      return { ...prev, individualColor: newData };
    });
  }, []);

  const deleteIndividualColor = useCallback((value: string) => {
    setData((prev) => {
      const prevData = prev.individualColor;
      delete prevData[value];
      return { ...prev, individualColor: { ...prevData } };
    });
  }, []);

  const value = useMemo(
    () => ({ keyboardData: data, updateData, updateIndividualColor, deleteIndividualColor }),
    [data, updateData, updateIndividualColor, deleteIndividualColor],
  );

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}

export function KeyColorContextProvider({ children }: PropsWithChildren) {
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const updateFocusKey = useCallback((value: string | null) => {
    setFocusKey(value);
  }, []);

  const value = useMemo(() => ({ focusKey, updateFocusKey }), [focusKey, updateFocusKey]);

  return <KeyColorContext.Provider value={value}>{children}</KeyColorContext.Provider>;
}
