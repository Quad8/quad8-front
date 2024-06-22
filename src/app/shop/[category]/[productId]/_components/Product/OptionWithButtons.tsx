'use client';

import { postCart } from '@/api/cartAPI';
import { Button, Dropdown } from '@/components';
import type { CartProductType, OptionTypes } from '@/types/ProductTypes';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import OptionContainer from './OptionContainer';
import styles from './ProductDetail.module.scss';
import QuantitySelector from './QuantitySelector';

const cn = classNames.bind(styles);

interface OptionWithButtonProps {
  productId: number;
  optionList: OptionTypes[];
  price: number;
}
interface SelectedOptionType {
  id: number;
  name: string;
  count: number;
}

const OPTION_PLACEHOLDER = '스위치 (필수)';

export default function OptionWithButton({ productId, optionList, price }: OptionWithButtonProps) {
  const optionNames = optionList?.map((option) => option.optionName);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType[]>([]);
  const totalPrice = selectedOptions.reduce((acc, option) => acc + option.count * price, 0);
  const [noOptionCount, setNoOptionCount] = useState<number>(1);
  const noOptionTotalPrice = price * noOptionCount;

  const handleChangeOption = (value: string) => {
    if (value !== OPTION_PLACEHOLDER) {
      const selectedOption = optionList.find((option) => option.optionName === value);
      if (selectedOption) {
        const { id, optionName } = selectedOption;

        setSelectedOptions((prevOptions) => {
          const isExisting = prevOptions.find((option) => option.name === value);
          if (isExisting) {
            return prevOptions.map((option) =>
              option.name === optionName ? { ...option, count: option.count + 1 } : option,
            );
          } else {
            return [...prevOptions, { id, name: optionName, count: 1 }];
          }
        });
      }
    }
  };

  const handleUpdateCount = (name: string, count: number) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.map((option) => (option.name === name ? { ...option, count } : option)),
    );
  };

  const handleDeleteOption = (name: string) => {
    setSelectedOptions((prevOptions) => prevOptions.filter((option) => option.name !== name));
  };

  const { mutate: addCartProduct } = useMutation({ mutationFn: (data: CartProductType) => postCart(data) });

  const handleClickCartButton = () => {
    selectedOptions.forEach((option) => {
      const data: CartProductType = {
        productId,
        switchOptionId: option.id,
        count: option.count,
      };

      addCartProduct(data);
    });

    if (!optionList) {
      const noOptionData: CartProductType = { productId, switchOptionId: undefined, count: noOptionCount };

      addCartProduct(noOptionData);
    }
  };

  return (
    <>
      <div className={cn('option-section')}>
        <h2 className={cn('explain-title')}>상품 선택</h2>
        {optionList?.length ? (
          <Dropdown options={optionNames} placeholder={OPTION_PLACEHOLDER} value='' onChange={handleChangeOption} />
        ) : (
          <QuantitySelector count={noOptionCount} updateCount={(count) => setNoOptionCount(count)} />
        )}
        {selectedOptions.map((option) => (
          <OptionContainer
            key={option.name}
            optionText={option.name}
            price={price}
            count={option.count}
            updateCount={(count) => handleUpdateCount(option.name, count)}
            deleteOption={() => handleDeleteOption(option.name)}
          />
        ))}
      </div>
      <div className={cn('total-price-box')}>
        <h3>총 금액</h3>
        <h1>
          <span>{optionList?.length ? totalPrice.toLocaleString() : noOptionTotalPrice.toLocaleString()}</span> 원
        </h1>
      </div>
      <div className={cn('button-section')}>
        <Button onClick={handleClickCartButton}>장바구니</Button>
        <Button>구매하기</Button>
      </div>
    </>
  );
}
