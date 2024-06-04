import React from 'react';
import classNames from 'classnames/bind';
import styles from './TwoButton.module.scss';

interface TwoButtonProps {
  leftText: string;
  leftOnClick: () => void;
  rightText: string;
  rightOnClick: () => void;
}

export default function TwoButton({ leftText, leftOnClick, rightText, rightOnClick }: TwoButtonProps) {
  const cn = classNames.bind(styles);
  return (
    <div className={cn('buttons-div')}>
      <button className={cn('button-div')} onClick={leftOnClick} type='button'>
        {leftText}
      </button>
      <button className={cn('button-div')} onClick={rightOnClick} type='button'>
        {rightText}
      </button>
    </div>
  );
}
