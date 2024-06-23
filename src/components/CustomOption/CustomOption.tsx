import { RefObject } from 'react';
import classNames from 'classnames/bind';

import type {
  CustomKeyboardPointKeyType,
  CustomKeyboardSwitchTypes,
  CustomKeyboardTextureTypes,
  CustomKeyboardTypeTypes,
  CustomKeyboardKeyTypes,
} from '@/types/CustomKeyboardTypes';
import FirstOption from './FirstOption';
import SecondOption from './SecondOption';

import styles from './CustomOption.module.scss';

const cn = classNames.bind(styles);

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
    <div className={cn('wrapper')}>
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
    </div>
  );
}