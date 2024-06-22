'use client';

import { useState, useMemo, useCallback, createContext, PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCartData } from '@/api/cartAPI';
import type { CartAPIDataType } from '@/types/CartTypes';

interface CartDataContextType {
  checkedCustomList: Record<string, boolean>;
  checkedShopList: Record<string, boolean>;
  updateCheckedAllCustom: (value: boolean) => void;
  updateCheckedAllShop: (value: boolean) => void;
  updateCheckedCustom: (id: number) => void;
  updateCheckedShop: (id: number) => void;
}

export const CartDataContext = createContext<CartDataContextType>({
  checkedCustomList: {},
  checkedShopList: {},
  updateCheckedAllCustom: () => {},
  updateCheckedAllShop: () => {},
  updateCheckedCustom: () => {},
  updateCheckedShop: () => {},
});

export function CartDataContextProvider({ children }: PropsWithChildren) {
  const { data, isSuccess } = useQuery({ queryKey: ['cartData'], queryFn: getCartData }) as {
    data: CartAPIDataType;
    isSuccess: boolean;
  };
  const [checkedCustomList, setCheckedCustomList] = useState<Record<string, boolean>>(
    Object.fromEntries((isSuccess ? data.CUSTOM : []).map((element) => [element.id, false])),
  );
  const [checkedShopList, setCheckedShopList] = useState<Record<string, boolean>>(
    Object.fromEntries((isSuccess ? data.SHOP : []).map((element) => [element.id, false])),
  );

  useEffect(() => {
    const customData = isSuccess ? data.CUSTOM : [];
    const shopData = isSuccess ? data.SHOP : [];

    setCheckedCustomList(Object.fromEntries(customData.map((element) => [element.id, false])));
    setCheckedShopList(Object.fromEntries(shopData.map((element) => [element.id, false])));
  }, [isSuccess, data]);

  const updateCheckedAllCustom = useCallback((value: boolean) => {
    setCheckedCustomList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateCheckedAllShop = useCallback((value: boolean) => {
    setCheckedShopList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateCheckedCustom = useCallback((id: number) => {
    setCheckedCustomList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
  }, []);

  const updateCheckedShop = useCallback((id: number) => {
    setCheckedShopList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
  }, []);

  const value = useMemo(
    () => ({
      checkedCustomList,
      checkedShopList,
      updateCheckedAllCustom,
      updateCheckedAllShop,
      updateCheckedCustom,
      updateCheckedShop,
    }),
    [
      checkedCustomList,
      checkedShopList,
      updateCheckedAllCustom,
      updateCheckedAllShop,
      updateCheckedCustom,
      updateCheckedShop,
    ],
  );

  return <CartDataContext.Provider value={value}>{children}</CartDataContext.Provider>;
}
