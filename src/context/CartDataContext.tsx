'use client';

import { useState, useMemo, useCallback, createContext, PropsWithChildren, useEffect } from 'react';
import type { CustomDataType, ShopDataType } from '@/types/CartTypes';

interface CartDataContextType {
  customData: CustomDataType[];
  shopData: ShopDataType[];
  checkedCustomList: Record<string, boolean>;
  checkedShopList: Record<string, boolean>;
  updateAllCheckedCustom: (value: boolean) => void;
  updateAllCheckedShop: (value: boolean) => void;
  updateCheckedCustom: (id: string) => void;
  updateCheckedShop: (id: string) => void;
}

export const CartDataContext = createContext<CartDataContextType>({
  customData: [],
  shopData: [],
  checkedCustomList: {},
  checkedShopList: {},
  updateAllCheckedCustom: () => {},
  updateAllCheckedShop: () => {},
  updateCheckedCustom: () => {},
  updateCheckedShop: () => {},
});

export function CartDataContextProvider({ children }: PropsWithChildren) {
  const [customData, setCustomData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [checkedCustomList, setCheckedCustomList] = useState<Record<string, boolean>>({});
  const [checkedShopList, setCheckedShopList] = useState<Record<string, boolean>>({});

  useEffect(() => {
    /* get api */
    setCustomData([]);
    setShopData([]);
    setCheckedCustomList({ 1: false, 2: true, 3: false, 4: false });
    setCheckedShopList({ 5: true, 6: false, 7: true, 8: false });
  }, []);

  const updateAllCheckedCustom = useCallback((value: boolean) => {
    setCheckedCustomList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateAllCheckedShop = useCallback((value: boolean) => {
    setCheckedShopList((prev) => Object.fromEntries(Object.entries(prev).map((element) => [element[0], value])));
  }, []);

  const updateCheckedCustom = useCallback((id: string) => {
    setCheckedCustomList((prev) => ({ ...prev, [id]: !prev.id }));
  }, []);

  const updateCheckedShop = useCallback((id: string) => {
    setCheckedShopList((prev) => ({ ...prev, [id]: !prev.id }));
  }, []);

  const value = useMemo(
    () => ({
      customData,
      shopData,
      checkedCustomList,
      checkedShopList,
      updateAllCheckedCustom,
      updateAllCheckedShop,
      updateCheckedCustom,
      updateCheckedShop,
    }),
    [
      customData,
      shopData,
      checkedCustomList,
      checkedShopList,
      updateAllCheckedCustom,
      updateAllCheckedShop,
      updateCheckedCustom,
      updateCheckedShop,
    ],
  );

  return <CartDataContext.Provider value={value}>{children}</CartDataContext.Provider>;
}
