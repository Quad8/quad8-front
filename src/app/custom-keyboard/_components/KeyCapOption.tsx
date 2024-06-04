'use client';

import classNames from 'classnames/bind';
import { HexColorPicker } from 'react-colorful';
import { useCallback, useContext, useState } from 'react';
import { KeyColorContext, KeyboardDataContext } from '@/context/customKeyboardContext';
import styles from './KeyCapOption.module.scss';
import ColorTag from './ColorTag';

const cn = classNames.bind(styles);

export default function KeyCapOption() {
  const {
    keyboardData: { baseKeyColor, hasPointKeyCap, pointKeyType, individualColor, pointKeyColor },
    updateData,
    updateIndividualColor,
    deleteIndividualColor,
  } = useContext(KeyboardDataContext);
  const { focusKey, updateFocusKey } = useContext(KeyColorContext);
  const [colorList, setColorList] = useState(Object.keys(individualColor).map((key) => [key, individualColor[key]]));

  const handleChangeBaseColor = (value: string) => {
    updateData('baseKeyColor', value);
  };

  const handleClickPointKeyCapButton = (value: boolean) => {
    updateData('hasPointKeyCap', value);
    updateFocusKey(null);
    updateData('pointKeyColor', baseKeyColor);
    if (value) {
      updateData('pointKeyColor', baseKeyColor);
    }
    setColorList([]);
  };

  const handleChangePointColor = (value: string) => {
    if (pointKeyType === '세트 구성') {
      updateData('pointKeyColor', value);
    } else if (focusKey) {
      updateIndividualColor({ [focusKey]: value });
    }

    if (focusKey) {
      if (individualColor[focusKey]) {
        setColorList((prev) => {
          const data = prev.filter((color) => color[0] !== focusKey);
          return [...data, [focusKey, value]];
        });
      } else {
        setColorList((prev) => [...prev, [focusKey, value]]);
      }
    }
    updateData('pointKeyColor', value);
  };

  const handleClickSetPoint = () => {
    updateData('individualColor', {});
    updateData('pointKeyType', '세트 구성');
    updateData('pointKeyColor', baseKeyColor);
    updateFocusKey(null);
    setColorList([]);
  };

  const handleClickSelfPoint = () => {
    updateData('pointKeyType', '내 맘대로 바꾸기');
    updateData('pointKeyColor', baseKeyColor);
  };

  const handleClickDeleteTag = useCallback(
    (key: string) => {
      setColorList((prev) => prev.filter((element) => element[0] !== key));
      deleteIndividualColor(key);
      if (focusKey === key) {
        updateFocusKey(null);
      }
    },
    [deleteIndividualColor, focusKey, updateFocusKey],
  );

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
          <HexColorPicker color={pointKeyColor} onChange={handleChangePointColor} />
          <div className={cn('tag-wrapper')}>
            {colorList.map(([key, color]) => (
              <ColorTag key={key} keyCap={key} color={color} onClose={() => handleClickDeleteTag(key)} />
            ))}
          </div>
        </div>
      )}
      {hasPointKeyCap && pointKeyType === '내 맘대로 바꾸기' && !focusKey && <div className={cn('disabled')} />}
    </div>
  );
}
