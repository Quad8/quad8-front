'use client';

import { KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './PriceButton.module.scss';

const cn = classNames.bind(styles);

type StepValueType = 'board' | 'switch' | 'keyCap' | 'cart' | 'null';

interface ButtonType {
  name: string;
  value: StepValueType;
}

type ButtonListType = {
  [key in StepValueType]: ButtonType;
};

type DualButtonType = {
  [key in 'board' | 'switch' | 'keyCap']: {
    prev: ButtonType;
    next: ButtonType;
  };
};

const BUTTON: ButtonListType = {
  board: {
    name: '배열, 외관',
    value: 'board',
  },
  switch: {
    name: '스위치',
    value: 'switch',
  },
  keyCap: {
    name: '키캡',
    value: 'keyCap',
  },
  cart: {
    name: '장바구니',
    value: 'cart',
  },
  null: {
    name: 'null',
    value: 'null',
  },
};

const BUTTONS: DualButtonType = {
  board: {
    prev: BUTTON.null,
    next: BUTTON.switch,
  },
  switch: {
    prev: BUTTON.board,
    next: BUTTON.keyCap,
  },
  keyCap: {
    prev: BUTTON.switch,
    next: BUTTON.cart,
  },
};

export default function PriceButton() {
  const {
    keyboardData: { type, texture, price },
  } = useContext(KeyboardDataContext);
  const { currentStep, updateCurrentStep } = useContext(StepContext);

  const handleClickButton = (value: StepValueType) => {
    if (value === 'null') {
      return;
    }
    if (value === 'cart') {
      return;
    }
    updateCurrentStep(value);
  };
  const { prev, next } = BUTTONS[currentStep];

  const checkCompleted = (step: 'board' | 'switch' | 'keyCap') => {
    if (step === 'board') {
      if (type && texture) {
        return true;
      }
    }

    if (step === 'switch') {
      return true;
    }

    if (step === 'keyCap') {
      return true;
    }

    return false;
  };

  const completed = checkCompleted(currentStep);

  return (
    <>
      <div className={cn('price-wrapper')}>
        <div className={cn('price-title')}>총 가격</div>
        <div className={cn('price')}>
          <div className={cn('price-number')}>{price.toLocaleString()}</div>
          <div className={cn('price-unit')}>원</div>
        </div>
      </div>
      <div className={cn('button-wrapper')}>
        <button
          type='button'
          className={cn('button', { disabled: completed }, { hidden: prev.name === 'null' })}
          onClick={() => handleClickButton(prev.value)}
        >
          {prev.name}
        </button>
        <button type='button' className={cn('button')} onClick={() => completed && handleClickButton(next.value)}>
          {next.name}
        </button>
      </div>
    </>
  );
}
