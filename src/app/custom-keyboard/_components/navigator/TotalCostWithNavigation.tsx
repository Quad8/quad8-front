'use client';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import type {
  CustomKeyboardStepStatusTypes,
  CustomKeyboardStepTypes,
  OptionDataType,
} from '@/types/CustomKeyboardTypes';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { Modal } from '@/components';
import { getCustomKeyboardPrice } from '@/libs/getCustomKeyboardPrice';
import { useCaptureCanvas } from '@/hooks/useCanvasCaptrue';
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

type UpdateStepType<T> = Record<
  Exclude<CustomKeyboardStepTypes, T>,
  Partial<Record<CustomKeyboardStepTypes, CustomKeyboardStepStatusTypes>>
>;

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

const UPDATE_PREV_STEP_STATUS: UpdateStepType<'board'> = {
  switch: { board: 'current', switch: 'completed' },
  keyCap: { switch: 'current', keyCap: 'completed' },
};

const UPDATE_NEXT_STEP_STATUS: UpdateStepType<'keyCap'> = {
  board: { board: 'completed', switch: 'current' },
  switch: { switch: 'completed', keyCap: 'current' },
};

export default function TotalCostWithNavigation() {
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isInitialOpenOptionModal, setIsInitialOpenOptionModal] = useState(true);
  const [isOpenCartModal, setIsOpenCartModal] = useState(false);
  const [optionData, setOptionData] = useState<OptionDataType[]>([]);
  const [optionPrice, setOptionPrice] = useState(0);
  const { captureCanvas } = useCaptureCanvas();
  const {
    keyboardData: { type, texture, price, hasPointKeyCap, individualColor, pointKeyType },
    updateData,
  } = useContext(KeyboardDataContext);
  const { currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);
  const { updateFocusKey } = useContext(KeyColorContext);

  const handleClickNextButton = () => {
    if (currentStep === 'board' || currentStep === 'keyCap') {
      captureCanvas(() => {
        if (currentStep === 'board') {
          const nextStep = BUTTONS[currentStep].next as CustomKeyboardStepTypes;
          updateStepStatus(UPDATE_NEXT_STEP_STATUS[currentStep]);
          updateCurrentStep(nextStep);
          return;
        }
        if (isInitialOpenOptionModal) {
          setIsOpenOptionModal(true);
          return;
        }
        setIsOpenCartModal(true);
      });
      return;
    }

    updateStepStatus(UPDATE_NEXT_STEP_STATUS[currentStep]);
    updateCurrentStep(BUTTONS[currentStep].next as CustomKeyboardStepTypes);
  };

  const handleClickPrevButton = () => {
    updateFocusKey(null);
    updateCurrentStep(BUTTONS[currentStep].prev as CustomKeyboardStepTypes);
    if (currentStep === 'board') {
      return;
    }
    updateStepStatus(UPDATE_PREV_STEP_STATUS[currentStep]);
  };
  const { prev, next } = BUTTONS[currentStep];

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
          <button type='button' className={cn('button')} onClick={handleClickPrevButton}>
            {BUTTON[prev]}
          </button>
        )}
        <button type='button' className={cn('button')} onClick={handleClickNextButton}>
          {BUTTON[next]}
        </button>
      </div>
      <Modal isOpen={isOpenOptionModal} onClose={handleCloseOptionModal}>
        <OptionProductModal
          optionData={optionData}
          onClose={handleCloseOptionModal}
          updateOptionPrice={updateOptionPrice}
          onClick={handleOpenCartModal}
        />
      </Modal>
      <Modal isOpen={isOpenCartModal} onClose={handleCloseCartMoal}>
        <CartModal optionData={optionData} onClose={handleCloseCartMoal} />
      </Modal>
    </div>
  );
}
