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
