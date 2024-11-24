import type { CustomCardProps, ShopCardProps } from '@/types/cartType';

export const formatCartDataToItemOverview = (item: CustomCardProps | ShopCardProps) => {
  const { type, cardData } = item;
  if (type === 'custom') {
    const {
      id,
      imgUrl,
      individualColor,
      type: layout,
      texture,
      boardColor,
      baseKeyColor,
      switchType,
      hasPointKeyCap,
      pointKeyType,
      pointSetColor,
      price,
    } = cardData;
    return {
      productId: id,
      productImgUrl: imgUrl,
      productName: '커스텀 키보드',
      quantity: 1,
      switchOption: {
        individualColor: individualColor as Record<string, string>,
        customOption: {
          id,
          layout,
          appearanceTexture: texture,
          appearanceColor: boardColor as string,
          baseKeyColor: baseKeyColor as string,
          keyboardSwitch: switchType,
          hasPointKey: hasPointKeyCap,
          pointKeyType,
          pointSetColor,
          imgUrl,
          price,
        },
      },
    };
  }
  const { productId, thumbsnail, productTitle, count, optionName, category } = cardData;
  return {
    productId,
    productImgUrl: thumbsnail,
    productName: productTitle,
    quantity: count,
    switchOption: optionName ?? '',
    category,
  };
};
