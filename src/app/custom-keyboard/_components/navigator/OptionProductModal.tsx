import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import { KeyboardDataContext } from '@/context/customKeyboardContext';
import type { OptionDataType } from '@/types/CustomKeyboardTypes';
import Button from '@/components/Button/Button';
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
  const {
    updateData,
    keyboardData: { option },
  } = useContext(KeyboardDataContext);

  const [optionsChecked, setOptionsChecked] = useState<Record<string, boolean>>(() => {
    if (option) {
      return option as Record<string, boolean>;
    }
    const checkList = {};
    optionData.forEach((element) => Object.assign(checkList, { [element.id]: false }));
    return checkList;
  });

  const handleClickOption = (id: keyof typeof optionsChecked) => {
    setOptionsChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClickAddButton = () => {
    updateData('option', optionsChecked);
    const currentPrice = optionData
      .map((element) => (optionsChecked[element.id] ? element.price : 0))
      .reduce((prev, next) => prev + next, 0);
    updateOptionPrice(currentPrice);
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
              productImage={element.image}
              price={element.price}
              isChecked={optionsChecked[element.id]}
              onClick={() => handleClickOption(element.id)}
            />
          ))}
        </div>
        <div className={cn('button-wrapper')}>
          <Button onClick={handleClickAddButton} width={154}>
            추가하기
          </Button>
        </div>
      </div>
    </div>
  );
}
