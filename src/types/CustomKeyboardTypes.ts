import { Color } from '@react-three/fiber';
import { TEN_KEY, KEY } from '@/constants/keyboardData';

export interface CustomKeyboardTypes {
  id: number;
  order_items_id: number;
  layout: string;
  appearance_texture: string;
  appearance_color: string;
  switch: string;
  has_point_key: boolean;
  point_key_cnt: number;
  img_url: string;
  keycap_color: Record<string, string>;
}

export type CustomKeyboardStepStatusTypes = 'pending' | 'current' | 'completed';
export type CustomKeyboardStepTypes = 'board' | 'switch' | 'keyCap';
export type CustomKeyboardKeyTypes = (typeof KEY)[number] | (typeof TEN_KEY)[number];
export type CustomKeyboardTypeTypes = '풀 배열' | '텐키리스';
export type CustomKeyboardTextureTypes = '금속' | '플라스틱';
export type CustomKeyboardSwitchTypes = '청축' | '적축' | '갈축' | '흑축';
export type CustomKeyboardPointKeyType = '내 맘대로 바꾸기' | '세트 구성';

export interface OptionDataType {
  id: number;
  name: string;
  categoryName: string;
  price: number;
  thumbnail: string;
  blurImage: string;
}

export interface KeyboardDataType {
  type: CustomKeyboardTypeTypes;
  texture: CustomKeyboardTextureTypes;
  boardColor: Color;
  switchType: CustomKeyboardSwitchTypes;
  baseKeyColor: Color;
  hasPointKeyCap: boolean;
  pointKeyType: CustomKeyboardPointKeyType;
  pointKeySetColor: Color;
  price: number;
  option: number[];
  individualColor: Partial<Record<CustomKeyboardKeyTypes, Color>>;
}

export interface CustomKeyboardAPITypes
  extends Omit<KeyboardDataType, 'type' | 'texture' | 'pointKeyType' | 'pointKeySetColor'> {
  type: string;
  texture: string;
  pointKeyType: CustomKeyboardPointKeyType | null;
  pointSetColor: string | null;
  imgBase64: string;
}
