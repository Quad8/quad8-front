import type {
  CustomKeyboardPointKeyType,
  CustomKeyboardSwitchTypes,
  CustomKeyboardTextureTypes,
  CustomKeyboardTypeTypes,
  CustomKeyboardKeyTypes,
} from '@/types/CustomKeyboardTypes';

import { RefObject } from 'react';
import FirstOption from './FirstOption';
import SecondOption from './SecondOption';

interface CustomOptionProps {
  wrapperRef?: RefObject<HTMLDivElement> /* for positioning tooltip in scroll wrapper */;
  boardType: CustomKeyboardTypeTypes;
  texture: CustomKeyboardTextureTypes;
  boardColor: string /* color */;
  customSwitch: CustomKeyboardSwitchTypes;
  baseKeyColor: string /* color */;
  hasPointKeyCap: boolean;
  pointKeyType?: CustomKeyboardPointKeyType | null;
  pointSetColor?: string | null /* color */;
  individualColor?: Partial<Record<CustomKeyboardKeyTypes, string>> /* 키: 색상 객체 */;
}

export default function CustomOption({
  wrapperRef,
  boardType,
  texture,
  boardColor,
  customSwitch,
  baseKeyColor,
  hasPointKeyCap,
  pointKeyType,
  pointSetColor,
  individualColor,
}: CustomOptionProps) {
  return (
    <>
      <FirstOption
        wrapperRef={wrapperRef}
        boardType={boardType}
        texture={texture}
        boardColor={boardColor}
        customSwitch={customSwitch}
        baseKeyColor={baseKeyColor}
        hasPointKeyCap={hasPointKeyCap}
      />
      {pointKeyType && (
        <SecondOption
          wrapperRef={wrapperRef}
          pointKeyType={pointKeyType}
          pointSetColor={pointSetColor}
          individualColor={individualColor}
        />
      )}
    </>
  );
}
