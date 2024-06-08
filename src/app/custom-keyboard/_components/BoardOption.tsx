'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';
import { KeyboardDataContext } from '@/context/customKeyboardContext';
import { HexColorPicker } from 'react-colorful';
import { CustomKeyboardTypeTypes, CustomKeyboardTextureTypes } from '@/types/CustomKeyboardTypes';
import styles from './BoardOption.module.scss';

const cn = classNames.bind(styles);

const TYPE_BUTTONS = [
  { type: 'full', name: '풀 배열', price: 35000 },
  { type: 'tkl', name: '텐키리스', price: 30000 },
];

const TEXTURE_BUTTONS = [
  { texture: 'metal', name: '금속', price: 35000 },
  { texture: 'plastic', name: '플라스틱', price: 30000 },
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
            <button
              key={element.name}
              type='button'
              className={cn('button', { selected: type === element.type })}
              onClick={() => handleClickTypeButton(element.type as CustomKeyboardTypeTypes)}
            >
              <div className={cn('button-content')}>{element.name}</div>
              <div className={cn('button-price')}>+{element.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>외관 재질</div>
        <div className={cn('button-wrapper')}>
          {TEXTURE_BUTTONS.map((element) => (
            <button
              key={element.name}
              type='button'
              className={cn('button', { selected: texture === element.texture })}
              onClick={() => handleClickTextureButton(element.texture as CustomKeyboardTextureTypes)}
            >
              <div className={cn('button-content')}>{element.name}</div>
              <div className={cn('button-price')}>+{element.price.toLocaleString()}</div>
            </button>
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
