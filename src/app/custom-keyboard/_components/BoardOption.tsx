'use client';

import classNames from 'classnames/bind';
import { useContext } from 'react';
import { KeyboardDataContext } from '@/context/customKeyboardContext';
import { HexColorPicker } from 'react-colorful';
import styles from './BoardOption.module.scss';

const cn = classNames.bind(styles);

export default function BoardOption() {
  const {
    keyboardData: { type, texture, boardColor, price },
    updateData,
  } = useContext(KeyboardDataContext);

  const handleClickTypeButton = (value: 'full' | 'tkl') => {
    if (type === 'full' && value === 'tkl') {
      updateData('price', price - 5000);
    } else if (type === 'tkl' && value === 'full') {
      updateData('price', price + 5000);
    }
    updateData('type', value);
  };

  const handleClickTextureButton = (value: 'metal' | 'plastic') => {
    if (texture === 'metal' && value === 'plastic') {
      updateData('price', price - 5000);
    } else if (texture === 'plastic' && value === 'metal') {
      updateData('price', price + 5000);
    }
    updateData('texture', value);
  };

  const handleChnageColor = (value: string) => {
    updateData('boardColor', value);
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>배열</div>
        <div className={cn('button-wrapper')}>
          <button
            type='button'
            className={cn('button', { selected: type === 'full' })}
            onClick={() => handleClickTypeButton('full')}
          >
            <div className={cn('button-content')}>풀 배열</div>
            <div className={cn('button-price')}>+35,000</div>
          </button>
          <button
            type='button'
            className={cn('button', { selected: type === 'tkl' })}
            onClick={() => handleClickTypeButton('tkl')}
          >
            <div className={cn('button-content')}>텐키리스</div>
            <div className={cn('button-price')}>+30,000</div>
          </button>
        </div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>외관 재질</div>
        <div className={cn('button-wrapper')}>
          <button
            type='button'
            className={cn('button', { selected: texture === 'metal' })}
            onClick={() => handleClickTextureButton('metal')}
          >
            <div className={cn('button-content')}>금속</div>
            <div className={cn('button-price')}>+35,000</div>
          </button>
          <button
            type='button'
            className={cn('button', { selected: texture === 'plastic' })}
            onClick={() => handleClickTextureButton('plastic')}
          >
            <div className={cn('button-content')}>플라스틱</div>
            <div className={cn('button-price')}>+30,000</div>
          </button>
        </div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('title')}>외관 색</div>
        <div className={cn('color-wrapper')}>
          <HexColorPicker className={cn('react-colorful')} color={boardColor} onChange={(c) => handleChnageColor(c)} />
        </div>
      </div>
    </div>
  );
}
