import { Color } from '@react-three/fiber';
import classNames from 'classnames/bind';
import { RefObject } from 'react';

import type {
  CustomKeyboardSwitchTypes,
  CustomKeyboardTextureTypes,
  CustomKeyboardTypeTypes,
} from '@/types/customKeyboardType';
import { getColorUpperCase } from '@/utils/getColorUpperCase';
import OptionWrapper from './OptionWrapper';

import styles from './CustomOption.module.scss';

const cn = classNames.bind(styles);

interface FirstOptionProps {
  wrapperRef?: RefObject<HTMLDivElement>;
  boardType: CustomKeyboardTypeTypes;
  texture: CustomKeyboardTextureTypes;
  boardColor: string | Color;
  customSwitch: CustomKeyboardSwitchTypes;
  baseKeyColor: string | Color;
  hasPointKeyCap: boolean;
}

export default function FirstOption({
  wrapperRef,
  boardType,
  texture,
  boardColor,
  customSwitch,
  baseKeyColor,
  hasPointKeyCap,
}: FirstOptionProps) {
  const optionText = `키득 베어본 - ${boardType}/${texture}/${getColorUpperCase(boardColor)}, 키득 스위치 - ${customSwitch}, 키득 키캡 - ${getColorUpperCase(baseKeyColor)}/포인트 키캡${hasPointKeyCap ? 'O' : 'X'}`;
  return (
    <OptionWrapper wrapperRef={wrapperRef} optionText={optionText}>
      <div className={cn('tooltip')}>{optionText}</div>
    </OptionWrapper>
  );
}
