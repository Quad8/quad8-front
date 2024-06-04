'use client';

import classNames from 'classnames/bind';
import { HexColorPicker } from 'react-colorful';
import { useContext, useEffect, useState } from 'react';
import { KeyColorContext, KeyboardDataContext } from '@/context/customKeyboardContext';
import styles from './KeyCapOption.module.scss';

const cn = classNames.bind(styles);

export default function KeyCapOption() {
  const {
    keyboardData: { baseKeyColor, hasPointKeyCap, pointKeyType, individualColor },
    updateData,
    updateIndividualColor,
  } = useContext(KeyboardDataContext);
  const { focusKey, updateFocusKey } = useContext(KeyColorContext);

  const [pointColor, setPointColor] = useState(baseKeyColor);

  const handleChangeBaseColor = (value: string) => {
    updateData('baseKeyColor', value);
  };

  const handleClickPointKeyCapButton = (value: boolean) => {
    updateData('hasPointKeyCap', value);
    updateFocusKey(null);
    setPointColor(baseKeyColor);
    if (value) {
      updateData('pointKeyColor', baseKeyColor);
    }
  };

  const handleChangePointColor = (value: string) => {
    if (pointKeyType === '세트 구성') {
      updateData('pointKeyColor', value);
    } else if (focusKey) {
      updateIndividualColor({ [focusKey]: value });
    }

    setPointColor(value);
  };

  const handleClickSetPoint = () => {
    updateData('individualColor', {});
    updateData('pointKeyType', '세트 구성');
    updateData('pointKeyColor', baseKeyColor);
    setPointColor(baseKeyColor);
    updateFocusKey(null);
  };

  const handleClickSelfPoint = () => {
    updateData('pointKeyType', '내 맘대로 바꾸기');
    setPointColor(baseKeyColor);
  };

  useEffect(() => {
    if (focusKey) {
      setPointColor(individualColor[focusKey] ?? baseKeyColor);
    }
  }, [focusKey, individualColor, baseKeyColor]);

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
              onClick={() => handleClickSetPoint()}
            >
              세트 구성
            </button>
            <button
              type='button'
              className={cn({ choosed: pointKeyType === '내 맘대로 바꾸기' })}
              onClick={() => handleClickSelfPoint()}
            >
              내 맘대로 바꾸기
            </button>
          </div>
          <HexColorPicker color={pointColor} onChange={handleChangePointColor} />
        </div>
      )}
    </div>
  );
}
