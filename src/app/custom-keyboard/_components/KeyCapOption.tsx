'use client';

import classNames from 'classnames/bind';
import { HexColorPicker } from 'react-colorful';
import { useCallback, useContext, useEffect, useState } from 'react';
import { KeyColorContext, KeyboardDataContext } from '@/context/customKeyboardContext';
import { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import { Color } from '@react-three/fiber';
import styles from './KeyCapOption.module.scss';
import ColorTag from './ColorTag';

const cn = classNames.bind(styles);

const HELP_CONTENT = {
  '세트 구성': { content: 'W, A, S, D, 방향키, Esc, Enter, Space Bar', cost: '(+5,500원의 추가요금이 있습니다)' },
  '내 맘대로 바꾸기': {
    content: '원하는 색상으로 바꾸고 싶은 키를 선택해주세요',
    cost: '(개당 +500원의 추가요금이 있습니다)',
  },
};

export default function KeyCapOption() {
  const {
    keyboardData: { baseKeyColor, hasPointKeyCap, pointKeyType, individualColor, pointKeyColor },
    updateData,
    updateIndividualColor,
    deleteIndividualColor,
  } = useContext(KeyboardDataContext);
  const { focusKey, updateFocusKey } = useContext(KeyColorContext);
  const [pointColor, setPointColor] = useState(baseKeyColor);
  const [colorList, setColorList] = useState<[CustomKeyboardKeyTypes, Color][]>(
    Object.entries(individualColor).map(([key, value]) => [key as CustomKeyboardKeyTypes, value as Color]),
  );

  const handleChangeBaseColor = (value: Color) => {
    updateData('baseKeyColor', value);
  };

  const handleClickPointKeyCapButton = (value: boolean) => {
    updateData('hasPointKeyCap', value);
    updateFocusKey(null);
    if (value) {
      setPointColor(pointKeyType === '세트 구성' ? pointKeyColor : baseKeyColor);
    }
  };

  const handleChangePointColor = (value: Color) => {
    setPointColor(value);
    if (pointKeyType === '세트 구성') {
      updateData('pointKeyColor', value);
      return;
    }

    if (focusKey) {
      updateIndividualColor({ [focusKey]: value });
      setColorList((prev) => {
        if (individualColor[focusKey]) {
          const data = prev.filter((color) => color[0] !== focusKey);
          return [...data, [focusKey, value]];
        }
        return [...prev, [focusKey, value]];
      });
    }
  };

  const handleClickSetPoint = () => {
    updateData('pointKeyType', '세트 구성');
    updateFocusKey(null);
    setPointColor(pointKeyColor);
  };

  const handleClickSelfPoint = () => {
    updateData('pointKeyType', '내 맘대로 바꾸기');
    setPointColor(baseKeyColor);
  };

  const handleClickDeleteTag = useCallback(
    (key: CustomKeyboardKeyTypes) => {
      setColorList((prev) => prev.filter((element) => element[0] !== key));
      deleteIndividualColor(key);
      if (focusKey === key) {
        updateFocusKey(null);
      }
    },
    [deleteIndividualColor, focusKey, updateFocusKey],
  );

  useEffect(() => {
    if (focusKey) {
      setPointColor(individualColor[focusKey] as Color);
    }
  }, [focusKey, individualColor]);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>키캡</div>
        <HexColorPicker color={baseKeyColor as string} onChange={handleChangeBaseColor} />
      </div>
      <div className={cn('button-wrapper')}>
        <button
          type='button'
          className={cn('button', { selected: !hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(false)}
        >
          <div className={cn('button-content')}>포인트 키캡 없음</div>
        </button>
        <button
          type='button'
          className={cn('button', { selected: hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(true)}
        >
          <div>포인트 키캡 추가</div>
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
          <HexColorPicker color={pointColor as string} onChange={handleChangePointColor} />
          {pointKeyType === '내 맘대로 바꾸기' && (
            <div className={cn('tag-wrapper')}>
              {colorList.map(([key, color]) => (
                <ColorTag key={key} keyCap={key} color={color} onClose={() => handleClickDeleteTag(key)} />
              ))}
            </div>
          )}
          <div className={cn('help-wrapper')}>
            <div className={cn('help-title')}>{pointKeyType}</div>
            <div className={cn('help-content')}>{HELP_CONTENT[pointKeyType].content}</div>
            <div className={cn('help-cost')}>{HELP_CONTENT[pointKeyType].cost}</div>
          </div>
        </div>
      )}
      {hasPointKeyCap && pointKeyType === '내 맘대로 바꾸기' && !focusKey && <div className={cn('disabled')} />}
    </div>
  );
}
