'use client';

import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import type {
  CustomKeyboardStepStatusTypes,
  CustomKeyboardStepTypes,
  OptionDataType,
} from '@/types/CustomKeyboardTypes';
import { KeyColorContext, KeyboardDataContext, StepContext } from '@/context/customKeyboardContext';
import { Modal, Button } from '@/components';
import { getCustomKeyboardPrice } from '@/libs/getCustomKeyboardPrice';
import { ChevronIcon } from '@/public/index';
import { useCaptureCanvas } from '@/hooks/useCanvasCaptrue';
import OptionProductModal from './OptionProductModal';
import CartModal from './CartModal';

import styles from './TotalCostWithNavigation.module.scss';

const cn = classNames.bind(styles);

interface TotalCostWithNavigationProps {
  optionData: OptionDataType[];
}

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

export default function TotalCostWithNavigation({ optionData }: TotalCostWithNavigationProps) {
  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isInitialOpenOptionModal, setIsInitialOpenOptionModal] = useState(true);
  const [isOpenCartModal, setIsOpenCartModal] = useState(false);
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
      captureCanvas(async () => {
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
          <Button
            backgroundColor='outline-primary'
            hoverColor='outline-primary-60'
            radius={4}
            className={cn('button')}
            onClick={() => handleClickPrevButton()}
          >
            <ChevronIcon width={16} height={16} className={cn('prev-button-icon')} />
            {BUTTON[prev]}
          </Button>
        )}
        <Button
          backgroundColor='background-primary'
          hoverColor='background-primary-60'
          radius={4}
          className={cn('button')}
          onClick={() => handleClickNextButton()}
        >
          {BUTTON[next]}
          <ChevronIcon width={16} height={16} className={cn('next-button-icon')} />
        </Button>
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
