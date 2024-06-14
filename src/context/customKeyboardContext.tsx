'use client';

import type {
  CustomKeyboardStepTypes,
  CustomKeyboardStepStatusTypes,
  CustomKeyboardKeyTypes,
  CustomKeyboardTypeTypes,
  CustomKeyboardTextureTypes,
  CustomKeyboardSwitchTypes,
  CustomKeyboardPointKeyType,
} from '@/types/CustomKeyboardTypes';
import { Color } from '@react-three/fiber';
import { PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

interface StepContextType {
  currentStep: CustomKeyboardStepTypes;
  stepStatus: Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>;
  updateStepStatus: (value: Partial<Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>>) => void;
  updateCurrentStep: (data: CustomKeyboardStepTypes) => void;
}

interface KeyboardDataType {
  type: CustomKeyboardTypeTypes;
  texture: CustomKeyboardTextureTypes;
  boardColor: Color;
  switchType: CustomKeyboardSwitchTypes | null;
  baseKeyColor: Color;
  hasPointKeyCap: boolean;
  pointKeyType: CustomKeyboardPointKeyType;
  pointKeySetColor: Color;
  price: number;
  option: Partial<Record<string, boolean>>;
  individualColor: Partial<Record<CustomKeyboardKeyTypes, Color>>;
}

interface KeyboardDataContextType {
  keyboardData: KeyboardDataType;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
  updateIndividualColor: (value: Partial<Record<CustomKeyboardKeyTypes, Color>>) => void;
  deleteIndividualColor: (key: CustomKeyboardKeyTypes) => void;
  updatePrice: (value: number) => void;
  updateOption: (id: string, value: boolean) => void;
}

interface KeyColorContextType {
  focusKey: CustomKeyboardKeyTypes | null;
  currentPointKeyColor: Color;
  updateCurrentPointKeyColor: (value: Color) => void;
  updateFocusKey: (value: CustomKeyboardKeyTypes | null) => void;
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
    pointKeySetColor: '#ffffff',
    price: 0,
    option: {},
    individualColor: {},
  },
  updateData: () => {},
  updateIndividualColor: () => {},
  deleteIndividualColor: () => {},
  updatePrice: () => {},
  updateOption: () => {},
});

export const KeyColorContext = createContext<KeyColorContextType>({
  focusKey: null,
  currentPointKeyColor: '#ffffff',
  updateCurrentPointKeyColor: () => {},
  updateFocusKey: () => {},
});

export function StepContextProvider({ children }: PropsWithChildren) {
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

  const contextValue = useMemo(
    () => ({ currentStep, stepStatus, updateCurrentStep, updateStepStatus }),
    [currentStep, stepStatus, updateCurrentStep, updateStepStatus],
  );

  return <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>;
}

export function KeyboardDataContextProvider({ children }: PropsWithChildren) {
  const [keyboardData, setKeyboardData] = useState<KeyboardDataType>({
    type: 'full',
    texture: 'metal',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeySetColor: '#ffffff',
    price: 70000,
    option: {},
    individualColor: {},
  });

  const updateData = useCallback((key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => {
    setKeyboardData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateIndividualColor = useCallback((value: Partial<Record<CustomKeyboardKeyTypes, Color>>) => {
    setKeyboardData((prev) => ({ ...prev, individualColor: { ...prev.individualColor, ...value } }));
  }, []);

  const deleteIndividualColor = useCallback((value: CustomKeyboardKeyTypes) => {
    setKeyboardData((prev) => {
      const prevData = prev.individualColor;
      delete prevData[value];
      return { ...prev, individualColor: { ...prevData } };
    });
  }, []);

  const updatePrice = useCallback((value: number) => {
    setKeyboardData((prev) => ({ ...prev, price: prev.price + value }));
  }, []);

  const updateOption = useCallback((id: string, value: boolean) => {
    setKeyboardData((prev) => ({ ...prev, option: { ...prev.option, [id]: value } }));
  }, []);

  const value = useMemo(
    () => ({ keyboardData, updateData, updateIndividualColor, deleteIndividualColor, updatePrice, updateOption }),
    [keyboardData, updateData, updateIndividualColor, deleteIndividualColor, updatePrice, updateOption],
  );

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}

export function KeyColorContextProvider({ children }: PropsWithChildren) {
  const [focusKey, setFocusKey] = useState<CustomKeyboardKeyTypes | null>(null);
  const [currentPointKeyColor, setCurrentPointKeyColor] = useState<Color>('#ffffff');

  const updateCurrentPointKeyColor = useCallback((value: Color) => {
    setCurrentPointKeyColor(value);
  }, []);

  const updateFocusKey = useCallback((value: CustomKeyboardKeyTypes | null) => {
    setFocusKey(value);
  }, []);

  const value = useMemo(
    () => ({ focusKey, currentPointKeyColor, updateFocusKey, updateCurrentPointKeyColor }),
    [focusKey, currentPointKeyColor, updateFocusKey, updateCurrentPointKeyColor],
  );

  return <KeyColorContext.Provider value={value}>{children}</KeyColorContext.Provider>;
}
