'use client';

import { Button, Dropdown } from '@/components';
import { DeleteIcon } from '@/public/index';
import type { OptionTypes } from '@/types/ProductTypes';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ProductDetail.module.scss';
import QuantitySelector from './QuantitySelector';

const cn = classNames.bind(styles);

interface OptionCountProps {
  optionText?: string;
  price?: number;
}

interface OptionWithButtonProps {
  optionList: OptionTypes[];
  price: number;
}

function OptionContainer({ optionText, price }: OptionCountProps) {
  const [count, setCount] = useState<number>(1);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(true);

  const handleClickDeleteIcon = () => {
    setCount(0);
    setIsOptionSelected(false);
  };

  const incrementCount = () => setCount((prev) => prev + 1);
  const decrementCount = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <>
      <div className={cn({ 'option-box': optionText, hidden: !isOptionSelected })}>
        {optionText ? (
          <>
            <h3 className={cn('option-text')}>{optionText}</h3>
            <QuantitySelector count={count} incrementCount={incrementCount} decrementCount={decrementCount} />
            <h3 className={cn('option-price')}>{price?.toLocaleString()}원</h3>
            <DeleteIcon className={cn('delete-icon')} onClick={handleClickDeleteIcon} />
          </>
        ) : (
          <QuantitySelector count={count} incrementCount={incrementCount} decrementCount={decrementCount} />
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
