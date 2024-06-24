import { RefObject } from 'react';
import classNames from 'classnames/bind';

import type { CustomKeyboardAPITypes } from '@/types/CustomKeyboardTypes';
import FirstOption from './FirstOption';
import SecondOption from './SecondOption';

import styles from './CustomOption.module.scss';

const cn = classNames.bind(styles);

interface CustomOptionProps {
  wrapperRef?: RefObject<HTMLDivElement> /* for positioning tooltip in scroll wrapper */;
  customData: Omit<CustomKeyboardAPITypes, 'imgBase64' | 'option' | 'price'>;
}

export default function CustomOption({ wrapperRef, customData }: CustomOptionProps) {
  const {
    texture,
    type: boardType,
    boardColor,
    switchType: customSwitch,
    baseKeyColor,
    hasPointKeyCap,
    pointKeyType,
    pointSetColor,
    individualColor,
  } = customData;
  return (
    <div className={cn('wrapper')}>
      <FirstOption
        wrapperRef={wrapperRef}
        boardType={boardType === 'full' ? '텐키리스' : '풀 배열'}
        texture={texture === 'metal' ? '금속' : '플라스틱'}
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
