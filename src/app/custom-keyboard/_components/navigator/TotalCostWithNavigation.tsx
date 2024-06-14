'use client';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import type { CustomKeyboardStepTypes, OptionDataType } from '@/types/CustomKeyboardTypes';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { Modal } from '@/components';
import { getCustomKeyboardPrice } from '@/libs/getCustomKeyboardPrice';
import OptionProductModal from './OptionProductModal';
import CartModal from './CartModal';

import styles from './TotalCostWithNavigation.module.scss';

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

export default function TotalCostWithNavigation() {
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isInitialOpenOptionModal, setIsInitialOpenOptionModal] = useState(true);
  const [isOpenCartModal, setIsOpenCartModal] = useState(false);
  const [optionData, setOptionData] = useState<OptionDataType[]>([]);
  const [optionPrice, setOptionPrice] = useState(0);
  const {
    keyboardData: { type, texture, price, switchType, hasPointKeyCap, individualColor, pointKeyType },
    updateData,
  } = useContext(KeyboardDataContext);
  const { currentStep, canvasRef, controlRef, updateCurrentStep, updateStepStatus, updateKeyboardImage } =
    useContext(StepContext);
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

  const captureKeyboard = (value: 'board' | 'keyCap') => {
    const canvas = canvasRef?.current;
    const control = controlRef?.current;

    if (!canvas || !control) {
      return;
    }
    control.reset();
    requestAnimationFrame(() => {
      const image = canvas.toDataURL('image/png');
      updateKeyboardImage(value, image);
      if (value === 'board') {
        updateStepStatus(UPDATE_NEXT_STEP_STATUS[value]);
        updateCurrentStep(BUTTONS[value].next as CustomKeyboardStepTypes);
        return;
      }

      if (isInitialOpenOptionModal) {
        setIsOpenOptionModal(true);
        return;
      }
      setIsOpenCartModal(true);
    });
  };
  const handleClickNextButton = (value: CustomKeyboardStepTypes) => {
    if (value === 'board' || value === 'keyCap') {
      updateFocusKey(null);
      setTimeout(() => {
        captureKeyboard(value);
      }, 1);
      return;
    }

    updateStepStatus(UPDATE_NEXT_STEP_STATUS[value]);
    updateCurrentStep(BUTTONS[value].next as CustomKeyboardStepTypes);
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

  const handleCloseOptionModal = () => {
    setIsOpenOptionModal(false);
    setIsInitialOpenOptionModal(false);
  };

  const handleOpenCartModal = () => {
    setIsOpenCartModal(true);
  };

  const handleCloseCartMoal = () => {
    setIsOpenCartModal(false);
  };

  const updateOptionPrice = (value: number) => {
    setOptionPrice(value);
  };

  useEffect(() => {
    const { boardPrice, keyCapPrice } = getCustomKeyboardPrice({
      type,
      texture,
      hasPointKeyCap,
      individualColor,
      pointKeyType,
    });
    updateData('price', boardPrice + keyCapPrice + optionPrice);
  }, [hasPointKeyCap, individualColor, pointKeyType, texture, type, optionPrice, updateData]);

  useEffect(() => {
    /* api로 옵션 데이터 가져오기 */
    setOptionData([
      {
        id: '5',
        name: '스테빌라이저',
        image: '/images/optionProductMock.png',
        price: 9000,
      },
      {
        id: '42',
        name: '스프링',
        image: '/images/optionProductMock.png',
        price: 1000,
      },
      {
        id: '65',
        name: '튜닝용품',
        image: '/images/optionProductMock.png',
        price: 4000,
      },
      {
        id: '72',
        name: '보강판',
        image: '/images/optionProductMock.png',
        price: 12000,
      },
      {
        id: '95',
        name: '기판',
        image: '/images/optionProductMock.png',
        price: 24000,
      },
    ]);
  }, []);

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
      <Modal isOpen={isOpenOptionModal} onClose={handleCloseOptionModal}>
        <OptionProductModal
          optionData={optionData}
          onClose={handleCloseOptionModal}
          updateOptionPrice={updateOptionPrice}
          onOpen={handleOpenCartModal}
        />
      </Modal>
      <Modal isOpen={isOpenCartModal} onClose={handleCloseCartMoal}>
        <CartModal optionData={optionData} onClose={handleCloseCartMoal} />
      </Modal>
    </div>
  );
}
