import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { Button, Dropdown } from '@/components';
import styles from './OptionEditModal.module.scss';
import CountInput from './CountInput';

const cn = classNames.bind(styles);

interface OptionEditModalProps {
  id: number;
  currentCount: number;
  currentOptionId: number | null;
  onClickCancel: () => void;
  onClickEdit: () => void;
}

interface OptionType {
  id: number;
  optionName: string;
}

interface ShopDetailDataType {
  id: number;
  name: string;
  image: string;
  optionList: null | OptionType[];
  price: number;
}

export default function OptionEditModal({
  id,
  currentCount,
  currentOptionId,
  onClickCancel,
  onClickEdit,
}: OptionEditModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState(currentCount);
  const [optionId, setOptionId] = useState(currentOptionId);
  const notChanged = currentCount === count && currentOptionId === optionId;
  const data: ShopDetailDataType = {
    id,
    name: 'NZXT FUNCTION 2 MINITKL Matte White 8K 유선 게이밍 기계식 Matte White 8K 유선 게이밍 기계식',
    image:
      'https://shop-phinf.pstatic.net/20240429_278/1714358219579vxxyH_JPEG/41660903461778748_895965906.jpg?type=m510',
    optionList: null,
    price: 60000,
  };
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
  return (
    <div className={cn('wrapper')}>
      <div className={cn('title')}>주문 수정</div>
      <div className={cn('header-wrapper')}>
        <Image alt='상품 이미지' src={data.image} width={104} height={104} className={cn('image')} />
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
          <div className={cn('price-number')}>{(data.price * count).toLocaleString()}원</div>
        </div>
      </div>
      <div className={cn('button-wrapper')}>
        <Button onClick={onClickCancel}>취소</Button>
        <Button onClick={onClickEdit} className={cn({ disabled: notChanged })} disabled={notChanged}>
          수정 완료
        </Button>
      </div>
    </div>
  );
}
