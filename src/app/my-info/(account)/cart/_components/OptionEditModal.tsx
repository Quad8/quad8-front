import { useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';

import { Button, Dropdown } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { getProductDetailData } from '@/api/cartAPI';
import { OptionChageAPIType, ProductDetailAPIType } from '@/types/CartTypes';
import CountInput from './CountInput';

import styles from './OptionEditModal.module.scss';

const cn = classNames.bind(styles);

interface OptionEditModalProps {
  id: number;
  productId: number;
  currentCount: number;
  currentOptionId: number | null;
  onClickCancel: () => void;
  onClickEdit: (id: number, data: OptionChageAPIType) => void;
}

export default function OptionEditModal({
  id,
  productId,
  currentCount,
  currentOptionId,
  onClickCancel,
  onClickEdit,
}: OptionEditModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(currentCount);
  const [optionId, setOptionId] = useState(currentOptionId);
  const notChanged = currentCount === count && currentOptionId === optionId;
  const { data, isSuccess } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => getProductDetailData(String(productId)),
  }) as {
    data: ProductDetailAPIType;
    isSuccess: boolean;
  };

  if (!isSuccess) {
    return <div />;
  }

  const options = data.optionList ? data.optionList.map((option) => option.optionName) : [];
  const optionName = data.optionList
    ? data.optionList.find((option) => option.id === optionId)?.optionName ?? data.optionList[0].optionName
    : data.name;

  const handleDropdownChange = (value: string) => {
    if (!data.optionList) {
      return;
    }
    setOptionId(data.optionList.find((option) => option.optionName === value)?.id ?? data.optionList[0].id);
  };

  const handleClickEditButton = () => {
    onClickEdit(id, { count, switchOptionId: optionId });
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn('title')}>주문 수정</div>
      <div className={cn('header-wrapper')}>
        <Image alt='상품 이미지' src={data.thubmnailList[0].imgUrl} width={104} height={104} className={cn('image')} />
        <div className={cn('information-wrapper')}>
          <div className={cn('header-name')}>{data.name}</div>
          <div className={cn('header-price')}>{data.price.toLocaleString()}원</div>
        </div>
      </div>
      <div className={cn('option-wrapper')}>
        {data.optionList && (
          <Dropdown
            options={options}
            value={
              data.optionList.find((option) => option.id === optionId)?.optionName ?? data.optionList[0].optionName
            }
            onChange={handleDropdownChange}
          />
        )}

        <div className={cn('count-wrapper')}>
          <div className={cn('count-title')}>{optionName}</div>
          <CountInput value={count} ref={inputRef} onChange={(value) => setCount(Number(value))} />
        </div>
        <div className={cn('cart-wrapper')} />
        <div className={cn('price-wrapper')}>
          <div className={cn('price-text')}>총 상품금액</div>
          <div className={cn('price-number')}>{(data.price ?? 0 * count).toLocaleString()}원</div>
        </div>
      </div>
      <div className={cn('button-wrapper')}>
        <Button onClick={onClickCancel}>취소</Button>
        <Button onClick={handleClickEditButton} className={cn({ disabled: notChanged })} disabled={notChanged}>
          수정 완료
        </Button>
      </div>
    </div>
  );
}
