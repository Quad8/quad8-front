'use client';

import { useState, useCallback, useMemo, createContext, PropsWithChildren, useEffect } from 'react';
import type { Color } from '@react-three/fiber';
import type { KeyboardDataType, CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import type { CustomDataType } from '@/types/CartTypes';

interface KeyboardDataContextType {
  orderId: number | null;
  keyboardData: KeyboardDataType;
  updateData: (key: keyof KeyboardDataType, value: KeyboardDataType[keyof KeyboardDataType]) => void;
  updateIndividualColor: (value: Partial<Record<CustomKeyboardKeyTypes, Color>>) => void;
  deleteIndividualColor: (key: CustomKeyboardKeyTypes) => void;
  updatePrice: (value: number) => void;
  deleteOption: (id: number) => void;
}

export const KeyboardDataContext = createContext<KeyboardDataContextType>({
  orderId: null,
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
  const [orderId, setOrderId] = useState<number | null>(null);
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

  useEffect(() => {
    const data = localStorage.getItem('customData');
    if (!data) {
      return;
    }
    localStorage.removeItem('customData');
    const customData = JSON.parse(data) as CustomDataType;
    setOrderId(customData.id);
    setKeyboardData({
      type: customData.type === 'full' ? '풀 배열' : '텐키리스',
      texture: customData.texture === 'metal' ? '금속' : '플라스틱',
      boardColor: customData.boardColor,
      switchType: customData.switchType,
      baseKeyColor: customData.baseKeyColor,
      hasPointKeyCap: customData.hasPointKeyCap,
      pointKeyType: customData.pointKeyType ?? '세트 구성',
      pointKeySetColor: customData.pointSetColor ?? customData.baseKeyColor,
      price: customData.price,
      option: [],
      individualColor: customData.individualColor,
    });
  }, []);

  const value = useMemo(
    () => ({
      orderId,
      keyboardData,
      updateData,
      updateIndividualColor,
      deleteIndividualColor,
      updatePrice,
      deleteOption,
    }),
    [orderId, keyboardData, updateData, updateIndividualColor, deleteIndividualColor, updatePrice, deleteOption],
  );

  return <KeyboardDataContext.Provider value={value}>{children}</KeyboardDataContext.Provider>;
}
