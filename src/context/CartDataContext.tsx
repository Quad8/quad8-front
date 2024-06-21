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
  deleteCheckedData: (customId: string[], shopId: string[]) => void;
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
  deleteCheckedData: () => {},
});

export function CartDataContextProvider({ children }: PropsWithChildren) {
  const [customData, setCustomData] = useState<CustomDataType[]>([]);
  const [shopData, setShopData] = useState<ShopDataType[]>([]);
  const [checkedCustomList, setCheckedCustomList] = useState<Record<string, boolean>>({});
  const [checkedShopList, setCheckedShopList] = useState<Record<string, boolean>>({});

  useEffect(() => {
    /* get api */
    const getCustomData: CustomDataType[] = [
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
    ];
    const getShopData: ShopDataType[] = [
      {
        id: 5,
        productId: 5,
        optionId: 1,
        optionName: 'test1',
        price: 80000,
        productTitle: '테스트 키보드',
        thumbsnail:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        count: 1,
        classification: 'SHOP',
        category: 'keyboard',
      },
      {
        id: 6,
        productId: 6,
        optionId: 1,
        optionName: 'test2',
        price: 80000,
        productTitle: '테스트 키보드2',
        thumbsnail:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        count: 2,
        classification: 'SHOP',
        category: 'keyboard',
      },
      {
        id: 7,
        productId: 7,
        optionId: 1,
        optionName: 'testadfadfafadfaadaasf3',
        price: 80000,
        productTitle: '테스트 키보드3',
        thumbsnail:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        count: 3,
        classification: 'SHOP',
        category: 'keyboard',
      },
      {
        id: 8,
        productId: 8,
        optionId: null,
        optionName: null,
        price: 80000,
        productTitle: '테스트 키보드4',
        thumbsnail:
          'https://keyduek-image-file.s3.ap-northeast-2.amazonaws.com/keydeuk/product/custom714d6c48-3781-4081-8db0-7c68f742985b.png',
        count: 4,
        classification: 'SHOP',
        category: 'keyboard',
      },
    ];
    setCustomData(getCustomData);
    setShopData(getShopData);
    setCheckedCustomList(Object.fromEntries(getCustomData.map((data) => [data.id, false])));
    setCheckedShopList(Object.fromEntries(getShopData.map((data) => [data.id, false])));
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

  const deleteCheckedData = useCallback((checkedCustomIdList: string[], checkedShopIdList: string[]) => {
    setCustomData((prev) => prev.filter((data) => !checkedCustomIdList.includes(String(data.id))));
    setShopData((prev) => prev.filter((data) => !checkedShopIdList.includes(String(data.id))));
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
      customData,
      shopData,
      checkedCustomList,
      checkedShopList,
      updateAllCheckedCustom,
      updateAllCheckedShop,
      updateCheckedCustom,
      updateCheckedShop,
      deleteCheckedData,
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
      deleteCheckedData,
    ],
  );

  return <CartDataContext.Provider value={value}>{children}</CartDataContext.Provider>;
}
