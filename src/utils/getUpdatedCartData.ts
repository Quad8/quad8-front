import { CartAPIDataType, ShopDataType } from '@/types/cartType';

export const getUpdatedCartCountData = (cartData: CartAPIDataType | null, shopData: ShopDataType[]) => {
  const cartShopDataId = cartData?.SHOP.map((shop) => shop.productId) ?? [];
  const newShopData = shopData.filter((newData) => !cartShopDataId.includes(newData.productId));

  const newData: CartAPIDataType = {
    totalCount: (cartData?.totalCount ?? 0) + newShopData.length,
    SHOP: [...(cartData?.SHOP ?? []), ...newShopData],
    CUSTOM: cartData?.CUSTOM ?? [],
  };

  return newData;
};
