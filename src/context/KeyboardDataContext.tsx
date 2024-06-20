'use client';

import { useState, useCallback, useMemo, createContext, PropsWithChildren } from 'react';
import type { Color } from '@react-three/fiber';
import type { KeyboardDataType, CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';

interface KeyboardDataContextType {
  keyboardData: KeyboardDataType;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
  updateIndividualColor: (value: Partial<Record<CustomKeyboardKeyTypes, Color>>) => void;
  deleteIndividualColor: (key: CustomKeyboardKeyTypes) => void;
  updatePrice: (value: number) => void;
  deleteOption: (id: number) => void;
}

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  keyboardData: {
    type: '풀 배열',
    texture: '금속',
    boardColor: '#ffffff',
    switchType: '청축',
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeySetColor: '#ffffff',
    price: 0,
    option: [],
    individualColor: {},
  },
  updateData: () => {},
  updateIndividualColor: () => {},
  deleteIndividualColor: () => {},
  updatePrice: () => {},
  deleteOption: () => {},
});

export function KeyboardDataContextProvider({ children }: PropsWithChildren) {
  const [keyboardData, setKeyboardData] = useState<KeyboardDataType>({
    type: '풀 배열',
    texture: '금속',
    boardColor: '#ffffff',
    switchType: '청축',
    baseKeyColor: '#ffffff',
    hasPointKeyCap: false,
    pointKeyType: '세트 구성',
    pointKeySetColor: '#ffffff',
    price: 70000,
    option: [],
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

  const deleteOption = useCallback((id: number) => {
    setKeyboardData((prev) => ({ ...prev, option: [...prev.option.filter((element) => element !== id)] }));
  }, []);

  const value = useMemo(
    () => ({ keyboardData, updateData, updateIndividualColor, deleteIndividualColor, updatePrice, deleteOption }),
    [keyboardData, updateData, updateIndividualColor, deleteIndividualColor, updatePrice, deleteOption],
  );

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}
