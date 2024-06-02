'use client';

import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import { KEY, TEN_KEY } from '@/constants/keyboardData';

interface StepContextType {
  currentStep: 'board' | 'switch' | 'keyCap';
  updateCurrentStep: (data: 'board' | 'switch' | 'keyCap') => void;
}

interface KeyboardDataType {
  type: 'tkl' | 'full';
  texture: 'metal' | 'plastic';
  boardColor: string /* color */;
  switchType: 'blue' | 'red' | 'brown' | 'black' | null;
  baseKeyColor: string;
  hasPointKeyCap: boolean;
  pointKeyType: string | null;
  pointKeyColor: string | null;
  price: number;
  option: { [key: string]: boolean };
  individualColor: { [key: string]: string } | null;
}

interface KeyboardDataContextType {
  keyboardData: KeyboardDataType;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
}

interface KeyColorType {
  [key: string]: string;
}

interface KeyColorContextType {
  keyColorData: KeyColorType;
  focusKey: string | null;
  updateKeyColor: (key: string, value: string) => void;
  updateFocusKey: (value: string | null) => void;
}

export const StepContext = createContext<StepContextType>({
  currentStep: 'board',
  updateCurrentStep: () => {},
});

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  keyboardData: {
    type: 'tkl',
    texture: 'metal',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: null,
    pointKeyColor: null,
    price: 0,
    option: {},
    individualColor: null,
  },
  updateData: () => {},
});

export const KeyColorContext = createContext<KeyColorContextType>({
  keyColorData: {},
  focusKey: '',
  updateKeyColor: () => {},
  updateFocusKey: () => {},
});

export function StepContextProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState<'board' | 'switch' | 'keyCap'>('board');

  const updateCurrentStep = useCallback((step: 'board' | 'switch' | 'keyCap') => {
    setCurrentStep(step);
  }, []);

  const contextValue = useMemo(() => ({ currentStep, updateCurrentStep }), [currentStep, updateCurrentStep]);

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
    pointKeyType: null,
    pointKeyColor: null,
    price: 70000,
    option: {},
    individualColor: null,
  });

  const updateData = useCallback((key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const value = useMemo(() => ({ keyboardData: data, updateData }), [data, updateData]);

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}

export function KeyColorContextProvider({ children }: PropsWithChildren) {
  const [keyColorData, setKeyColorData] = useState<KeyColorType>(() => {
    const color = {};
    [...KEY, ...TEN_KEY].forEach((key) => Object.assign(color, { [key]: '#ffffff' }));
    return color;
  });
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const updateKeyColor = useCallback((key: string, value: string) => {
    setKeyColorData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateFocusKey = useCallback((value: string | null) => {
    setFocusKey(value);
  }, []);

  const value = useMemo(
    () => ({ keyColorData, focusKey, updateKeyColor, updateFocusKey }),
    [keyColorData, focusKey, updateKeyColor, updateFocusKey],
  );

  return <KeyColorContext.Provider value={value}>{children}</KeyColorContext.Provider>;
}
