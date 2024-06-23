'use client';

import { postCart } from '@/api/cartAPI';
import { Button, Dropdown, Modal } from '@/components';
import Dialog from '@/components/Dialog/Dialog';
import SignInModal from '@/components/SignInModal/SignInModal';
import type { CartProductType, OptionTypes } from '@/types/ProductTypes';
import { Users } from '@/types/userType';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { toast } from 'react-toastify';
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

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isNoOptionModal, setIsNoOptionModal] = useState(false);

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

  const { data: userData } = useQuery<{ data: Users }>({
    queryKey: ['userData'],
  });

  const checkUserAndOptions = () => {
    if (!userData?.data) {
      setIsSignInModalOpen(true);
      return;
    }

    if (optionList && selectedOptions.length === 0) {
      setIsNoOptionModal(true);
    }
  };

  const handleAddCartProduct = (data: CartProductType) => {
    addCartProduct(data, {
      onSuccess: () => {
        toast.success('상품이 장바구니에 담겼습니다.');
        setSelectedOptions([]);
      },
      onError: () => {
        toast.error('장바구니에 담기를 실패했습니다. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  const handleClickCartButton = () => {
    checkUserAndOptions();

    if (!optionList) {
      const noOptionData: CartProductType = { productId, switchOptionId: undefined, count: noOptionCount };

      handleAddCartProduct(noOptionData);
      return;
    }

    selectedOptions.forEach((option) => {
      const data: CartProductType = {
        productId,
        switchOptionId: option.id,
        count: option.count,
      };

      handleAddCartProduct(data);
    });
  };

  const handleClickBuyButton = () => {
    checkUserAndOptions();
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
        <Button onClick={handleClickBuyButton}>구매하기</Button>
      </div>
      <Modal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)}>
        <SignInModal />
      </Modal>
      <Dialog
        type='alert'
        iconType='accept'
        message='옵션을 선택해 주세요.'
        isOpen={isNoOptionModal}
        onClick={() => setIsNoOptionModal(false)}
        buttonText='확인'
      />
    </>
  );
}
