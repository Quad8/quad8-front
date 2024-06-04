'use client';

import classNames from 'classnames/bind';
import { HexColorPicker } from 'react-colorful';
import { useContext, useState } from 'react';
import { KeyColorContext, KeyboardDataContext } from '@/context/customKeyboardContext';
import { KEY, TEN_KEY } from '@/constants/keyboardData';
import styles from './KeyCapOption.module.scss';

const cn = classNames.bind(styles);

export default function KeyCapOption() {
  const {
    keyboardData: { type, baseKeyColor, hasPointKeyCap, pointKeyType, individualColor },
    updateData,
  } = useContext(KeyboardDataContext);
  const { updateKeyColor } = useContext(KeyColorContext);

  const POINT_SET = pointKeyType === '세트 구성' ? ['W', 'A', 'S', 'D'] : Object.keys(individualColor);

  const [pointColor, setPointColor] = useState(baseKeyColor);

  const handleChangeBaseColor = (value: string) => {
    updateData('baseKeyColor', value);

    const newColor: { [key: string]: string } = {};
    const currentKey = type === 'full' ? [...KEY, ...TEN_KEY] : [...KEY, ...TEN_KEY];

    if (hasPointKeyCap) {
      currentKey.forEach((key) => {
        if (!POINT_SET.includes(key)) {
          Object.assign(newColor, { [key]: value });
        }
      });
    } else {
      currentKey.forEach((key) => {
        Object.assign(newColor, { [key]: value });
      });
    }
    updateKeyColor(newColor);
  };

  const handleClickPointKeyCapButton = (value: boolean) => {
    updateData('hasPointKeyCap', value);
    setPointColor(baseKeyColor);
  };
  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>키캡</div>
        <HexColorPicker color={baseKeyColor} onChange={handleChangeBaseColor} />
      </div>
      <div className={cn('button-wrapper')}>
        <button
          type='button'
          className={cn('button', { selected: hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(true)}
        >
          <div>포인트 키캡 추가</div>
        </button>
        <button
          type='button'
          className={cn('button', { selected: !hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(false)}
        >
          <div className={cn('button-content')}>포인트 키캡 없음</div>
        </button>
      </div>
      {hasPointKeyCap && (
        <div className={cn('point-wrapper')}>
          <div className={cn('point-title-wrapper')}>
            <button
              type='button'
              className={cn({ choosed: pointKeyType === '세트 구성' })}
              onClick={() => updateData('pointKeyType', '세트 구성')}
            >
              세트 구성
            </button>
            <button
              type='button'
              className={cn({ choosed: pointKeyType === '내 맘대로 바꾸기' })}
              onClick={() => updateData('pointKeyType', '내 맘대로 바꾸기')}
            >
              내 맘대로 바꾸기
            </button>
          </div>
          <HexColorPicker color={pointColor} />
        </div>
      )}
    </div>
  );
}
