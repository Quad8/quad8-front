'use client';

import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import { KeyboardDataContext } from '@/context';
import type { OptionDataType } from '@/types/CustomKeyboardTypes';
import { Button } from '@/components';
import OptionProductCard from './parts/OptionProductCard';

import styles from './OptionProductModal.module.scss';

const cn = classNames.bind(styles);

interface OptionProductModalProps {
  optionData: OptionDataType[];
  onClose: () => void;
  updateOptionPrice: (value: number) => void;
  onClick: () => void;
}

export default function OptionProductModal({
  optionData,
  onClose,
  updateOptionPrice,
  onClick,
}: OptionProductModalProps) {
  const { updateData } = useContext(KeyboardDataContext);

  const [optionsChecked, setOptionsChecked] = useState<Record<string, boolean>>(() => {
    const checkList = {};
    optionData.forEach((element) => Object.assign(checkList, { [element.id]: false }));
    return checkList;
  });

  const handleClickOption = (id: keyof typeof optionsChecked) => {
    setOptionsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClickAddButton = () => {
    updateData(
      'option',
      Object.keys(optionsChecked)
        .filter((key) => optionsChecked[key])
        .map((element) => +element),
    );
    const currentPrice = optionData
      .map((element) => (optionsChecked[element.id] ? element.price : 0))
      .reduce((prev, next) => prev + next, 0);
    updateOptionPrice(currentPrice);
    onClose();
    onClick();
  };

  const handleClickCloseButton = () => {
    onClose();
    onClick();
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('header-wrapper')}>
        <div className={cn('title')}>잠깐! 이런 상품은 어때요?</div>
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('card-wrapper')}>
          {optionData.map((element) => (
            <OptionProductCard
              key={element.id}
              productName={element.name}
              productImage={element.thumbnail}
              price={element.price}
              isChecked={optionsChecked[String(element.id)]}
              onClick={() => handleClickOption(String(element.id))}
              blurImage={element.blurImage}
            />
          ))}
        </div>
        <div className={cn('button-wrapper')}>
          <Button width={199} radius={4} onClick={handleClickCloseButton} hoverColor='background-primary-60'>
            괜찮습니다
          </Button>
          <Button width={199} radius={4} onClick={handleClickAddButton} hoverColor='background-primary-60'>
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
