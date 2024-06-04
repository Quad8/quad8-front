'use client';

import { KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PriceButton.module.scss';

const cn = classNames.bind(styles);

type StepValueType = 'board' | 'switch' | 'keyCap' | 'cart' | 'null';
type DualButtonType = {
  [key in 'board' | 'switch' | 'keyCap']: {
    prev: Exclude<StepValueType, 'cart'>;
    next: Exclude<StepValueType, 'null'>;
  };
};

const BUTTON = {
  board: '배열, 외관',
  switch: '스위치',
  keyCap: '키캡',
  cart: '장바구니',
  null: 'null',
};

const BUTTONS: DualButtonType = {
  board: {
    prev: 'null',
    next: 'switch',
  },
  switch: {
    prev: 'board',
    next: 'keyCap',
  },
  keyCap: {
    prev: 'switch',
    next: 'cart',
  },
};

const UPDATE_NEXT_STEP_STATUS: { [key: string]: { [key: string]: 'completed' | 'current' } } = {
  switch: { board: 'completed', switch: 'current' },
  keyCap: { switch: 'completed', keyCap: 'current' },
  cart: { keyCap: 'completed' },
};

const PRICE_LIST = {
  tkl: 30000,
  full: 35000,
  metal: 35000,
  plastic: 30000,
};

export default function PriceButton() {
  const {
    keyboardData: { type, texture, price, switchType, hasPointKeyCap, individualColor, pointKeyType },
    updateData,
  } = useContext(KeyboardDataContext);
  const { currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);

  const checkCompleted = (step: 'board' | 'switch' | 'keyCap') => {
    if (step === 'board') {
      if (type && texture) {
        return true;
      }
    }

    if (step === 'switch') {
      if (switchType) {
        return true;
      }
    }

    if (step === 'keyCap') {
      return true;
    }

    return false;
  };

  const handleClickNextButton = (value: Exclude<StepValueType, 'null'>) => {
    if (value === 'cart') {
      return;
    }
    updateStepStatus(UPDATE_NEXT_STEP_STATUS[value]);
    updateCurrentStep(value);
  };

  const handleClickPrevButton = (value: Exclude<StepValueType, 'cart'>) => {
    if (value === 'null' || value === 'keyCap') {
      return;
    }
    if (value === 'switch') {
      if (checkCompleted('keyCap')) {
        updateStepStatus({ switch: 'current', keyCap: 'completed' });
      } else {
        updateStepStatus({ switch: 'current', keyCap: 'pending' });
      }
    }
    if (value === 'board') {
      if (checkCompleted('switch')) {
        updateStepStatus({ board: 'current', switch: 'completed' });
      } else {
        updateStepStatus({ board: 'current', switch: 'pending' });
      }
    }
    updateCurrentStep(value);
  };
  const { prev, next } = BUTTONS[currentStep];

  const completed = checkCompleted(currentStep);

  useEffect(() => {
    const boardPrice = PRICE_LIST[type] + PRICE_LIST[texture];
    const keyCapPrice =
      Number(hasPointKeyCap) *
      (Object.keys(individualColor).length * 500 + Number(pointKeyType === '세트 구성') * 5000);
    updateData('price', boardPrice + keyCapPrice);
  }, [hasPointKeyCap, individualColor, pointKeyType, texture, type, updateData]);

  return (
    <div className={cn('wrapper')}>
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
          className={cn('button', { disabled: completed }, { hidden: prev === 'null' })}
          onClick={() => handleClickPrevButton(prev)}
        >
          {BUTTON[prev]}
        </button>
        <button type='button' className={cn('button')} onClick={() => completed && handleClickNextButton(next)}>
          {BUTTON[next]}
        </button>
      </div>
    </div>
  );
}
