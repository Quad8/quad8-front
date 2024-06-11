'use client';

import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import type { CustomKeyboardStepTypes } from '@/types/CustomKeyboardTypes';
import { Modal } from '@/components';
import styles from './PriceButton.module.scss';

const cn = classNames.bind(styles);

type DualButtonType = {
  [key in CustomKeyboardStepTypes]: {
    prev: CustomKeyboardStepTypes | null;
    next: CustomKeyboardStepTypes | 'cart';
  };
};

const BUTTON = {
  board: '배열, 외관',
  switch: '스위치',
  keyCap: '키캡',
  cart: '장바구니',
};

const BUTTONS: DualButtonType = {
  board: {
    prev: null,
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

const UPDATE_NEXT_STEP_STATUS: { [key in 'board' | 'switch']: { [key: string]: 'completed' | 'current' } } = {
  board: { board: 'completed', switch: 'current' },
  switch: { switch: 'completed', keyCap: 'current' },
};

const PRICE_LIST = {
  tkl: 30000,
  full: 35000,
  metal: 35000,
  plastic: 30000,
};

export default function PriceButton() {
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isInitialOpenOptionModal, setIsInitialOpenOptionModal] = useState(true);
  const {
    keyboardData: { type, texture, price, switchType, hasPointKeyCap, individualColor, pointKeyType },
    updateData,
  } = useContext(KeyboardDataContext);
  const { currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);
  const { updateFocusKey } = useContext(KeyColorContext);

  const checkCompleted = (step: CustomKeyboardStepTypes) => {
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

  const handleClickNextButton = (value: CustomKeyboardStepTypes) => {
    if (value === 'keyCap') {
      if (isInitialOpenOptionModal) {
        setIsInitialOpenOptionModal(true);
        setIsOpenOptionModal(true);
      }
      return;
    }
    if (value === 'switch' && !checkCompleted('switch')) {
      return;
    }
    updateStepStatus(UPDATE_NEXT_STEP_STATUS[value]);
    updateCurrentStep(value);
  };

  const handleClickPrevButton = (value: CustomKeyboardStepTypes) => {
    if (value === 'keyCap') {
      if (checkCompleted('keyCap')) {
        updateStepStatus({ switch: 'current', keyCap: 'completed' });
      } else {
        updateStepStatus({ switch: 'current', keyCap: 'pending' });
      }
    }
    if (value === 'switch') {
      if (checkCompleted('switch')) {
        updateStepStatus({ board: 'current', switch: 'completed' });
      } else {
        updateStepStatus({ board: 'current', switch: 'pending' });
      }
    }
    updateFocusKey(null);
    updateCurrentStep(BUTTONS[value].prev as CustomKeyboardStepTypes);
  };
  const { prev, next } = BUTTONS[currentStep];

  const completed = checkCompleted(currentStep);

  const onCloseOptionModal = () => {
    setIsOpenOptionModal(false);
    setIsInitialOpenOptionModal(false);
  };

  useEffect(() => {
    const boardPrice = PRICE_LIST[type] + PRICE_LIST[texture];
    const keyCapPrice =
      Number(hasPointKeyCap) *
      (Object.keys(individualColor).length * 500 * Number(pointKeyType === '내 맘대로 바꾸기') +
        Number(pointKeyType === '세트 구성') * 5000);
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
        {prev && (
          <button
            type='button'
            className={cn('button', { disabled: completed })}
            onClick={() => handleClickPrevButton(currentStep)}
          >
            {BUTTON[prev]}
          </button>
        )}
        <button type='button' className={cn('button')} onClick={() => completed && handleClickNextButton(currentStep)}>
          {BUTTON[next]}
        </button>
      </div>
      <Modal isOpen={isOpenOptionModal} onClose={onCloseOptionModal}>
        test
      </Modal>
    </div>
  );
}
