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
  updateCheckedCustom: (id: number) => void;
  updateCheckedShop: (id: number) => void;
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
  const [customData, setCustomData] = useState<CustomDataType[]>([]);
  const [shopData, setShopData] = useState([]);
  const [checkedCustomList, setCheckedCustomList] = useState<Record<string, boolean>>({});
  const [checkedShopList, setCheckedShopList] = useState<Record<string, boolean>>({});

  useEffect(() => {
    /* get api */
    setCustomData([
      {
        baseKeyColor: '#ffffff',
        boardColor: '#ffffff',
        classification: 'CUSTOM',
        hasPointKeyCap: true,
        id: 1,
        imgUrl:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        individualColor: { 1: '#ffffff', Q: '#ffffff', T: '#ffffff' },
        pointKeyType: '내 맘대로 바꾸기',
        pointSetColor: '#ffffff',
        price: 60000,
        productId: 1000067,
        switchType: '적축',
        texture: 'metal',
        type: 'full',
      },
      {
        baseKeyColor: '#ffffff',
        boardColor: '#ffffff',
        classification: 'CUSTOM',
        hasPointKeyCap: true,
        id: 2,
        imgUrl:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        individualColor: { 1: '#ffffff', Q: '#ffffff', T: '#ffffff' },
        pointKeyType: '내 맘대로 바꾸기',
        pointSetColor: '#ffffff',
        price: 60000,
        productId: 1000067,
        switchType: '적축',
        texture: 'metal',
        type: 'full',
      },
      {
        baseKeyColor: '#ffffff',
        boardColor: '#ffffff',
        classification: 'CUSTOM',
        hasPointKeyCap: true,
        id: 3,
        imgUrl:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        individualColor: { 1: '#ffffff', Q: '#ffffff', T: '#ffffff' },
        pointKeyType: '내 맘대로 바꾸기',
        pointSetColor: '#ffffff',
        price: 60000,
        productId: 1000067,
        switchType: '적축',
        texture: 'metal',
        type: 'full',
      },
      {
        baseKeyColor: '#ffffff',
        boardColor: '#ffffff',
        classification: 'CUSTOM',
        hasPointKeyCap: true,
        id: 4,
        imgUrl:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        individualColor: { 1: '#ffffff', Q: '#ffffff', T: '#ffffff' },
        pointKeyType: '내 맘대로 바꾸기',
        pointSetColor: '#ffffff',
        price: 60000,
        productId: 1000067,
        switchType: '적축',
        texture: 'metal',
        type: 'full',
      },
    ]);
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

  const updateCheckedCustom = useCallback((id: number) => {
    setCheckedCustomList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
  }, []);

  const updateCheckedShop = useCallback((id: number) => {
    setCheckedShopList((prev) => ({ ...prev, [id]: !prev[String(id)] }));
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
