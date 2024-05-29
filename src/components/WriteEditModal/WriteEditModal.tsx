import React from 'react';
import KEYBOARD_DATA from '@/app/mj/customData';
import classNames from 'classnames/bind';
import styles from './WriteEditModal.module.scss';
import KeyboardInfoBox from './KeyboardInfoBox';
import TwoButton from '../buttons/TwoButton/TwoButton';
import ImageInput from './ImageInput';

export default function WriteEditModal() {
  const cn = classNames.bind(styles);
  const handleClickLeftButton = () => {
    /** 닫기버튼 누르면 실행되는 함수 */
  };
  const handleClickRightButton = () => {
    /** 등록 버튼 누르면 실행되는 함수 */
  };
  return (
    <div className={cn('container')}>
      <KeyboardInfoBox keyboardInfo={KEYBOARD_DATA} />
      <div className={cn('input-div')}>
        <input className={cn('input')} placeholder="제목 작성" />
        <ImageInput />
        <input className={cn('input')} placeholder="내용 작성" />
        <TwoButton
          leftText="닫기"
          leftOnClickHandler={handleClickLeftButton}
          rightText="등록"
          rightOnClickHandler={handleClickRightButton}
        />
      </div>
    </div>
  );
}
