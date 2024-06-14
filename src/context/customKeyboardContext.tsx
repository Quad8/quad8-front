'use client';

import type {
  CustomKeyboardStepTypes,
  CustomKeyboardStepStatusTypes,
  CustomKeyboardKeyTypes,
  KeyboardDataType,
} from '@/types/CustomKeyboardTypes';
import { Color } from '@react-three/fiber';
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
  canvasRef: null,
  controlRef: null,
  keyboardImage: { board: '', keyCap: '' },
  updateCurrentStep: () => {},
  updateStepStatus: () => {},
  updateKeyboardImage: () => {},
});

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  keyboardData: {
    type: '풀 배열',
    texture: '금속',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeySetColor: '#ffffff',
    price: 0,
    option: null,
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
    [
      currentStep,
      stepStatus,
      canvasRef,
      controlRef,
      keyboardImage,
      updateCurrentStep,
      updateStepStatus,
      updateKeyboardImage,
    ],
  );

  return <StepContext.Provider value={contextValue}>{children}</StepContext.Provider>;
}

export function KeyboardDataContextProvider({ children }: PropsWithChildren) {
  const [keyboardData, setKeyboardData] = useState<KeyboardDataType>({
    type: '풀 배열',
    texture: '금속',
    boardColor: '#ffffff',
    switchType: null,
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeySetColor: '#ffffff',
    price: 70000,
    option: null,
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
