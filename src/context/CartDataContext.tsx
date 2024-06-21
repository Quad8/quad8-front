'use client';

import { useState, useMemo, useCallback, createContext, PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCartData } from '@/api/cartAPI';
import type { CartAPIDataType } from '@/types/CartTypes';

interface CartDataContextType {
  checkedCustomList: Record<string, boolean>;
  checkedShopList: Record<string, boolean>;
  updateAllCheckedCustom: (value: boolean) => void;
  updateAllCheckedShop: (value: boolean) => void;
  updateCheckedCustom: (id: number) => void;
  updateCheckedShop: (id: number) => void;
  deleteCheckedData: (customId: string[], shopId: string[]) => void;
}

export const CartDataContext = createContext<CartDataContextType>({
  checkedCustomList: {},
  checkedShopList: {},
  updateAllCheckedCustom: () => {},
  updateAllCheckedShop: () => {},
  updateCheckedCustom: () => {},
  updateCheckedShop: () => {},
  deleteCheckedData: () => {},
});

export function CartDataContextProvider({ children }: PropsWithChildren) {
  const [checkedCustomList, setCheckedCustomList] = useState<Record<string, boolean>>({});
  const [checkedShopList, setCheckedShopList] = useState<Record<string, boolean>>({});
  const { data, isSuccess } = useQuery({ queryKey: ['cartData'], queryFn: getCartData }) as {
    data: CartAPIDataType;
    isSuccess: boolean;
  };
  useEffect(() => {
    const customData = isSuccess ? data.CUSTOM : [];
    const shopData = isSuccess ? data.SHOP : [];

    setCheckedCustomList(Object.fromEntries(customData.map((element) => [element.id, false])));
    setCheckedShopList(Object.fromEntries(shopData.map((element) => [element.id, false])));
  }, [isSuccess, data]);

  const updateAllCheckedCustom = useCallback((value: boolean) => {
    setCheckedCustomList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateAllCheckedShop = useCallback((value: boolean) => {
    setCheckedShopList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateCheckedCustom = useCallback((id: number) => {
    setCheckedCustomList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
  }, []);

  const updateCheckedShop = useCallback((id: number) => {
    setCheckedShopList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
  }, []);

  useEffect(() => {}, []);

  const deleteCheckedData = useCallback((checkedCustomIdList: string[], checkedShopIdList: string[]) => {
    setCheckedCustomList((prev) => {
      const newValue = { ...prev };
      checkedCustomIdList.forEach((id) => {
        delete newValue[id];
      });
      return newValue;
    });
    setCheckedShopList((prev) => {
      const newValue = { ...prev };
      checkedShopIdList.forEach((id) => {
        delete newValue[id];
      });
      return newValue;
    });
  }, []);

  const value = useMemo(
    () => ({
      checkedCustomList,
      checkedShopList,
      updateAllCheckedCustom,
      updateAllCheckedShop,
      updateCheckedCustom,
      updateCheckedShop,
      deleteCheckedData,
    }),
    [
      checkedCustomList,
      checkedShopList,
      updateAllCheckedCustom,
      updateAllCheckedShop,
      updateCheckedCustom,
      updateCheckedShop,
      deleteCheckedData,
    ],
  );

  return <CartDataContext.Provider value={value}>{children}</CartDataContext.Provider>;
}
