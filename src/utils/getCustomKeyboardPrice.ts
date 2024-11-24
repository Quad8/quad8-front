import { BOARD_PRICE_LIST } from '@/constants/keyboardData';
import { KeyboardDataType } from '@/types/customKeyboardType';

export const getCustomKeyboardPrice = ({
  type,
  texture,
  hasPointKeyCap,
  individualColor,
  pointKeyType,
}: Pick<KeyboardDataType, 'type' | 'texture' | 'hasPointKeyCap' | 'individualColor' | 'pointKeyType'>) => {
  const boardPrice = BOARD_PRICE_LIST[type] + BOARD_PRICE_LIST[texture];
  const keyCapPrice =
    Number(hasPointKeyCap) *
    (Object.keys(individualColor).length * 500 * Number(pointKeyType === '내 맘대로 바꾸기') +
      Number(pointKeyType === '세트 구성') * 5000);
  return { boardPrice, keyCapPrice };
};
