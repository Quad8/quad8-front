'use client';

import { Button, Dropdown } from '@/components';
import { DeleteIcon, MinusIcon, PlusIcon } from '@/public/index';
import type { OptionTypes } from '@/types/ProductTypes';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ProductDetail.module.scss';

const cn = classNames.bind(styles);

interface OptionCountProps {
  optionText?: string;
  price?: number;
}

interface OptionWithButtonProps {
  optionList: OptionTypes[];
  price: number;
}

type OperationType = 'plus' | 'minus';

function OptionContainer({ optionText, price }: OptionCountProps) {
  const [count, setCount] = useState<number>(1);
  const [isOptionSelected, SetIsOptionSelected] = useState<boolean>(true);

  const handleClickIcon = (operation: OperationType) => {
    if (operation === 'minus' && count > 1) {
      setCount((prev) => prev - 1);
    } else if (operation === 'plus') {
      setCount((prev) => prev + 1);
    }
  };

  const handleClickDeleteIcon = () => {
    setCount(0);
    SetIsOptionSelected(false);
  };

  const renderQuantitySelector = () => {
    return (
      <div className={cn('count-icons')}>
        <MinusIcon className={cn('icon', { 'gray-icon': count === 1 })} onClick={() => handleClickIcon('minus')} />
        <span>{count}</span>
        <PlusIcon className={cn('icon')} onClick={() => handleClickIcon('plus')} />
      </div>
    );
  };

  return (
    <>
      <div className={cn({ 'option-box': optionText, hidden: !isOptionSelected })}>
        {optionText ? (
          <>
            <h3 className={cn('option-text')}>{optionText}</h3>
            {renderQuantitySelector()}
            <h3 className={cn('option-price')}>{price?.toLocaleString()}원</h3>
            <DeleteIcon className={cn('delete-icon')} onClick={handleClickDeleteIcon} />
          </>
        ) : (
          renderQuantitySelector()
        )}
      </div>
      <div className={cn('total-price-box')}>
        <h3>총 금액</h3>
        <h1>
          <span>{price && (price * count).toLocaleString()}</span>원
        </h1>
      </div>
    </>
  );
}

export default function OptionWithButton({ optionList, price }: OptionWithButtonProps) {
  const optionNames = optionList?.map((option) => option.optionName);
  // const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  // const handleChangeOption = (value: string) => {
  //   setSelectedOption(value);
  // };

  return (
    <>
      <div className={cn('option-section')}>
        <h2 className={cn('explain-title')}>상품 선택</h2>
        {optionList && (
          <Dropdown
            options={optionNames}
            placeholder='스위치 (필수)'
            // value={selectedOption}
            // onChange={handleChangeOption}
          />
        )}
        <OptionContainer price={price} optionText='리니어' />
      </div>
      <div className={cn('button-section')}>
        <Button>장바구니</Button>
        <Button>구매하기</Button>
      </div>
    </>
  );
}
