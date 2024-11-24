'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import { getRandomOptionProduct } from '@/api/customKeyboardAPI';
import { Button, Modal } from '@/components';
import { FocusKeyContext, KeyboardDataContext, StepContext } from '@/context';
import { useCaptureCanvas } from '@/hooks/useCanvasCaptrue';
import { getBlurImageList } from '@/utils/getBlurImage';
import { getCustomKeyboardPrice } from '@/utils/getCustomKeyboardPrice';
import { ChevronIcon } from '@/public/index';
import type {
  CustomKeyboardStepStatusTypes,
  CustomKeyboardStepTypes,
  OptionDataType,
} from '@/types/customKeyboardType';
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
  cart: '커스텀 완료',
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
  const { data: randomProductData } = useQuery<OptionDataType[]>({
    queryKey: ['customRandomProduct'],
    queryFn: getRandomOptionProduct,
    staleTime: 0,
  });

  const [optionData, setOptionData] = useState<OptionDataType[]>([]);

  const [isOpenOptionModal, setIsOpenOptionModal] = useState(false);
  const [isInitialOpenOptionModal, setIsInitialOpenOptionModal] = useState(true);

  const [isOpenCartModal, setIsOpenCartModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);

  const isOpenAnyModalOnCartModal = isOpenConfirmDialog || isOpenLoginModal;

  const [optionPrice, setOptionPrice] = useState(0);

  const { captureCanvas } = useCaptureCanvas();

  const {
    orderId,
    keyboardData: { type, texture, price, hasPointKeyCap, individualColor, pointKeyType },
    updateData,
  } = useContext(KeyboardDataContext);
  const { currentStep, updateCurrentStep, updateStepStatus } = useContext(StepContext);
  const { updateFocusKey } = useContext(FocusKeyContext);

  const resetScroll = () => {
    const optionWrapper = document.querySelector('#option');
    if (!optionWrapper) {
      return;
    }
    optionWrapper.scrollTop = 0;
  };

  const handleClickNextButton = () => {
    resetScroll();
    if (currentStep === 'board' || currentStep === 'keyCap') {
      captureCanvas(async () => {
        if (currentStep === 'board') {
          const nextStep = BUTTONS[currentStep].next as CustomKeyboardStepTypes;
          updateStepStatus(UPDATE_NEXT_STEP_STATUS[currentStep]);
          updateCurrentStep(nextStep);
          return;
        }
        if (isInitialOpenOptionModal && optionData.length > 0 && !orderId) {
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
    resetScroll();
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

  const handleConfirmDialog = (value: boolean) => {
    setIsOpenConfirmDialog(value);
  };

  const handleOpenCartModal = () => {
    setIsOpenCartModal(true);
  };

  const handleCloseCartModal = () => {
    if (isOpenAnyModalOnCartModal) {
      return;
    }
    setIsOpenCartModal(false);
  };

  const updateOptionPrice = (value: number) => {
    setOptionPrice((prevOptionPrice) => prevOptionPrice + value);
  };

  useEffect(() => {
    const { boardPrice, keyCapPrice } = getCustomKeyboardPrice({
      type,
      texture,
      hasPointKeyCap,
      individualColor,
      pointKeyType,
    });
    updateData('price', boardPrice + keyCapPrice);
  }, [hasPointKeyCap, individualColor, pointKeyType, texture, type, optionPrice, updateData]);

  useEffect(() => {
    const getData = async () => {
      if (!randomProductData) {
        return;
      }
      const blurImage = await getBlurImageList(randomProductData.map((element) => element.thumbnail));
      const blurData = randomProductData.map((element, i) => ({ ...element, blurImage: blurImage[i] }));
      setOptionData(blurData);
    };
    getData();
  }, [randomProductData]);

  return (
    <div className={cn('wrapper')}>
      <div className={cn('price-wrapper')}>
        <div className={cn('price-title')}>총 가격</div>
        <div className={cn('price')}>
          <div className={cn('price-number')}>{(price + optionPrice).toLocaleString()}</div>
          <div className={cn('price-unit')}>원</div>
        </div>
      </div>
      <div className={cn('button-wrapper')}>
        {prev && (
          <Button
            width={199}
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
          width={199}
          backgroundColor='background-primary'
          hoverColor='background-primary-60'
          radius={4}
          className={cn('button')}
          onClick={() => handleClickNextButton()}
        >
          {BUTTON[next]}
          {currentStep !== 'keyCap' && <ChevronIcon width={16} height={16} className={cn('next-button-icon')} />}
        </Button>
      </div>
      {optionData.length > 0 && (
        <Modal isOpen={isOpenOptionModal} onClose={() => {}}>
          <OptionProductModal
            optionData={optionData}
            onClose={handleCloseOptionModal}
            updateOptionPrice={updateOptionPrice}
            openCartModal={handleOpenCartModal}
          />
        </Modal>
      )}

      <Modal isOpen={isOpenCartModal} onClose={handleCloseCartModal}>
        <CartModal
          optionData={optionData}
          optionPrice={optionPrice}
          isOpenConfirmDialog={isOpenConfirmDialog}
          isOpenLoginModal={isOpenLoginModal}
          onClose={handleCloseCartModal}
          updateOptionPrice={updateOptionPrice}
          changeConfirmDialog={handleConfirmDialog}
          changeLoginModal={setIsOpenLoginModal}
        />
      </Modal>
    </div>
  );
}
