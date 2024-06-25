'use client';

import classNames from 'classnames/bind';
import { HexColorPicker } from 'react-colorful';
import { useContext, useState } from 'react';
import { Color } from '@react-three/fiber';

import { FocusKeyContext, KeyboardDataContext } from '@/context';
import type { CustomKeyboardKeyTypes, CustomKeyboardPointKeyType } from '@/types/CustomKeyboardTypes';
import { Button } from '@/components';
import ColorTag from './parts/ColorTag';

import styles from './KeyCapOption.module.scss';

const cn = classNames.bind(styles);

interface HelpContentType {
  content: string;
  cost: string;
}

const HELP_CONTENT: Record<CustomKeyboardPointKeyType, HelpContentType> = {
  '세트 구성': { content: 'W, A, S, D, 방향키, Esc, Enter, Space Bar', cost: '(+5,500원의 추가요금이 있습니다)' },
  '내 맘대로 바꾸기': {
    content: '원하는 색상으로 바꾸고 싶은 키를 선택해주세요',
    cost: '(개당 +500원의 추가요금이 있습니다)',
  },
};

export default function KeyCapOption() {
  const {
    keyboardData: { baseKeyColor, hasPointKeyCap, pointKeyType, individualColor, pointKeySetColor },
    updateData,
    updateIndividualColor,
    deleteIndividualColor,
  } = useContext(KeyboardDataContext);
  const { focusKey, currentPointKeyColor, updateFocusKey, updateCurrentPointKeyColor } = useContext(FocusKeyContext);
  const [colorList, setColorList] = useState<[CustomKeyboardKeyTypes, Color][]>(
    Object.entries(individualColor) as [CustomKeyboardKeyTypes, Color][],
  );

  const handleChangeBaseColor = (value: Color) => {
    updateData('baseKeyColor', value);
    if (focusKey) {
      updateFocusKey(null);
    }
  };

  const handleClickPointKeyCapButton = (value: boolean) => {
    updateData('hasPointKeyCap', value);
    updateFocusKey(null);
    if (value) {
      updateCurrentPointKeyColor(pointKeyType === '세트 구성' ? pointKeySetColor : baseKeyColor);
    }
  };

  const handleChangePointColor = (value: Color) => {
    updateCurrentPointKeyColor(value);
    if (pointKeyType === '세트 구성') {
      updateData('pointKeySetColor', value);
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
    updateCurrentPointKeyColor(pointKeySetColor);
  };

  const handleClickSelfPoint = () => {
    updateData('pointKeyType', '내 맘대로 바꾸기');
    updateCurrentPointKeyColor(baseKeyColor);
  };

  const handleClickDeleteTag = (key: CustomKeyboardKeyTypes) => {
    setColorList((prev) => prev.filter((element) => element[0] !== key));
    deleteIndividualColor(key);
    if (focusKey === key) {
      updateFocusKey(null);
    }
  };
  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>키캡</div>
        <HexColorPicker color={baseKeyColor as string} onChange={handleChangeBaseColor} />
      </div>
      <div className={cn('button-wrapper')}>
        <Button
          width={199}
          radius={4}
          backgroundColor={!hasPointKeyCap ? 'background-primary' : 'outline-gray-40'}
          className={cn('button', { selected: !hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(false)}
          hoverColor='background-primary-60'
        >
          포인트 키캡 없음
        </Button>
        <Button
          radius={4}
          width={199}
          backgroundColor={hasPointKeyCap ? 'background-primary' : 'outline-gray-40'}
          className={cn('button', { selected: hasPointKeyCap })}
          onClick={() => handleClickPointKeyCapButton(true)}
          hoverColor='background-primary-60'
        >
          포인트 키캡 추가
        </Button>
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
          <HexColorPicker color={currentPointKeyColor as string} onChange={handleChangePointColor} />
          <div className={cn('help-wrapper')}>
            <div className={cn('help-title')}>{pointKeyType}</div>
            <div className={cn('help-content')}>{HELP_CONTENT[pointKeyType].content}</div>
            <div className={cn('help-cost')}>{HELP_CONTENT[pointKeyType].cost}</div>
          </div>
          {pointKeyType === '내 맘대로 바꾸기' && (
            <div className={cn('tag-wrapper')}>
              {colorList.map(([key, color]) => (
                <ColorTag key={key} keyCap={key} color={color} onDelete={() => handleClickDeleteTag(key)} />
              ))}
            </div>
          )}
        </div>
      )}
      {hasPointKeyCap && pointKeyType === '내 맘대로 바꾸기' && !focusKey && <div className={cn('disabled')} />}
    </div>
  );
}
