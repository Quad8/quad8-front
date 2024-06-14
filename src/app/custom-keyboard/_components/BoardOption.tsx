'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';
import { KeyboardDataContext } from '@/context/customKeyboardContext';
import { HexColorPicker } from 'react-colorful';
import type { CustomKeyboardTypeTypes, CustomKeyboardTextureTypes } from '@/types/CustomKeyboardTypes';
import { Button } from '@/components';
import styles from './BoardOption.module.scss';

const cn = classNames.bind(styles);

const TYPE_BUTTONS = [
  { name: '풀 배열', price: 35000 },
  { name: '텐키리스', price: 30000 },
];

const TEXTURE_BUTTONS = [
  { name: '금속', price: 35000 },
  { name: '플라스틱', price: 30000 },
];

export default function BoardOption() {
  const {
    keyboardData: { type, texture, boardColor },
    updateData,
  } = useContext(KeyboardDataContext);

  const handleClickTypeButton = (value: CustomKeyboardTypeTypes) => {
    updateData('type', value);
  };

  const handleClickTextureButton = (value: CustomKeyboardTextureTypes) => {
    updateData('texture', value);
  };

  const handleChangeColor = (value: string) => {
    updateData('boardColor', value);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>배열</div>
        <div className={cn('button-wrapper')}>
          {TYPE_BUTTONS.map((element) => (
            <Button
              key={element.name}
              radius={4}
              backgroundColor={type === element.name ? 'background-primary' : 'outline-gray-40'}
              className={cn('button', { selected: type === element.name })}
              onClick={() => handleClickTypeButton(element.name as CustomKeyboardTypeTypes)}
            >
              <div className={cn('button-content')}>{element.name}</div>
              <div className={cn('button-price')}>+{element.price.toLocaleString()}</div>
            </Button>
          ))}
        </div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>외관 재질</div>
        <div className={cn('button-wrapper')}>
          {TEXTURE_BUTTONS.map((element) => (
            <Button
              key={element.name}
              radius={4}
              backgroundColor={texture === element.name ? 'background-primary' : 'outline-gray-40'}
              className={cn('button', { selected: texture === element.name })}
              onClick={() => handleClickTextureButton(element.name as CustomKeyboardTextureTypes)}
            >
              <div className={cn('button-content')}>{element.name}</div>
              <div className={cn('button-price')}>+{element.price.toLocaleString()}</div>
            </Button>
          ))}
        </div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>외관 색</div>
        <div className={cn('color-wrapper')}>
          <HexColorPicker className={cn('react-colorful')} color={boardColor as string} onChange={handleChangeColor} />
        </div>
      </div>
    </div>
  );
}
