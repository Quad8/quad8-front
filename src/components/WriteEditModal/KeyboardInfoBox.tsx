import React from 'react';

import classNames from 'classnames/bind';
import { CustomKeyboardTypes } from '@/types/CustomKeyboardTypes';
import styles from './KeyboardInfoBox.module.scss';

interface KeyboardInfoBoxProps {
  keyboardInfo: CustomKeyboardTypes;
  isReview?: boolean;
}

export default function KeyboardInfoBox({ keyboardInfo, isReview }: KeyboardInfoBoxProps) {
  const cn = classNames.bind(styles);
  const {
    layout,
    appearance_texture: appearanceTexture,
    appearance_color: appearanceColor,
    switch: keyboardSwitch,
    has_point_key: hasPointKey,
    keycap_color: keycapColor,
  } = keyboardInfo;
  const optionString = `${layout} 
                        / ${appearanceTexture} 
                        / ${appearanceColor} 
                        / ${keyboardSwitch} 
                        / 포인트 키캡 ${hasPointKey ? 'o' : 'x'}
                      `;
  let keycapColors = '';

  Object.entries(keycapColor).forEach(([key, val]) => {
    keycapColors += `${key}: ${val}`;
  });

  return (
    <div>
      {isReview && <p className={cn('sub-text')}>해당 후기는 커뮤니티란에 게시됩니다.</p>}
      <div className={styles.container}>
        <div className={cn('keyboard-image-div')} />
        <div className={cn('keyboard-info-text-div')}>
          <h3 id={cn('title')}>키득 커스텀 기보드</h3>
          <h3 id={cn('products-list')}>키득 베어본, 키득 스위치, 키득 키캡</h3>
          <div className={cn('options-div')}>
            {optionString}
            <div className={cn('keycap-color-div')}>{keycapColors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
