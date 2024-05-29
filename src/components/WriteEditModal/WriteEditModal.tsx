import React from 'react';
import KEYBOARD_DATA from '@/app/mj/customData';
import classNames from 'classnames/bind';
import styles from './WriteEditModal.module.scss';
import KeyboardInfoBox from './KeyboardInfoBox';
import ImageInput from './ImageInput';

export default function WriteEditModal() {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('container')}>
      <KeyboardInfoBox keyboardInfo={KEYBOARD_DATA} />
      <div className={cn('input-div')}>
        <input className={cn('input')} placeholder="제목 작성" />
        <ImageInput />
        <input className={cn('input')} placeholder="내용 작성" />
      </div>
    </div>
  );
}
